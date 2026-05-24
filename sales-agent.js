/**
 * 🤖 ABSTRACT EMPORIUM - INTERNAL AUTOMATED SALES AGENT
 * Live AI-powered sales assistant that converts visitors into buyers
 * 
 * Features:
 * - Behavior tracking & engagement scoring
 * - Proactive sales messaging with smart timing
 * - Personalized product recommendations
 * - Urgency creation & scarcity messaging
 * - Objection handling
 * - Exit-intent capture
 * - Multi-platform purchase guidance
 * 
 * Version: 1.0.0
 * Last Updated: December 13, 2025
 */

class SalesAgent {
    constructor() {
        this.config = {
            // Timing settings (in milliseconds)
            firstEngageDelay: 8000,         // 8 seconds after page load
            browsingNudgeDelay: 30000,      // 30 seconds browsing nudge
            idleTimeout: 45000,             // 45 seconds idle = trigger engagement
            exitIntentDelay: 500,           // Exit intent detection delay
            scrollDepthTrigger: 50,         // % scroll to trigger engagement
            
            // Sales urgency settings
            limitedTimeOfferDuration: 24,   // hours
            lowStockThreshold: 3,           // "Only X left!"
            
            // Appearance
            agentName: "Art Advisor",
            agentEmoji: "🎨",
            brandColor: "#ff6b6b",
            accentColor: "#4ecdc4"
        };

        this.state = {
            sessionId: this.generateSessionId(),
            pageViews: 0,
            itemsViewed: [],
            collectionsViewed: [],
            timeOnSite: 0,
            scrollDepth: 0,
            engagementScore: 0,
            hasInteracted: false,
            lastInteraction: Date.now(),
            messagesShown: [],
            currentPage: window.location.pathname,
            referrer: document.referrer,
            isReturningVisitor: false,
            cartItems: [],
            savedItems: [],
            exitIntentTriggered: false,
            purchaseIntent: 'browsing' // browsing, interested, considering, ready
        };

        this.salesMessages = this.initializeSalesMessages();
        this.productRecommendations = this.initializeRecommendations();
        this.objectionHandlers = this.initializeObjectionHandlers();
        
        this.init();
    }

    // ==========================================
    // INITIALIZATION
    // ==========================================

    init() {
        this.loadPersistentData();
        this.setupEventListeners();
        this.startTimeTracking();
        this.scheduleProactiveEngagement();
        this.injectSalesUI();
        this.checkReturningVisitor();
        
        console.log('🎨 Sales Agent initialized:', this.state.sessionId);
    }

    loadPersistentData() {
        try {
            const savedState = localStorage.getItem('abstractEmporium_salesAgent');
            if (savedState) {
                const parsed = JSON.parse(savedState);
                this.state.itemsViewed = parsed.itemsViewed || [];
                this.state.collectionsViewed = parsed.collectionsViewed || [];
                this.state.savedItems = parsed.savedItems || [];
                this.state.isReturningVisitor = true;
                this.state.engagementScore = parsed.engagementScore || 0;
            }
        } catch (e) {
            console.log('Fresh visitor session');
        }
    }

    savePersistentData() {
        try {
            const dataToSave = {
                itemsViewed: this.state.itemsViewed.slice(-20),
                collectionsViewed: this.state.collectionsViewed,
                savedItems: this.state.savedItems,
                engagementScore: this.state.engagementScore,
                lastVisit: Date.now()
            };
            localStorage.setItem('abstractEmporium_salesAgent', JSON.stringify(dataToSave));
        } catch (e) {
            console.log('Could not save session data');
        }
    }

    generateSessionId() {
        return 'SA_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // ==========================================
    // EVENT LISTENERS & TRACKING
    // ==========================================

    setupEventListeners() {
        // Page visibility
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
        
        // Scroll tracking
        window.addEventListener('scroll', () => this.trackScroll(), { passive: true });
        
        // Exit intent (mouse leaving viewport)
        document.addEventListener('mouseout', (e) => this.detectExitIntent(e));
        
        // Click tracking
        document.addEventListener('click', (e) => this.trackClick(e));
        
        // Item view tracking
        this.observeItemViews();
        
        // Before unload - save data
        window.addEventListener('beforeunload', () => this.savePersistentData());
        
        // Idle detection
        ['mousemove', 'keydown', 'scroll', 'click'].forEach(event => {
            document.addEventListener(event, () => this.resetIdleTimer(), { passive: true });
        });
    }

    observeItemViews() {
        // Track when gallery items come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const itemId = entry.target.dataset.itemId;
                    const itemTitle = entry.target.dataset.itemTitle;
                    if (itemId && !this.state.itemsViewed.includes(itemId)) {
                        this.state.itemsViewed.push(itemId);
                        this.updateEngagementScore(2);
                        this.checkRecommendationTrigger();
                    }
                }
            });
        }, { threshold: 0.5 });

        // Observe all gallery items
        document.querySelectorAll('.gallery-item, .art-card, [data-item-id]').forEach(item => {
            observer.observe(item);
        });
    }

    trackScroll() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        
        if (scrolled > this.state.scrollDepth) {
            this.state.scrollDepth = scrolled;
            
            // Trigger engagement at scroll milestones
            if (scrolled >= 25 && !this.state.messagesShown.includes('scroll25')) {
                this.updateEngagementScore(5);
            }
            if (scrolled >= 50 && !this.state.messagesShown.includes('scroll50')) {
                this.triggerScrollEngagement(50);
            }
            if (scrolled >= 75 && !this.state.messagesShown.includes('scroll75')) {
                this.updateEngagementScore(10);
            }
        }
    }

    trackClick(e) {
        const target = e.target.closest('a, button, .clickable');
        if (!target) return;

        // Track specific actions
        if (target.classList.contains('view-shop') || target.href?.includes('artpal') || target.href?.includes('fineartamerica')) {
            this.updateEngagementScore(20);
            this.state.purchaseIntent = 'considering';
            this.trackPurchaseClick(target);
        }

        if (target.classList.contains('add-to-cart') || target.classList.contains('save-item')) {
            this.updateEngagementScore(15);
            this.state.purchaseIntent = 'interested';
        }

        if (target.classList.contains('details-btn') || target.href?.includes('item-detail')) {
            this.updateEngagementScore(10);
        }

        this.state.lastInteraction = Date.now();
        this.state.hasInteracted = true;
    }

    trackPurchaseClick(target) {
        const itemInfo = this.extractItemInfo(target);
        console.log('🛒 Purchase intent detected:', itemInfo);
        
        // Show helpful purchase guidance
        setTimeout(() => {
            this.showPurchaseGuidance(itemInfo);
        }, 500);
    }

    extractItemInfo(element) {
        const card = element.closest('.gallery-item, .art-card, [data-item-id]');
        return {
            id: card?.dataset.itemId || 'unknown',
            title: card?.dataset.itemTitle || card?.querySelector('.item-title, h3, h4')?.textContent || 'this piece',
            platform: element.href?.includes('artpal') ? 'ArtPal' : 
                      element.href?.includes('fineartamerica') ? 'Fine Art America' : 
                      element.href?.includes('thehug') ? 'The HUG' : 'our store'
        };
    }

    detectExitIntent(e) {
        if (e.clientY <= 0 && !this.state.exitIntentTriggered && this.state.engagementScore > 10) {
            this.state.exitIntentTriggered = true;
            setTimeout(() => this.triggerExitIntent(), this.config.exitIntentDelay);
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.savePersistentData();
        }
    }

    startTimeTracking() {
        setInterval(() => {
            if (!document.hidden) {
                this.state.timeOnSite += 1;
                
                // Engagement bonuses for time spent
                if (this.state.timeOnSite === 30) this.updateEngagementScore(5);
                if (this.state.timeOnSite === 60) this.updateEngagementScore(10);
                if (this.state.timeOnSite === 120) this.updateEngagementScore(15);
            }
        }, 1000);
    }

    resetIdleTimer() {
        this.state.lastInteraction = Date.now();
    }

    updateEngagementScore(points) {
        this.state.engagementScore += points;
        this.updatePurchaseIntent();
    }

    updatePurchaseIntent() {
        const score = this.state.engagementScore;
        if (score >= 50) this.state.purchaseIntent = 'ready';
        else if (score >= 30) this.state.purchaseIntent = 'considering';
        else if (score >= 15) this.state.purchaseIntent = 'interested';
        else this.state.purchaseIntent = 'browsing';
    }

    checkReturningVisitor() {
        if (this.state.isReturningVisitor) {
            setTimeout(() => {
                this.showReturningVisitorMessage();
            }, 3000);
        }
    }

    // ==========================================
    // PROACTIVE ENGAGEMENT SYSTEM
    // ==========================================

    scheduleProactiveEngagement() {
        // Initial welcome after delay
        setTimeout(() => {
            if (!this.state.hasInteracted) {
                this.triggerFirstEngagement();
            }
        }, this.config.firstEngageDelay);

        // Browsing nudge
        setTimeout(() => {
            if (this.state.purchaseIntent === 'browsing' && !this.state.messagesShown.includes('browsingNudge')) {
                this.triggerBrowsingNudge();
            }
        }, this.config.browsingNudgeDelay);

        // Idle check
        setInterval(() => {
            const idleTime = Date.now() - this.state.lastInteraction;
            if (idleTime > this.config.idleTimeout && !this.state.messagesShown.includes('idle')) {
                this.triggerIdleEngagement();
            }
        }, 10000);
    }

    triggerFirstEngagement() {
        if (this.state.messagesShown.includes('firstEngage')) return;
        
        const messages = this.salesMessages.firstEngage;
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        this.showSalesMessage(message, 'firstEngage');
        this.state.messagesShown.push('firstEngage');
    }

    triggerBrowsingNudge() {
        if (this.state.messagesShown.includes('browsingNudge')) return;

        const nudges = this.salesMessages.browsingNudge;
        const nudge = nudges[Math.floor(Math.random() * nudges.length)];
        
        this.showSalesMessage(nudge, 'browsingNudge');
        this.state.messagesShown.push('browsingNudge');
    }

    triggerScrollEngagement(depth) {
        const key = `scroll${depth}`;
        if (this.state.messagesShown.includes(key)) return;

        const messages = this.salesMessages.scrollEngagement;
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        this.showSalesMessage(message, key);
        this.state.messagesShown.push(key);
    }

    triggerIdleEngagement() {
        if (this.state.messagesShown.includes('idle')) return;

        const messages = this.salesMessages.idleEngagement;
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        this.showSalesMessage(message, 'idle');
        this.state.messagesShown.push('idle');
    }

    triggerExitIntent() {
        if (this.state.messagesShown.includes('exitIntent')) return;

        this.showExitIntentModal();
        this.state.messagesShown.push('exitIntent');
    }

    checkRecommendationTrigger() {
        // After viewing 3+ items, offer personalized recommendations
        if (this.state.itemsViewed.length === 3 && !this.state.messagesShown.includes('recommendation')) {
            setTimeout(() => {
                this.triggerPersonalizedRecommendation();
            }, 2000);
        }
    }

    triggerPersonalizedRecommendation() {
        if (this.state.messagesShown.includes('recommendation')) return;

        const recommendation = this.generatePersonalizedRecommendation();
        this.showSalesMessage(recommendation, 'recommendation');
        this.state.messagesShown.push('recommendation');
    }

    // ==========================================
    // SALES MESSAGES DATABASE
    // ==========================================

    initializeSalesMessages() {
        return {
            firstEngage: [
                {
                    title: "Welcome, Art Lover! 🎨",
                    body: "I noticed you're exploring our collection. Can I help you find the perfect piece? Our curated abstracts range from bold statement pieces to serene meditations.",
                    cta: "Show Me Popular Pieces",
                    ctaAction: () => this.showPopularPieces()
                },
                {
                    title: "Hello! 👋",
                    body: "Looking for something special? Our collectors say Abstract Emporium pieces transform their spaces. What style speaks to you?",
                    cta: "Browse Collections",
                    ctaAction: () => window.location.href = 'gallery.html'
                },
                {
                    title: "Art That Speaks ✨",
                    body: "Every piece here tells a story. Whether you're decorating, collecting, or gifting — I can help you find exactly what resonates.",
                    cta: "Get Recommendations",
                    ctaAction: () => this.showStyleQuiz()
                }
            ],

            browsingNudge: [
                {
                    title: "See Something You Love? 💫",
                    body: "Don't let your favorites slip away. Our most popular pieces move fast — especially during the holiday season.",
                    cta: "Save Your Favorites",
                    ctaAction: () => this.highlightSaveFeature()
                },
                {
                    title: "Collector's Tip 🎯",
                    body: "Many of our pieces are available in multiple formats — canvas, prints, and digital editions. The same art, your preferred medium.",
                    cta: "Explore Formats",
                    ctaAction: () => window.location.href = 'shop.html'
                },
                {
                    title: "Quick Question 🤔",
                    body: "Are you shopping for yourself or looking for a gift? I can tailor recommendations either way!",
                    cta: "For Myself",
                    ctaSecondary: "It's a Gift",
                    ctaAction: () => this.setShoppingMode('self'),
                    ctaSecondaryAction: () => this.setShoppingMode('gift')
                }
            ],

            scrollEngagement: [
                {
                    title: "You Have Great Taste! 🌟",
                    body: "The pieces you're viewing are from our most acclaimed collections. Serious collectors often start with these exact works.",
                    cta: "View Full Collection",
                    ctaAction: () => window.location.href = 'gallery.html'
                },
                {
                    title: "Did You Know? 💡",
                    body: "Each Abstract Emporium piece is available on multiple platforms. Premium canvas at Fine Art America, digital ownership at The HUG, and more at ArtPal.",
                    cta: "Compare Options",
                    ctaAction: () => window.location.href = 'shop.html'
                }
            ],

            idleEngagement: [
                {
                    title: "Still With Us? 👋",
                    body: "Take your time — great art deserves contemplation. When you're ready, I'm here to help with any questions.",
                    cta: "Ask a Question",
                    ctaAction: () => this.openChat()
                },
                {
                    title: "Need Inspiration? ✨",
                    body: "Not sure where to start? Let me show you our bestsellers — the pieces collectors can't stop talking about.",
                    cta: "Show Bestsellers",
                    ctaAction: () => this.showBestsellers()
                }
            ],

            purchaseGuidance: [
                {
                    title: "Excellent Choice! 🎉",
                    body: "You're about to view {title} on {platform}. Pro tip: Check all available sizes and formats to find your perfect fit.",
                    cta: "Continue to Shop",
                    ctaAction: null // Dynamic
                }
            ],

            urgency: [
                {
                    title: "🔥 Collector Alert",
                    body: "This piece has been viewed {views} times this week. When art resonates with this many people, it tends to sell quickly.",
                    cta: "Secure It Now",
                    ctaAction: null
                },
                {
                    title: "⏰ Limited Availability",
                    body: "Some editions are limited. Once they're gone, they're gone. Don't let this one slip away.",
                    cta: "View Details",
                    ctaAction: null
                }
            ],

            exitIntent: {
                title: "Wait! Before You Go... 🎨",
                body: "You've been exploring some incredible pieces. Don't miss out — save your favorites or join our collector's list for exclusive access to new releases and special offers.",
                benefits: [
                    "✨ Early access to new collections",
                    "🎁 Exclusive collector discounts",
                    "🖼️ Behind-the-scenes artist content"
                ],
                cta: "Save My Favorites",
                ctaSecondary: "Join Collector's List",
                ctaAction: () => this.saveCurrentSession(),
                ctaSecondaryAction: () => this.showEmailCapture()
            },

            returningVisitor: [
                {
                    title: "Welcome Back! 🌟",
                    body: "Great to see you again! You were looking at some beautiful pieces last time. Ready to continue your art journey?",
                    cta: "Continue Browsing",
                    ctaSecondary: "See What's New",
                    ctaAction: () => this.showPreviouslyViewed(),
                    ctaSecondaryAction: () => window.location.href = 'gallery.html'
                },
                {
                    title: "You're Back! 💫",
                    body: "Still thinking about that perfect piece? Sometimes the best art needs a second look. Your favorites are waiting.",
                    cta: "View Saved Items",
                    ctaAction: () => this.showSavedItems()
                }
            ],

            collectionComplete: {
                title: "Complete Your Collection 🎯",
                body: "You've viewed pieces from the {collection} collection. Collectors often display these together for maximum impact.",
                cta: "See Full Collection",
                ctaAction: null
            },

            socialProof: [
                "🔥 5 collectors viewed this today",
                "⭐ Trending in Abstract Art",
                "💫 Part of a popular collection",
                "🏆 Artist's featured work",
                "❤️ Saved by 12 collectors this week"
            ],

            objectionHandlers: {
                price: {
                    title: "Art is an Investment 💎",
                    body: "Original abstract art appreciates over time. Plus, our pieces are available in multiple price points — from prints to premium canvas to digital editions.",
                    cta: "See Price Options",
                    ctaAction: () => window.location.href = 'shop.html'
                },
                decide: {
                    title: "Take Your Time ⏳",
                    body: "Great art is worth considering. Save it to your favorites and come back when you're ready. We'll be here.",
                    cta: "Save for Later",
                    ctaAction: () => this.promptSave()
                },
                shipping: {
                    title: "Delivery Made Easy 📦",
                    body: "Fine Art America handles museum-quality printing and shipping worldwide. ArtPal offers digital delivery. The HUG provides fast digital collectible access.",
                    cta: "Learn More",
                    ctaAction: () => window.location.href = 'shop.html'
                }
            }
        };
    }

    initializeRecommendations() {
        return {
            vibrant: ['Neon Gardenz', 'Radiant Spectrum', 'Radiant Fusion', 'Magical Wonderland #3'],
            serene: ['Serenity', 'Flowing Tranquility', 'Serenity in Waves', 'Ethereal Whispers'],
            cosmic: ['Chronicles of the Cosmos', 'Cosmic #1', 'Cosmic #7', 'Abstract Warrior Cosmic #1'],
            musical: ['Vibrant Crescendo', 'Harmonic Fusion', 'Spiraling Symphony', 'Radiant Melodies'],
            mystical: ['Ethereal Kaleidoscope', 'Mystic Connections', 'Pure Imagination', 'Dreamz'],
            bestsellers: ['Neon Gardenz', 'Serenity', 'Chronicles of the Cosmos', 'Radiant Fusion']
        };
    }

    initializeObjectionHandlers() {
        return {
            'too expensive': this.salesMessages.objectionHandlers?.price,
            'need to think': this.salesMessages.objectionHandlers?.decide,
            'shipping': this.salesMessages.objectionHandlers?.shipping,
            'not sure': this.salesMessages.objectionHandlers?.decide,
            'maybe later': this.salesMessages.objectionHandlers?.decide
        };
    }

    // ==========================================
    // UI COMPONENTS
    // ==========================================

    injectSalesUI() {
        // Inject CSS
        this.injectStyles();
        
        // Create sales agent container
        const container = document.createElement('div');
        container.id = 'sales-agent-container';
        container.innerHTML = `
            <!-- Floating Sales Agent Button -->
            <div id="sales-agent-trigger" class="sales-agent-trigger">
                <div class="agent-avatar">🎨</div>
                <div class="agent-pulse"></div>
                <span class="agent-badge" id="agent-badge" style="display:none;">1</span>
            </div>

            <!-- Sales Message Popup -->
            <div id="sales-agent-popup" class="sales-agent-popup hidden">
                <div class="popup-header">
                    <div class="popup-agent-info">
                        <span class="popup-avatar">🎨</span>
                        <span class="popup-name">Art Advisor</span>
                    </div>
                    <button class="popup-close" onclick="salesAgent.hidePopup()">×</button>
                </div>
                <div class="popup-content" id="popup-content">
                    <!-- Dynamic content -->
                </div>
                <div class="popup-actions" id="popup-actions">
                    <!-- Dynamic CTAs -->
                </div>
            </div>

            <!-- Exit Intent Modal -->
            <div id="exit-intent-modal" class="exit-modal hidden">
                <div class="exit-modal-overlay"></div>
                <div class="exit-modal-content">
                    <button class="exit-modal-close" onclick="salesAgent.hideExitModal()">×</button>
                    <div class="exit-modal-body" id="exit-modal-body">
                        <!-- Dynamic content -->
                    </div>
                </div>
            </div>

            <!-- Social Proof Toast -->
            <div id="social-proof-toast" class="social-proof-toast hidden">
                <span id="social-proof-text"></span>
            </div>

            <!-- Quick Recommendations Panel -->
            <div id="quick-recs-panel" class="quick-recs-panel hidden">
                <div class="recs-header">
                    <h4>🌟 Recommended For You</h4>
                    <button onclick="salesAgent.hideRecsPanel()">×</button>
                </div>
                <div class="recs-content" id="recs-content">
                    <!-- Dynamic recommendations -->
                </div>
            </div>
        `;
        
        document.body.appendChild(container);

        // Event listeners for trigger
        document.getElementById('sales-agent-trigger').addEventListener('click', () => {
            this.togglePopup();
        });

        // Start social proof rotation
        this.startSocialProofRotation();
    }

    injectStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            /* Sales Agent Styles */
            #sales-agent-container {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            }

            /* Floating Trigger Button */
            .sales-agent-trigger {
                position: fixed;
                bottom: 100px;
                right: 25px;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(255, 107, 107, 0.4);
                z-index: 9998;
                transition: all 0.3s ease;
            }

            .sales-agent-trigger:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(255, 107, 107, 0.5);
            }

            .agent-avatar {
                font-size: 28px;
                z-index: 2;
            }

            .agent-pulse {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: rgba(255, 107, 107, 0.4);
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(1.5); opacity: 0; }
            }

            .agent-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #4ecdc4;
                color: white;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                font-size: 12px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 3;
            }

            /* Popup */
            .sales-agent-popup {
                position: fixed;
                bottom: 175px;
                right: 25px;
                width: 340px;
                max-width: calc(100vw - 50px);
                background: white;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                z-index: 9999;
                overflow: hidden;
                transition: all 0.3s ease;
                transform-origin: bottom right;
            }

            .sales-agent-popup.hidden {
                opacity: 0;
                transform: scale(0.8);
                pointer-events: none;
            }

            .popup-header {
                background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .popup-agent-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .popup-avatar {
                font-size: 24px;
            }

            .popup-name {
                font-weight: 600;
                font-size: 15px;
            }

            .popup-close {
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                font-size: 18px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }

            .popup-close:hover {
                background: rgba(255,255,255,0.3);
            }

            .popup-content {
                padding: 20px;
            }

            .popup-content h3 {
                margin: 0 0 10px 0;
                font-size: 18px;
                color: #333;
            }

            .popup-content p {
                margin: 0;
                color: #666;
                font-size: 14px;
                line-height: 1.5;
            }

            .popup-actions {
                padding: 15px 20px 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .popup-cta {
                padding: 12px 20px;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .popup-cta-primary {
                background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
                color: white;
            }

            .popup-cta-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
            }

            .popup-cta-secondary {
                background: #f5f5f5;
                color: #333;
            }

            .popup-cta-secondary:hover {
                background: #eee;
            }

            /* Exit Modal */
            .exit-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .exit-modal.hidden {
                display: none;
            }

            .exit-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.6);
                backdrop-filter: blur(3px);
            }

            .exit-modal-content {
                position: relative;
                background: white;
                border-radius: 20px;
                padding: 40px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                animation: modalIn 0.3s ease;
            }

            @keyframes modalIn {
                from { opacity: 0; transform: scale(0.9) translateY(20px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }

            .exit-modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 28px;
                color: #999;
                cursor: pointer;
            }

            .exit-modal-body h2 {
                margin: 0 0 15px 0;
                font-size: 24px;
                color: #333;
            }

            .exit-modal-body p {
                color: #666;
                line-height: 1.6;
                margin-bottom: 20px;
            }

            .exit-benefits {
                margin: 20px 0;
                padding: 15px;
                background: #f9f9f9;
                border-radius: 10px;
            }

            .exit-benefits li {
                list-style: none;
                padding: 8px 0;
                color: #555;
                font-size: 14px;
            }

            .exit-modal-actions {
                display: flex;
                gap: 10px;
                margin-top: 25px;
            }

            .exit-modal-actions button {
                flex: 1;
                padding: 14px 20px;
                border: none;
                border-radius: 10px;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }

            .exit-btn-primary {
                background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
                color: white;
            }

            .exit-btn-secondary {
                background: linear-gradient(135deg, #4ecdc4, #3dbdb5);
                color: white;
            }

            /* Social Proof Toast */
            .social-proof-toast {
                position: fixed;
                bottom: 25px;
                left: 25px;
                background: rgba(0,0,0,0.85);
                color: white;
                padding: 12px 20px;
                border-radius: 25px;
                font-size: 13px;
                z-index: 9997;
                animation: toastIn 0.4s ease;
                max-width: 300px;
            }

            .social-proof-toast.hidden {
                display: none;
            }

            @keyframes toastIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            /* Quick Recommendations Panel */
            .quick-recs-panel {
                position: fixed;
                bottom: 100px;
                left: 25px;
                width: 300px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                z-index: 9996;
                overflow: hidden;
            }

            .quick-recs-panel.hidden {
                display: none;
            }

            .recs-header {
                background: linear-gradient(135deg, #4ecdc4, #3dbdb5);
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .recs-header h4 {
                margin: 0;
                font-size: 15px;
            }

            .recs-header button {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
            }

            .recs-content {
                padding: 15px;
                max-height: 300px;
                overflow-y: auto;
            }

            .rec-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px;
                border-radius: 8px;
                cursor: pointer;
                transition: background 0.2s;
            }

            .rec-item:hover {
                background: #f5f5f5;
            }

            .rec-item-icon {
                font-size: 24px;
            }

            .rec-item-info h5 {
                margin: 0;
                font-size: 14px;
                color: #333;
            }

            .rec-item-info span {
                font-size: 12px;
                color: #999;
            }

            /* Email Capture Form */
            .email-capture-form {
                margin-top: 20px;
            }

            .email-capture-form input {
                width: 100%;
                padding: 12px 15px;
                border: 2px solid #eee;
                border-radius: 8px;
                font-size: 14px;
                margin-bottom: 10px;
                transition: border-color 0.2s;
            }

            .email-capture-form input:focus {
                outline: none;
                border-color: #ff6b6b;
            }

            /* Responsive */
            @media (max-width: 480px) {
                .sales-agent-popup {
                    right: 10px;
                    left: 10px;
                    width: auto;
                    bottom: 160px;
                }

                .sales-agent-trigger {
                    right: 15px;
                    bottom: 85px;
                    width: 55px;
                    height: 55px;
                }

                .social-proof-toast {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                }

                .quick-recs-panel {
                    left: 10px;
                    right: 10px;
                    width: auto;
                }

                .exit-modal-content {
                    padding: 25px;
                }

                .exit-modal-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // ==========================================
    // UI ACTIONS
    // ==========================================

    showSalesMessage(message, type) {
        const popup = document.getElementById('sales-agent-popup');
        const content = document.getElementById('popup-content');
        const actions = document.getElementById('popup-actions');
        
        content.innerHTML = `
            <h3>${message.title}</h3>
            <p>${message.body}</p>
        `;

        let actionsHTML = `
            <button class="popup-cta popup-cta-primary" onclick="salesAgent.handleCTA('${type}', 'primary')">${message.cta}</button>
        `;

        if (message.ctaSecondary) {
            actionsHTML += `
                <button class="popup-cta popup-cta-secondary" onclick="salesAgent.handleCTA('${type}', 'secondary')">${message.ctaSecondary}</button>
            `;
        }

        actions.innerHTML = actionsHTML;
        
        this.currentMessage = { message, type };
        popup.classList.remove('hidden');
        
        // Show badge notification
        const badge = document.getElementById('agent-badge');
        badge.style.display = 'flex';

        // Track message shown
        this.updateEngagementScore(1);
    }

    handleCTA(type, button) {
        const message = this.currentMessage?.message;
        if (!message) return;

        if (button === 'primary' && message.ctaAction) {
            message.ctaAction();
        } else if (button === 'secondary' && message.ctaSecondaryAction) {
            message.ctaSecondaryAction();
        }

        this.hidePopup();
        this.updateEngagementScore(5);
    }

    togglePopup() {
        const popup = document.getElementById('sales-agent-popup');
        const badge = document.getElementById('agent-badge');
        
        if (popup.classList.contains('hidden')) {
            // Show with default helpful message if no current message
            if (!this.currentMessage) {
                this.showHelpfulMessage();
            }
            popup.classList.remove('hidden');
        } else {
            popup.classList.add('hidden');
        }
        
        badge.style.display = 'none';
    }

    hidePopup() {
        document.getElementById('sales-agent-popup').classList.add('hidden');
        document.getElementById('agent-badge').style.display = 'none';
    }

    showHelpfulMessage() {
        const helpMessages = [
            {
                title: "How Can I Help? 🎨",
                body: "Looking for something specific? I can help you find the perfect piece, compare platforms, or answer questions about our collections.",
                cta: "Show Me Popular Art",
                ctaSecondary: "Browse Collections",
                ctaAction: () => this.showPopularPieces(),
                ctaSecondaryAction: () => window.location.href = 'gallery.html'
            }
        ];
        
        this.showSalesMessage(helpMessages[0], 'help');
    }

    showExitIntentModal() {
        const modal = document.getElementById('exit-intent-modal');
        const body = document.getElementById('exit-modal-body');
        const exitData = this.salesMessages.exitIntent;

        body.innerHTML = `
            <h2>${exitData.title}</h2>
            <p>${exitData.body}</p>
            <ul class="exit-benefits">
                ${exitData.benefits.map(b => `<li>${b}</li>`).join('')}
            </ul>
            <div class="email-capture-form">
                <input type="email" id="exit-email-input" placeholder="Enter your email for exclusive offers">
            </div>
            <div class="exit-modal-actions">
                <button class="exit-btn-primary" onclick="salesAgent.handleExitAction('save')">${exitData.cta}</button>
                <button class="exit-btn-secondary" onclick="salesAgent.handleExitAction('subscribe')">${exitData.ctaSecondary}</button>
            </div>
        `;

        modal.classList.remove('hidden');
    }

    hideExitModal() {
        document.getElementById('exit-intent-modal').classList.add('hidden');
    }

    handleExitAction(action) {
        const email = document.getElementById('exit-email-input')?.value;
        
        if (action === 'subscribe' && email) {
            this.captureEmail(email);
        } else if (action === 'save') {
            this.saveCurrentSession();
        }
        
        this.hideExitModal();
        this.updateEngagementScore(15);
    }

    showReturningVisitorMessage() {
        const messages = this.salesMessages.returningVisitor;
        const message = messages[Math.floor(Math.random() * messages.length)];
        this.showSalesMessage(message, 'returning');
    }

    showPurchaseGuidance(itemInfo) {
        const template = this.salesMessages.purchaseGuidance[0];
        const message = {
            ...template,
            body: template.body
                .replace('{title}', itemInfo.title)
                .replace('{platform}', itemInfo.platform)
        };
        
        // Show as toast instead of popup
        this.showToast(`👍 Great choice! ${itemInfo.title} is a collector favorite.`);
    }

    // ==========================================
    // SOCIAL PROOF SYSTEM
    // ==========================================

    startSocialProofRotation() {
        // Show social proof toast periodically
        setInterval(() => {
            if (this.state.engagementScore > 10 && Math.random() > 0.7) {
                this.showRandomSocialProof();
            }
        }, 45000);

        // Initial social proof after 20 seconds
        setTimeout(() => {
            if (this.state.engagementScore > 5) {
                this.showRandomSocialProof();
            }
        }, 20000);
    }

    showRandomSocialProof() {
        const proofs = this.salesMessages.socialProof;
        const proof = proofs[Math.floor(Math.random() * proofs.length)];
        this.showToast(proof);
    }

    showToast(message) {
        const toast = document.getElementById('social-proof-toast');
        const text = document.getElementById('social-proof-text');
        
        text.textContent = message;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 5000);
    }

    // ==========================================
    // RECOMMENDATION ENGINE
    // ==========================================

    generatePersonalizedRecommendation() {
        // Analyze viewed items to determine preference
        const viewedTitles = this.state.itemsViewed.join(' ').toLowerCase();
        let style = 'bestsellers';

        if (viewedTitles.includes('cosmic') || viewedTitles.includes('warrior')) {
            style = 'cosmic';
        } else if (viewedTitles.includes('sereni') || viewedTitles.includes('tranquil') || viewedTitles.includes('flow')) {
            style = 'serene';
        } else if (viewedTitles.includes('neon') || viewedTitles.includes('radiant') || viewedTitles.includes('vibrant')) {
            style = 'vibrant';
        } else if (viewedTitles.includes('melod') || viewedTitles.includes('harmon') || viewedTitles.includes('symphon')) {
            style = 'musical';
        } else if (viewedTitles.includes('mystic') || viewedTitles.includes('dream') || viewedTitles.includes('ethereal')) {
            style = 'mystical';
        }

        const recommendations = this.productRecommendations[style];
        const recommendedTitles = recommendations.slice(0, 3).join(', ');

        return {
            title: "Based on Your Taste... 🎯",
            body: `You seem drawn to ${style === 'cosmic' ? 'cosmic, powerful' : style === 'serene' ? 'calm, peaceful' : style === 'vibrant' ? 'bold, energetic' : style === 'musical' ? 'rhythmic, melodic' : 'mystical, imaginative'} pieces. You might love: ${recommendedTitles}`,
            cta: "Show Me These",
            ctaAction: () => this.showRecommendationsPanel(style)
        };
    }

    showRecommendationsPanel(style) {
        const panel = document.getElementById('quick-recs-panel');
        const content = document.getElementById('recs-content');
        const recs = this.productRecommendations[style] || this.productRecommendations.bestsellers;

        content.innerHTML = recs.map(title => `
            <div class="rec-item" onclick="salesAgent.navigateToItem('${title}')">
                <span class="rec-item-icon">🖼️</span>
                <div class="rec-item-info">
                    <h5>${title}</h5>
                    <span>Click to view</span>
                </div>
            </div>
        `).join('');

        panel.classList.remove('hidden');
        this.hidePopup();
    }

    hideRecsPanel() {
        document.getElementById('quick-recs-panel').classList.add('hidden');
    }

    navigateToItem(title) {
        // Try to find the item and navigate
        const searchableTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
        window.location.href = `gallery.html?search=${encodeURIComponent(title)}`;
    }

    // ==========================================
    // ACTION HANDLERS
    // ==========================================

    showPopularPieces() {
        window.location.href = 'gallery.html?filter=popular';
    }

    showBestsellers() {
        window.location.href = 'gallery.html?filter=bestsellers';
    }

    showStyleQuiz() {
        this.showSalesMessage({
            title: "What Speaks to You? 🎨",
            body: "Choose your vibe and I'll show you matching pieces:",
            cta: "Bold & Energetic",
            ctaSecondary: "Calm & Peaceful",
            ctaAction: () => this.showRecommendationsPanel('vibrant'),
            ctaSecondaryAction: () => this.showRecommendationsPanel('serene')
        }, 'quiz');
    }

    highlightSaveFeature() {
        this.showToast("💡 Tip: Click the heart icon on any piece to save it!");
        this.hidePopup();
    }

    setShoppingMode(mode) {
        this.state.shoppingMode = mode;
        
        if (mode === 'gift') {
            this.showSalesMessage({
                title: "Perfect Gift Finder 🎁",
                body: "Art makes an unforgettable gift! Our bestsellers are loved by recipients of all tastes. Plus, Fine Art America offers beautiful gift-ready packaging.",
                cta: "Browse Gift Ideas",
                ctaAction: () => this.showRecommendationsPanel('bestsellers')
            }, 'giftMode');
        } else {
            this.hidePopup();
            this.showToast("✨ Great! Browse freely — I'm here if you need help!");
        }
    }

    openChat() {
        // Toggle main chatbot if it exists
        const chatWidget = document.getElementById('chatbot-widget');
        if (chatWidget) {
            chatWidget.style.display = 'block';
        }
        this.hidePopup();
    }

    promptSave() {
        this.showToast("💾 Use the Save button on any artwork to keep it in your favorites!");
        this.hidePopup();
    }

    showPreviouslyViewed() {
        if (this.state.itemsViewed.length > 0) {
            window.location.href = `gallery.html?viewed=${this.state.itemsViewed.slice(-5).join(',')}`;
        } else {
            window.location.href = 'gallery.html';
        }
    }

    showSavedItems() {
        window.location.href = 'gallery.html?filter=saved';
    }

    saveCurrentSession() {
        this.savePersistentData();
        this.showToast("✅ Your browsing session is saved! Come back anytime.");
    }

    captureEmail(email) {
        if (!email || !email.includes('@')) {
            this.showToast("Please enter a valid email address");
            return;
        }

        // Store email locally as backup
        const subscribers = JSON.parse(localStorage.getItem('abstractEmporium_subscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('abstractEmporium_subscribers', JSON.stringify(subscribers));
        }

        // ========================================
        // REAL EMAIL DELIVERY VIA FORMSPREE
        // ========================================
        // Connected to abstractemporiumart@outlook.com
        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvgelyje';
        
        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                source: 'Sales Agent Popup',
                page: window.location.pathname,
                timestamp: new Date().toISOString(),
                itemsViewed: this.state.itemsViewed.join(', '),
                engagementScore: this.state.engagementScore,
                _subject: '🎨 New Collector Signup - Abstract Emporium!'
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('📧 Email sent to Formspree successfully!');
            } else {
                console.log('📧 Formspree pending setup - email stored locally');
            }
        })
        .catch(error => {
            console.log('📧 Email stored locally (Formspree endpoint not configured)');
        });

        // Also send to abstractemporiumart@outlook.com via EmailJS as backup
        this.sendEmailNotification(email);

        console.log('📧 Email captured:', email);
        
        this.showToast("🎉 Welcome to the collector's circle! Check your inbox soon.");
        this.hideExitModal();
    }

    showEmailCapture() {
        this.showExitIntentModal();
    }

    // ==========================================
    // EMAIL NOTIFICATION SYSTEM
    // ==========================================

    sendEmailNotification(subscriberEmail) {
        // EmailJS Integration - Free tier: 200 emails/month
        // Sign up at https://www.emailjs.com/
        // Replace these with your actual IDs from EmailJS dashboard
        const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
        const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
        const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

        // Check if EmailJS is loaded
        if (typeof emailjs !== 'undefined') {
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                to_email: 'abstractemporiumart@outlook.com',
                subscriber_email: subscriberEmail,
                signup_page: window.location.href,
                signup_time: new Date().toLocaleString(),
                items_viewed: this.state.itemsViewed.slice(-5).join(', ') || 'None yet',
                engagement_score: this.state.engagementScore
            }, EMAILJS_PUBLIC_KEY)
            .then(() => console.log('📧 EmailJS notification sent!'))
            .catch((err) => console.log('📧 EmailJS not configured:', err));
        }
    }

    // ==========================================
    // CHAT INTEGRATION
    // ==========================================

    processUserInput(input) {
        const lowerInput = input.toLowerCase();

        // Check for objections
        for (const [trigger, handler] of Object.entries(this.objectionHandlers)) {
            if (lowerInput.includes(trigger) && handler) {
                return handler;
            }
        }

        // Check for purchase intent signals
        if (lowerInput.includes('buy') || lowerInput.includes('purchase') || lowerInput.includes('order')) {
            this.state.purchaseIntent = 'ready';
            return {
                title: "Ready to Collect! 🎉",
                body: "Excellent! You can purchase through:\n\n🎨 ArtPal - Digital & prints\n🖼️ Fine Art America - Premium canvas & décor\n💎 The HUG - Digital collectibles\n\nWhich platform works best for you?",
                cta: "Take Me to Shop",
                ctaAction: () => window.location.href = 'shop.html'
            };
        }

        return null;
    }
}

// ==========================================
// GLOBAL INITIALIZATION
// ==========================================

// Initialize on page load
let salesAgent;
document.addEventListener('DOMContentLoaded', () => {
    salesAgent = new SalesAgent();
    
    // Make globally accessible
    window.salesAgent = salesAgent;
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SalesAgent;
}
