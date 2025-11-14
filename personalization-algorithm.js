/**
 * Personalization Algorithm
 * 
 * Tracks user preferences and learns what patterns they like
 * Provides personalized recommendations
 * Premium feature: $1.99/month for "personalized pattern recommendations"
 */

class PersonalizationAlgorithm {
    constructor() {
        this.userProfile = {
            id: this.generateUserId(),
            preferences: {
                complexities: {},
                colors: {},
                crafts: {},
                styles: {}
            },
            interactions: [],
            recommendationHistory: [],
            subscribedToPremium: false,
            premiumExpiry: null
        };
        
        this.interactionTypes = ['view', 'generate', 'favorite', 'share', 'purchase'];
        this.colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'neutral'];
        this.complexities = ['minimal', 'medium', 'dense', 'chaotic', 'geometric'];
        this.crafts = ['knitting', 'crochet', 'weaving'];
        
        this.init();
    }
    
    init() {
        this.loadProfile();
        this.setupEventListeners();
        this.startTrackingSession();
    }
    
    generateUserId() {
        let userId = localStorage.getItem('personalizationUserId');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('personalizationUserId', userId);
        }
        return userId;
    }
    
    /**
     * Setup event listeners to track all user interactions
     */
    setupEventListeners() {
        // Track pattern generation
        const patternSection = document.querySelector('.pattern-generator-section');
        if (patternSection) {
            const observer = new MutationObserver(() => {
                this.trackEvent('generate', this.extractPatternContext());
            });
            observer.observe(patternSection, { childList: true });
        }
        
        // Track complexity selection
        const complexitySelect = document.getElementById('complexitySelect');
        if (complexitySelect) {
            complexitySelect.addEventListener('change', () => {
                this.updatePreference('complexities', complexitySelect.value, 1);
            });
        }
        
        // Track craft type selection
        const craftSelect = document.getElementById('craftTypeSelect');
        if (craftSelect) {
            craftSelect.addEventListener('change', () => {
                this.updatePreference('crafts', craftSelect.value, 1);
            });
        }
        
        // Track color picker
        const colorPicker = document.getElementById('brushColor');
        if (colorPicker) {
            colorPicker.addEventListener('change', () => {
                const color = this.normalizeColor(colorPicker.value);
                this.updatePreference('colors', color, 1);
            });
        }
        
        // Track purchases
        document.addEventListener('click', (e) => {
            if (e.target.closest('form[action*="paypal"]')) {
                const itemName = e.target.closest('form').querySelector('[name="item_name"]')?.value;
                if (itemName) {
                    this.trackEvent('purchase', { item: itemName });
                }
            }
        });
    }
    
    /**
     * Track user interaction
     */
    trackEvent(type, context = {}) {
        const interaction = {
            type,
            timestamp: Date.now(),
            context,
            weight: this.getEventWeight(type)
        };
        
        this.userProfile.interactions.push(interaction);
        this.updatePreferencesFromInteraction(interaction);
        this.saveProfile();
        
        // Show recommendation if appropriate
        if (this.userProfile.interactions.length % 5 === 0) {
            this.maybeShowRecommendation();
        }
    }
    
    /**
     * Get weight for different interaction types
     */
    getEventWeight(type) {
        const weights = {
            view: 0.5,
            generate: 1,
            favorite: 2,
            share: 1.5,
            purchase: 3
        };
        return weights[type] || 1;
    }
    
    /**
     * Extract pattern context from current page state
     */
    extractPatternContext() {
        return {
            complexity: document.getElementById('complexitySelect')?.value || 'unknown',
            craft: document.getElementById('craftTypeSelect')?.value || 'unknown',
            colors: this.getCurrentPatternColors()
        };
    }
    
    /**
     * Update preference based on interaction
     */
    updatePreference(category, value, increment = 1) {
        if (!this.userProfile.preferences[category]) {
            this.userProfile.preferences[category] = {};
        }
        
        if (!this.userProfile.preferences[category][value]) {
            this.userProfile.preferences[category][value] = 0;
        }
        
        this.userProfile.preferences[category][value] += increment;
        this.saveProfile();
    }
    
    /**
     * Update preferences from interaction data
     */
    updatePreferencesFromInteraction(interaction) {
        if (interaction.context.complexity) {
            this.updatePreference('complexities', interaction.context.complexity, interaction.weight);
        }
        
        if (interaction.context.craft) {
            this.updatePreference('crafts', interaction.context.craft, interaction.weight);
        }
        
        if (interaction.context.colors && Array.isArray(interaction.context.colors)) {
            interaction.context.colors.forEach(color => {
                this.updatePreference('colors', color, interaction.weight);
            });
        }
    }
    
    /**
     * Get current pattern colors from displayed patterns
     */
    getCurrentPatternColors() {
        const colors = [];
        const colorElements = document.querySelectorAll('[style*="background-color"]');
        colorElements.forEach(el => {
            const bgColor = window.getComputedStyle(el).backgroundColor;
            colors.push(this.normalizeColor(bgColor));
        });
        return colors;
    }
    
    /**
     * Normalize color to category
     */
    normalizeColor(colorValue) {
        // Simple color normalization
        if (!colorValue) return 'neutral';
        
        const colorMap = {
            red: /red|#ff0000|#f00|rgb\(255,\s*0,\s*0/,
            blue: /blue|#0000ff|#00f|rgb\(0,\s*0,\s*255/,
            green: /green|#008000|rgb\(0,\s*128,\s*0/,
            yellow: /yellow|#ffff00|#ff0|rgb\(255,\s*255,\s*0/,
            purple: /purple|#800080|#a020f0|rgb\(128,\s*0,\s*128/,
            orange: /orange|#ffa500|rgb\(255,\s*165,\s*0/,
            pink: /pink|#ffc0cb|rgb\(255,\s*192,\s*203/
        };
        
        for (const [color, regex] of Object.entries(colorMap)) {
            if (regex.test(colorValue.toLowerCase())) {
                return color;
            }
        }
        
        return 'neutral';
    }
    
    /**
     * Calculate user profile score for recommendation eligibility
     */
    calculateProfileScore() {
        return Object.keys(this.userProfile.preferences).reduce((total, category) => {
            return total + Object.values(this.userProfile.preferences[category]).reduce((a, b) => a + b, 0);
        }, 0);
    }
    
    /**
     * Generate personalized recommendations
     */
    generateRecommendations(count = 3) {
        const recommendations = [];
        const profileScore = this.calculateProfileScore();
        
        // Only recommend if user has enough interaction history
        if (profileScore < 5) {
            return [{
                type: 'hint',
                title: 'Create Your Profile',
                description: 'Generate a few more patterns to unlock personalized recommendations!',
                progress: Math.round((profileScore / 5) * 100)
            }];
        }
        
        // Get top preferences
        const topComplexities = this.getTopPreferences('complexities', 2);
        const topCrafts = this.getTopPreferences('crafts', 2);
        const topColors = this.getTopPreferences('colors', 3);
        
        // Build recommendations
        for (let i = 0; i < count; i++) {
            const complexity = topComplexities[i % topComplexities.length] || this.complexities[Math.floor(Math.random() * this.complexities.length)];
            const craft = topCrafts[i % topCrafts.length] || this.crafts[Math.floor(Math.random() * this.crafts.length)];
            const confidence = Math.min(95, 60 + (profileScore * 5));
            
            recommendations.push({
                type: 'pattern',
                id: `rec_${Date.now()}_${i}`,
                title: `Personalized ${this.capitalize(complexity)} ${this.capitalize(craft)} Pattern`,
                description: `Based on your love for ${craft} patterns with ${complexity} complexity`,
                complexity,
                craft,
                colors: topColors,
                confidence,
                reason: this.generateRecommendationReason(topComplexities, topCrafts)
            });
        }
        
        return recommendations;
    }
    
    /**
     * Get top preferences in a category
     */
    getTopPreferences(category, count) {
        const prefs = this.userProfile.preferences[category] || {};
        return Object.entries(prefs)
            .sort(([, a], [, b]) => b - a)
            .slice(0, count)
            .map(([key]) => key);
    }
    
    /**
     * Generate human-readable recommendation reason
     */
    generateRecommendationReason(complexities, crafts) {
        const reasons = [
            `You've been generating ${complexities[0]} patterns lately`,
            `Your most-used craft is ${crafts[0]}`,
            `Perfect match for your recent preference for ${complexities[0]} designs`,
            `Based on your ${crafts[0]} expertise level`,
            `Combines your favorite ${crafts[0]} with ${complexities[0]} complexity`
        ];
        return reasons[Math.floor(Math.random() * reasons.length)];
    }
    
    /**
     * Maybe show recommendation widget
     */
    maybeShowRecommendation() {
        const recommendations = this.generateRecommendations(3);
        this.displayRecommendationWidget(recommendations);
    }
    
    /**
     * Display recommendation widget
     */
    displayRecommendationWidget(recommendations) {
        let widget = document.getElementById('personalizationWidget');
        if (!widget) {
            widget = document.createElement('div');
            widget.id = 'personalizationWidget';
            widget.className = 'personalization-widget';
            document.body.appendChild(widget);
        }
        
        widget.innerHTML = `
            <div class="widget-content">
                <button class="widget-close">&times;</button>
                <h3>🎯 Personalized for You</h3>
                <div class="recommendations-list">
                    ${recommendations.map(rec => `
                        <div class="recommendation-item ${rec.type}">
                            ${rec.type === 'hint' ? `
                                <p class="rec-title">${rec.title}</p>
                                <p class="rec-description">${rec.description}</p>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${rec.progress}%"></div>
                                </div>
                            ` : `
                                <p class="rec-title">${rec.title}</p>
                                <p class="rec-description">${rec.reason}</p>
                                <p class="rec-confidence">✓ ${rec.confidence}% match</p>
                                <button class="btn-try-pattern" data-rec-id="${rec.id}">Try Pattern</button>
                            `}
                        </div>
                    `).join('')}
                </div>
                ${!this.userProfile.subscribedToPremium ? `
                    <div class="widget-premium-cta">
                        <p>💎 Premium: Get daily personalized recommendations!</p>
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                            <input type="hidden" name="cmd" value="_xclick">
                            <input type="hidden" name="business" value="abstractemporiumart@outlook.com">
                            <input type="hidden" name="item_name" value="Personalization Premium - Monthly">
                            <input type="hidden" name="a3" value="1.99">
                            <input type="hidden" name="p3" value="1">
                            <input type="hidden" name="t3" value="M">
                            <input type="hidden" name="src" value="1">
                            <button type="submit">Subscribe $1.99/month</button>
                        </form>
                    </div>
                ` : ''}
            </div>
        `;
        
        widget.querySelector('.widget-close').addEventListener('click', () => {
            widget.classList.add('hidden');
        });
        
        widget.querySelectorAll('.btn-try-pattern').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const recId = e.target.dataset.recId;
                const rec = recommendations.find(r => r.id === recId);
                this.applyRecommendation(rec);
            });
        });
    }
    
    /**
     * Apply a recommendation (pre-fill pattern settings)
     */
    applyRecommendation(recommendation) {
        const complexitySelect = document.getElementById('complexitySelect');
        const craftSelect = document.getElementById('craftTypeSelect');
        
        if (complexitySelect) {
            complexitySelect.value = recommendation.complexity;
            complexitySelect.dispatchEvent(new Event('change'));
        }
        
        if (craftSelect) {
            craftSelect.value = recommendation.craft;
            craftSelect.dispatchEvent(new Event('change'));
        }
        
        this.trackEvent('recommendation_applied', { 
            recommendationId: recommendation.id,
            complexity: recommendation.complexity,
            craft: recommendation.craft
        });
        
        // Scroll to pattern section
        document.querySelector('.pattern-generator-section')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    /**
     * Start tracking session
     */
    startTrackingSession() {
        const sessionStart = Date.now();
        this.userProfile.currentSession = {
            startTime: sessionStart,
            interactions: 0
        };
        this.saveProfile();
        
        // Track session end
        window.addEventListener('beforeunload', () => {
            this.userProfile.currentSession.endTime = Date.now();
            this.userProfile.currentSession.duration = 
                this.userProfile.currentSession.endTime - sessionStart;
            this.saveProfile();
        });
    }
    
    /**
     * Save profile to localStorage
     */
    saveProfile() {
        localStorage.setItem('personalizationProfile', JSON.stringify(this.userProfile));
    }
    
    /**
     * Load profile from localStorage
     */
    loadProfile() {
        const stored = localStorage.getItem('personalizationProfile');
        if (stored) {
            try {
                const loaded = JSON.parse(stored);
                Object.assign(this.userProfile, loaded);
            } catch (e) {
                console.error('Error loading personalization profile:', e);
            }
        }
    }
    
    /**
     * Get analytics summary
     */
    getAnalyticsSummary() {
        const totalInteractions = this.userProfile.interactions.length;
        const topComplexity = this.getTopPreferences('complexities', 1)[0];
        const topCraft = this.getTopPreferences('crafts', 1)[0];
        
        return {
            userId: this.userProfile.id,
            totalInteractions,
            profileScore: this.calculateProfileScore(),
            topComplexity,
            topCraft,
            premiumSubscribed: this.userProfile.subscribedToPremium,
            interactionHistory: this.userProfile.interactions.slice(-10)
        };
    }
    
    /**
     * Helper
     */
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.personalization = new PersonalizationAlgorithm();
    });
} else {
    window.personalization = new PersonalizationAlgorithm();
}
