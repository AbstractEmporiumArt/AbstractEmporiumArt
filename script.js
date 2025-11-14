// Initialize chatbot
let chatbot = null;

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize bot
    if (typeof AbstractEmporiumBot !== 'undefined') {
        chatbot = new AbstractEmporiumBot();
        addBotGreeting();
    }
    
    initializeGallery();
    setupCommunityCanvasTools();
    setupPatternGeneratorTabs();
    
    // Observe gallery items for animations
    setTimeout(() => {
        document.querySelectorAll('.gallery-item, .store-card').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }, 100);
});

/**
 * Chatbot Functions
 */

function addBotGreeting() {
    if (!chatbot) return;
    const greeting = chatbot.processInput('hello');
    addMessageToChat(greeting, 'bot');
}

function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;

    const messageEl = document.createElement('div');
    messageEl.className = `chatbot-message ${sender}`;
    messageEl.textContent = message;
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    if (!input || !input.value.trim() || !chatbot) return;

    const userMessage = input.value.trim();
    addMessageToChat(userMessage, 'user');
    input.value = '';

    // Get bot response
    setTimeout(() => {
        const botResponse = chatbot.processInput(userMessage);
        addMessageToChat(botResponse, 'bot');
    }, 300);
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function toggleChatbot() {
    const widget = document.getElementById('chatbot-widget');
    if (widget) {
        widget.style.display = widget.style.display === 'none' ? 'flex' : 'none';
    }
}
function initializeGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Display gallery items
    function displayGallery(items) {
        galleryGrid.innerHTML = '';
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.platform = item.platform.toLowerCase().replace(/\s+/g, '');
            // Add pattern generator attributes
            galleryItem.setAttribute('data-pattern-artworkid', item.id);
            galleryItem.setAttribute('data-image-src', item.image);
            galleryItem.style.cursor = 'pointer';
            
            galleryItem.innerHTML = `
                <div class="gallery-image-container">
                    ${item.image ? `<img src="${item.image}" alt="${item.title}" class="gallery-image" onerror="this.parentElement.innerHTML = '<div class=\'gallery-placeholder\'><span>${item.title}</span></div>'">` : '<div class="gallery-placeholder"><span>' + item.title + '</span></div>'}
                </div>
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p class="gallery-collection">${item.collection}</p>
                    <span class="gallery-platform">${item.platform}</span>
                    <div class="gallery-actions">
                        <a href="${item.link}" target="_blank" class="gallery-link">View</a>
                        <span class="pattern-hint" title="Click image to use in Pattern Maker">📋 Pattern</span>
                    </div>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter items
            const filter = btn.dataset.filter;
            let filteredItems = galleryData;
            
            if (filter !== 'all') {
                filteredItems = galleryData.filter(item => 
                    item.platform.toLowerCase().replace(/\s+/g, '') === filter
                );
            }
            
            displayGallery(filteredItems);
        });
    });
    
    // Display all items initially
    displayGallery(galleryData);
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name') || document.querySelector('input[placeholder="Your Name"]').value,
            email: formData.get('email') || document.querySelector('input[placeholder="Your Email"]').value,
            message: formData.get('message') || document.querySelector('textarea').value
        };

        console.log('Form submitted:', data);
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Add scroll animation for gallery items
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

/**
 * Community Canvas Setup
 */
function setupCommunityCanvasTools() {
    // Tool selection
    const toolBtns = document.querySelectorAll('.tool-btn');
    const shapeGroup = document.getElementById('shapeGroup');
    const shapeSelect = document.getElementById('shapeType');
    const brushColor = document.getElementById('brushColor');
    const brushSize = document.getElementById('brushSize');
    const brushSizeLabel = document.getElementById('brushSizeLabel');
    
    if (!toolBtns.length) return;
    
    // Tool buttons
    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toolBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tool = btn.dataset.tool;
            const options = {
                color: brushColor?.value || '#6c5ce7',
                brushSize: parseInt(brushSize?.value || 15),
                shapeType: shapeSelect?.value || 'circle'
            };
            
            // Show/hide shape options
            if (tool === 'shape' && shapeGroup) {
                shapeGroup.style.display = 'flex';
            } else if (shapeGroup) {
                shapeGroup.style.display = 'none';
            }
            
            if (window.communityCanvas) {
                window.communityCanvas.setTool(tool, options);
            }
        });
    });
    
    // Brush size slider
    if (brushSize) {
        brushSize.addEventListener('input', (e) => {
            if (brushSizeLabel) {
                brushSizeLabel.textContent = e.target.value + 'px';
            }
            if (window.communityCanvas) {
                window.communityCanvas.brushSize = parseInt(e.target.value);
            }
        });
    }
    
    // Color picker
    if (brushColor) {
        brushColor.addEventListener('change', (e) => {
            if (window.communityCanvas) {
                window.communityCanvas.color = e.target.value;
            }
        });
    }
    
    // Shape type select
    if (shapeSelect) {
        shapeSelect.addEventListener('change', (e) => {
            if (window.communityCanvas) {
                window.communityCanvas.shapeType = e.target.value;
            }
        });
    }
}

/**
 * Pattern Generator Setup
 */
function setupPatternGeneratorTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (!tabBtns.length) return;
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            
            // Remove active from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked button and corresponding content
            btn.classList.add('active');
            const activeContent = document.getElementById(tabName + 'Tab');
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    setupCommunityCanvasTools();
    setupPatternGeneratorTabs();
    setupCollaborationFeatures();
    
    // Observe gallery items for animations
    setTimeout(() => {
        document.querySelectorAll('.gallery-item, .store-card').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }, 100);
});

// Setup Canvas Collaboration Features
function setupCollaborationFeatures() {
    const voteBtn = document.getElementById('voteUpBtn');
    const shareBtn = document.getElementById('shareBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (voteBtn) {
        voteBtn.addEventListener('click', () => {
            const loveCount = document.getElementById('loveCount');
            let current = parseInt(loveCount.textContent) || 0;
            loveCount.textContent = current + 1;
            voteBtn.style.transform = 'scale(1.2)';
            setTimeout(() => voteBtn.style.transform = 'scale(1)', 200);
            localStorage.setItem('canvasLoves', current + 1);
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const url = window.location.href;
            if (navigator.share) {
                navigator.share({
                    title: 'Abstract Emporium - Community Canvas',
                    text: 'Check out our collaborative artwork!',
                    url: url
                });
            } else {
                alert('Share URL: ' + url);
            }
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            if (window.communityCanvas) {
                window.communityCanvas.exportAsImage();
            } else {
                alert('Generate the canvas first!');
            }
        });
    }
    
    // Load stats from localStorage
    const savedLoves = localStorage.getItem('canvasLoves');
    const savedViews = localStorage.getItem('canvasViews');
    const savedContributions = localStorage.getItem('canvasContributions');
    
    if (savedLoves) document.getElementById('loveCount').textContent = savedLoves;
    if (savedViews) document.getElementById('viewCount').textContent = savedViews;
    if (savedContributions) document.getElementById('contributionCount').textContent = savedContributions;
    
    // Increment view count
    let views = parseInt(localStorage.getItem('canvasViews')) || 0;
    localStorage.setItem('canvasViews', views + 1);
    document.getElementById('viewCount').textContent = views + 1;
}
