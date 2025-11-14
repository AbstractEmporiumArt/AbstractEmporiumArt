/**
 * Procedural Pattern Generator
 * Transforms abstract artwork into knitting, crochet, and weaving patterns
 * Converts artwork colors, shapes, and flows into stitch-by-stitch charts
 */

class ProceduralPatternGenerator {
    constructor() {
        this.imageData = null;
        this.patterns = {
            knitting: null,
            crochet: null,
            weaving: null
        };
        this.complexity = 'medium'; // 'minimal', 'medium', 'dense', 'chaotic', 'geometric'
        this.scale = 1;
        this.colorPalette = [];
        this.symbolMap = new Map();
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.generateSymbolMap();
    }
    
    setupEventListeners() {
        const uploadInput = document.getElementById('patternImageInput');
        if (uploadInput) {
            uploadInput.addEventListener('change', (e) => this.handleImageUpload(e));
        }
        
        const galleryItems = document.querySelectorAll('[data-pattern-artworkid]');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => this.handleGallerySelection(item));
        });
    }
    
    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.processArtwork(img);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    handleGallerySelection(element) {
        const imageSrc = element.dataset.imageSrc;
        if (imageSrc) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                this.processArtwork(img);
            };
            img.onerror = () => {
                console.error('Could not load image from gallery');
            };
            img.src = imageSrc;
        }
    }
    
    processArtwork(img) {
        // Convert image to canvas and extract pixel data
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Resize for processing efficiency
        const maxSize = 200;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
            if (width > maxSize) {
                height = Math.round(height * maxSize / width);
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width = Math.round(width * maxSize / height);
                height = maxSize;
            }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        this.imageData = ctx.getImageData(0, 0, width, height);
        
        // Extract color palette
        this.extractColorPalette();
        
        // Generate patterns
        this.generateKnittingPattern();
        this.generateCrochetPattern();
        this.generateWeavingPattern();
        
        // Track the pattern generation
        if (window.userTracker) {
            window.userTracker.trackPatternGeneration('image', this.complexity, 'all');
        }
        
        // Display results
        this.displayPatterns();
    }
    
    extractColorPalette() {
        const data = this.imageData.data;
        const colorFrequency = new Map();
        
        // Sample every 4th pixel for efficiency
        for (let i = 0; i < data.length; i += 16) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            if (a > 128) { // Only consider non-transparent
                const color = this.rgbToHex(r, g, b);
                colorFrequency.set(color, (colorFrequency.get(color) || 0) + 1);
            }
        }
        
        // Sort by frequency and get top 8 colors
        this.colorPalette = Array.from(colorFrequency.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(entry => entry[0]);
        
        // Ensure we have at least 2 colors
        if (this.colorPalette.length < 2) {
            this.colorPalette = ['#000000', '#FFFFFF'];
        }
    }
    
    rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('').toUpperCase();
    }
    
    generateSymbolMap() {
        // Map colors to knitting/crochet symbols
        this.symbolMap = new Map([
            ['knit', {
                'K': 'K',  // Knit
                'P': 'P',  // Purl
                'Y': 'Y',  // Yarn over
                'D': 'D',  // Decrease
                'I': 'I',  // Inc
            }],
            ['crochet', {
                'ch': 'o',     // Chain
                'sc': 'x',     // Single crochet
                'dc': 'T',     // Double crochet
                'tr': 't',     // Treble
                'sl': '·',     // Slip stitch
            }],
            ['weaving', {
                'up': '/',
                'down': '\\',
                'over': '▓',
                'under': '░',
            }]
        ]);
    }
    
    generateKnittingPattern() {
        if (!this.imageData) return;
        
        const width = this.imageData.width;
        const height = this.imageData.height;
        const data = this.imageData.data;
        
        const pattern = [];
        const complexityMultiplier = this.getComplexityMultiplier();
        
        for (let y = 0; y < height; y += Math.ceil(1 / complexityMultiplier)) {
            let row = '';
            for (let x = 0; x < width; x += Math.ceil(1 / complexityMultiplier)) {
                const pixelIndex = (y * width + x) * 4;
                const r = data[pixelIndex];
                const g = data[pixelIndex + 1];
                const b = data[pixelIndex + 2];
                
                // Determine stitch based on brightness
                const brightness = (r + g + b) / 3;
                const stitch = this.brightnessToKnittingStitch(brightness);
                row += stitch;
            }
            pattern.push(row);
        }
        
        this.patterns.knitting = pattern;
        this.generateKnittingChart();
    }
    
    brightnessToKnittingStitch(brightness) {
        if (brightness < 64) return 'D';    // Dark - Decrease
        if (brightness < 128) return 'K';   // Medium - Knit
        if (brightness < 192) return 'P';   // Light - Purl
        return 'Y';                         // Very light - Yarn over
    }
    
    generateCrochetPattern() {
        if (!this.imageData) return;
        
        const width = this.imageData.width;
        const height = this.imageData.height;
        const data = this.imageData.data;
        
        const pattern = [];
        const complexityMultiplier = this.getComplexityMultiplier();
        
        for (let y = 0; y < height; y += Math.ceil(2 / complexityMultiplier)) {
            let row = '';
            for (let x = 0; x < width; x += Math.ceil(2 / complexityMultiplier)) {
                const pixelIndex = (y * width + x) * 4;
                const r = data[pixelIndex];
                const g = data[pixelIndex + 1];
                const b = data[pixelIndex + 2];
                
                // Analyze color for crochet stitch
                const hue = this.getHue(r, g, b);
                const brightness = (r + g + b) / 3;
                
                let stitch;
                if (brightness < 50) {
                    stitch = '·'; // Slip stitch - very dark
                } else if (brightness < 100) {
                    stitch = 'x'; // Single crochet - dark
                } else if (brightness < 150) {
                    stitch = 'T'; // Double crochet - medium
                } else if (brightness < 200) {
                    stitch = 't'; // Treble - light
                } else {
                    stitch = 'o'; // Chain - very light
                }
                
                row += stitch;
            }
            pattern.push(row);
        }
        
        this.patterns.crochet = pattern;
        this.generateCrochetChart();
    }
    
    generateWeavingPattern() {
        if (!this.imageData) return;
        
        const width = this.imageData.width;
        const height = this.imageData.height;
        const data = this.imageData.data;
        
        const pattern = [];
        const complexityMultiplier = this.getComplexityMultiplier();
        
        for (let y = 0; y < height; y += Math.ceil(1 / complexityMultiplier)) {
            let row = '';
            for (let x = 0; x < width; x += Math.ceil(1 / complexityMultiplier)) {
                const pixelIndex = (y * width + x) * 4;
                const r = data[pixelIndex];
                const g = data[pixelIndex + 1];
                const b = data[pixelIndex + 2];
                
                const brightness = (r + g + b) / 3;
                const pattern = brightness > 128 ? '▓' : '░'; // Over or under
                row += pattern;
            }
            pattern.push(row);
        }
        
        this.patterns.weaving = pattern;
        this.generateWeavingChart();
    }
    
    getComplexityMultiplier() {
        const multipliers = {
            'minimal': 0.3,
            'medium': 0.6,
            'dense': 1.0,
            'chaotic': 1.2,
            'geometric': 0.8
        };
        return multipliers[this.complexity] || 0.6;
    }
    
    getHue(r, g, b) {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let hue = 0;
        
        if (max !== min) {
            const d = max - min;
            switch (max) {
                case r: hue = (g - b) / d + (g < b ? 6 : 0); break;
                case g: hue = (b - r) / d + 2; break;
                case b: hue = (r - g) / d + 4; break;
            }
            hue /= 6;
        }
        
        return hue;
    }
    
    generateKnittingChart() {
        const container = document.getElementById('knittingChart');
        if (!container || !this.patterns.knitting) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const cellSize = 20;
        const rows = this.patterns.knitting.length;
        const cols = Math.max(...this.patterns.knitting.map(r => r.length));
        
        canvas.width = cols * cellSize;
        canvas.height = rows * cellSize;
        
        // Draw chart
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 0.5;
        
        // Draw grid and symbols
        for (let y = 0; y < rows; y++) {
            const row = this.patterns.knitting[y];
            for (let x = 0; x < row.length; x++) {
                const symbol = row[x];
                const gridX = x * cellSize;
                const gridY = y * cellSize;
                
                // Draw cell
                ctx.strokeRect(gridX, gridY, cellSize, cellSize);
                
                // Draw symbol
                ctx.fillStyle = '#333';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(symbol, gridX + cellSize / 2, gridY + cellSize / 2);
            }
        }
        
        container.innerHTML = '';
        container.appendChild(canvas);
        
        // Add legend
        this.addKnittingLegend(container);
        
        // Add download button
        this.addDownloadButton(container, canvas, 'knitting');
    }
    
    generateCrochetChart() {
        const container = document.getElementById('crochetChart');
        if (!container || !this.patterns.crochet) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const cellSize = 20;
        const rows = this.patterns.crochet.length;
        const cols = Math.max(...this.patterns.crochet.map(r => r.length));
        
        canvas.width = cols * cellSize;
        canvas.height = rows * cellSize;
        
        // Draw chart
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 0.5;
        
        for (let y = 0; y < rows; y++) {
            const row = this.patterns.crochet[y];
            for (let x = 0; x < row.length; x++) {
                const symbol = row[x];
                const gridX = x * cellSize;
                const gridY = y * cellSize;
                
                ctx.strokeRect(gridX, gridY, cellSize, cellSize);
                
                ctx.fillStyle = '#333';
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(symbol, gridX + cellSize / 2, gridY + cellSize / 2);
            }
        }
        
        container.innerHTML = '';
        container.appendChild(canvas);
        
        // Add legend
        this.addCrochetLegend(container);
        
        // Add download button
        this.addDownloadButton(container, canvas, 'crochet');
    }
    
    generateWeavingChart() {
        const container = document.getElementById('weavingChart');
        if (!container || !this.patterns.weaving) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const cellSize = 15;
        const rows = this.patterns.weaving.length;
        const cols = Math.max(...this.patterns.weaving.map(r => r.length));
        
        canvas.width = cols * cellSize;
        canvas.height = rows * cellSize;
        
        // Draw weaving pattern
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let y = 0; y < rows; y++) {
            const row = this.patterns.weaving[y];
            for (let x = 0; x < row.length; x++) {
                const symbol = row[x];
                const gridX = x * cellSize;
                const gridY = y * cellSize;
                
                // Draw pattern
                if (symbol === '▓') {
                    ctx.fillStyle = '#000000';
                } else {
                    ctx.fillStyle = '#cccccc';
                }
                ctx.fillRect(gridX, gridY, cellSize, cellSize);
                
                // Grid lines
                ctx.strokeStyle = '#ddd';
                ctx.lineWidth = 0.5;
                ctx.strokeRect(gridX, gridY, cellSize, cellSize);
            }
        }
        
        container.innerHTML = '';
        container.appendChild(canvas);
        
        // Add legend
        this.addWeavingLegend(container);
        
        // Add download button
        this.addDownloadButton(container, canvas, 'weaving');
    }
    
    addKnittingLegend(container) {
        const legend = document.createElement('div');
        legend.className = 'pattern-legend';
        legend.innerHTML = `
            <h4>Knitting Stitch Legend</h4>
            <div class="legend-item"><strong>K</strong> - Knit (Medium)</div>
            <div class="legend-item"><strong>P</strong> - Purl (Light)</div>
            <div class="legend-item"><strong>Y</strong> - Yarn Over (Very Light)</div>
            <div class="legend-item"><strong>D</strong> - Decrease (Dark)</div>
        `;
        container.appendChild(legend);
    }
    
    addCrochetLegend(container) {
        const legend = document.createElement('div');
        legend.className = 'pattern-legend';
        legend.innerHTML = `
            <h4>Crochet Stitch Legend</h4>
            <div class="legend-item"><strong>o</strong> - Chain (Very Light)</div>
            <div class="legend-item"><strong>t</strong> - Treble (Light)</div>
            <div class="legend-item"><strong>T</strong> - Double Crochet (Medium)</div>
            <div class="legend-item"><strong>x</strong> - Single Crochet (Dark)</div>
            <div class="legend-item"><strong>·</strong> - Slip Stitch (Very Dark)</div>
        `;
        container.appendChild(legend);
    }
    
    addWeavingLegend(container) {
        const legend = document.createElement('div');
        legend.className = 'pattern-legend';
        legend.innerHTML = `
            <h4>Weaving Pattern Legend</h4>
            <div class="legend-item"><div style="display: inline-block; width: 20px; height: 20px; background: #000; margin-right: 10px;"></div> Over (Dark)</div>
            <div class="legend-item"><div style="display: inline-block; width: 20px; height: 20px; background: #ccc; margin-right: 10px;"></div> Under (Light)</div>
        `;
        container.appendChild(legend);
    }
    
    addDownloadButton(container, canvas, patternType) {
        const button = document.createElement('button');
        button.className = 'pattern-download-btn';
        button.textContent = `Download ${patternType.charAt(0).toUpperCase() + patternType.slice(1)} Pattern PDF`;
        button.onclick = () => this.downloadPatternPDF(patternType, canvas);
        container.appendChild(button);
    }
    
    downloadPatternPDF(patternType, canvas) {
        // Create a data URL from canvas
        const imageData = canvas.toDataURL('image/png');
        
        // Simple download as PNG (PDF generation would require a library like jsPDF)
        const link = document.createElement('a');
        link.href = imageData;
        link.download = `${patternType}-pattern-${Date.now()}.png`;
        link.click();
    }
    
    displayPatterns() {
        // Scroll to patterns section
        const patternsSection = document.getElementById('patternResults');
        if (patternsSection) {
            patternsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    setComplexity(complexity) {
        if (['minimal', 'medium', 'dense', 'chaotic', 'geometric'].includes(complexity)) {
            this.complexity = complexity;
            // Regenerate patterns with new complexity
            if (this.imageData) {
                this.generateKnittingPattern();
                this.generateCrochetPattern();
                this.generateWeavingPattern();
            }
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('patternGenerator')) {
        window.patternGenerator = new ProceduralPatternGenerator();
    }
});
