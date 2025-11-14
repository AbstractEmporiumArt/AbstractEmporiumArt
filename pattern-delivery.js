/**
 * Pattern Delivery System
 * Handles pattern generation, purchase tracking, and email delivery
 * Integrates with PayPal IPN (Instant Payment Notification) and email service
 */

class PatternDeliverySystem {
    constructor() {
        this.apiEndpoint = 'https://abstract-emporium-art.vercel.app/api/process-pattern-order';
        this.generatedPatterns = null;
        this.currentPatternData = null;
        this.init();
    }

    init() {
        this.setupPaymentInterception();
        this.setupPatternGeneration();
    }

    /**
     * Intercept pattern generation and store data for delivery
     */
    setupPatternGeneration() {
        // Override pattern generator's display to capture pattern data
        const originalGenerator = window.ProceduralPatternGenerator;
        if (originalGenerator) {
            const patternDisplaySection = document.getElementById('patternDisplay');
            if (patternDisplaySection) {
                patternDisplaySection.addEventListener('DOMNodeInserted', () => {
                    this.captureGeneratedPatterns();
                });
            }
        }
    }

    /**
     * Capture generated pattern data when displayed
     */
    captureGeneratedPatterns() {
        const canvasElements = document.querySelectorAll('#patternDisplay canvas');
        if (canvasElements.length > 0) {
            this.generatedPatterns = {
                knitting: canvasElements[0]?.toDataURL('image/png'),
                crochet: canvasElements[1]?.toDataURL('image/png'),
                weaving: canvasElements[2]?.toDataURL('image/png'),
                timestamp: new Date().toISOString(),
                userIP: this.getUserIP()
            };
            
            // Store in sessionStorage for purchase reference
            sessionStorage.setItem('currentPatterns', JSON.stringify({
                knitting: this.generatedPatterns.knitting ? 'stored' : null,
                crochet: this.generatedPatterns.crochet ? 'stored' : null,
                weaving: this.generatedPatterns.weaving ? 'stored' : null,
                timestamp: this.generatedPatterns.timestamp
            }));
        }
    }

    /**
     * Setup payment interception for pattern delivery
     */
    setupPaymentInterception() {
        const pricingCards = document.querySelectorAll('.pricing-card form');
        pricingCards.forEach(form => {
            // Store pattern reference in hidden field
            const itemNameInput = form.querySelector('input[name="item_name"]');
            if (itemNameInput && itemNameInput.value.includes('Pattern')) {
                // Add custom field for return URL with pattern data
                const returnUrl = document.createElement('input');
                returnUrl.type = 'hidden';
                returnUrl.name = 'return';
                returnUrl.value = `${window.location.origin}/?delivery=pending&timestamp=${Date.now()}`;
                form.appendChild(returnUrl);

                // Add cancel return URL
                const cancelUrl = document.createElement('input');
                cancelUrl.type = 'hidden';
                cancelUrl.name = 'cancel_return';
                cancelUrl.value = `${window.location.origin}/#pattern-generator`;
                form.appendChild(cancelUrl);

                // Add notify URL for IPN
                const notifyUrl = document.createElement('input');
                notifyUrl.type = 'hidden';
                notifyUrl.name = 'notify_url';
                notifyUrl.value = `${window.location.origin}/api/paypal-ipn`;
                form.appendChild(notifyUrl);

                // Intercept form submission
                form.addEventListener('submit', (e) => {
                    this.handlePaymentInitiation(e, form);
                });
            }
        });
    }

    /**
     * Handle payment initiation - store pattern data before redirect
     */
    handlePaymentInitiation(event, form) {
        const itemName = form.querySelector('input[name="item_name"]').value;
        const amount = form.querySelector('input[name="amount"]').value;

        // Determine tier
        let tier = 'free';
        if (amount === '3.99') tier = 'professional';
        if (amount === '9.99') tier = 'master';

        // Store order data
        const orderData = {
            tier: tier,
            amount: amount,
            itemName: itemName,
            userEmail: document.getElementById('patternUserEmail')?.value || '',
            userName: document.getElementById('patternUserName')?.value || 'Artist',
            patterns: this.generatedPatterns,
            timestamp: new Date().toISOString(),
            orderId: this.generateOrderId()
        };

        // Store in localStorage with expiration
        const orders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
        orders.push(orderData);
        localStorage.setItem('pendingOrders', JSON.stringify(orders));

        // Add order ID to form for tracking
        const orderIdInput = document.createElement('input');
        orderIdInput.type = 'hidden';
        orderIdInput.name = 'custom';
        orderIdInput.value = orderData.orderId;
        form.appendChild(orderIdInput);

        console.log('Pattern order stored:', orderData.orderId);
    }

    /**
     * Process payment confirmation (called by backend via webhook)
     */
    async processPaymentConfirmation(orderId, paypalData) {
        const orders = JSON.parse(localStorage.getItem('pendingOrders') || '[]');
        const orderIndex = orders.findIndex(o => o.orderId === orderId);

        if (orderIndex === -1) {
            console.error('Order not found:', orderId);
            return { success: false, error: 'Order not found' };
        }

        const order = orders[orderIndex];
        order.paypalStatus = 'completed';
        order.paypalTransactionId = paypalData.txn_id;
        order.paypalEmail = paypalData.payer_email;
        order.completedAt = new Date().toISOString();

        // Send to backend for email delivery
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'deliver-patterns',
                    order: order,
                    paypalData: paypalData
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                order.emailSent = true;
                order.emailDeliveredAt = new Date().toISOString();
                orders[orderIndex] = order;
                localStorage.setItem('pendingOrders', JSON.stringify(orders));

                return { 
                    success: true, 
                    message: 'Patterns sent to email successfully',
                    orderId: orderId 
                };
            } else {
                throw new Error(result.error || 'Email delivery failed');
            }
        } catch (error) {
            console.error('Pattern delivery error:', error);
            order.deliveryError = error.message;
            orders[orderIndex] = order;
            localStorage.setItem('pendingOrders', JSON.stringify(orders));

            return { 
                success: false, 
                error: error.message,
                message: 'Email delivery failed - patterns stored, will retry'
            };
        }
    }

    /**
     * Generate unique order ID
     */
    generateOrderId() {
        return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get user's IP (for fraud detection)
     */
    getUserIP() {
        return new Promise((resolve) => {
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => resolve(data.ip))
                .catch(() => resolve('unknown'));
        });
    }

    /**
     * Export pending orders
     */
    getPendingOrders() {
        return JSON.parse(localStorage.getItem('pendingOrders') || '[]');
    }

    /**
     * Get order status
     */
    getOrderStatus(orderId) {
        const orders = this.getPendingOrders();
        return orders.find(o => o.orderId === orderId) || null;
    }

    /**
     * Resend patterns to email (manual retry)
     */
    async resendPatterns(orderId, userEmail) {
        const orders = this.getPendingOrders();
        const order = orders.find(o => o.orderId === orderId);

        if (!order) {
            return { success: false, error: 'Order not found' };
        }

        order.userEmail = userEmail;

        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'resend-patterns',
                    order: order
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                order.emailResentAt = new Date().toISOString();
                const orderIndex = orders.findIndex(o => o.orderId === orderId);
                orders[orderIndex] = order;
                localStorage.setItem('pendingOrders', JSON.stringify(orders));

                return { success: true, message: 'Patterns resent successfully' };
            } else {
                throw new Error(result.error || 'Resend failed');
            }
        } catch (error) {
            console.error('Resend error:', error);
            return { success: false, error: error.message };
        }
    }
}

// Initialize pattern delivery system
window.patternDelivery = new PatternDeliverySystem();
