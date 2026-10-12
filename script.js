let hamburger = null;
let navMenu = null;

// Initialize site features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize gallery if galleryData exists and gallery element is present
    if (typeof galleryData !== 'undefined' && document.getElementById('galleryGrid')) {
        initializeGallery();
    }
    
    // Only initialize canvas tools if canvas element exists
    if (document.querySelector('.community-canvas')) {
        setupCommunityCanvasTools();
    }
    
    // Mobile Menu Toggle
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.nav-menu') || document.querySelector('.nav-links');

    if (hamburger && navMenu) {
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('tabindex', '0');

        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active', isActive);
            hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });

        hamburger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                hamburger.click();
            }
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
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

function initializeGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Exit if galleryData or galleryGrid don't exist
    if (typeof galleryData === 'undefined' || !galleryGrid) {
        return;
    }
    
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
            
            // Create lazy-loaded image
            const imgHtml = item.image 
                ? `<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${item.image}" alt="${item.title}" class="gallery-image">`
                : (item.artpalId 
                    ? `<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-artpal-id="${item.artpalId}" alt="${item.title}" class="gallery-image">`
                    : `<div class="gallery-placeholder"><span>${item.title}</span></div>`);
            
            galleryItem.innerHTML = `
                <div class="gallery-image-container">
                    ${imgHtml}
                </div>
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p class="gallery-collection">${item.collection}</p>
                    <span class="gallery-platform">${item.platform}</span>
                    <div class="gallery-actions">
                        <a href="item-detail.html?id=${item.id}" class="gallery-link">Details</a>
                        <a href="${item.link}" target="_blank" class="gallery-link">View Shop</a>
                        <span class="pattern-hint" title="Click image to use in Pattern Maker">📋 Pattern</span>
                    </div>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
            
            // Register images for lazy loading
            const imgs = galleryItem.querySelectorAll('[data-src], [data-artpal-id]');
            imgs.forEach(img => {
                if (typeof lazyImageLoader !== 'undefined') {
                    lazyImageLoader.registerImage(img);
                }
            });
        });
    }
    
    // Filter functionality
    filterBtns.forEach((btn) => {
        btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterBtns.forEach(b => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
            
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

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
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

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    setupCommunityCanvasTools();
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

    const loveCountEl = document.getElementById('loveCount');
    const viewCountEl = document.getElementById('viewCount');
    const contributionCountEl = document.getElementById('contributionCount');

    if (savedLoves && loveCountEl) loveCountEl.textContent = savedLoves;
    if (savedViews && viewCountEl) viewCountEl.textContent = savedViews;
    if (savedContributions && contributionCountEl) contributionCountEl.textContent = savedContributions;

    // Increment view count (only if the element exists on this page)
    let views = parseInt(localStorage.getItem('canvasViews')) || 0;
    views += 1;
    localStorage.setItem('canvasViews', views);
    if (viewCountEl) viewCountEl.textContent = views;
}
