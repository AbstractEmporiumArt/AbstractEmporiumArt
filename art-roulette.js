/**
 * Art Roulette - Mystery Pattern Generator
 * 
 * Users pay $2.99 to reveal a mystery pattern
 * Generates 3 random craft types (not just knitting)
 * Includes surprise bonuses: colors, materials, difficulty
 */

class ArtRoulette {
    constructor() {
        this.mysteries = [];
        this.revealedMysteries = [];
        this.craftTypes = ['knitting', 'crochet', 'weaving'];
        this.premiumFeatures = ['color-recommendations', 'material-costs', 'difficulty-score', 'yarn-weights', 'time-estimate'];
        
        this.init();
    }
    
    init() {
        this.loadMysteries();
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const rouletteBtn = document.getElementById('artRouletteBtn');
        if (rouletteBtn) {
            rouletteBtn.addEventListener('click', () => this.startRoulette());
        }
        
        const revealBtns = document.querySelectorAll('[data-reveal-mystery]');
        revealBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mysteryId = e.target.dataset.revealMystery;
                this.handleRevealAttempt(mysteryId);
            });
        });
    }
    
    /**
     * Start the roulette wheel animation
     */
    startRoulette() {
        const modal = this.createRouletteModal();
        document.body.appendChild(modal);
        
        // Animate the roulette
        this.animateWheel(modal);
    }
    
    /**
     * Create the visual roulette modal
     */
    createRouletteModal() {
        const modal = document.createElement('div');
        modal.className = 'roulette-modal';
        modal.innerHTML = `
            <div class="roulette-container">
                <div class="roulette-header">
                    <h2>🎡 Art Roulette - Mystery Generator</h2>
                    <p>Spin the wheel and discover a mysterious pattern!</p>
                </div>
                
                <div class="roulette-wheel-container">
                    <div class="roulette-wheel">
                        <div class="wheel-item">🧶</div>
                        <div class="wheel-item">🪝</div>
                        <div class="wheel-item">🪡</div>
                        <div class="wheel-item">🎨</div>
                        <div class="wheel-item">✨</div>
                        <div class="wheel-item">💎</div>
                    </div>
                    <div class="roulette-pointer"></div>
                </div>
                
                <div class="roulette-info">
                    <p class="spinning-text">Spinning...</p>
                </div>
                
                <div class="roulette-actions">
                    <button class="roulette-spin-btn">🎲 Spin Again ($2.99)</button>
                    <button class="roulette-close-btn">Close</button>
                </div>
            </div>
        `;
        
        modal.querySelector('.roulette-close-btn').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.querySelector('.roulette-spin-btn').addEventListener('click', () => {
            modal.querySelector('.spinning-text').textContent = 'Spinning...';
            this.animateWheel(modal);
        });
        
        return modal;
    }
    
    /**
     * Animate the wheel and generate mystery
     */
    animateWheel(modal) {
        const wheel = modal.querySelector('.roulette-wheel');
        const spinBtn = modal.querySelector('.roulette-spin-btn');
        const infoDiv = modal.querySelector('.roulette-info');
        
        spinBtn.disabled = true;
        wheel.style.animation = 'none';
        
        // Trigger reflow to restart animation
        void wheel.offsetWidth;
        
        // Random rotation (multiple spins + final position)
        const randomRotation = Math.floor(Math.random() * 360) + 1080;
        wheel.style.transform = `rotate(${randomRotation}deg)`;
        wheel.style.animation = `spinWheel 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        
        // After animation, generate mystery
        setTimeout(() => {
            const mystery = this.generateMystery();
            this.displayMysteryPreview(infoDiv, mystery);
            spinBtn.disabled = false;
            spinBtn.textContent = '🎲 Reveal Pattern ($2.99)';
            spinBtn.onclick = () => this.handlePaymentFlow(mystery, modal);
        }, 3000);
    }
    
    /**
     * Generate a random mystery pattern
     */
    generateMystery() {
        const id = `mystery_${Date.now()}`;
        const craftType = this.craftTypes[Math.floor(Math.random() * this.craftTypes.length)];
        const complexity = ['minimal', 'medium', 'dense', 'chaotic', 'geometric'][Math.floor(Math.random() * 5)];
        
        // Random bonuses included
        const bonusFeatures = [];
        for (let i = 0; i < 3; i++) {
            if (Math.random() > 0.4) {
                const bonus = this.premiumFeatures[Math.floor(Math.random() * this.premiumFeatures.length)];
                if (!bonusFeatures.includes(bonus)) {
                    bonusFeatures.push(bonus);
                }
            }
        }
        
        const mystery = {
            id,
            craftType,
            complexity,
            bonusFeatures,
            colors: this.generateColorPalette(),
            timestamp: Date.now(),
            revealed: false,
            materials: this.generateMaterials(craftType),
            difficulty: this.calculateDifficulty(complexity),
            timeEstimate: this.calculateTime(complexity),
            surpriseFactor: Math.floor(Math.random() * 100)
        };
        
        this.mysteries.push(mystery);
        localStorage.setItem('artRouletteMysteries', JSON.stringify(this.mysteries));
        
        return mystery;
    }
    
    /**
     * Display mystery preview (hidden details)
     */
    displayMysteryPreview(container, mystery) {
        container.innerHTML = `
            <div class="mystery-preview">
                <div class="mystery-reveal-box">
                    <h3>✨ You've spun a mystery! ✨</h3>
                    <div class="mystery-teaser">
                        <p class="tease-item">🎨 Craft Type: <strong>???</strong></p>
                        <p class="tease-item">📊 Complexity: <strong>???</strong></p>
                        <p class="tease-item">🎁 Bonus Features: <strong>${mystery.bonusFeatures.length} Included!</strong></p>
                        <p class="surprise-meter">Surprise Factor: ${mystery.surpriseFactor}%</p>
                    </div>
                    <p class="mystery-hint">Click "Reveal Pattern" to unlock all details!</p>
                </div>
            </div>
        `;
    }
    
    /**
     * Handle payment flow and pattern reveal
     */
    handlePaymentFlow(mystery, modal) {
        // Create payment form
        const form = document.createElement('form');
        form.action = 'https://www.paypal.com/cgi-bin/webscr';
        form.method = 'post';
        form.target = '_blank';
        
        form.innerHTML = `
            <input type="hidden" name="cmd" value="_xclick">
            <input type="hidden" name="business" value="abstractemporiumart@outlook.com">
            <input type="hidden" name="item_name" value="Art Roulette - Mystery Pattern Reveal">
            <input type="hidden" name="amount" value="2.99">
            <input type="hidden" name="currency_code" value="USD">
            <input type="hidden" name="custom" value="${mystery.id}">
        `;
        
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        
        // Store for later reveal (in real system, webhook would confirm payment)
        this.revealMystery(mystery);
    }
    
    /**
     * Reveal the full mystery pattern
     */
    revealMystery(mystery) {
        mystery.revealed = true;
        this.revealedMysteries.push(mystery);
        localStorage.setItem('revealedMysteries', JSON.stringify(this.revealedMysteries));
        
        // Create reveal display
        const revealContainer = document.createElement('div');
        revealContainer.className = 'mystery-reveal-fullscreen';
        revealContainer.innerHTML = `
            <div class="mystery-full-reveal">
                <button class="close-reveal">&times;</button>
                
                <div class="reveal-animation">
                    <div class="reveal-flash"></div>
                    <div class="reveal-content">
                        <h2>🎉 Your Mystery Revealed! 🎉</h2>
                        
                        <div class="mystery-details">
                            <div class="detail-section">
                                <h3>Craft Type</h3>
                                <p class="craft-emoji">${this.getCraftEmoji(mystery.craftType)}</p>
                                <p class="craft-name">${mystery.craftType.toUpperCase()}</p>
                            </div>
                            
                            <div class="detail-section">
                                <h3>Complexity</h3>
                                <p class="complexity-level">${mystery.complexity.toUpperCase()}</p>
                            </div>
                            
                            <div class="detail-section">
                                <h3>Colors Included</h3>
                                <div class="color-palette">
                                    ${mystery.colors.map(color => `
                                        <div class="color-swatch" style="background-color: ${color}" title="${color}"></div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div class="detail-section">
                                <h3>📋 Pattern Details</h3>
                                <ul class="pattern-specs">
                                    <li>Difficulty: <strong>${mystery.difficulty}/10</strong></li>
                                    <li>Time to Complete: <strong>${mystery.timeEstimate} hours</strong></li>
                                    <li>Materials: <strong>${mystery.materials.join(', ')}</strong></li>
                                </ul>
                            </div>
                            
                            <div class="bonus-features">
                                <h3>🎁 Bonus Features</h3>
                                <ul>
                                    ${mystery.bonusFeatures.map(bonus => `
                                        <li>✨ ${this.formatBonusName(bonus)}</li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <div class="reveal-actions">
                            <button class="btn-generate-pattern">Generate My Pattern</button>
                            <button class="btn-save-mystery">Save for Later</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(revealContainer);
        
        revealContainer.querySelector('.close-reveal').addEventListener('click', () => {
            revealContainer.remove();
        });
        
        revealContainer.querySelector('.btn-generate-pattern').addEventListener('click', () => {
            this.generatePatternFromMystery(mystery);
            revealContainer.remove();
        });
        
        revealContainer.querySelector('.btn-save-mystery').addEventListener('click', () => {
            alert('Mystery saved! View your collection on the dashboard.');
            revealContainer.remove();
        });
    }
    
    /**
     * Generate actual pattern from mystery specifications
     */
    generatePatternFromMystery(mystery) {
        // Trigger pattern generator with preset values
        if (window.patternGenerator) {
            // Create a blank canvas with the mystery's color palette
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 400;
            const ctx = canvas.getContext('2d');
            
            // Fill with mystery colors in abstract way
            for (let i = 0; i < mystery.colors.length; i++) {
                ctx.fillStyle = mystery.colors[i];
                const startAngle = (i / mystery.colors.length) * Math.PI * 2;
                const endAngle = ((i + 1) / mystery.colors.length) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(200, 200);
                ctx.arc(200, 200, 200, startAngle, endAngle);
                ctx.fill();
            }
            
            // Convert to image and process
            canvas.toBlob((blob) => {
                const file = new File([blob], 'mystery-pattern.png', { type: 'image/png' });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                
                const input = document.getElementById('patternImageInput');
                if (input) {
                    input.files = dataTransfer.files;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                    
                    // Set complexity
                    const complexitySelect = document.getElementById('complexitySelect');
                    if (complexitySelect) {
                        complexitySelect.value = mystery.complexity;
                        complexitySelect.dispatchEvent(new Event('change'));
                    }
                    
                    // Navigate to pattern page
                    window.location.href = 'pattern.html';
                }
            });
        }
    }
    
    /**
     * Helper: Generate color palette
     */
    generateColorPalette() {
        const colors = [];
        const count = Math.floor(Math.random() * 3) + 4; // 4-6 colors
        
        for (let i = 0; i < count; i++) {
            const hue = Math.random() * 360;
            const saturation = Math.floor(Math.random() * 30) + 50;
            const lightness = Math.floor(Math.random() * 30) + 40;
            colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }
        
        return colors;
    }
    
    /**
     * Helper: Generate materials list
     */
    generateMaterials(craftType) {
        const materials = {
            knitting: ['Yarn (Worsted Weight)', 'Size 8 Needles', 'Yarn Needle', 'Stitch Markers'],
            crochet: ['Yarn (Worsted Weight)', 'Size G Hook', 'Yarn Needle', 'Stitch Markers'],
            weaving: ['Loom', 'Warp Thread', 'Weft Thread', 'Shuttle', 'Beater']
        };
        
        return materials[craftType] || materials.knitting;
    }
    
    /**
     * Helper: Calculate difficulty
     */
    calculateDifficulty(complexity) {
        const difficultyMap = {
            minimal: 2,
            medium: 5,
            dense: 7,
            chaotic: 9,
            geometric: 6
        };
        return difficultyMap[complexity] || 5;
    }
    
    /**
     * Helper: Calculate time estimate
     */
    calculateTime(complexity) {
        const timeMap = {
            minimal: 3,
            medium: 8,
            dense: 15,
            chaotic: 20,
            geometric: 12
        };
        return timeMap[complexity] || 8;
    }
    
    /**
     * Helper: Get craft emoji
     */
    getCraftEmoji(craftType) {
        const emojiMap = {
            knitting: '🧶',
            crochet: '🪝',
            weaving: '🪡'
        };
        return emojiMap[craftType] || '🎨';
    }
    
    /**
     * Helper: Format bonus name
     */
    formatBonusName(bonus) {
        return bonus
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    /**
     * Load mysteries from localStorage
     */
    loadMysteries() {
        const stored = localStorage.getItem('artRouletteMysteries');
        if (stored) {
            try {
                this.mysteries = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading mysteries:', e);
            }
        }
        
        const revealedStored = localStorage.getItem('revealedMysteries');
        if (revealedStored) {
            try {
                this.revealedMysteries = JSON.parse(revealedStored);
            } catch (e) {
                console.error('Error loading revealed mysteries:', e);
            }
        }
    }
    
    /**
     * Handle reveal attempt (user clicks reveal button)
     */
    handleRevealAttempt(mysteryId) {
        const mystery = this.mysteries.find(m => m.id === mysteryId);
        if (mystery) {
            this.revealMystery(mystery);
        }
    }
}

// Initialize when ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.artRoulette = new ArtRoulette();
    });
} else {
    window.artRoulette = new ArtRoulette();
}
