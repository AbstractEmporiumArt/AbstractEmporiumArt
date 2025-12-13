/**
 * Email Signup & User Tracking
 * Captures visitor emails for community updates and special deals
 */

class UserTracker {
    constructor() {
        this.subscribers = [];
        this.canvasContributors = [];
        this.patternUsers = [];
        
        this.init();
    }
    
    init() {
        this.loadData();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Canvas email signup
        const canvasForm = document.getElementById('canvasEmailForm');
        if (canvasForm) {
            canvasForm.addEventListener('submit', (e) => this.handleCanvasSignup(e));
        }
        
        // Pattern email signup
        const patternForm = document.getElementById('patternEmailForm');
        if (patternForm) {
            patternForm.addEventListener('submit', (e) => this.handlePatternSignup(e));
        }
    }
    
    handleCanvasSignup(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('canvasUserName');
        const emailInput = document.getElementById('canvasUserEmail');
        
        if (!emailInput.value) {
            this.showMessage('Please enter your email', 'canvasEmailForm', false);
            return;
        }
        
        const email = emailInput.value.trim();
        const name = nameInput?.value?.trim() || 'Anonymous Creator';
        
        const subscriber = {
            email: email,
            name: name,
            source: 'community-canvas',
            signupDate: new Date().toISOString(),
            id: this.generateId()
        };
        
        // Add to subscribers list
        if (!this.subscribers.find(s => s.email === email)) {
            this.subscribers.push(subscriber);
            this.canvasContributors.push(subscriber);
            this.saveData();
            
            // Clear form
            emailInput.value = '';
            if (nameInput) nameInput.value = '';
            
            // Show success message
            this.showMessage(
                `✓ Welcome to the community, ${name}! Check your email for exclusive deals.`,
                'canvasEmailForm',
                true
            );
            
            // Log for backend integration
            console.log('Canvas signup:', subscriber);
            
            // ========================================
            // SEND TO FORMSPREE FOR REAL EMAIL
            // ========================================
            this.sendToFormspree(subscriber, 'Community Canvas');
        } else {
            this.showMessage(
                '✓ You\'re already subscribed! Check your email for exclusive deals.',
                'canvasEmailForm',
                true
            );
        }
    }
    
    handlePatternSignup(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('patternUserName');
        const emailInput = document.getElementById('patternUserEmail');
        
        if (!emailInput.value) {
            this.showMessage('Please enter your email', 'patternEmailForm', false);
            return;
        }
        
        const email = emailInput.value.trim();
        const name = nameInput?.value?.trim() || 'Pattern Enthusiast';
        
        const subscriber = {
            email: email,
            name: name,
            source: 'pattern-generator',
            signupDate: new Date().toISOString(),
            id: this.generateId()
        };
        
        // Add to subscribers list
        if (!this.subscribers.find(s => s.email === email)) {
            this.subscribers.push(subscriber);
            this.patternUsers.push(subscriber);
            this.saveData();
            
            // Clear form
            emailInput.value = '';
            if (nameInput) nameInput.value = '';
            
            // Show success message
            this.showMessage(
                `✓ Welcome, ${name}! Get 10% off your first pattern purchase. Check your email!`,
                'patternEmailForm',
                true
            );
            
            // Log for backend integration
            console.log('Pattern signup:', subscriber);
            
            // ========================================
            // SEND TO FORMSPREE FOR REAL EMAIL
            // ========================================
            this.sendToFormspree(subscriber, 'Pattern Generator');
        } else {
            this.showMessage(
                '✓ You\'re already subscribed! Your 10% discount code is in your email.',
                'patternEmailForm',
                true
            );
        }
    }
    
    showMessage(message, formId, isSuccess) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        // Create or find message element
        let msgEl = form.querySelector('.signup-message');
        if (!msgEl) {
            msgEl = document.createElement('div');
            msgEl.className = 'signup-message';
            form.parentElement.insertBefore(msgEl, form);
        }
        
        msgEl.className = `signup-message ${isSuccess ? 'success' : 'error'}`;
        msgEl.textContent = message;
        msgEl.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            msgEl.style.display = 'none';
        }, 5000);
    }
    
    trackPatternGeneration(artworkSource, complexity, patternType) {
        const event = {
            type: 'pattern-generated',
            source: artworkSource,
            complexity: complexity,
            patternType: patternType,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        // Save locally
        let events = JSON.parse(localStorage.getItem('pattern_events') || '[]');
        events.push(event);
        localStorage.setItem('pattern_events', JSON.stringify(events));
        
        // Log to console
        console.log('Pattern event tracked:', event);
        
        // Send to backend if needed (uncomment when ready)
        // this.sendToBackend('/api/pattern-event', event);
    }
    
    trackCanvasContribution(toolType, colorUsed) {
        const event = {
            type: 'canvas-contribution',
            tool: toolType,
            color: colorUsed,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };
        
        // Save locally
        let events = JSON.parse(localStorage.getItem('canvas_events') || '[]');
        events.push(event);
        localStorage.setItem('canvas_events', JSON.stringify(events));
        
        // Log to console
        console.log('Canvas event tracked:', event);
        
        // Send to backend if needed (uncomment when ready)
        // this.sendToBackend('/api/canvas-event', event);
    }
    
    getSubscriberStats() {
        return {
            totalSubscribers: this.subscribers.length,
            canvasSubscribers: this.canvasContributors.length,
            patternSubscribers: this.patternUsers.length,
            recentSignups: this.subscribers.slice(-5).reverse(),
            subscriptionSources: {
                canvas: this.canvasContributors.length,
                patterns: this.patternUsers.length
            }
        };
    }
    
    generateId() {
        return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // ==========================================
    // REAL EMAIL DELIVERY VIA FORMSPREE
    // ==========================================
    // Connected to abstractemporiumart@outlook.com
    sendToFormspree(subscriber, source) {
        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvgelyje';
        
        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: subscriber.email,
                name: subscriber.name,
                source: source,
                signup_date: subscriber.signupDate,
                _subject: `🎨 New Subscriber from ${source} - Abstract Emporium!`
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('📧 Subscriber notification sent to Formspree!');
            } else {
                console.log('📧 Formspree pending setup - subscriber stored locally');
            }
        })
        .catch(error => {
            console.log('📧 Subscriber stored locally (Formspree not configured)');
        });
    }

    saveData() {
        try {
            localStorage.setItem('subscribers_data', JSON.stringify(this.subscribers));
            localStorage.setItem('canvas_contributors', JSON.stringify(this.canvasContributors));
            localStorage.setItem('pattern_users', JSON.stringify(this.patternUsers));
        } catch (e) {
            console.error('Failed to save subscriber data:', e);
        }
    }
    
    loadData() {
        try {
            this.subscribers = JSON.parse(localStorage.getItem('subscribers_data') || '[]');
            this.canvasContributors = JSON.parse(localStorage.getItem('canvas_contributors') || '[]');
            this.patternUsers = JSON.parse(localStorage.getItem('pattern_users') || '[]');
        } catch (e) {
            console.error('Failed to load subscriber data:', e);
            this.subscribers = [];
            this.canvasContributors = [];
            this.patternUsers = [];
        }
    }
    
    exportSubscriberData() {
        // For admin use - export all subscriber data as JSON
        const data = {
            exportDate: new Date().toISOString(),
            totalSubscribers: this.subscribers.length,
            subscribers: this.subscribers,
            stats: this.getSubscriberStats()
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `subscribers_${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
    
    // Backend integration template (uncomment and configure when ready)
    /*
    sendToBackend(endpoint, data) {
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Backend response:', data);
        })
        .catch(error => {
            console.error('Backend error:', error);
        });
    }
    */
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.userTracker = new UserTracker();
    
    // Log current stats for testing
    console.log('Subscriber stats:', window.userTracker.getSubscriberStats());
});
