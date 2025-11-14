/**
 * PayPal IPN Handler - Instant Payment Notification
 * Vercel Serverless Function
 * 
 * File location: /api/paypal-ipn.js
 * This receives payment confirmations from PayPal automatically
 */

const crypto = require('crypto');
const https = require('https');

/**
 * Verify IPN message with PayPal
 */
function verifyIPNWithPayPal(body) {
    return new Promise((resolve, reject) => {
        // Add verification command
        const verificationBody = `cmd=_notify-validate&${body}`;

        const options = {
            hostname: process.env.PAYPAL_SANDBOX === 'true' 
                ? 'www.sandbox.paypal.com' 
                : 'www.paypal.com',
            path: '/cgi-bin/webscr',
            method: 'POST',
            headers: {
                'Content-Length': verificationBody.length,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data === 'VERIFIED');
            });
        });

        req.on('error', reject);
        req.write(verificationBody);
        req.end();
    });
}

/**
 * Parse URL-encoded body
 */
function parseIPNData(body) {
    const params = new URLSearchParams(body);
    const data = {};
    
    for (const [key, value] of params) {
        data[key] = decodeURIComponent(value);
    }
    
    return data;
}

/**
 * Main IPN handler
 */
export default async function handler(req, res) {
    // Only accept POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get raw body
        let body = '';
        
        if (typeof req.body === 'string') {
            body = req.body;
        } else {
            // Convert object to URL-encoded string
            body = new URLSearchParams(req.body).toString();
        }

        console.log('IPN received');

        // Verify with PayPal
        const isVerified = await verifyIPNWithPayPal(body);

        if (!isVerified) {
            console.warn('IPN verification failed');
            return res.status(400).json({ error: 'IPN verification failed' });
        }

        // Parse the data
        const ipnData = parseIPNData(body);

        console.log('IPN verified - Transaction:', {
            txn_id: ipnData.txn_id,
            mc_gross: ipnData.mc_gross,
            receiver_email: ipnData.receiver_email,
            payer_email: ipnData.payer_email,
            payment_status: ipnData.payment_status,
            custom: ipnData.custom
        });

        // Handle different payment statuses
        switch (ipnData.payment_status) {
            case 'Completed':
                return await handleCompletedPayment(ipnData, res);
            
            case 'Pending':
                return await handlePendingPayment(ipnData, res);
            
            case 'Failed':
                return await handleFailedPayment(ipnData, res);
            
            case 'Denied':
                return await handleDeniedPayment(ipnData, res);
            
            case 'Refunded':
                return await handleRefundPayment(ipnData, res);
            
            default:
                console.log('Unknown payment status:', ipnData.payment_status);
                return res.status(200).json({ message: 'IPN processed' });
        }

    } catch (error) {
        console.error('IPN error:', error);
        // Still return 200 to avoid PayPal resending
        return res.status(200).json({ 
            error: error.message,
            message: 'IPN received but processing failed'
        });
    }
}

/**
 * Handle completed payment
 */
async function handleCompletedPayment(ipnData, res) {
    try {
        const orderId = ipnData.custom;
        const userEmail = ipnData.payer_email;
        const amount = ipnData.mc_gross;
        const txnId = ipnData.txn_id;

        console.log(`✅ Payment completed for order ${orderId}`);

        // Determine tier based on amount
        let tier = 'free';
        if (amount === '3.99') tier = 'professional';
        if (amount === '9.99') tier = 'master';

        // Call pattern delivery API
        const deliveryResponse = await fetch(
            `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/process-pattern-order`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'deliver-patterns',
                    order: {
                        orderId: orderId,
                        userEmail: userEmail,
                        tier: tier,
                        patterns: {} // Patterns will be retrieved from localStorage on frontend
                    },
                    paypalData: {
                        txn_id: txnId,
                        payer_email: userEmail,
                        mc_gross: amount
                    }
                })
            }
        );

        const deliveryResult = await deliveryResponse.json();

        if (deliveryResult.success) {
            console.log(`Pattern delivery successful for ${orderId}`);
            
            // Log to analytics (optional)
            await logTransaction({
                orderId: orderId,
                status: 'completed',
                tier: tier,
                amount: amount,
                email: userEmail,
                txnId: txnId,
                timestamp: new Date()
            });
        } else {
            console.error(`Pattern delivery failed for ${orderId}:`, deliveryResult.error);
        }

        return res.status(200).json({ 
            message: 'Payment processed',
            orderId: orderId,
            delivery: deliveryResult
        });

    } catch (error) {
        console.error('Completed payment error:', error);
        return res.status(200).json({ error: error.message });
    }
}

/**
 * Handle pending payment
 */
async function handlePendingPayment(ipnData, res) {
    try {
        const orderId = ipnData.custom;
        console.log(`⏳ Payment pending for order ${orderId}`);

        await logTransaction({
            orderId: orderId,
            status: 'pending',
            reason: ipnData.pending_reason,
            email: ipnData.payer_email,
            timestamp: new Date()
        });

        // Send pending notification email
        await sendPendingNotificationEmail(
            ipnData.payer_email,
            orderId,
            ipnData.pending_reason
        );

        return res.status(200).json({ message: 'Pending payment logged' });

    } catch (error) {
        console.error('Pending payment error:', error);
        return res.status(200).json({ error: error.message });
    }
}

/**
 * Handle failed payment
 */
async function handleFailedPayment(ipnData, res) {
    try {
        const orderId = ipnData.custom;
        console.error(`❌ Payment failed for order ${orderId}`);

        await logTransaction({
            orderId: orderId,
            status: 'failed',
            email: ipnData.payer_email,
            timestamp: new Date()
        });

        // Send failure notification
        await sendFailureNotificationEmail(
            ipnData.payer_email,
            orderId
        );

        return res.status(200).json({ message: 'Failed payment logged' });

    } catch (error) {
        console.error('Failed payment error:', error);
        return res.status(200).json({ error: error.message });
    }
}

/**
 * Handle denied payment
 */
async function handleDeniedPayment(ipnData, res) {
    try {
        const orderId = ipnData.custom;
        console.error(`🚫 Payment denied for order ${orderId}`);

        await logTransaction({
            orderId: orderId,
            status: 'denied',
            reason: ipnData.reason_code,
            email: ipnData.payer_email,
            timestamp: new Date()
        });

        return res.status(200).json({ message: 'Denied payment logged' });

    } catch (error) {
        console.error('Denied payment error:', error);
        return res.status(200).json({ error: error.message });
    }
}

/**
 * Handle refund
 */
async function handleRefundPayment(ipnData, res) {
    try {
        const orderId = ipnData.custom;
        const parentTxnId = ipnData.parent_txn_id;
        
        console.log(`💰 Refund processed for order ${orderId}`);

        await logTransaction({
            orderId: orderId,
            status: 'refunded',
            parentTxnId: parentTxnId,
            amount: ipnData.mc_gross,
            email: ipnData.payer_email,
            timestamp: new Date()
        });

        // Send refund confirmation
        await sendRefundNotificationEmail(
            ipnData.payer_email,
            orderId
        );

        return res.status(200).json({ message: 'Refund logged' });

    } catch (error) {
        console.error('Refund error:', error);
        return res.status(200).json({ error: error.message });
    }
}

/**
 * Log transaction to analytics/database
 */
async function logTransaction(transactionData) {
    try {
        // If you have a database, save here
        console.log('Transaction logged:', transactionData);

        // Optional: Send to external analytics service
        if (process.env.ANALYTICS_WEBHOOK) {
            await fetch(process.env.ANALYTICS_WEBHOOK, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transactionData)
            });
        }
    } catch (error) {
        console.error('Logging error:', error);
    }
}

/**
 * Send pending notification email
 */
async function sendPendingNotificationEmail(email, orderId, reason) {
    console.log(`Sending pending notification to ${email} for order ${orderId}`);
    // Implement using nodemailer (same as delivery system)
}

/**
 * Send failure notification email
 */
async function sendFailureNotificationEmail(email, orderId) {
    console.log(`Sending failure notification to ${email} for order ${orderId}`);
    // Implement using nodemailer
}

/**
 * Send refund notification email
 */
async function sendRefundNotificationEmail(email, orderId) {
    console.log(`Sending refund notification to ${email} for order ${orderId}`);
    // Implement using nodemailer
}
