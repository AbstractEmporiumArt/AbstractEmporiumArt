/**
 * Easter Egg Signatures - Hidden Messages in Community Canvas
 * 
 * Users can embed hidden secret messages in the pixel data of the canvas
 * After 1000+ contributions, an "unlock hidden messages" button appears
 * Shows all discovered secrets
 */

class EasterEggSignatures {
    constructor(canvasInstance) {
        this.canvas = canvasInstance;
        this.hiddenMessages = [];
        this.messageThreshold = 1000; // Unlock after this many contributions
        this.maxMessageLength = 200;
        
        this.init();
    }
    
    init() {
        this.loadMessages();
        this.setupEventListeners();
        this.monitorContributionCount();
    }
    
    setupEventListeners() {
        // Add secret message input when user is about to contribute
        const canvasSection = document.querySelector('.community-canvas-section');
        if (!canvasSection) return;
        
        // Check if we should show the secret message feature
        this.checkAndShowSecretFeature();
    }
    
    /**
     * Monitor contribution count and unlock features
     */
    monitorContributionCount() {
        const savedContributions = JSON.parse(localStorage.getItem('canvas_contributions') || '[]');
        const currentCount = savedContributions.length;
        
        // Check if we've reached threshold
        if (currentCount >= this.messageThreshold) {
            this.unlockMessageReveal();
        }
        
        // Show progress toward unlock
        this.displayProgressBar(currentCount);
    }
    
    /**
     * Check if user can leave secret messages
     */
    checkAndShowSecretFeature() {
        const userSignatureBtn = document.querySelector('[data-secret-msg-btn]');
        if (!userSignatureBtn) {
            // Add the button to canvas tools
            const toolGroup = document.querySelector('.canvas-tools .tool-group:last-child');
            if (toolGroup) {
                const secretBtn = document.createElement('button');
                secretBtn.className = 'canvas-action-btn secret-msg-btn';
                secretBtn.textContent = '🔐 Leave Secret Message';
                secretBtn.title = 'Embed a hidden message in the canvas';
                secretBtn.addEventListener('click', () => this.showSecretMessageForm());
                
                const newGroup = document.createElement('div');
                newGroup.className = 'tool-group';
                newGroup.innerHTML = '<h4>🔮 Mystery</h4>';
                newGroup.appendChild(secretBtn);
                toolGroup.parentNode.insertBefore(newGroup, toolGroup.nextSibling);
            }
        }
    }
    
    /**
     * Display progress toward message unlock
     */
    displayProgressBar(currentCount) {
        let progressContainer = document.getElementById('messageProgressBar');
        if (!progressContainer) {
            progressContainer = document.createElement('div');
            progressContainer.id = 'messageProgressBar';
            progressContainer.className = 'message-progress-container';
            const canvasSection = document.querySelector('.community-canvas-section');
            if (canvasSection) {
                canvasSection.insertBefore(progressContainer, canvasSection.querySelector('.canvas-container').nextSibling);
            }
        }
        
        const percentage = (currentCount / this.messageThreshold) * 100;
        const remaining = Math.max(0, this.messageThreshold - currentCount);
        
        progressContainer.innerHTML = `
            <div class="message-progress">
                <p class="progress-label">🔐 Hidden Messages Unlock Progress</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <p class="progress-text">${currentCount} / ${this.messageThreshold} contributions (${remaining} more to unlock)</p>
            </div>
        `;
    }
    
    /**
     * Show secret message form
     */
    showSecretMessageForm() {
        const modal = document.createElement('div');
        modal.className = 'secret-message-modal';
        modal.innerHTML = `
            <div class="secret-message-container">
                <button class="modal-close">&times;</button>
                
                <div class="secret-message-content">
                    <h2>🔐 Leave a Secret Message</h2>
                    <p>Your message will be hidden in the canvas and discoverable by others who unlock it!</p>
                    
                    <div class="message-form-group">
                        <label for="secretMessageText">Your Message (max ${this.maxMessageLength} chars):</label>
                        <textarea 
                            id="secretMessageText" 
                            placeholder="Share something mysterious, funny, or inspirational..."
                            maxlength="${this.maxMessageLength}"
                            rows="4"
                        ></textarea>
                        <p class="char-count"><span id="charCount">0</span>/${this.maxMessageLength}</p>
                    </div>
                    
                    <div class="message-form-group">
                        <label for="messageType">Message Type:</label>
                        <select id="messageType">
                            <option value="mysterious">🔮 Mysterious</option>
                            <option value="funny">😄 Funny</option>
                            <option value="inspirational">✨ Inspirational</option>
                            <option value="romantic">💕 Romantic</option>
                            <option value="cryptic">🕵️ Cryptic</option>
                        </select>
                    </div>
                    
                    <div class="message-form-group">
                        <label>
                            <input type="checkbox" id="allowName" checked>
                            Allow others to know my name (optional)
                        </label>
                    </div>
                    
                    <button class="btn-submit-message">Embed Message 🔐</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const textarea = modal.querySelector('#secretMessageText');
        const charCount = modal.querySelector('#charCount');
        
        textarea.addEventListener('input', () => {
            charCount.textContent = textarea.value.length;
        });
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        
        modal.querySelector('.btn-submit-message').addEventListener('click', () => {
            this.embedMessage(
                textarea.value,
                modal.querySelector('#messageType').value,
                modal.querySelector('#allowName').checked
            );
            modal.remove();
        });
    }
    
    /**
     * Embed message in canvas pixel data
     */
    embedMessage(messageText, messageType, allowName) {
        if (!messageText.trim()) {
            alert('Please enter a message!');
            return;
        }
        
        const message = {
            id: `msg_${Date.now()}`,
            text: messageText.trim(),
            type: messageType,
            timestamp: Date.now(),
            displayName: allowName ? (localStorage.getItem('userDisplayName') || 'Anonymous') : 'Anonymous',
            discovered: false,
            reactions: [],
            pixelCoordinates: this.generateRandomCoordinates()
        };
        
        this.hiddenMessages.push(message);
        localStorage.setItem('canvasEasterEggs', JSON.stringify(this.hiddenMessages));
        
        // Embed in canvas
        this.embedIntoCanvasPixels(message);
        
        // Show confirmation
        this.showEmbedConfirmation(message);
    }
    
    /**
     * Embed message coordinates into canvas (invisible to naked eye)
     */
    embedIntoCanvasPixels(message) {
        if (!this.canvas || !this.canvas.canvasElement) return;
        
        const ctx = this.canvas.canvasElement.getContext('2d');
        const imageData = ctx.getImageData(0, 0, this.canvas.canvasElement.width, this.canvas.canvasElement.height);
        const data = imageData.data;
        
        // Store message ID in LSB (Least Significant Bits) of random pixels
        const messageIdBinary = message.id.charCodeAt(0).toString(2).padStart(8, '0');
        
        for (let i = 0; i < messageIdBinary.length; i++) {
            const pixelIndex = message.pixelCoordinates[i] * 4;
            const bit = parseInt(messageIdBinary[i]);
            
            // Modify LSB of red channel
            data[pixelIndex] = (data[pixelIndex] & 0xFE) | bit;
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    /**
     * Generate random pixel coordinates for embedding
     */
    generateRandomCoordinates() {
        const coords = [];
        const count = 20; // Use 20 pixels for message storage
        
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * (this.canvas?.canvasElement?.width || 1200));
            const y = Math.floor(Math.random() * (this.canvas?.canvasElement?.height || 600));
            coords.push(y * (this.canvas?.canvasElement?.width || 1200) + x);
        }
        
        return coords;
    }
    
    /**
     * Show confirmation after embedding
     */
    showEmbedConfirmation(message) {
        const confirmation = document.createElement('div');
        confirmation.className = 'embed-confirmation';
        confirmation.innerHTML = `
            <div class="confirmation-content">
                <h3>✨ Message Hidden!</h3>
                <p>Your secret message has been embedded in the canvas.</p>
                <p>Others will discover it once enough contributions are made!</p>
                <p class="message-preview">"${message.text.substring(0, 100)}${message.text.length > 100 ? '...' : ''}"</p>
                <button class="btn-close-confirmation">Got it!</button>
            </div>
        `;
        
        document.body.appendChild(confirmation);
        confirmation.querySelector('.btn-close-confirmation').addEventListener('click', () => {
            confirmation.remove();
        });
        
        setTimeout(() => confirmation.remove(), 5000);
    }
    
    /**
     * Unlock message reveal feature
     */
    unlockMessageReveal() {
        let unlockedNotice = document.getElementById('messageUnlockedNotice');
        if (!unlockedNotice) {
            unlockedNotice = document.createElement('div');
            unlockedNotice.id = 'messageUnlockedNotice';
            unlockedNotice.className = 'message-unlocked-notice';
            unlockedNotice.innerHTML = `
                <div class="unlock-announcement">
                    <h3>🔓 Hidden Messages Unlocked!</h3>
                    <p>You've reached ${this.messageThreshold}+ contributions! Discover the secret messages hidden in the canvas.</p>
                    <button class="btn-reveal-messages">👀 Reveal All Messages</button>
                    <button class="btn-close-notice">&times;</button>
                </div>
            `;
            
            const canvasSection = document.querySelector('.community-canvas-section');
            if (canvasSection) {
                canvasSection.insertBefore(unlockedNotice, canvasSection.firstChild);
            }
            
            unlockedNotice.querySelector('.btn-reveal-messages').addEventListener('click', () => {
                this.displayAllMessages();
            });
            
            unlockedNotice.querySelector('.btn-close-notice').addEventListener('click', () => {
                unlockedNotice.classList.add('hidden');
            });
        }
    }
    
    /**
     * Display all hidden messages
     */
    displayAllMessages() {
        const modal = document.createElement('div');
        modal.className = 'messages-reveal-modal';
        
        if (this.hiddenMessages.length === 0) {
            modal.innerHTML = `
                <div class="messages-container">
                    <button class="modal-close">&times;</button>
                    <h2>🔐 Hidden Messages Archive</h2>
                    <p class="no-messages">No secret messages have been discovered yet. Be the first to leave one!</p>
                </div>
            `;
        } else {
            const messagesByType = {};
            this.hiddenMessages.forEach(msg => {
                if (!messagesByType[msg.type]) {
                    messagesByType[msg.type] = [];
                }
                messagesByType[msg.type].push(msg);
            });
            
            let messagesHtml = `
                <div class="messages-container">
                    <button class="modal-close">&times;</button>
                    <h2>🔐 ${this.hiddenMessages.length} Hidden Messages Discovered</h2>
                    <p class="messages-intro">Secrets hidden by community members:</p>
            `;
            
            Object.entries(messagesByType).forEach(([type, messages]) => {
                messagesHtml += `<h3>${this.getTypeEmoji(type)} ${this.capitalize(type)} Messages</h3>`;
                messagesHtml += '<div class="messages-list">';
                
                messages.forEach(msg => {
                    messagesHtml += `
                        <div class="message-card message-${msg.type}">
                            <p class="message-text">"${msg.text}"</p>
                            <p class="message-meta">— ${msg.displayName} | ${this.formatDate(msg.timestamp)}</p>
                            <div class="message-reactions">
                                <button class="react-btn" data-msg-id="${msg.id}" data-reaction="❤️">❤️ ${msg.reactions.filter(r => r === '❤️').length}</button>
                                <button class="react-btn" data-msg-id="${msg.id}" data-reaction="😮">😮 ${msg.reactions.filter(r => r === '😮').length}</button>
                                <button class="react-btn" data-msg-id="${msg.id}" data-reaction="😄">😄 ${msg.reactions.filter(r => r === '😄').length}</button>
                            </div>
                        </div>
                    `;
                });
                
                messagesHtml += '</div>';
            });
            
            messagesHtml += '</div>';
            modal.innerHTML = messagesHtml;
        }
        
        document.body.appendChild(modal);
        
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        
        // Setup reaction handlers
        modal.querySelectorAll('.react-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const msgId = e.target.dataset.msgId;
                const reaction = e.target.dataset.reaction;
                this.addReaction(msgId, reaction);
            });
        });
    }
    
    /**
     * Add reaction to a message
     */
    addReaction(messageId, reaction) {
        const message = this.hiddenMessages.find(m => m.id === messageId);
        if (message) {
            if (!message.reactions) {
                message.reactions = [];
            }
            message.reactions.push(reaction);
            localStorage.setItem('canvasEasterEggs', JSON.stringify(this.hiddenMessages));
            
            // Refresh display
            const modal = document.querySelector('.messages-reveal-modal');
            if (modal) {
                modal.remove();
                this.displayAllMessages();
            }
        }
    }
    
    /**
     * Load messages from localStorage
     */
    loadMessages() {
        const stored = localStorage.getItem('canvasEasterEggs');
        if (stored) {
            try {
                this.hiddenMessages = JSON.parse(stored);
            } catch (e) {
                console.error('Error loading messages:', e);
            }
        }
    }
    
    /**
     * Helpers
     */
    getTypeEmoji(type) {
        const emojiMap = {
            mysterious: '🔮',
            funny: '😄',
            inspirational: '✨',
            romantic: '💕',
            cryptic: '🕵️'
        };
        return emojiMap[type] || '💭';
    }
    
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
}

// Initialize when canvas is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.communityCanvas) {
            window.easterEggSignatures = new EasterEggSignatures(window.communityCanvas);
        }
    });
} else {
    if (window.communityCanvas) {
        window.easterEggSignatures = new EasterEggSignatures(window.communityCanvas);
    }
}
