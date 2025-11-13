// Gallery Initialization
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
            
            galleryItem.innerHTML = `
                <div class="gallery-image-container">
                    ${item.image ? `<img src="${item.image}" alt="${item.title}" class="gallery-image" onerror="this.parentElement.innerHTML = '<div class=\'gallery-placeholder\'><span>${item.title}</span></div>'">` : '<div class="gallery-placeholder"><span>' + item.title + '</span></div>'}
                </div>
                <div class="gallery-info">
                    <h3>${item.title}</h3>
                    <p class="gallery-collection">${item.collection}</p>
                    <span class="gallery-platform">${item.platform}</span>
                    <a href="${item.link}" target="_blank" class="gallery-link">View on ${item.platform}</a>
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

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    
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
