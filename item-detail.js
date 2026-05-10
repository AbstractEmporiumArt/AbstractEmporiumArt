/**
 * Item Detail Page Script
 * Handles individual artwork display and interactions
 */

let currentItem = null;
let currentItemStats = {
    likes: 0,
    views: 0,
    shares: 0
};

document.addEventListener('DOMContentLoaded', () => {
    initializeItemDetail();
    setupEventListeners();
    loadItemStats();
});

/**
 * Initialize Item Detail Page
 */
function initializeItemDetail() {
    const params = new URLSearchParams(window.location.search);
    const itemId = parseInt(params.get('id')) || getItemIdFromHash();

    if (itemId && galleryData) {
        currentItem = galleryData.find(item => item.id === itemId);
        
        if (currentItem) {
            loadItemData();
            loadRelatedItems();
            incrementViewCount();
        } else {
            showError('Item not found');
            redirectToGallery();
        }
    } else {
        showError('No item specified');
        redirectToGallery();
    }
}

/**
 * Get item ID from URL hash
 */
function getItemIdFromHash() {
    const hash = window.location.hash;
    const match = hash.match(/item-(\d+)/);
    return match ? parseInt(match[1]) : null;
}

/**
 * Load Item Data
 */
function loadItemData() {
    if (!currentItem) return;

    updateDynamicSeo();

    // Update breadcrumb
    document.getElementById('breadcrumb-title').textContent = currentItem.title;

    // Update main image with lazy loading
    const imgElement = document.getElementById('itemImage');
    if (currentItem.image) {
        imgElement.setAttribute('data-src', currentItem.image);
    } else if (currentItem.artpalId) {
        imgElement.setAttribute('data-artpal-id', currentItem.artpalId);
    }
    imgElement.setAttribute('alt', currentItem.title);
    lazyImageLoader.registerImage(imgElement);

    // Update metadata
    document.getElementById('itemTitle').textContent = currentItem.title;
    document.getElementById('itemDescription').textContent = currentItem.description || 
        `Explore "${currentItem.title}" from the ${currentItem.collection} collection on ${currentItem.platform}.`;
    document.getElementById('itemCollection').textContent = currentItem.collection;
    document.getElementById('itemPlatformDetail').textContent = currentItem.platform;
    document.getElementById('itemCategoryDetail').textContent = currentItem.category;
    
    // Update badges
    document.getElementById('itemPlatform').textContent = currentItem.platform;
    document.getElementById('itemCategory').textContent = currentItem.category;

    // Update action buttons
    const viewBtn = document.getElementById('viewOnPlatformBtn');
    viewBtn.href = currentItem.link;
    viewBtn.textContent = `View on ${currentItem.platform} ↗`;

    // Load preview images from related items
    loadPreviewImages();
}

function updateDynamicSeo() {
    const title = `${currentItem.title} | ${currentItem.collection} | Abstract Emporium Art`;
    const description = currentItem.description ||
        `Explore ${currentItem.title} from the ${currentItem.collection} collection on ${currentItem.platform}.`;
    const canonical = `https://abstractemporium.art/item-detail.html?id=${currentItem.id}`;
    const image = currentItem.image || "https://abstractemporium.art/TheHugArtAbstractEmporiumCover.jpg?v=1777240761";

    document.title = title;

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonical);
    setMetaTag('property', 'og:image', image);
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonical);
}

function setMetaTag(attrName, attrValue, content) {
    let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}

/**
 * Load Preview Images from Related Items
 */
function loadPreviewImages() {
    const previewContainer = document.getElementById('previewContainer');
    const currentCollection = currentItem.collection;
    
    const relatedItems = galleryData
        .filter(item => item.collection === currentCollection && item.id !== currentItem.id)
        .slice(0, 5);

    if (relatedItems.length === 0) {
        previewContainer.innerHTML = '<p>No preview images available for this collection.</p>';
        return;
    }

    previewContainer.innerHTML = '';
    previewContainer.parentElement.querySelector('.preview-hint').style.display = 'none';

    relatedItems.forEach(item => {
        const previewDiv = document.createElement('div');
        previewDiv.className = 'preview-item';
        
        const img = document.createElement('img');
        img.className = 'preview-image';
        img.setAttribute('alt', item.title);
        img.setAttribute('title', item.title);
        
        if (item.image) {
            img.setAttribute('data-src', item.image);
        } else if (item.artpalId) {
            img.setAttribute('data-artpal-id', item.artpalId);
        }
        
        img.addEventListener('click', () => {
            navigateToItem(item.id);
        });

        previewDiv.appendChild(img);
        previewContainer.appendChild(previewDiv);
        
        lazyImageLoader.registerImage(img);
    });
}

/**
 * Load Related Items
 */
function loadRelatedItems() {
    const relatedGrid = document.getElementById('relatedGrid');
    const currentCollection = currentItem.collection;
    
    const relatedItems = galleryData
        .filter(item => item.collection === currentCollection && item.id !== currentItem.id)
        .slice(0, 6);

    if (relatedItems.length === 0) {
        relatedGrid.innerHTML = '<p>No related items found.</p>';
        return;
    }

    relatedGrid.innerHTML = '';

    relatedItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'related-item';
        
        const img = document.createElement('img');
        img.className = 'related-image';
        img.setAttribute('alt', item.title);
        
        if (item.image) {
            img.setAttribute('data-src', item.image);
        } else if (item.artpalId) {
            img.setAttribute('data-artpal-id', item.artpalId);
        }

        const title = document.createElement('h3');
        title.textContent = item.title;

        const link = document.createElement('a');
        link.href = `item-detail.html?id=${item.id}`;
        link.className = 'view-link';
        link.textContent = 'View Details →';

        itemDiv.appendChild(img);
        itemDiv.appendChild(title);
        itemDiv.appendChild(link);
        relatedGrid.appendChild(itemDiv);

        lazyImageLoader.registerImage(img);
    });
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
    // Zoom button
    document.getElementById('zoomBtn').addEventListener('click', () => {
        const modal = document.getElementById('imageModal');
        const zoomedImg = document.getElementById('zoomedImage');
        const mainImg = document.getElementById('itemImage');
        
        zoomedImg.src = mainImg.src;
        modal.style.display = 'flex';
    });

    // Modal close
    document.querySelector('.modal-close').addEventListener('click', () => {
        document.getElementById('imageModal').style.display = 'none';
    });

    document.getElementById('imageModal').addEventListener('click', (e) => {
        if (e.target.id === 'imageModal') {
            document.getElementById('imageModal').style.display = 'none';
        }
    });

    // Like button
    document.querySelector('.stat-icon:nth-child(1)')?.parentElement.addEventListener('click', () => {
        incrementLikes();
    });

    // Share button
    document.getElementById('shareImageBtn').addEventListener('click', () => {
        shareItem();
    });

    // Save for later
    document.getElementById('saveForLaterBtn').addEventListener('click', () => {
        saveItemForLater();
    });

    // Add to cart
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        addToCart();
    });
}

/**
 * Increment Like Count
 */
function incrementLikes() {
    currentItemStats.likes++;
    document.getElementById('likeCount').textContent = currentItemStats.likes;
    saveItemStats();
    
    // Visual feedback
    const btn = document.querySelector('.stat:nth-child(1)');
    btn.style.transform = 'scale(1.1)';
    setTimeout(() => btn.style.transform = 'scale(1)', 200);
}

/**
 * Increment View Count
 */
function incrementViewCount() {
    currentItemStats.views++;
    document.getElementById('viewCount').textContent = currentItemStats.views;
    saveItemStats();
}

/**
 * Share Item
 */
function shareItem() {
    const shareUrl = `${window.location.origin}/item-detail.html?id=${currentItem.id}`;
    const shareText = `Check out "${currentItem.title}" from Abstract Emporium Art!`;

    if (navigator.share) {
        navigator.share({
            title: currentItem.title,
            text: shareText,
            url: shareUrl
        }).catch(err => console.log('Share cancelled'));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Link copied to clipboard!');
            currentItemStats.shares++;
            document.getElementById('shareCount').textContent = currentItemStats.shares;
            saveItemStats();
        });
    }
}

/**
 * Save Item for Later
 */
function saveItemForLater() {
    let savedItems = JSON.parse(localStorage.getItem('savedArtworks') || '[]');
    
    if (!savedItems.find(item => item.id === currentItem.id)) {
        savedItems.push({
            id: currentItem.id,
            title: currentItem.title,
            platform: currentItem.platform,
            savedAt: new Date().toISOString()
        });
        localStorage.setItem('savedArtworks', JSON.stringify(savedItems));
        alert(`"${currentItem.title}" saved for later!`);
    } else {
        alert('This item is already in your saved list.');
    }
}

/**
 * Add to Cart
 */
function addToCart() {
    let cart = JSON.parse(localStorage.getItem('artCart') || '[]');
    
    if (!cart.find(item => item.id === currentItem.id)) {
        cart.push({
            id: currentItem.id,
            title: currentItem.title,
            link: currentItem.link,
            platform: currentItem.platform,
            addedAt: new Date().toISOString()
        });
        localStorage.setItem('artCart', JSON.stringify(cart));
        alert(`"${currentItem.title}" added to cart!`);
    } else {
        alert('This item is already in your cart.');
    }
}

/**
 * Load Item Stats from LocalStorage
 */
function loadItemStats() {
    const statsKey = `item-${currentItem.id}-stats`;
    const saved = localStorage.getItem(statsKey);
    
    if (saved) {
        currentItemStats = JSON.parse(saved);
    } else {
        currentItemStats = {
            likes: Math.floor(Math.random() * 100),
            views: Math.floor(Math.random() * 500),
            shares: Math.floor(Math.random() * 50)
        };
    }

    document.getElementById('likeCount').textContent = currentItemStats.likes;
    document.getElementById('viewCount').textContent = currentItemStats.views;
    document.getElementById('shareCount').textContent = currentItemStats.shares;
}

/**
 * Save Item Stats to LocalStorage
 */
function saveItemStats() {
    const statsKey = `item-${currentItem.id}-stats`;
    localStorage.setItem(statsKey, JSON.stringify(currentItemStats));
}

/**
 * Navigate to Another Item
 */
function navigateToItem(itemId) {
    window.location.href = `item-detail.html?id=${itemId}`;
}

/**
 * Show Error Message
 */
function showError(message) {
    console.error(message);
    alert(message);
}

/**
 * Redirect to Gallery
 */
function redirectToGallery() {
    setTimeout(() => {
        window.location.href = 'gallery.html';
    }, 2000);
}
