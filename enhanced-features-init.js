/**
 * Initialize Enhanced Features for Canvas and Pattern Generator
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Canvas Enhanced Features
    if (window.communityCanvas && window.CommunityCanvasEnhanced) {
        window.canvasEnhanced = new CommunityCanvasEnhanced(window.communityCanvas);
        
        // Setup Enhanced Canvas UI
        setupCanvasEnhancedUI();
    }
    
    // Initialize Pattern Generator Enhanced Features
    if (window.patternGenerator && window.PatternGeneratorEnhanced) {
        window.patternEnhanced = new PatternGeneratorEnhanced(window.patternGenerator);
        
        // Setup Enhanced Pattern UI
        setupPatternEnhancedUI();
    }
});

/**
 * Setup Canvas Enhanced UI Controls
 */
function setupCanvasEnhancedUI() {
    // Undo/Redo buttons
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    const snapshotBtn = document.getElementById('snapshotBtn');
    const particleBtn = document.getElementById('particleBtn');
    const animateBtn = document.getElementById('animateBtn');
    const colorPresetGrid = document.getElementById('colorPresetGrid');
    
    if (undoBtn) undoBtn.addEventListener('click', () => window.canvasEnhanced.undo());
    if (redoBtn) redoBtn.addEventListener('click', () => window.canvasEnhanced.redo());
    
    if (snapshotBtn) {
        snapshotBtn.addEventListener('click', () => {
            const snapshot = window.canvasEnhanced.takeSnapshot();
            alert(`Snapshot saved: ${snapshot.timestamp}`);
        });
    }
    
    if (particleBtn) {
        particleBtn.addEventListener('click', () => {
            const canvas = window.communityCanvas.canvasElement;
            const rect = canvas.getBoundingClientRect();
            window.canvasEnhanced.addParticleEffect(
                rect.width / 2,
                rect.height / 2,
                'spark'
            );
        });
    }
    
    if (animateBtn) {
        animateBtn.addEventListener('click', () => {
            const isOn = window.canvasEnhanced.toggleAnimationMode();
            animateBtn.style.background = isOn ? '#00b894' : '';
            animateBtn.textContent = isOn ? '⏹️ Stop Animation' : '🎬 Animation Mode';
        });
    }
    
    // Color presets
    if (colorPresetGrid) {
        window.canvasEnhanced.getColorPresets().forEach(color => {
            const preset = document.createElement('div');
            preset.className = 'color-preset';
            preset.style.background = color;
            preset.style.cursor = 'pointer';
            preset.addEventListener('click', () => {
                const colorPicker = document.getElementById('brushColor');
                if (colorPicker) {
                    colorPicker.value = color;
                    window.communityCanvas.setColor(color);
                }
            });
            colorPresetGrid.appendChild(preset);
        });
    }
    
    // Keyboard shortcuts info
    console.log('Canvas Enhanced Features:');
    console.log('Ctrl+Z: Undo');
    console.log('Ctrl+Y: Redo');
    console.log('Ctrl+S: Save Snapshot');
}

/**
 * Setup Pattern Generator Enhanced UI Controls
 */
function setupPatternEnhancedUI() {
    // AI Suggestions button
    const aiSuggestBtn = document.getElementById('aiSuggestBtn');
    const aiSuggestions = document.getElementById('aiSuggestions');
    const craftTypeSelect = document.getElementById('craftTypeSelect');
    const exportBtns = document.querySelectorAll('.export-btn');
    
    if (aiSuggestBtn) {
        aiSuggestBtn.addEventListener('click', () => {
            if (window.patternGenerator && window.patternGenerator.imageData) {
                const suggestions = window.patternEnhanced.generateAISuggestions(
                    window.patternGenerator.imageData
                );
                
                if (aiSuggestions) {
                    aiSuggestions.innerHTML = suggestions.map(s => `
                        <div class="suggestion-item ${s.recommended ? 'recommended' : ''}">
                            <strong>${s.complexity.toUpperCase()}</strong><br>
                            ${s.reason}
                        </div>
                    `).join('');
                }
            } else {
                alert('Please generate a pattern first');
            }
        });
    }
    
    // Craft type selection
    if (craftTypeSelect) {
        craftTypeSelect.addEventListener('change', (e) => {
            window.patternEnhanced.setCraftPreferences({
                craftType: e.target.value
            });
            console.log('Craft type changed to:', e.target.value);
        });
    }
    
    // Export buttons
    exportBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const format = e.target.dataset.format;
            if (window.patternGenerator && window.patternGenerator.imageData) {
                window.patternEnhanced.exportAsFormat(format, window.patternGenerator.imageData);
            } else {
                alert('Please generate a pattern first');
            }
        });
    });
    
    console.log('Pattern Generator Enhanced Features:');
    console.log('✓ AI Pattern Recommendations');
    console.log('✓ Multiple Export Formats (PNG, SVG, CSV)');
    console.log('✓ Craft Type Selection');
    console.log('✓ Pattern History & Custom Library');
}

/**
 * Global Helper Functions
 */

// Get AI suggestions for current pattern
window.getPatternSuggestions = function() {
    if (window.patternEnhanced && window.patternGenerator?.imageData) {
        return window.patternEnhanced.generateAISuggestions(
            window.patternGenerator.imageData
        );
    }
    return [];
};

// Export current pattern
window.exportPattern = function(format) {
    if (window.patternEnhanced && window.patternGenerator?.imageData) {
        return window.patternEnhanced.exportAsFormat(format, window.patternGenerator.imageData);
    }
    return false;
};

// Get canvas snapshots
window.getCanvasSnapshots = function() {
    return window.canvasEnhanced?.getSnapshots() || [];
};

// Undo last canvas action
window.undoCanvas = function() {
    window.canvasEnhanced?.undo();
};

// Redo canvas action
window.redoCanvas = function() {
    window.canvasEnhanced?.redo();
};
