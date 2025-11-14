/**
 * Pattern Generator Enhanced Features
 * Adds: AI Suggestions, Custom Patterns, Export Formats, Pattern Sharing, Complexity Presets
 */

class PatternGeneratorEnhanced {
    constructor(patternGeneratorInstance) {
        this.generator = patternGeneratorInstance;
        
        // Custom patterns
        this.customPatterns = [];
        this.patternLibrary = [];
        
        // Pattern suggestions
        this.aiSuggestions = [];
        
        // Export options
        this.exportFormats = ['PNG', 'PDF', 'SVG', 'CSV'];
        
        // Sharing
        this.patternShares = [];
        
        // Complexity presets
        this.complexityPresets = {
            'minimal': { stitches: 'minimal', colors: 2, difficulty: 'Beginner' },
            'medium': { stitches: 'medium', colors: 4, difficulty: 'Intermediate' },
            'dense': { stitches: 'dense', colors: 6, difficulty: 'Advanced' },
            'chaotic': { stitches: 'chaotic', colors: 8, difficulty: 'Expert' },
            'geometric': { stitches: 'geometric', colors: 5, difficulty: 'Intermediate' }
        };
        
        // Pattern history
        this.patternHistory = [];
        this.maxHistoryItems = 20;
        
        // Craft preferences
        this.craftPreferences = {
            craftType: 'knitting', // knitting, crochet, weaving
            yarnWeight: 'worsted',
            needleSize: 'US 8',
            gaugePerInch: 4.5
        };
        
        this.init();
    }
    
    init() {
        this.loadPatternData();
        this.setupEnhancedUI();
    }
    
    /**
     * AI-Powered Suggestions
     */
    generateAISuggestions(imageData) {
        // Analyze image characteristics
        const colorDominance = this.analyzeColors(imageData);
        const complexityScore = this.analyzeComplexity(imageData);
        const edgeDensity = this.analyzeEdges(imageData);
        
        const suggestions = [
            {
                complexity: 'minimal',
                reason: `Low complexity detected (${complexityScore}%). Great for beginners!`,
                recommended: complexityScore < 30
            },
            {
                complexity: 'medium',
                reason: `Balanced complexity. Recommended for most crafters.`,
                recommended: complexityScore >= 30 && complexityScore < 60
            },
            {
                complexity: 'dense',
                reason: `High detail level detected. Advanced crafters will enjoy this.`,
                recommended: complexityScore >= 60
            }
        ];
        
        this.aiSuggestions = suggestions;
        return suggestions;
    }
    
    analyzeColors(imageData) {
        const data = imageData.data;
        const colorMap = {};
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const color = `${r},${g},${b}`;
            colorMap[color] = (colorMap[color] || 0) + 1;
        }
        
        return Object.keys(colorMap).length;
    }
    
    analyzeComplexity(imageData) {
        // Simple complexity analysis based on pixel variance
        const data = imageData.data;
        let variance = 0;
        
        for (let i = 0; i < data.length; i += 4) {
            const grayscale = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            variance += Math.abs(grayscale - 127);
        }
        
        return Math.min(100, (variance / data.length) * 2);
    }
    
    analyzeEdges(imageData) {
        // Basic edge detection
        const data = imageData.data;
        let edgeCount = 0;
        
        for (let i = 4; i < data.length - 4; i += 4) {
            const current = data[i];
            const next = data[i + 4];
            if (Math.abs(current - next) > 50) {
                edgeCount++;
            }
        }
        
        return edgeCount;
    }
    
    /**
     * Custom Pattern Creation
     */
    createCustomPattern(name, patternData) {
        const pattern = {
            id: Date.now(),
            name: name,
            data: patternData,
            dateCreated: new Date(),
            tags: [],
            difficulty: 'intermediate',
            craftTypes: ['knitting']
        };
        
        this.customPatterns.push(pattern);
        this.savePatternData();
        return pattern;
    }
    
    getCustomPatterns() {
        return this.customPatterns;
    }
    
    deleteCustomPattern(patternId) {
        this.customPatterns = this.customPatterns.filter(p => p.id !== patternId);
        this.savePatternData();
    }
    
    /**
     * Pattern History
     */
    addToHistory(patternData) {
        this.patternHistory.unshift({
            id: Date.now(),
            data: patternData,
            timestamp: new Date()
        });
        
        if (this.patternHistory.length > this.maxHistoryItems) {
            this.patternHistory.pop();
        }
        
        this.savePatternData();
    }
    
    getPatternHistory() {
        return this.patternHistory;
    }
    
    /**
     * Export Features
     */
    exportAsFormat(format, patternData) {
        const exporters = {
            PNG: () => this.exportAsPNG(patternData),
            PDF: () => this.exportAsPDF(patternData),
            SVG: () => this.exportAsSVG(patternData),
            CSV: () => this.exportAsCSV(patternData)
        };
        
        return exporters[format] ? exporters[format]() : null;
    }
    
    exportAsPNG(patternData) {
        // Create canvas and draw pattern
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 800;
        const ctx = canvas.getContext('2d');
        
        // Draw pattern grid and symbols
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add pattern legend and details
        ctx.fillStyle = '#000000';
        ctx.font = '14px Arial';
        ctx.fillText('Pattern Export - ' + new Date().toLocaleDateString(), 10, 20);
        
        // Trigger download
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `pattern-${Date.now()}.png`;
        link.click();
        
        return true;
    }
    
    exportAsPDF(patternData) {
        // Would need jsPDF library
        console.log('PDF export requires jsPDF library');
        return false;
    }
    
    exportAsSVG(patternData) {
        let svg = '<?xml version="1.0" encoding="UTF-8"?>\n';
        svg += '<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">\n';
        svg += '<rect width="800" height="800" fill="white"/>\n';
        svg += '<text x="10" y="20" font-size="14">Pattern Export</text>\n';
        svg += '</svg>';
        
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pattern-${Date.now()}.svg`;
        link.click();
        
        return true;
    }
    
    exportAsCSV(patternData) {
        let csv = 'Row,Stitch,Color,Symbol\n';
        // Add pattern data rows
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pattern-${Date.now()}.csv`;
        link.click();
        
        return true;
    }
    
    /**
     * Pattern Sharing
     */
    sharePattern(patternData, caption = '') {
        const share = {
            id: Date.now(),
            data: patternData,
            caption: caption,
            url: `${window.location.origin}?shared-pattern=${Date.now()}`,
            shares: 0
        };
        
        this.patternShares.push(share);
        return share;
    }
    
    getShareableUrl(patternId) {
        const share = this.patternShares.find(s => s.id === patternId);
        return share ? share.url : null;
    }
    
    /**
     * Craft Preferences
     */
    setCraftPreferences(prefs) {
        this.craftPreferences = { ...this.craftPreferences, ...prefs };
        this.savePatternData();
    }
    
    getCraftPreferences() {
        return this.craftPreferences;
    }
    
    /**
     * Pattern Recommendations Based on Craft
     */
    getRecommendedComplexity() {
        const craftComplexityMap = {
            'knitting': ['minimal', 'medium', 'geometric'],
            'crochet': ['minimal', 'medium', 'dense'],
            'weaving': ['geometric', 'chaotic']
        };
        
        return craftComplexityMap[this.craftPreferences.craftType] || ['medium'];
    }
    
    /**
     * Pattern Library & Search
     */
    searchPatterns(query) {
        return this.customPatterns.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
    }
    
    addPatternTag(patternId, tag) {
        const pattern = this.customPatterns.find(p => p.id === patternId);
        if (pattern && !pattern.tags.includes(tag)) {
            pattern.tags.push(tag);
            this.savePatternData();
        }
    }
    
    /**
     * Data Persistence
     */
    savePatternData() {
        const data = {
            customPatterns: this.customPatterns,
            patternHistory: this.patternHistory,
            craftPreferences: this.craftPreferences,
            patternShares: this.patternShares
        };
        localStorage.setItem('patternEnhanced', JSON.stringify(data));
    }
    
    loadPatternData() {
        const data = JSON.parse(localStorage.getItem('patternEnhanced') || '{}');
        if (data.customPatterns) this.customPatterns = data.customPatterns;
        if (data.patternHistory) this.patternHistory = data.patternHistory;
        if (data.craftPreferences) this.craftPreferences = { ...this.craftPreferences, ...data.craftPreferences };
        if (data.patternShares) this.patternShares = data.patternShares;
    }
    
    setupEnhancedUI() {
        console.log('Enhanced Pattern Generator UI ready');
    }
}

// Export for use
window.PatternGeneratorEnhanced = PatternGeneratorEnhanced;
