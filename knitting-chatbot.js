/**
 * Knitting Sales & Marketing AI Chatbot
 * Functions as: Knitting guide, sales assistant, onboarding coach, marketing assistant
 * Beginner-friendly, encouraging tone
 */

class KnittingChatbot {
    constructor() {
        this.conversationHistory = [];
        this.userProfile = {
            skillLevel: null,
            interests: [],
            visitCount: 0,
            engagementLevel: 'low'
        };
        this.isMinimized = true;
        
        this.init();
    }
    
    init() {
        this.loadUserProfile();
        this.setupEventListeners();
        this.sendWelcomeMessage();
    }
    
    loadUserProfile() {
        const saved = localStorage.getItem('knittingUserProfile');
        if (saved) {
            this.userProfile = JSON.parse(saved);
            this.userProfile.visitCount++;
        } else {
            this.userProfile.visitCount = 1;
        }
        this.saveUserProfile();
    }
    
    saveUserProfile() {
        localStorage.setItem('knittingUserProfile', JSON.stringify(this.userProfile));
    }
    
    setupEventListeners() {
        // Auto-open for first-time visitors after 5 seconds
        if (this.userProfile.visitCount === 1) {
            setTimeout(() => {
                this.openChatbot();
            }, 5000);
        }
        
        // Auto-open if user is on page for 30 seconds without interaction
        setTimeout(() => {
            if (this.isMinimized && this.userProfile.engagementLevel === 'low') {
                this.openChatbot();
            }
        }, 30000);
    }
    
    openChatbot() {
        const widget = document.getElementById('knitting-chatbot-widget');
        if (widget) {
            widget.classList.remove('minimized');
            this.isMinimized = false;
        }
    }
    
    sendWelcomeMessage() {
        setTimeout(() => {
            const message = this.getWelcomeMessage();
            this.addBotMessage(message);
        }, 1000);
    }
    
    getWelcomeMessage() {
        const visitCount = this.userProfile.visitCount;
        
        if (visitCount === 1) {
            return {
                text: "Hi! 🧶 Welcome to your knitting journey! Are you brand new to knitting or just starting out?",
                buttons: [
                    { text: "Never knit before", action: "beginner-absolute" },
                    { text: "Just starting", action: "beginner" },
                    { text: "I know the basics", action: "intermediate" }
                ]
            };
        } else if (visitCount === 2) {
            return {
                text: "Welcome back! 👋 Did you check out the free guide I sent you?",
                buttons: [
                    { text: "Yes, loved it!", action: "free-guide-positive" },
                    { text: "Not yet", action: "free-guide-remind" },
                    { text: "I didn't get it", action: "free-guide-resend" }
                ]
            };
        } else {
            return {
                text: "Hey there! 🧶 Ready to start a new project?",
                buttons: [
                    { text: "Show me patterns", action: "show-patterns" },
                    { text: "What's on sale?", action: "show-bundles" },
                    { text: "I need help", action: "help" }
                ]
            };
        }
    }
    
    addBotMessage(message) {
        const messagesContainer = document.getElementById('knitting-chatbot-messages');
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'chatbot-message bot-message';
        
        const textElement = document.createElement('p');
        textElement.textContent = message.text;
        messageElement.appendChild(textElement);
        
        if (message.buttons && message.buttons.length > 0) {
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'chatbot-buttons';
            
            message.buttons.forEach(button => {
                const btn = document.createElement('button');
                btn.className = 'chatbot-option-btn';
                btn.textContent = button.text;
                btn.onclick = () => this.handleAction(button.action, button.text);
                buttonsContainer.appendChild(btn);
            });
            
            messageElement.appendChild(buttonsContainer);
        }
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.conversationHistory.push({ sender: 'bot', message: message.text });
    }
    
    addUserMessage(text) {
        const messagesContainer = document.getElementById('knitting-chatbot-messages');
        if (!messagesContainer) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = 'chatbot-message user-message';
        
        const textElement = document.createElement('p');
        textElement.textContent = text;
        messageElement.appendChild(textElement);
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.conversationHistory.push({ sender: 'user', message: text });
    }
    
    handleAction(action, userText) {
        if (userText) {
            this.addUserMessage(userText);
        }
        
        let response;
        
        switch(action) {
            case 'beginner-absolute':
                this.userProfile.skillLevel = 'absolute-beginner';
                response = {
                    text: "Perfect! You're in the right place. 🌱 Most beginners start with our **Beginner Starter Pack** — it has everything you need for your first week, including video tutorials and zero-stress patterns. Want me to send you a free preview first?",
                    buttons: [
                        { text: "Yes, send free preview!", action: "send-free-guide" },
                        { text: "Show me the Starter Pack", action: "show-starter-bundle" },
                        { text: "What should I make first?", action: "first-project" }
                    ]
                };
                break;
                
            case 'beginner':
                this.userProfile.skillLevel = 'beginner';
                response = {
                    text: "Great! You already have a head start. 🧶 For someone who knows the basics, I'd recommend the **Beginner Pattern Bundle** — 3 simple patterns to build your confidence. Or you can jump to the **Starter Pack** for more variety. Which sounds better?",
                    buttons: [
                        { text: "Pattern Bundle ($8.99)", action: "show-beginner-bundle" },
                        { text: "Starter Pack ($12.99)", action: "show-starter-bundle" },
                        { text: "Just browsing", action: "browse" }
                    ]
                };
                break;
                
            case 'intermediate':
                this.userProfile.skillLevel = 'intermediate';
                response = {
                    text: "Awesome! 🔥 Since you know the basics, you might love the **Master Learn-to-Knit Bundle** — it has beginner through intermediate patterns, advanced techniques, and seasonal projects. It's the best value if you want everything. Interested?",
                    buttons: [
                        { text: "Yes, show me!", action: "show-master-bundle" },
                        { text: "What's included?", action: "master-details" },
                        { text: "Maybe later", action: "maybe-later" }
                    ]
                };
                break;
                
            case 'send-free-guide':
                response = {
                    text: "Perfect! I'll send you a simple scarf pattern, materials guide, and beginner tips. Just pop your email below and it's yours! 📧",
                    buttons: [
                        { text: "Open signup form", action: "scroll-to-email" }
                    ]
                };
                this.scrollToEmailForm();
                break;
                
            case 'show-starter-bundle':
                openBundleModal('starter');
                response = {
                    text: "Opening the Starter Pack details for you! 🎁 This one is super popular with beginners — has everything you need without the overwhelm.",
                    buttons: []
                };
                break;
                
            case 'show-beginner-bundle':
                openBundleModal('beginner');
                response = {
                    text: "Here's the Beginner Bundle! Perfect for your first few projects. 🧶",
                    buttons: []
                };
                break;
                
            case 'show-master-bundle':
                openBundleModal('master');
                response = {
                    text: "Check out the Master Bundle! This is the complete package — beginners LOVE this. 🌟",
                    buttons: []
                };
                break;
                
            case 'first-project':
                response = {
                    text: "Great question! 🎯 Most beginners start with a **scarf** — it's simple, forgiving, and you can see progress fast. Our Beginner Bundle includes an easy scarf pattern. Want to see it?",
                    buttons: [
                        { text: "Yes, show me!", action: "show-beginner-bundle" },
                        { text: "What else can I make?", action: "other-projects" }
                    ]
                };
                break;
                
            case 'other-projects':
                response = {
                    text: "You can make **headbands**, **slippers**, or **dishcloths** — all great for beginners! The Starter Pack has all of these plus video tutorials. Want to check it out?",
                    buttons: [
                        { text: "Yes, show me", action: "show-starter-bundle" },
                        { text: "Send me free guide first", action: "send-free-guide" }
                    ]
                };
                break;
                
            case 'help':
                response = {
                    text: "I'm here for you! What do you need help with?",
                    buttons: [
                        { text: "Choosing a pattern", action: "first-project" },
                        { text: "Understanding bundles", action: "explain-bundles" },
                        { text: "Technical knitting help", action: "tech-help" }
                    ]
                };
                break;
                
            case 'explain-bundles':
                response = {
                    text: "Great question! 📦 We have 3 bundles:\n\n**Beginner Bundle** ($8.99) - 3 patterns for your first projects\n**Starter Pack** ($12.99) - 5 patterns + videos (MOST POPULAR)\n**Master Bundle** ($29.99) - Everything! 10+ patterns, all skill levels\n\nWhich one sounds right for you?",
                    buttons: [
                        { text: "Starter Pack", action: "show-starter-bundle" },
                        { text: "Master Bundle", action: "show-master-bundle" },
                        { text: "Just free guide for now", action: "send-free-guide" }
                    ]
                };
                break;
                
            case 'browse':
                response = {
                    text: "No problem! Take your time. If you want a free beginner guide to get started, just let me know! 😊",
                    buttons: [
                        { text: "Send free guide", action: "send-free-guide" }
                    ]
                };
                break;
                
            case 'maybe-later':
                response = {
                    text: "Totally fine! Want me to send you a free guide so you can try out a pattern first? No strings attached. 🎁",
                    buttons: [
                        { text: "Sure, send it!", action: "send-free-guide" },
                        { text: "I'm just browsing", action: "browse" }
                    ]
                };
                break;
                
            default:
                response = {
                    text: "I'm here to help! What would you like to know?",
                    buttons: [
                        { text: "I'm brand new", action: "beginner-absolute" },
                        { text: "Show me bundles", action: "explain-bundles" },
                        { text: "Free guide please", action: "send-free-guide" }
                    ]
                };
        }
        
        this.saveUserProfile();
        
        setTimeout(() => {
            this.addBotMessage(response);
        }, 500);
    }
    
    handleUserMessage(text) {
        this.addUserMessage(text);
        
        const lowerText = text.toLowerCase();
        let response;
        
        // Keyword matching for common questions
        if (lowerText.includes('never knit') || lowerText.includes('beginner') || lowerText.includes('start')) {
            response = this.handleAction('beginner-absolute');
        } else if (lowerText.includes('free') || lowerText.includes('guide')) {
            response = this.handleAction('send-free-guide');
        } else if (lowerText.includes('bundle') || lowerText.includes('price') || lowerText.includes('cost')) {
            response = this.handleAction('explain-bundles');
        } else if (lowerText.includes('scarf') || lowerText.includes('slipper') || lowerText.includes('what')) {
            response = this.handleAction('first-project');
        } else {
            response = {
                text: "Great question! Here's what I can help with:",
                buttons: [
                    { text: "I'm a beginner", action: "beginner-absolute" },
                    { text: "Show me bundles", action: "explain-bundles" },
                    { text: "Free guide", action: "send-free-guide" },
                    { text: "Pattern recommendations", action: "first-project" }
                ]
            };
            this.addBotMessage(response);
        }
    }
    
    scrollToEmailForm() {
        const emailForm = document.getElementById('patternEmailSignup');
        if (emailForm) {
            emailForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Global functions for HTML event handlers
function toggleKnittingChatbot() {
    const widget = document.getElementById('knitting-chatbot-widget');
    if (widget) {
        widget.classList.toggle('minimized');
        window.knittingChatbot.isMinimized = !window.knittingChatbot.isMinimized;
    }
}

function sendKnittingChatMessage() {
    const input = document.getElementById('knitting-chatbot-input');
    if (input && input.value.trim()) {
        window.knittingChatbot.handleUserMessage(input.value.trim());
        input.value = '';
    }
}

function handleKnittingChatInput(event) {
    if (event.key === 'Enter') {
        sendKnittingChatMessage();
    }
}

function quickAction(action) {
    const actionMap = {
        'beginner': 'beginner-absolute',
        'recommend': 'first-project',
        'bundles': 'explain-bundles'
    };
    window.knittingChatbot.handleAction(actionMap[action] || action);
}

// Skill level selector
function selectSkillLevel(level) {
    // Update UI
    document.querySelectorAll('.skill-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.skill-btn').classList.add('active');
    
    // Show recommendation
    const recommendations = {
        'absolute-beginner': {
            title: "Perfect! We recommend: Beginner Starter Pack",
            description: "You'll get 5 super-simple patterns, video tutorials, and our confidence-building guide. Everything you need to start without stress!",
            cta: "View Starter Pack",
            action: "starter"
        },
        'beginner': {
            title: "Great! We recommend: Beginner Pattern Bundle",
            description: "3 tested patterns perfect for building your skills. Simple instructions, no advanced techniques!",
            cta: "View Pattern Bundle",
            action: "beginner"
        },
        'intermediate': {
            title: "Awesome! We recommend: Master Learn-to-Knit Bundle",
            description: "Get everything — beginner through intermediate patterns, advanced techniques, seasonal projects. Best value!",
            cta: "View Master Bundle",
            action: "master"
        }
    };
    
    const rec = recommendations[level];
    const recEl = document.getElementById('skillRecommendation');
    if (recEl && rec) {
        recEl.innerHTML = `
            <div class="skill-rec-card">
                <h3>${rec.title}</h3>
                <p>${rec.description}</p>
                <button class="rec-cta-btn" onclick="openBundleModal('${rec.action}')">${rec.cta}</button>
            </div>
        `;
        recEl.style.display = 'block';
    }
    
    // Update chatbot
    if (window.knittingChatbot) {
        window.knittingChatbot.userProfile.skillLevel = level;
        window.knittingChatbot.saveUserProfile();
    }
}

// Bundle modals
function openBundleModal(bundleType) {
    const modal = document.getElementById('bundleModal');
    const body = document.getElementById('bundleModalBody');
    
    const bundles = {
        'single': {
            title: 'Professional Pattern PDF',
            price: '$3.99',
            description: 'Get your custom pattern as a professional PDF package',
            features: [
                'Step-by-step written instructions',
                'Materials shopping list with links',
                'Beginner tips & troubleshooting',
                'Stitch abbreviations cheat sheet',
                'Video tutorial link',
                'Lifetime access & updates'
            ],
            cta: 'Get Pattern PDF',
            link: 'https://example.com/checkout/single'
        },
        'beginner': {
            title: 'Beginner Pattern Bundle',
            price: '$8.99',
            description: 'Perfect for your first few knitting projects',
            features: [
                '3 beginner patterns (scarf, slippers, headband)',
                'Full stitch cheat sheet',
                'Yarn & needle guide',
                'Confidence-building tips',
                'Video tutorial links',
                'Email support'
            ],
            cta: 'Get Beginner Bundle',
            link: 'https://example.com/checkout/beginner'
        },
        'starter': {
            title: 'Beginner Starter Pack',
            price: '$12.99',
            original: '$24',
            badge: 'MOST POPULAR',
            description: 'Everything you need for your first week of knitting',
            features: [
                '5 total patterns (including 2 bonus no-purl patterns)',
                'Step-by-step video tutorials',
                'Printable project planner',
                '"First Week Knitting" daily guide',
                'Yarn substitution chart',
                'Lifetime pattern updates',
                'Priority email support'
            ],
            testimonial: '"This pack saved me SO much confusion and time!" - Sarah M.',
            cta: 'Get Starter Pack - Save 46%',
            link: 'https://example.com/checkout/starter'
        },
        'master': {
            title: 'Master Learn-to-Knit Bundle',
            price: '$29.99',
            original: '$60',
            badge: 'BEST VALUE',
            description: 'Complete beginner → intermediate knitting system',
            features: [
                '10+ patterns (beginner to intermediate)',
                'Full video tutorial series',
                'Complete stitch library',
                'Seasonal bonus patterns',
                'Advanced techniques guide',
                'Project tracker & planner',
                'Yarn substitution database',
                'Priority email support',
                'Exclusive community access',
                'Lifetime updates'
            ],
            testimonial: '"I went from never knitting to making gifts for everyone!" - Jessica L.',
            cta: 'Get Master Bundle - Save 50%',
            link: 'https://example.com/checkout/master'
        }
    };
    
    const bundle = bundles[bundleType];
    if (bundle) {
        body.innerHTML = `
            <div class="bundle-modal-header">
                ${bundle.badge ? `<span class="modal-badge">${bundle.badge}</span>` : ''}
                <h2>${bundle.title}</h2>
                <p class="modal-price">${bundle.price} ${bundle.original ? `<span class="modal-original">${bundle.original}</span>` : ''}</p>
                <p class="modal-description">${bundle.description}</p>
            </div>
            <div class="bundle-modal-features">
                <h3>What's Included:</h3>
                <ul>
                    ${bundle.features.map(f => `<li>✓ ${f}</li>`).join('')}
                </ul>
            </div>
            ${bundle.testimonial ? `<p class="modal-testimonial">${bundle.testimonial}</p>` : ''}
            <div class="bundle-modal-actions">
                <a href="${bundle.link}" class="modal-cta-btn">${bundle.cta}</a>
                <p class="modal-guarantee">💝 100% Happiness Guarantee - Full refund if not satisfied</p>
            </div>
        `;
        modal.style.display = 'flex';
    }
}

function closeBundleModal() {
    document.getElementById('bundleModal').style.display = 'none';
}

function openFreeGuideModal() {
    const modal = document.getElementById('freeGuideModal');
    modal.style.display = 'flex';
    
    // Handle form submission
    const form = document.getElementById('freeGuideForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('freeGuideName').value;
        const email = document.getElementById('freeGuideEmail').value;
        
        // Send to email service (implement your email API)
        sendFreeGuide(name, email);
        
        alert(`📧 Check your email! We just sent your free guide to ${email}`);
        closeFreeGuideModal();
    };
}

function closeFreeGuideModal() {
    document.getElementById('freeGuideModal').style.display = 'none';
}

function sendFreeGuide(name, email) {
    // Implement your email API integration here
    console.log('Sending free guide to:', name, email);
    
    // Example: Send to your backend
    fetch('/api/send-free-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
    });
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.knittingChatbot = new KnittingChatbot();
});
