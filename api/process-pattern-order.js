/**
 * Vercel Serverless Function - Pattern Delivery Backend
 * Handles PayPal IPN, generates pattern files, and sends emails
 * 
 * Deploy to: Vercel (free)
 * File location: /api/process-pattern-order.js
 */

const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');

// Initialize email transporter (using SendGrid free tier)
const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY // Add this to Vercel environment variables
    }
});

// Store for order tracking (in production, use a database)
const processedOrders = new Map();

/**
 * Main handler for pattern delivery requests
 */
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { action, order, paypalData } = req.body;

        if (!action) {
            return res.status(400).json({ error: 'Action required' });
        }

        if (action === 'deliver-patterns') {
            return await handlePatternDelivery(order, paypalData, res);
        } else if (action === 'resend-patterns') {
            return await handlePatternResend(order, res);
        } else {
            return res.status(400).json({ error: 'Unknown action' });
        }
    } catch (error) {
        console.error('Handler error:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}

/**
 * Handle initial pattern delivery after payment
 */
async function handlePatternDelivery(order, paypalData, res) {
    try {
        // Validate order
        if (!order.orderId || !order.userEmail) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing order ID or email' 
            });
        }

        // Check if already processed
        if (processedOrders.has(order.orderId)) {
            return res.status(200).json({ 
                success: true, 
                message: 'Order already processed',
                orderId: order.orderId 
            });
        }

        // Generate pattern files
        const patternFiles = await generatePatternFiles(order);

        // Send email with patterns
        const emailResult = await sendPatternEmail(
            order.userEmail,
            order.userName,
            order.tier,
            patternFiles
        );

        // Mark order as processed
        processedOrders.set(order.orderId, {
            timestamp: new Date(),
            tier: order.tier,
            email: order.userEmail,
            txnId: paypalData?.txn_id
        });

        // Log transaction
        console.log(`✅ Pattern delivered: ${order.orderId} → ${order.userEmail}`);

        return res.status(200).json({
            success: true,
            message: 'Patterns sent successfully',
            orderId: order.orderId,
            emailSent: emailResult.response
        });

    } catch (error) {
        console.error('Pattern delivery error:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

/**
 * Handle manual resend of patterns
 */
async function handlePatternResend(order, res) {
    try {
        if (!order.userEmail || !order.orderId) {
            return res.status(400).json({
                success: false,
                error: 'Email and order ID required'
            });
        }

        // Generate fresh pattern files
        const patternFiles = await generatePatternFiles(order);

        // Send email
        const emailResult = await sendPatternEmail(
            order.userEmail,
            order.userName,
            order.tier,
            patternFiles,
            true // isResend
        );

        console.log(`🔄 Pattern resent: ${order.orderId} → ${order.userEmail}`);

        return res.status(200).json({
            success: true,
            message: 'Patterns resent successfully',
            orderId: order.orderId
        });

    } catch (error) {
        console.error('Resend error:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

/**
 * Generate pattern files (PNG, PDF, SVG)
 */
async function generatePatternFiles(order) {
    const files = {};

    try {
        // Knitting Pattern
        if (order.tier !== 'free' && order.patterns?.knitting) {
            files.knitting = {
                filename: `knitting-pattern-${order.orderId}.pdf`,
                content: await generatePatternPDF(
                    order.patterns.knitting,
                    'Knitting Pattern',
                    order.orderId
                ),
                mimetype: 'application/pdf'
            };
        }

        // Crochet Pattern
        if (order.tier === 'master' && order.patterns?.crochet) {
            files.crochet = {
                filename: `crochet-pattern-${order.orderId}.pdf`,
                content: await generatePatternPDF(
                    order.patterns.crochet,
                    'Crochet Pattern',
                    order.orderId
                ),
                mimetype: 'application/pdf'
            };
        }

        // Weaving Pattern
        if (order.tier === 'master' && order.patterns?.weaving) {
            files.weaving = {
                filename: `weaving-pattern-${order.orderId}.pdf`,
                content: await generatePatternPDF(
                    order.patterns.weaving,
                    'Weaving Pattern',
                    order.orderId
                ),
                mimetype: 'application/pdf'
            };
        }

        // Materials Guide (PDF)
        files.guide = {
            filename: `materials-guide-${order.orderId}.pdf`,
            content: await generateMaterialsGuide(order.tier),
            mimetype: 'application/pdf'
        };

        return files;

    } catch (error) {
        console.error('File generation error:', error);
        throw new Error(`Failed to generate pattern files: ${error.message}`);
    }
}

/**
 * Generate PDF from pattern image
 */
async function generatePatternPDF(imageDataUrl, title, orderId) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const chunks = [];

            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);

            // Add title
            doc.fontSize(24).font('Helvetica-Bold').text(title, { align: 'center' });
            doc.moveDown();
            doc.fontSize(12).text(`Order ID: ${orderId}`, { align: 'center' });
            doc.text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'center' });
            doc.moveDown(2);

            // Add image if available
            if (imageDataUrl && imageDataUrl.startsWith('data:image')) {
                try {
                    const base64Data = imageDataUrl.split(',')[1];
                    const buffer = Buffer.from(base64Data, 'base64');
                    doc.image(buffer, 50, doc.y, { width: 500 });
                    doc.moveDown();
                } catch (imgError) {
                    doc.text('(Pattern image not available)', { color: '#999' });
                }
            }

            // Add instructions
            doc.fontSize(14).font('Helvetica-Bold').text('Instructions:', { align: 'left' });
            doc.fontSize(11).font('Helvetica');
            doc.text('1. Print this pattern at 100% scale (no auto-fit)', { lineGap: 5 });
            doc.text('2. Use the grid reference for accurate measurements', { lineGap: 5 });
            doc.text('3. Each square represents one stitch', { lineGap: 5 });
            doc.text('4. Refer to the materials guide for recommended yarns', { lineGap: 5 });
            doc.moveDown();

            // Footer
            doc.fontSize(10).text(
                'Created by Abstract Emporium Art | abstractemporiumart@outlook.com',
                { align: 'center', color: '#999' }
            );

            doc.end();

        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Generate materials guide based on tier
 */
async function generateMaterialsGuide(tier) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument();
            const chunks = [];

            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);

            // Title
            doc.fontSize(24).font('Helvetica-Bold').text('Materials Guide', { align: 'center' });
            doc.moveDown();

            if (tier === 'free' || tier === 'professional') {
                // Knitting Materials
                doc.fontSize(14).font('Helvetica-Bold').text('Knitting Pattern Materials');
                doc.fontSize(11).font('Helvetica');
                doc.list([
                    'Yarn: Worsted weight recommended',
                    'Needles: US 8-10 (5-6mm)',
                    'Notions: Stitch markers, yarn needle',
                    'Time: 8-12 hours depending on complexity'
                ], { bulletIndent: 10 });
                doc.moveDown();

                if (tier === 'professional') {
                    // Crochet Materials
                    doc.fontSize(14).font('Helvetica-Bold').text('Crochet Pattern Materials');
                    doc.fontSize(11).font('Helvetica');
                    doc.list([
                        'Yarn: Worsted weight recommended',
                        'Hook: 5.5-6mm (I/J size)',
                        'Notions: Stitch markers, yarn needle',
                        'Time: 10-14 hours depending on complexity'
                    ], { bulletIndent: 10 });
                    doc.moveDown();
                }
            }

            if (tier === 'master') {
                // All materials
                doc.fontSize(14).font('Helvetica-Bold').text('Complete Materials Kit');
                doc.fontSize(11).font('Helvetica');
                doc.text('This Master Pack includes Knitting, Crochet, and Weaving patterns.');
                doc.moveDown();

                doc.fontSize(12).font('Helvetica-Bold').text('Recommended Supplies:');
                doc.list([
                    'Assorted yarns (worsted to bulky weight)',
                    'Knitting needles (US 6-10)',
                    'Crochet hooks (4.5-6.5mm)',
                    'Weaving loom (16-36 inches)',
                    'Weaving shuttle and needle',
                    'Stitch markers, row counters',
                    'Yarn needles for finishing'
                ], { bulletIndent: 10 });
                doc.moveDown();
            }

            // Tips section
            doc.fontSize(14).font('Helvetica-Bold').text('Pro Tips');
            doc.fontSize(11).font('Helvetica');
            doc.list([
                'Swatch first to check gauge',
                'Use stitch markers to track increases/decreases',
                'Block finished pieces for best results',
                'Keep yarn tension consistent',
                'Don\'t skip the pattern reading - it saves frustration!'
            ], { bulletIndent: 10 });

            doc.moveDown(2);
            doc.fontSize(10).text(
                'Questions? Email: abstractemporiumart@outlook.com',
                { align: 'center', color: '#666' }
            );

            doc.end();

        } catch (error) {
            reject(error);
        }
    });
}

/**
 * Send email with pattern attachments
 */
async function sendPatternEmail(
    userEmail,
    userName,
    tier,
    patternFiles,
    isResend = false
) {
    try {
        // Build email content
        const subject = isResend 
            ? `Your Abstract Emporium Art Patterns (Resent)`
            : `Your Abstract Emporium Art Patterns - Ready to Create!`;

        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; }
        .header h1 { margin: 0; }
        .content { padding: 20px 0; }
        .tier-info { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .file-list { margin: 20px 0; }
        .file-item { background: #e8f4f8; padding: 10px; margin: 10px 0; border-radius: 4px; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✨ Your Patterns Are Ready!</h1>
        </div>
        
        <div class="content">
            <p>Hello ${userName}!</p>
            
            <p>Thank you for your purchase! Your Abstract Emporium Art patterns are attached and ready to use.</p>
            
            <div class="tier-info">
                <h3>${getTierName(tier)} Tier</h3>
                <p>${getTierDescription(tier)}</p>
            </div>
            
            <h3>📎 Your Files:</h3>
            <div class="file-list">
                ${Object.entries(patternFiles).map(([key, file]) => `
                    <div class="file-item">
                        ✓ ${file.filename}
                    </div>
                `).join('')}
            </div>
            
            <h3>🎨 Getting Started:</h3>
            <ol>
                <li>Review the materials guide to gather supplies</li>
                <li>Print patterns at 100% scale (no auto-fit)</li>
                <li>Watch the difficulty rating for pattern complexity</li>
                <li>Share your finished creations with us!</li>
            </ol>
            
            <h3>Need Help?</h3>
            <p>Email us at abstractemporiumart@outlook.com with any questions or if you have trouble accessing your files.</p>
            
            <p><strong>Happy Creating!</strong><br>
            The Abstract Emporium Art Team</p>
        </div>
        
        <div class="footer">
            <p>You received this email because you purchased patterns from Abstract Emporium Art.</p>
            <p>Order ID: ${patternFiles.guide.filename.split('-')[2]}</p>
        </div>
    </div>
</body>
</html>
        `;

        // Prepare attachments
        const attachments = Object.values(patternFiles).map(file => ({
            filename: file.filename,
            content: file.content,
            contentType: file.mimetype
        }));

        // Send email
        const mailOptions = {
            from: 'noreply@abstractemporiumart.com',
            to: userEmail,
            subject: subject,
            html: htmlContent,
            attachments: attachments
        };

        const result = await transporter.sendMail(mailOptions);

        console.log(`Email sent to ${userEmail}:`, result.response);

        return {
            success: true,
            response: result.response,
            messageId: result.messageId
        };

    } catch (error) {
        console.error('Email send error:', error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}

/**
 * Helper: Get tier display name
 */
function getTierName(tier) {
    const names = {
        'free': '📱 Free PNG',
        'professional': '🎨 Professional Bundle',
        'master': '🎓 Master Pack'
    };
    return names[tier] || tier;
}

/**
 * Helper: Get tier description
 */
function getTierDescription(tier) {
    const descriptions = {
        'free': 'Your PNG pattern download is ready!',
        'professional': 'Includes PDF guides, materials recommendations, and difficulty ratings.',
        'master': 'Complete access to all 3 pattern types (Knitting, Crochet, Weaving) plus video tutorials and expert tips.'
    };
    return descriptions[tier] || 'Your patterns are attached.';
}
