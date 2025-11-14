/**
 * Lazy Image Loader System
 * Handles lazy loading with fallbacks and error handling
 */

class LazyImageLoader {
    constructor() {
        this.loadedImages = new Set();
        this.failedImages = new Set();
        this.imageCache = new Map();
        this.initIntersectionObserver();
    }

    initIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.01
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
    }

    registerImage(imgElement) {
        if (imgElement && !this.loadedImages.has(imgElement)) {
            this.observer.observe(imgElement);
        }
    }

    loadImage(imgElement) {
        if (!imgElement || this.loadedImages.has(imgElement)) return;

        const src = imgElement.dataset.src || imgElement.getAttribute('src');
        const artpalId = imgElement.dataset.artpalId;

        if (!src && !artpalId) {
            this.setPlaceholder(imgElement);
            return;
        }

        // Try to load from cache first
        if (this.imageCache.has(src)) {
            imgElement.src = this.imageCache.get(src);
            imgElement.classList.add('loaded');
            this.loadedImages.add(imgElement);
            return;
        }

        // If no src but have artpalId, try to fetch from ArtPal
        if (!src && artpalId) {
            this.loadFromArtPal(imgElement, artpalId);
            return;
        }

        // Load from src with error handling
        const img = new Image();
        img.onload = () => {
            imgElement.src = src;
            imgElement.classList.add('loaded');
            this.imageCache.set(src, src);
            this.loadedImages.add(imgElement);
        };
        img.onerror = () => {
            this.handleImageError(imgElement, artpalId);
        };
        img.src = src;
    }

    loadFromArtPal(imgElement, artpalId) {
        // Try multiple ArtPal image endpoints
        const artpalUrls = [
            `https://cdn.artpal.com/image/${artpalId}.jpg`,
            `https://img.artpal.com/${artpalId.split('-')[0]}/${artpalId}.jpg`,
            `https://www.artpal.com/API/artwork/${artpalId}/image`
        ];

        let urlIndex = 0;

        const tryNextUrl = () => {
            if (urlIndex >= artpalUrls.length) {
                this.setPlaceholder(imgElement);
                return;
            }

            const url = artpalUrls[urlIndex];
            const img = new Image();

            img.onload = () => {
                imgElement.src = url;
                imgElement.classList.add('loaded');
                this.imageCache.set(artpalId, url);
                this.loadedImages.add(imgElement);
            };

            img.onerror = () => {
                urlIndex++;
                tryNextUrl();
            };

            img.src = url;
        };

        tryNextUrl();
    }

    handleImageError(imgElement, artpalId) {
        if (artpalId && !this.failedImages.has(artpalId)) {
            this.failedImages.add(artpalId);
            // Try loading from ArtPal as fallback
            this.loadFromArtPal(imgElement, artpalId);
        } else {
            this.setPlaceholder(imgElement);
        }
    }

    setPlaceholder(imgElement) {
        const title = imgElement.getAttribute('alt') || 'Abstract Artwork';
        imgElement.src = this.generatePlaceholder(title);
        imgElement.classList.add('placeholder-image');
        this.loadedImages.add(imgElement);
    }

    generatePlaceholder(title) {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');

        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, 400, 400);
        gradient.addColorStop(0, '#6c5ce7');
        gradient.addColorStop(0.5, '#a29bfe');
        gradient.addColorStop(1, '#fd79a8');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);

        // Add text
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(title, 200, 200);

        return canvas.toDataURL();
    }
}

// Initialize globally
const lazyImageLoader = new LazyImageLoader();

// Auto-register all lazy images on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-src], [data-artpal-id]').forEach(img => {
        lazyImageLoader.registerImage(img);
    });
});

// Watch for dynamically added images
const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
                if (node.matches('[data-src], [data-artpal-id]')) {
                    lazyImageLoader.registerImage(node);
                }
                node.querySelectorAll?.('[data-src], [data-artpal-id]').forEach(img => {
                    lazyImageLoader.registerImage(img);
                });
            }
        });
    });
});

mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
});
