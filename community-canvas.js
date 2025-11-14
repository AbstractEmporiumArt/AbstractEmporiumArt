/**
 * Community Canvas - A Collective, Ever-Evolving Artwork
 * Every visitor contributes one brush stroke, shape, or glyph per day
 * The canvas evolves endlessly, with hidden patterns revealed through zooming
 */

class CommunityCanvas {
    constructor(canvasId = 'communityCanvas') {
        this.canvasElement = document.getElementById(canvasId);
        if (!this.canvasElement) {
            console.error(`Canvas element with id '${canvasId}' not found`);
            return;
        }
        
        this.ctx = this.canvasElement.getContext('2d');
        this.canvas = this.canvasElement;
        
        // Canvas settings
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        
        // Contribution tracking
        this.contributionData = [];
        this.currentUserContribution = null;
        this.lastContributionDate = null;
        this.maxContributionPerDay = 1;
        
        // Visual settings
        this.brushSize = 15;
        this.opacity = 0.8;
        this.color = '#6c5ce7';
        this.tool = 'brush'; // 'brush', 'shape', 'glyph'
        this.shapeType = 'circle'; // 'circle', 'square', 'triangle', 'star'
        
        // Animation
        this.animationFrameId = null;
        this.morphingEnabled = true;
        this.fadeMultiplier = 0.002; // Older contributions fade slightly
        
        this.init();
    }
    
    init() {
        // Load contributions from localStorage
        this.loadContributions();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Check if user can contribute today
        this.checkUserContributionLimit();
        
        // Start animation loop
        this.animate();
        
        // Draw initial canvas
        this.render();
    }
    
    setupEventListeners() {
        // Mouse/Touch drawing
        this.canvas.addEventListener('mousedown', (e) => this.handleDrawStart(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleDraw(e));
        this.canvas.addEventListener('mouseup', () => this.handleDrawEnd());
        this.canvas.addEventListener('mouseleave', () => this.handleDrawEnd());
        
        // Touch support
        this.canvas.addEventListener('touchstart', (e) => this.handleDrawStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleDraw(e));
        this.canvas.addEventListener('touchend', () => this.handleDrawEnd());
        
        // Zoom and pan
        this.canvas.addEventListener('wheel', (e) => this.handleZoom(e));
        
        // Tool selection
        document.addEventListener('canvasToolChange', (e) => {
            this.setTool(e.detail.tool, e.detail.options);
        });
    }
    
    handleDrawStart(e) {
        if (!this.canUserContribute()) {
            this.showLimitMessage();
            return;
        }
        
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        
        // Convert to canvas coordinates considering zoom and pan
        const canvasX = (x - this.panX) / this.zoom;
        const canvasY = (y - this.panY) / this.zoom;
        
        this.isDrawing = true;
        this.lastX = canvasX;
        this.lastY = canvasY;
        
        // Record contribution start
        this.currentUserContribution = {
            id: this.generateContributionId(),
            timestamp: Date.now(),
            tool: this.tool,
            color: this.color,
            brushSize: this.brushSize,
            points: [{x: canvasX, y: canvasY}],
            userSignature: this.generateUserSignature(),
            shapeType: this.shapeType
        };
    }
    
    handleDraw(e) {
        if (!this.isDrawing || !this.currentUserContribution) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        
        const canvasX = (x - this.panX) / this.zoom;
        const canvasY = (y - this.panY) / this.zoom;
        
        // Add point to contribution
        this.currentUserContribution.points.push({x: canvasX, y: canvasY});
        
        // Draw immediately for responsiveness
        this.drawContributionSegment(this.lastX, this.lastY, canvasX, canvasY);
        
        this.lastX = canvasX;
        this.lastY = canvasY;
    }
    
    handleDrawEnd() {
        if (!this.isDrawing) return;
        
        this.isDrawing = false;
        
        if (this.currentUserContribution && this.currentUserContribution.points.length > 0) {
            // Save contribution
            this.contributionData.push(this.currentUserContribution);
            this.saveContributions();
            
            // Record that user contributed today
            this.recordUserContribution();
            
            // Track the contribution event
            if (window.userTracker) {
                window.userTracker.trackCanvasContribution(this.tool, this.color);
            }
            
            // Show confirmation
            this.showContributionSuccess();
        }
        
        this.currentUserContribution = null;
    }
    
    drawContributionSegment(fromX, fromY, toX, toY) {
        this.ctx.save();
        this.ctx.translate(this.panX, this.panY);
        this.ctx.scale(this.zoom, this.zoom);
        
        if (this.tool === 'brush') {
            this.drawBrushStroke(fromX, fromY, toX, toY);
        } else if (this.tool === 'shape') {
            this.drawShape(toX, toY);
        } else if (this.tool === 'glyph') {
            this.drawGlyph(toX, toY);
        }
        
        this.ctx.restore();
    }
    
    drawBrushStroke(fromX, fromY, toX, toY) {
        this.ctx.beginPath();
        this.ctx.moveTo(fromX, fromY);
        this.ctx.lineTo(toX, toY);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.brushSize;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.globalAlpha = this.opacity;
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
    }
    
    drawShape(x, y) {
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = this.opacity;
        
        const size = this.brushSize * 2;
        
        if (this.shapeType === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (this.shapeType === 'square') {
            this.ctx.fillRect(x - size / 2, y - size / 2, size, size);
        } else if (this.shapeType === 'triangle') {
            this.drawTriangle(x, y, size);
        } else if (this.shapeType === 'star') {
            this.drawStar(x, y, 5, size / 2, size / 4);
        }
        
        this.ctx.globalAlpha = 1;
    }
    
    drawTriangle(x, y, size) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - size / 2);
        this.ctx.lineTo(x + size / 2, y + size / 2);
        this.ctx.lineTo(x - size / 2, y + size / 2);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    drawStar(x, y, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let step = Math.PI / spikes;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            this.ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
            rot += step;
            this.ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
            rot += step;
        }
        
        this.ctx.lineTo(x, y - outerRadius);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    drawGlyph(x, y) {
        // Abstract glyphs - symbolic marks
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 2;
        this.ctx.globalAlpha = this.opacity;
        
        const glyphType = Math.floor(Math.random() * 4);
        const size = this.brushSize;
        
        this.ctx.beginPath();
        switch(glyphType) {
            case 0: // Circle with cross
                this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.moveTo(x - size / 2, y);
                this.ctx.lineTo(x + size / 2, y);
                this.ctx.moveTo(x, y - size / 2);
                this.ctx.lineTo(x, y + size / 2);
                this.ctx.stroke();
                break;
            case 1: // Diamond
                this.ctx.moveTo(x, y - size / 2);
                this.ctx.lineTo(x + size / 2, y);
                this.ctx.lineTo(x, y + size / 2);
                this.ctx.lineTo(x - size / 2, y);
                this.ctx.closePath();
                this.ctx.stroke();
                break;
            case 2: // Spiral
                for (let i = 0; i < 10; i++) {
                    const angle = (i / 10) * Math.PI * 2;
                    const rad = (i / 10) * size / 2;
                    const px = x + Math.cos(angle) * rad;
                    const py = y + Math.sin(angle) * rad;
                    if (i === 0) this.ctx.moveTo(px, py);
                    else this.ctx.lineTo(px, py);
                }
                this.ctx.stroke();
                break;
            case 3: // Abstract curves
                this.ctx.moveTo(x - size / 2, y - size / 2);
                this.ctx.quadraticCurveTo(x, y - size / 2, x + size / 2, y);
                this.ctx.quadraticCurveTo(x, y + size / 2, x - size / 2, y + size / 2);
                this.ctx.stroke();
                break;
        }
        
        this.ctx.globalAlpha = 1;
    }
    
    handleZoom(e) {
        e.preventDefault();
        
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const zoomSpeed = 0.1;
        const newZoom = e.deltaY < 0 ? this.zoom + zoomSpeed : this.zoom - zoomSpeed;
        
        if (newZoom > 0.5 && newZoom < 10) {
            // Adjust pan to zoom towards cursor
            this.panX -= (x - this.panX) * (newZoom / this.zoom - 1);
            this.panY -= (y - this.panY) * (newZoom / this.zoom - 1);
            
            this.zoom = newZoom;
            this.render();
        }
    }
    
    setTool(tool, options = {}) {
        this.tool = tool;
        if (options.color) this.color = options.color;
        if (options.brushSize) this.brushSize = options.brushSize;
        if (options.shapeType) this.shapeType = options.shapeType;
    }
    
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw all contributions
        this.ctx.save();
        this.ctx.translate(this.panX, this.panY);
        this.ctx.scale(this.zoom, this.zoom);
        
        this.contributionData.forEach((contribution, index) => {
            this.drawContribution(contribution, index);
        });
        
        this.ctx.restore();
        
        // Draw UI overlays
        this.drawZoomLevel();
        this.drawContributionCount();
    }
    
    drawContribution(contribution, index) {
        const ageFactor = (Date.now() - contribution.timestamp) / (1000 * 60 * 60 * 24 * 30); // 30 days
        const opacity = Math.max(0.2, this.opacity * (1 - ageFactor * this.fadeMultiplier));
        
        this.ctx.globalAlpha = opacity;
        this.ctx.strokeStyle = contribution.color;
        this.ctx.fillStyle = contribution.color;
        
        if (contribution.tool === 'brush') {
            this.ctx.lineWidth = contribution.brushSize;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.beginPath();
            
            contribution.points.forEach((point, i) => {
                if (i === 0) this.ctx.moveTo(point.x, point.y);
                else this.ctx.lineTo(point.x, point.y);
            });
            this.ctx.stroke();
        } else if (contribution.tool === 'shape') {
            contribution.points.forEach(point => {
                this.drawShapeAtPoint(point, contribution.shapeType, contribution.brushSize);
            });
        } else if (contribution.tool === 'glyph') {
            contribution.points.forEach(point => {
                this.drawGlyphAtPoint(point, contribution.brushSize);
            });
        }
        
        // Draw user signature near last point if zoomed in
        if (this.zoom > 3 && contribution.points.length > 0) {
            const lastPoint = contribution.points[contribution.points.length - 1];
            this.drawUserSignature(lastPoint.x, lastPoint.y, contribution.userSignature);
        }
        
        this.ctx.globalAlpha = 1;
    }
    
    drawShapeAtPoint(point, shapeType, size) {
        if (shapeType === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, size / 2, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (shapeType === 'square') {
            this.ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
        }
    }
    
    drawGlyphAtPoint(point, size) {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, size / 3, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawUserSignature(x, y, signature) {
        this.ctx.save();
        this.ctx.globalAlpha = 0.5;
        this.ctx.font = '10px Arial';
        this.ctx.fillStyle = '#999';
        this.ctx.fillText(signature, x + 5, y - 5);
        this.ctx.restore();
    }
    
    drawZoomLevel() {
        this.ctx.save();
        this.ctx.font = '14px Arial';
        this.ctx.fillStyle = '#666';
        this.ctx.globalAlpha = 0.7;
        this.ctx.fillText(`Zoom: ${this.zoom.toFixed(1)}x`, 10, 25);
        this.ctx.restore();
    }
    
    drawContributionCount() {
        this.ctx.save();
        this.ctx.font = '14px Arial';
        this.ctx.fillStyle = '#666';
        this.ctx.globalAlpha = 0.7;
        this.ctx.fillText(`Total Contributions: ${this.contributionData.length}`, 10, 50);
        this.ctx.restore();
    }
    
    animate() {
        if (this.morphingEnabled) {
            // Subtle animation for older contributions
            this.render();
        }
        
        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
    
    canUserContribute() {
        const today = new Date().toDateString();
        const userContributed = localStorage.getItem(`canvas_contributed_${today}`);
        return !userContributed;
    }
    
    recordUserContribution() {
        const today = new Date().toDateString();
        localStorage.setItem(`canvas_contributed_${today}`, 'true');
        
        // Also record in session for quick access
        sessionStorage.setItem('canvas_contributed_today', 'true');
    }
    
    checkUserContributionLimit() {
        const today = new Date().toDateString();
        const userContributed = localStorage.getItem(`canvas_contributed_${today}`);
        
        if (userContributed) {
            this.disableDrawing();
            this.showLimitMessage();
        }
    }
    
    showLimitMessage() {
        const message = document.getElementById('contributionMessage');
        if (message) {
            message.textContent = '✓ You\'ve contributed to the canvas today! Come back tomorrow.';
            message.style.display = 'block';
            setTimeout(() => {
                message.style.display = 'none';
            }, 3000);
        }
    }
    
    showContributionSuccess() {
        const message = document.getElementById('contributionMessage');
        if (message) {
            message.textContent = '✓ Your contribution has been added to the canvas!';
            message.style.display = 'block';
            setTimeout(() => {
                message.style.display = 'none';
            }, 2000);
        }
    }
    
    disableDrawing() {
        this.canvas.style.opacity = '0.7';
        this.canvas.style.cursor = 'not-allowed';
    }
    
    loadContributions() {
        const saved = localStorage.getItem('canvas_contributions');
        if (saved) {
            try {
                this.contributionData = JSON.parse(saved);
            } catch (e) {
                console.error('Failed to load contributions:', e);
                this.contributionData = [];
            }
        }
    }
    
    saveContributions() {
        try {
            localStorage.setItem('canvas_contributions', JSON.stringify(this.contributionData));
        } catch (e) {
            console.error('Failed to save contributions:', e);
        }
    }
    
    generateContributionId() {
        return `contrib_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    generateUserSignature() {
        // Generate anonymous signature based on browser fingerprint
        const navData = `${navigator.userAgent}${screen.width}${screen.height}`;
        let hash = 0;
        for (let i = 0; i < navData.length; i++) {
            const char = navData.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return `User${Math.abs(hash % 9999).toString().padStart(4, '0')}`;
    }
    
    getContributionStats() {
        return {
            totalContributions: this.contributionData.length,
            byTool: {
                brush: this.contributionData.filter(c => c.tool === 'brush').length,
                shape: this.contributionData.filter(c => c.tool === 'shape').length,
                glyph: this.contributionData.filter(c => c.tool === 'glyph').length
            },
            latestContribution: this.contributionData.length > 0 ? this.contributionData[this.contributionData.length - 1].timestamp : null
        };
    }
    
    exportAsImage(filename = 'community-canvas.png') {
        const link = document.createElement('a');
        link.href = this.canvas.toDataURL('image/png');
        link.download = filename;
        link.click();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('communityCanvas')) {
        window.communityCanvas = new CommunityCanvas('communityCanvas');
    }
});
