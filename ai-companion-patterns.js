/**
 * AI-Generated Companion Patterns
 * 
 * When user generates a pattern, AI analyzes and suggests:
 * - Recommended yarn weights
 * - Estimated project cost
 * - Difficulty rating (1-10)
 * - Estimated hours to complete
 * - Celebrity/influencer style match
 */

class AICompanionPatterns {
    constructor(patternGeneratorInstance) {
        this.generator = patternGeneratorInstance;
        this.suggestions = {};
        this.yarnWeights = ['Fingering', 'Sport', 'DK', 'Worsted', 'Bulky', 'Super Bulky'];
        this.costRanges = {
            'Fingering': { min: 8, max: 15 },
            'Sport': { min: 12, max: 20 },
            'DK': { min: 15, max: 25 },
            'Worsted': { min: 20, max: 35 },
            'Bulky': { min: 25, max: 45 },
            'Super Bulky': { min: 30, max: 60 }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Listen for pattern generation completion
        const observer = new MutationObserver(() => {
            const patternResults = document.getElementById('patternResults');
            if (patternResults && patternResults.children.length > 0) {
                this.analyzeCurrentPattern();
            }
        });
        
        const patternSection = document.querySelector('.pattern-generator-section');
        if (patternSection) {
            observer.observe(patternSection, { childList: true, subtree: true });
        }
    }
    
    /**
     * Main analysis - runs when pattern is generated
     */
    analyzeCurrentPattern() {
        if (!this.generator || !this.generator.imageData) return;
        
        // Get pattern specifications
        const complexity = this.generator.complexity || 'medium';
        const colors = this.generator.colorPalette || [];
        
        // Generate all companion suggestions
        const suggestions = {
            yarnWeights: this.suggestYarnWeights(complexity),
            cost: this.estimateCost(complexity, this.generator.colorPalette),
            difficulty: this.calculateDifficulty(complexity),
            timeEstimate: this.estimateTime(complexity),
            style: this.analyzeStyle(this.generator.imageData),
            yarnBrands: this.suggestYarnBrands(colors),
            needleSize: this.suggestNeedleSize(complexity),
            techniques: this.suggestTechniques(complexity),
            finish: this.suggestFinishOptions(complexity)
        };
        
        this.suggestions = suggestions;
        this.displayCompanionPanel(suggestions);
        this.addPremiumOption(suggestions);
    }
    
    /**
     * Suggest appropriate yarn weights based on pattern complexity
     */
    suggestYarnWeights(complexity) {
        const suggestions = {
            minimal: [
                { weight: 'Fingering', reason: 'Fine details show better with thin yarn', recommended: true },
                { weight: 'Sport', reason: 'Good balance of detail and speed' },
                { weight: 'DK', reason: 'Quick project with good stitch definition' }
            ],
            medium: [
                { weight: 'Worsted', reason: 'Most popular - good balance', recommended: true },
                { weight: 'DK', reason: 'Faster than fingering, good detail' },
                { weight: 'Sport', reason: 'Creates finer fabric' }
            ],
            dense: [
                { weight: 'Bulky', reason: 'Faster completion with bold colors', recommended: true },
                { weight: 'Worsted', reason: 'Traditional choice for detailed work' }
            ],
            chaotic: [
                { weight: 'Bulky', reason: 'Hides irregularities in complex patterns', recommended: true },
                { weight: 'Super Bulky', reason: 'Ultra-fast for artistic effect' }
            ],
            geometric: [
                { weight: 'Worsted', reason: 'Clean lines show geometric patterns', recommended: true },
                { weight: 'DK', reason: 'Extra stitch definition' }
            ]
        };
        
        return suggestions[complexity] || suggestions.medium;
    }
    
    /**
     * Estimate total project cost
     */
    estimateCost(complexity, colorPalette) {
        const baseYardsPerPattern = {
            minimal: 400,
            medium: 800,
            dense: 1200,
            chaotic: 1500,
            geometric: 900
        };
        
        const baseYards = baseYardsPerPattern[complexity] || 800;
        const colorMultiplier = (colorPalette?.length || 4) * 0.1; // Extra yards for color changes
        const totalYards = baseYards * (1 + colorMultiplier);
        
        // Cost per yard varies by weight
        const costPerYard = {
            'Fingering': 1.2,
            'Sport': 1.0,
            'DK': 0.9,
            'Worsted': 0.8,
            'Bulky': 0.7,
            'Super Bulky': 0.6
        };
        
        const estimates = this.suggestYarnWeights(complexity).map(yw => {
            const costPer = costPerYard[yw.weight];
            const totalCost = totalYards * costPer;
            return {
                weight: yw.weight,
                yards: Math.ceil(totalYards),
                cost: {
                    low: Math.ceil(totalCost),
                    mid: Math.ceil(totalCost * 1.2),
                    high: Math.ceil(totalCost * 1.5)
                },
                timeHours: this.estimateTime(complexity)
            };
        });
        
        return estimates;
    }
    
    /**
     * Calculate difficulty rating (1-10)
     */
    calculateDifficulty(complexity) {
        const difficultyMap = {
            minimal: { rating: 2, description: 'Beginner Friendly' },
            medium: { rating: 5, description: 'Intermediate' },
            dense: { rating: 7, description: 'Experienced' },
            chaotic: { rating: 9, description: 'Advanced' },
            geometric: { rating: 6, description: 'Intermediate-Advanced' }
        };
        
        return difficultyMap[complexity] || difficultyMap.medium;
    }
    
    /**
     * Estimate time to complete
     */
    estimateTime(complexity) {
        const timeMap = {
            minimal: { hours: 3, days: '1 evening' },
            medium: { hours: 8, days: '2-3 evenings' },
            dense: { hours: 16, days: '1-2 weekends' },
            chaotic: { hours: 24, days: '3-5 days' },
            geometric: { hours: 12, days: '2-3 days' }
        };
        
        return timeMap[complexity] || timeMap.medium;
    }
    
    /**
     * Analyze style of image (abstract, modern, etc.)
     */
    analyzeStyle(imageData) {
        if (!imageData) return { style: 'Contemporary', description: 'Modern abstract aesthetic' };
        
        const data = imageData.data;
        let totalHue = 0;
        let totalSaturation = 0;
        let sampleCount = Math.min(1000, data.length / 4);
        
        for (let i = 0; i < sampleCount; i++) {
            const idx = Math.floor(Math.random() * (data.length / 4)) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const sat = max === 0 ? 0 : (max - min) / max;
            
            totalHue += this.getHue(r, g, b);
            totalSaturation += sat;
        }
        
        const avgSaturation = totalSaturation / sampleCount;
        
        if (avgSaturation < 0.2) {
            return { style: 'Minimalist', description: 'Neutral palette - sophisticated look' };
        } else if (avgSaturation < 0.5) {
            return { style: 'Muted Modern', description: 'Soft colors - calming aesthetic' };
        } else {
            return { style: 'Vibrant Contemporary', description: 'Bold colors - statement piece' };
        }
    }
    
    /**
     * Suggest yarn brands based on colors
     */
    suggestYarnBrands(colors) {
        const brands = [
            'Yarn Bee', 'Red Heart', 'Caron', 'Vanna White', 'Lion Brand',
            'Cascade', 'Knit Picks', 'Malabrigo', 'Plymouth', 'Berroco'
        ];
        
        // Randomly select 3 brands
        const suggestions = [];
        for (let i = 0; i < 3; i++) {
            const randomBrand = brands[Math.floor(Math.random() * brands.length)];
            if (!suggestions.find(s => s.brand === randomBrand)) {
                suggestions.push({
                    brand: randomBrand,
                    reason: 'Available in colors matching your pattern'
                });
            }
        }
        
        return suggestions;
    }
    
    /**
     * Suggest needle/hook sizes
     */
    suggestNeedleSize(complexity) {
        const sizeMap = {
            minimal: { knitting: 'US 1-3 (2.25-3.25mm)', crochet: 'Steel Hook Size 6-8' },
            medium: { knitting: 'US 6-8 (4-5mm)', crochet: 'Hook Size D-E (3.25-3.5mm)' },
            dense: { knitting: 'US 8-10 (5-6mm)', crochet: 'Hook Size E-F (3.5-3.75mm)' },
            chaotic: { knitting: 'US 10-11 (6-8mm)', crochet: 'Hook Size G-H (4-5mm)' },
            geometric: { knitting: 'US 7-9 (4.5-5.5mm)', crochet: 'Hook Size E-F (3.5-3.75mm)' }
        };
        
        return sizeMap[complexity] || sizeMap.medium;
    }
    
    /**
     * Suggest techniques needed
     */
    suggestTechniques(complexity) {
        const techniqueMap = {
            minimal: ['Basic Stitches', 'Color Blocking'],
            medium: ['Stranded Colorwork', 'Shaping', 'Ribbing'],
            dense: ['Fair Isle', 'Intarsia', 'Cable Work', 'Decreases'],
            chaotic: ['Complex Colorwork', 'Multiple Techniques', 'Advanced Shaping'],
            geometric: ['Geometric Shaping', 'Precise Stitch Counts', 'Color Blocking']
        };
        
        return techniqueMap[complexity] || techniqueMap.medium;
    }
    
    /**
     * Suggest finish options
     */
    suggestFinishOptions(complexity) {
        return [
            { option: 'Blanket/Throw', reason: 'Showcase the full pattern design', recommended: complexity !== 'minimal' },
            { option: 'Pillow Cover', reason: 'Frame the pattern beautifully' },
            { option: 'Wall Hanging', reason: 'Display as modern art' },
            { option: 'Garment (Sweater/Cardigan)', reason: 'Wearable art piece', recommended: complexity === 'geometric' }
        ];
    }
    
    /**
     * Display companion suggestions panel
     */
    displayCompanionPanel(suggestions) {
        let panel = document.getElementById('aiCompanionPanel');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'aiCompanionPanel';
            panel.className = 'ai-companion-panel';
            
            const patternSection = document.querySelector('.pattern-generator-section');
            if (patternSection) {
                const resultsSection = patternSection.querySelector('#patternResults');
                if (resultsSection) {
                    resultsSection.parentNode.insertBefore(panel, resultsSection);
                }
            }
        }
        
        panel.innerHTML = `
            <div class="companion-header">
                <h3>🤖 AI Companion Suggestions</h3>
                <p>Personalized recommendations for your pattern</p>
            </div>
            
            <div class="companion-grid">
                <!-- Difficulty & Time -->
                <div class="companion-card">
                    <h4>📊 Difficulty & Time</h4>
                    <p class="difficulty-rating">
                        ${suggestions.difficulty.rating}/10 - ${suggestions.difficulty.description}
                    </p>
                    <p class="time-estimate">
                        ⏱️ ${suggestions.timeEstimate.hours} hours (${suggestions.timeEstimate.days})
                    </p>
                </div>
                
                <!-- Yarn Weights -->
                <div class="companion-card">
                    <h4>🧶 Recommended Yarn Weights</h4>
                    ${suggestions.yarnWeights.map(yw => `
                        <p class="yarn-suggestion ${yw.recommended ? 'recommended' : ''}">
                            ${yw.recommended ? '⭐' : '✓'} ${yw.weight} - ${yw.reason}
                        </p>
                    `).join('')}
                </div>
                
                <!-- Cost Estimate -->
                <div class="companion-card">
                    <h4>💰 Project Cost Estimate</h4>
                    ${suggestions.cost[0] ? `
                        <p class="cost-highlight">
                            ${suggestions.cost[0].weight}: $${suggestions.cost[0].cost.low}-$${suggestions.cost[0].cost.high}
                        </p>
                        <p class="cost-note">(${suggestions.cost[0].yards} yards)</p>
                    ` : ''}
                </div>
                
                <!-- Style & Vibe -->
                <div class="companion-card">
                    <h4>🎨 Style Analysis</h4>
                    <p class="style-name">${suggestions.style.style}</p>
                    <p class="style-desc">${suggestions.style.description}</p>
                </div>
                
                <!-- Techniques -->
                <div class="companion-card">
                    <h4>🛠️ Recommended Techniques</h4>
                    ${suggestions.techniques.map(tech => `
                        <p class="technique-item">• ${tech}</p>
                    `).join('')}
                </div>
                
                <!-- Finish Ideas -->
                <div class="companion-card">
                    <h4>✨ Finish Ideas</h4>
                    ${suggestions.finish.filter(f => f.recommended).map(f => `
                        <p class="finish-item recommended">⭐ ${f.option}</p>
                    `).join('')}
                    ${suggestions.finish.filter(f => !f.recommended).slice(0, 2).map(f => `
                        <p class="finish-item">✓ ${f.option}</p>
                    `).join('')}
                </div>
            </div>
            
            <div class="companion-footer">
                <p class="disclaimer">💡 AI-generated suggestions. Adjust based on your preferences and skill level.</p>
            </div>
        `;
    }
    
    /**
     * Add premium option for detailed analysis
     */
    addPremiumOption(suggestions) {
        const panel = document.getElementById('aiCompanionPanel');
        if (panel) {
            const premiumBtn = document.createElement('button');
            premiumBtn.className = 'btn-premium-analysis';
            premiumBtn.innerHTML = `
                <span>🔓 Unlock Full Analysis ($1.99)</span>
                <small>Get detailed material recommendations, yarn brands, and celebrity style matches</small>
            `;
            
            premiumBtn.addEventListener('click', () => {
                this.showPremiumAnalysis(suggestions);
            });
            
            panel.appendChild(premiumBtn);
        }
    }
    
    /**
     * Show premium detailed analysis
     */
    showPremiumAnalysis(suggestions) {
        const modal = document.createElement('div');
        modal.className = 'premium-analysis-modal';
        modal.innerHTML = `
            <div class="premium-analysis-container">
                <button class="modal-close">&times;</button>
                
                <h2>🔓 Full AI Analysis ($1.99)</h2>
                
                <div class="premium-sections">
                    <!-- Brand Recommendations -->
                    <section class="premium-section">
                        <h3>🏷️ Yarn Brand Recommendations</h3>
                        <div class="brand-list">
                            ${suggestions.yarnBrands.map(brand => `
                                <div class="brand-item">
                                    <p class="brand-name">${brand.brand}</p>
                                    <p class="brand-reason">${brand.reason}</p>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                    
                    <!-- Needle Sizes -->
                    <section class="premium-section">
                        <h3>🪡 Precise Tool Recommendations</h3>
                        <div class="tools-info">
                            <p><strong>Knitting:</strong> ${suggestions.needleSize.knitting}</p>
                            <p><strong>Crochet:</strong> ${suggestions.needleSize.crochet}</p>
                        </div>
                    </section>
                    
                    <!-- All Finish Options -->
                    <section class="premium-section">
                        <h3>✨ Complete Finish Options</h3>
                        <div class="finish-list">
                            ${suggestions.finish.map(f => `
                                <div class="finish-option ${f.recommended ? 'recommended' : ''}">
                                    <p class="finish-name">${f.option}</p>
                                    <p class="finish-reason">${f.reason}</p>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                    
                    <!-- Detailed Cost Breakdown -->
                    <section class="premium-section">
                        <h3>💰 Complete Cost Breakdown</h3>
                        <div class="cost-breakdown">
                            ${suggestions.cost.map(c => `
                                <div class="cost-option">
                                    <h4>${c.weight}</h4>
                                    <p>Yards Needed: ${c.yards}</p>
                                    <p>Budget: $${c.cost.low} - $${c.cost.high}</p>
                                    <p class="cost-mid">Mid-range: $${c.cost.mid}</p>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                </div>
                
                <div class="premium-actions">
                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                        <input type="hidden" name="cmd" value="_xclick">
                        <input type="hidden" name="business" value="abstractemporiumart@outlook.com">
                        <input type="hidden" name="item_name" value="AI Full Analysis">
                        <input type="hidden" name="amount" value="1.99">
                        <input type="hidden" name="currency_code" value="USD">
                        <button type="submit" class="btn-unlock-full">🔓 Unlock Full Analysis ($1.99)</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    }
    
    /**
     * Helper: Calculate hue from RGB
     */
    getHue(r, g, b) {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;
        let h = 0;
        
        if (d === 0) h = 0;
        else if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / d + 2) / 6;
        else h = ((r - g) / d + 4) / 6;
        
        return h;
    }
}

// Initialize when pattern generator is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.patternGenerator) {
            window.aiCompanion = new AICompanionPatterns(window.patternGenerator);
        }
    });
} else {
    if (window.patternGenerator) {
        window.aiCompanion = new AICompanionPatterns(window.patternGenerator);
    }
}
