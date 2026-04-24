/**
 * Enhanced Procedural Pattern Generator
 * Transforms abstract artwork into knitting, crochet, and weaving patterns
 * Features: Drag-drop upload, auto-processing, instant preview, individual downloads
 */

class EnhancedPatternGenerator {
    constructor() {
        this.imageData = null;
        this.patterns = {
            knitting: null,
            crochet: null,
            weaving: null
        };
        this.complexity = 'medium';
        this.colorPalette = [];
        this.currentImage = null;
        
        this.init();
    }
    
    init() {
        this.setupDragDrop();
        this.setupFileInput();
    }
    
    setupDragDrop() {
        const dropZone = document.getElementById('upload-zone');
        const uploadArea = document.getElementById('uploadArea');
        
        if (!dropZone) return;
        
        // Prevent defaults for drag events
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });
        
        // Visual feedback for drag
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                uploadArea.classList.add('drag-over');
            });
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                uploadArea.classList.remove('drag-over');
            });
        });
        
        // Handle drop
        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            this.handleFiles(files);
        });
        
        // Click to upload
        dropZone.addEventListener('click', () => {
            document.getElementById('imageUpload').click();
        });
    }
    
    setupFileInput() {
        const fileInput = document.getElementById('imageUpload');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFiles(e.target.files);
            });
        }
    }
    
    handleFiles(files) {
        if (!files || files.length === 0) return;
        
        const file = files[0];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showError('Please upload an image file (JPG, PNG, GIF)');
            return;
        }
        
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            this.showError('Image file is too large. Please upload an image under 10MB.');
            return;
        }
        
        this.processImageFile(file);
    }
    
    processImageFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            
            img.onload = () => {
                this.currentImage = img;
                this.showProcessingState();
                
                // Short delay for UX (shows loading state)
                setTimeout(() => {
                    this.processArtwork(img);
                }, 300);
            };
            
            img.onerror = () => {
                this.showError('Failed to load image. Please try another file.');
            };
            
            img.src = e.target.result;
        };
        
        reader.onerror = () => {
            this.showError('Failed to read file. Please try again.');
        };
        
        reader.readAsDataURL(file);
    }
    
    processArtwork(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Resize image for performance (max 200px)
        const maxSize = 200;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
            if (width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
            }
        } else {
            if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
            }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        this.imageData = ctx.getImageData(0, 0, width, height);
        this.extractColorPalette();
        
        // Generate all patterns automatically
        this.generateAllPatterns();
    }
    
    extractColorPalette() {
        if (!this.imageData) return;
        
        const data = this.imageData.data;
        const colorMap = new Map();
        
        // Sample every 4th pixel for performance
        for (let i = 0; i < data.length; i += 16) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const key = `${r},${g},${b}`;
            colorMap.set(key, (colorMap.get(key) || 0) + 1);
        }
        
        // Sort by frequency and get top 8 colors
        const sortedColors = Array.from(colorMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([key]) => {
                const [r, g, b] = key.split(',').map(Number);
                return { r, g, b };
            });
        
        this.colorPalette = sortedColors;
    }
    
    generateAllPatterns() {
        this.generateKnittingPattern();
        this.generateCrochetPattern();
        this.generateWeavingPattern();
        this.displayPatterns();
    }
    
    generateKnittingPattern() {
        if (!this.imageData) return;
        
        const width = this.imageData.width;
        const height = this.imageData.height;
        const data = this.imageData.data;
        
        const pattern = [];
        
        for (let y = 0; y < height; y += 2) {
            let row = '';
            for (let x = 0; x < width; x += 2) {
                const pixelIndex = (y * width + x) * 4;
                const r = data[pixelIndex];
                const g = data[pixelIndex + 1];
                const b = data[pixelIndex + 2];
                
                const brightness = (r + g + b) / 3;
                const stitch = this.brightnessToKnittingStitch(brightness);
                row += stitch;
            }
            pattern.push(row);
        }
        
        this.patterns.knitting = pattern;
    }
    
    brightnessToKnittingStitch(brightness) {
        if (brightness < 64) return 'D'; // Dark (decrease/purl)
        if (brightness < 128) return 'K'; // Knit
        if (brightness < 192) return 'P'; // Purl
        return 'Y'; // Yarn over (light)
    }
    
    generateCrochetPattern() {
        if (!this.imageData) return;
        
        const width = this.imageData.width;
        const height = this.imageData.height;
        const data = this.imageData.data;
        
        const pattern = [];
        
        for (let y = 0; y < height; y += 2) {
            let row = '';
            for (let x = 0; x < width; x += 2) {
                const pixelIndex = (y * width + x) * 4;
                const r = data[pixelIndex];
                const g = data[pixelIndex + 1];
                const b = data[pixelIndex + 2];
                
                const brightness = (r + g + b) / 3;
                const stitch = this.brightnessToCrochetStitch(brightness);
                row += stitch;
            }
            pattern.push(row);
        }
        
        this.patterns.crochet = pattern;
    }
    
    brightnessToCrochetStitch(brightness) {
        if (brightness < 51) return 'S'; // Slip stitch
        if (brightness < 102) return 'C'; // Single crochet
        if (brightness < 153) return 'D'; // Double crochet
        if (brightness < 204) return 'T'; // Triple crochet
        return 'H'; // Chain
    }
    
    generateWeavingPattern() {
        if (!this.imageData) return;
        
        const width = this.imageData.width;
        const height = this.imageData.height;
        const data = this.imageData.data;
        
        const pattern = [];
        
        for (let y = 0; y < height; y += 2) {
            let row = '';
            for (let x = 0; x < width; x += 2) {
                const pixelIndex = (y * width + x) * 4;
                const r = data[pixelIndex];
                const g = data[pixelIndex + 1];
                const b = data[pixelIndex + 2];
                
                const brightness = (r + g + b) / 3;
                const thread = brightness > 128 ? '▓' : '░'; // Over or under
                row += thread;
            }
            pattern.push(row);
        }
        
        this.patterns.weaving = pattern;
    }
    
    displayPatterns() {
        const container = document.getElementById('patternResults');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Create preview grid
        const previewGrid = document.createElement('div');
        previewGrid.className = 'pattern-preview-grid';
        
        // Knitting preview
        if (this.patterns.knitting) {
            const knittingCard = this.createPatternCard('Knitting', this.patterns.knitting, 'K P Y D');
            previewGrid.appendChild(knittingCard);
        }
        
        // Crochet preview
        if (this.patterns.crochet) {
            const crochetCard = this.createPatternCard('Crochet', this.patterns.crochet, 'S C D T H');
            previewGrid.appendChild(crochetCard);
        }
        
        // Weaving preview
        if (this.patterns.weaving) {
            const weavingCard = this.createPatternCard('Weaving', this.patterns.weaving, '▓ ░');
            previewGrid.appendChild(weavingCard);
        }
        
        container.appendChild(previewGrid);
        
        // Show color palette
        this.displayColorPalette(container);
        
        // Show success state
        this.showSuccessState();
    }
    
    createPatternCard(type, pattern, legend) {
        const card = document.createElement('div');
        card.className = 'pattern-card';
        
        // Title
        const title = document.createElement('h3');
        title.textContent = `${type} Pattern`;
        card.appendChild(title);
        
        // Canvas preview
        const canvas = this.createChartCanvas(pattern);
        card.appendChild(canvas);
        
        // Legend
        const legendDiv = document.createElement('div');
        legendDiv.className = 'pattern-legend';
        legendDiv.textContent = `Stitches: ${legend}`;
        card.appendChild(legendDiv);
        
        // Download button
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';
        downloadBtn.textContent = `Download ${type}`;
        downloadBtn.onclick = () => this.downloadPattern(type.toLowerCase(), canvas);
        card.appendChild(downloadBtn);
        
        return card;
    }
    
    createChartCanvas(pattern) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const cellSize = 12;
        const rows = Math.min(pattern.length, 30); // Show max 30 rows in preview
        const cols = Math.min(Math.max(...pattern.map(r => r.length)), 40); // Max 40 cols
        
        canvas.width = cols * cellSize;
        canvas.height = rows * cellSize;
        
        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Grid and symbols
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 0.5;
        
        for (let y = 0; y < rows; y++) {
            const row = pattern[y] || '';
            for (let x = 0; x < cols; x++) {
                const symbol = row[x] || '';
                const gridX = x * cellSize;
                const gridY = y * cellSize;
                
                // Grid cell
                ctx.strokeRect(gridX, gridY, cellSize, cellSize);
                
                // Symbol
                if (symbol) {
                    ctx.fillStyle = '#333';
                    ctx.font = 'bold 10px monospace';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(symbol, gridX + cellSize / 2, gridY + cellSize / 2);
                }
            }
        }
        
        return canvas;
    }
    
    displayColorPalette(container) {
        if (this.colorPalette.length === 0) return;
        
        const paletteDiv = document.createElement('div');
        paletteDiv.className = 'color-palette';
        
        const paletteTitle = document.createElement('h4');
        paletteTitle.textContent = 'Color Palette';
        paletteDiv.appendChild(paletteTitle);
        
        const swatchesDiv = document.createElement('div');
        swatchesDiv.className = 'color-swatches';
        
        this.colorPalette.forEach((color, i) => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
            swatch.title = `Color ${i + 1}: rgb(${color.r}, ${color.g}, ${color.b})`;
            swatchesDiv.appendChild(swatch);
        });
        
        paletteDiv.appendChild(swatchesDiv);
        container.appendChild(paletteDiv);
    }
    
    downloadPattern(type, canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${type}-pattern-${Date.now()}.png`;
        link.click();
        
        // Track download
        if (window.userTracker) {
            userTracker.trackPatternGeneration(type);
        }
    }
    
    showProcessingState() {
        const uploadArea = document.getElementById('uploadArea');
        const resultsArea = document.getElementById('patternResults');
        
        if (uploadArea) {
            uploadArea.innerHTML = `
                <div class="processing-state">
                    <div class="spinner"></div>
                    <p>Generating your patterns...</p>
                </div>
            `;
        }
        
        if (resultsArea) {
            resultsArea.innerHTML = '';
        }
    }
    
    showSuccessState() {
        const uploadArea = document.getElementById('uploadArea');
        
        if (uploadArea) {
            uploadArea.innerHTML = `
                <div class="success-state">
                    <div class="success-icon">✓</div>
                    <p>Patterns generated successfully!</p>
                    <button class="upload-another-btn" onclick="location.reload()">Upload Another Image</button>
                </div>
            `;
        }
    }
    
    showError(message) {
        const uploadArea = document.getElementById('uploadArea');
        
        if (uploadArea) {
            uploadArea.innerHTML = `
                <div class="error-state">
                    <div class="error-icon">✕</div>
                    <p class="error-message">${message}</p>
                    <button class="retry-btn" onclick="location.reload()">Try Again</button>
                </div>
            `;
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('patternGenerator')) {
        window.patternGenerator = new EnhancedPatternGenerator();
    }
});
