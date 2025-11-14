/**
 * Community Canvas Enhanced Features
 * Adds: Layers, Filters, Undo/Redo, Color Presets, Animation Mode, Snapshot Gallery
 */

class CommunityCanvasEnhanced {
    constructor(canvasInstance) {
        this.canvas = canvasInstance;
        this.history = [];
        this.historyIndex = -1;
        this.maxHistory = 50;
        
        // Layers system
        this.layers = [
            { name: 'Background', visible: true, opacity: 1, data: null },
            { name: 'Contributions', visible: true, opacity: 1, data: null },
            { name: 'Effects', visible: true, opacity: 0.7, data: null }
        ];
        this.activeLayer = 1; // Contributions layer
        
        // Filters
        this.filters = {
            blur: 0,
            brightness: 100,
            contrast: 100,
            saturation: 100,
            sepia: 0
        };
        
        // Color presets
        this.colorPresets = [
            '#6c5ce7', // Purple
            '#a29bfe', // Light purple
            '#fd79a8', // Pink
            '#fdcb6e', // Yellow
            '#6c5ce7', // Blue
            '#00b894', // Green
            '#ff7675', // Red
            '#2d3436'  // Dark
        ];
        
        // Snapshot gallery
        this.snapshots = [];
        this.maxSnapshots = 10;
        
        // Animation mode
        this.animationMode = false;
        this.animationSpeed = 1;
        this.particleEffects = [];
        
        this.init();
    }
    
    init() {
        this.loadEnhancedData();
        this.setupEnhancedUI();
        this.setupKeyboardShortcuts();
    }
    
    /**
     * History Management - Undo/Redo
     */
    saveToHistory() {
        // Remove any forward history if we're not at the end
        if (this.historyIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.historyIndex + 1);
        }
        
        // Save current canvas state
        const imageData = this.canvas.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.history.push(imageData);
        this.historyIndex++;
        
        // Limit history size
        if (this.history.length > this.maxHistory) {
            this.history.shift();
            this.historyIndex--;
        }
        
        this.saveToLocalStorage();
    }
    
    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.applyHistoryState();
        }
    }
    
    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.applyHistoryState();
        }
    }
    
    applyHistoryState() {
        if (this.history[this.historyIndex]) {
            this.canvas.ctx.putImageData(this.history[this.historyIndex], 0, 0);
        }
    }
    
    /**
     * Layer Management
     */
    addLayer(name) {
        this.layers.push({
            name: name,
            visible: true,
            opacity: 1,
            data: this.canvas.ctx.createImageData(this.canvas.width, this.canvas.height)
        });
        return this.layers.length - 1;
    }
    
    deleteLayer(index) {
        if (this.layers.length > 1 && index !== this.activeLayer) {
            this.layers.splice(index, 1);
            if (this.activeLayer > index) this.activeLayer--;
            this.saveToHistory();
        }
    }
    
    setActiveLayer(index) {
        if (index >= 0 && index < this.layers.length) {
            this.activeLayer = index;
        }
    }
    
    toggleLayerVisibility(index) {
        if (index >= 0 && index < this.layers.length) {
            this.layers[index].visible = !this.layers[index].visible;
        }
    }
    
    mergeLayersDown(index) {
        if (index > 0 && index < this.layers.length) {
            // Merge current layer into layer below
            this.layers[index - 1].opacity = 1;
            this.layers.splice(index, 1);
            if (this.activeLayer >= index) this.activeLayer--;
            this.saveToHistory();
        }
    }
    
    /**
     * Filter Effects
     */
    applyFilter(filterType, value) {
        this.filters[filterType] = value;
        this.updateFilterDisplay();
    }
    
    updateFilterDisplay() {
        const ctx = this.canvas.ctx;
        let filter = '';
        
        if (this.filters.blur > 0) filter += `blur(${this.filters.blur}px) `;
        filter += `brightness(${this.filters.brightness}%) `;
        filter += `contrast(${this.filters.contrast}%) `;
        filter += `saturate(${this.filters.saturation}%) `;
        if (this.filters.sepia > 0) filter += `sepia(${this.filters.sepia}%) `;
        
        this.canvas.canvasElement.style.filter = filter;
    }
    
    resetFilters() {
        this.filters = {
            blur: 0,
            brightness: 100,
            contrast: 100,
            saturation: 100,
            sepia: 0
        };
        this.canvas.canvasElement.style.filter = 'none';
    }
    
    /**
     * Color Presets
     */
    getColorPresets() {
        return this.colorPresets;
    }
    
    addColorPreset(color) {
        if (!this.colorPresets.includes(color)) {
            this.colorPresets.unshift(color);
            if (this.colorPresets.length > 10) this.colorPresets.pop();
            this.saveToLocalStorage();
        }
    }
    
    /**
     * Snapshot Gallery - Save Canvas States
     */
    takeSnapshot(description = '') {
        const snapshot = {
            id: Date.now(),
            description: description || `Snapshot ${this.snapshots.length + 1}`,
            timestamp: new Date().toLocaleTimeString(),
            thumbnail: this.canvas.canvasElement.toDataURL('image/png', 0.3),
            fullImage: this.canvas.canvasElement.toDataURL('image/png')
        };
        
        this.snapshots.unshift(snapshot);
        
        if (this.snapshots.length > this.maxSnapshots) {
            this.snapshots.pop();
        }
        
        this.saveToLocalStorage();
        return snapshot;
    }
    
    restoreSnapshot(snapshotId) {
        const snapshot = this.snapshots.find(s => s.id === snapshotId);
        if (snapshot) {
            const img = new Image();
            img.onload = () => {
                this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.canvas.ctx.drawImage(img, 0, 0);
                this.saveToHistory();
            };
            img.src = snapshot.fullImage;
        }
    }
    
    deleteSnapshot(snapshotId) {
        this.snapshots = this.snapshots.filter(s => s.id !== snapshotId);
        this.saveToLocalStorage();
    }
    
    getSnapshots() {
        return this.snapshots;
    }
    
    /**
     * Particle Effects
     */
    addParticleEffect(x, y, type = 'spark') {
        const types = {
            spark: { color: '#FFD700', life: 30, speed: 2 },
            burst: { color: '#FF69B4', life: 40, speed: 3 },
            rain: { color: '#87CEEB', life: 50, speed: 1 }
        };
        
        const effect = types[type] || types.spark;
        
        for (let i = 0; i < 10; i++) {
            this.particleEffects.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * effect.speed,
                vy: (Math.random() - 0.5) * effect.speed,
                life: effect.life,
                maxLife: effect.life,
                color: effect.color
            });
        }
    }
    
    updateParticles() {
        this.particleEffects = this.particleEffects.filter(p => p.life > 0);
        
        this.particleEffects.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            
            const alpha = p.life / p.maxLife;
            this.canvas.ctx.globalAlpha = alpha;
            this.canvas.ctx.fillStyle = p.color;
            this.canvas.ctx.fillRect(p.x, p.y, 3, 3);
            this.canvas.ctx.globalAlpha = 1;
        });
    }
    
    /**
     * Animation Mode
     */
    toggleAnimationMode() {
        this.animationMode = !this.animationMode;
        return this.animationMode;
    }
    
    setAnimationSpeed(speed) {
        this.animationSpeed = speed;
    }
    
    /**
     * Keyboard Shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'z') {
                    e.preventDefault();
                    this.undo();
                } else if (e.key === 'y' || (e.shiftKey && e.key === 'z')) {
                    e.preventDefault();
                    this.redo();
                } else if (e.key === 's') {
                    e.preventDefault();
                    this.takeSnapshot();
                }
            }
        });
    }
    
    /**
     * Data Persistence
     */
    saveToLocalStorage() {
        const data = {
            snapshots: this.snapshots,
            colorPresets: this.colorPresets,
            filters: this.filters
        };
        localStorage.setItem('canvasEnhanced', JSON.stringify(data));
    }
    
    loadEnhancedData() {
        const data = JSON.parse(localStorage.getItem('canvasEnhanced') || '{}');
        if (data.snapshots) this.snapshots = data.snapshots;
        if (data.colorPresets) this.colorPresets = data.colorPresets;
        if (data.filters) this.filters = { ...this.filters, ...data.filters };
    }
    
    setupEnhancedUI() {
        // This will be called from HTML to set up UI controls
        console.log('Enhanced Canvas UI ready');
    }
    
    /**
     * Export features
     */
    exportAsAnimatedGif() {
        // Would require gif.js library
        console.log('GIF export would require external library');
    }
    
    exportAsVideo() {
        // Would require MediaRecorder API
        const canvas = this.canvas.canvasElement;
        const stream = canvas.captureStream(30);
        return stream;
    }
}

// Export for use
window.CommunityCanvasEnhanced = CommunityCanvasEnhanced;
