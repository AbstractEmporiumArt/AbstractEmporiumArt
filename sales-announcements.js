/**
 * Real-time Sales & Deals Announcement System
 * Displays active promotions from ArtPal, Fine Art America, and The HUG
 */

class SalesAnnouncementSystem {
  constructor() {
    this.platforms = {
      artpal: {
        name: "ArtPal",
        url: "https://www.artpal.com/Abstractemporium/",
        color: "#FF6B6B",
        icon: "🎨"
      },
      fineartamerica: {
        name: "Fine Art America",
        url: "https://fineartamerica.com/profiles/lissa-beaulieu/shop",
        color: "#4ECDC4",
        icon: "🖼️"
      },
      thehug: {
        name: "The HUG",
        url: "https://thehug.xyz/artists/AbstractEmporiumArt/shop",
        color: "#95E1D3",
        icon: "💎"
      }
    };

    this.activeSales = this.loadActiveSales();
    this.init();
  }

  /**
   * Load active sales from localStorage or defaults
   */
  loadActiveSales() {
    const stored = localStorage.getItem('abstractemporium_active_sales');
    if (stored) {
      try {
        const sales = JSON.parse(stored);
        // Filter out expired sales
        return sales.filter(sale => new Date(sale.endDate) > new Date());
      } catch (e) {
        console.error('Error loading sales:', e);
      }
    }
    
    // Default sales/ongoing promotions
    return this.getDefaultSales();
  }

  /**
   * Get default sales data (returns empty - only shows manually added sales)
   */
  getDefaultSales() {
    // Return empty array - only real sales added via admin panel will display
    // This ensures only actual live deals from ArtPal, Fine Art America, and The HUG are shown
    return [];
  }

  /**
   * Add a new sale manually
   */
  addSale(saleData) {
    this.activeSales.push({
      id: Date.now(),
      ...saleData,
      addedDate: new Date().toISOString()
    });
    this.saveSales();
    this.render();
  }

  /**
   * Remove expired or ended sales
   */
  removeExpiredSales() {
    const now = new Date();
    this.activeSales = this.activeSales.filter(sale => 
      new Date(sale.endDate) > now
    );
    this.saveSales();
  }

  /**
   * Save sales to localStorage
   */
  saveSales() {
    localStorage.setItem('abstractemporium_active_sales', 
      JSON.stringify(this.activeSales));
  }

  /**
   * Initialize the announcement system
   */
  init() {
    this.removeExpiredSales();
    this.createAnnouncementBar();
    this.render();
    
    // Update every hour
    setInterval(() => {
      this.removeExpiredSales();
      this.render();
    }, 3600000);
  }

  /**
   * Create the announcement bar element
   */
  createAnnouncementBar() {
    // Check if already exists
    if (document.getElementById('sales-announcement-bar')) return;

    const bar = document.createElement('div');
    bar.id = 'sales-announcement-bar';
    bar.className = 'sales-announcement-bar';
    
    // Insert at top of body
    document.body.insertBefore(bar, document.body.firstChild);

    // Add styles
    this.addStyles();
  }

  /**
   * Render active announcements
   */
  render() {
    const bar = document.getElementById('sales-announcement-bar');
    if (!bar) return;

    const activeSales = this.activeSales
      .filter(sale => {
        const now = new Date();
        const start = new Date(sale.startDate);
        const end = new Date(sale.endDate);
        return now >= start && now <= end;
      })
      .sort((a, b) => (a.priority || 999) - (b.priority || 999));

    if (activeSales.length === 0) {
      bar.style.display = 'none';
      return;
    }

    bar.style.display = 'block';
    bar.innerHTML = this.renderAnnouncements(activeSales);
    this.attachEventListeners();
  }

  /**
   * Render announcement HTML
   */
  renderAnnouncements(sales) {
    if (sales.length === 1) {
      return this.renderSingleAnnouncement(sales[0]);
    } else {
      return this.renderCarousel(sales);
    }
  }

  /**
   * Render single announcement
   */
  renderSingleAnnouncement(sale) {
    const platform = this.platforms[sale.platform];
    const daysLeft = this.getDaysUntilEnd(sale.endDate);
    
    return `
      <div class="announcement-content single" style="background: linear-gradient(135deg, ${platform.color}22, ${platform.color}44);">
        <div class="announcement-icon">${platform.icon}</div>
        <div class="announcement-text">
          <strong>${platform.name}</strong>: ${sale.title} 
          <span class="discount-badge">${sale.discount}</span>
          ${sale.code ? `<span class="code-badge">Code: ${sale.code}</span>` : ''}
          <span class="countdown">${daysLeft}</span>
        </div>
        <a href="${platform.url}" target="_blank" class="shop-now-btn" style="background: ${platform.color};">
          Shop Now →
        </a>
        <button class="close-announcement" aria-label="Close">&times;</button>
      </div>
    `;
  }

  /**
   * Render carousel for multiple announcements
   */
  renderCarousel(sales) {
    let html = '<div class="announcement-carousel">';
    
    sales.forEach((sale, index) => {
      const platform = this.platforms[sale.platform];
      const daysLeft = this.getDaysUntilEnd(sale.endDate);
      
      html += `
        <div class="announcement-slide ${index === 0 ? 'active' : ''}" 
             style="background: linear-gradient(135deg, ${platform.color}22, ${platform.color}44);"
             data-index="${index}">
          <div class="announcement-icon">${platform.icon}</div>
          <div class="announcement-text">
            <strong>${platform.name}</strong>: ${sale.title}
            <span class="discount-badge">${sale.discount}</span>
            ${sale.code ? `<span class="code-badge">Code: ${sale.code}</span>` : ''}
            <span class="countdown">${daysLeft}</span>
          </div>
          <a href="${platform.url}" target="_blank" class="shop-now-btn" style="background: ${platform.color};">
            Shop Now →
          </a>
        </div>
      `;
    });
    
    html += `
      <div class="carousel-controls">
        <button class="carousel-prev" aria-label="Previous">‹</button>
        <div class="carousel-dots">
          ${sales.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
        </div>
        <button class="carousel-next" aria-label="Next">›</button>
      </div>
      <button class="close-announcement" aria-label="Close">&times;</button>
    </div>`;
    
    return html;
  }

  /**
   * Get days until sale ends
   */
  getDaysUntilEnd(endDate) {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Ends today!';
    if (days === 1) return 'Ends tomorrow!';
    if (days <= 7) return `${days} days left`;
    return '';
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Close button
    const closeBtn = document.querySelector('.close-announcement');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const bar = document.getElementById('sales-announcement-bar');
        bar.style.display = 'none';
        localStorage.setItem('sales_announcement_dismissed', Date.now());
      });
    }

    // Carousel controls
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => this.changeSlide(-1));
      nextBtn.addEventListener('click', () => this.changeSlide(1));
    }

    if (dots.length > 0) {
      dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
          this.goToSlide(parseInt(e.target.dataset.index));
        });
      });
    }

    // Auto-rotate carousel
    if (document.querySelector('.announcement-carousel')) {
      this.startAutoRotate();
    }
  }

  /**
   * Change carousel slide
   */
  changeSlide(direction) {
    const slides = document.querySelectorAll('.announcement-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentIndex = 0;

    slides.forEach((slide, index) => {
      if (slide.classList.contains('active')) {
        currentIndex = index;
      }
    });

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;

    this.goToSlide(newIndex);
  }

  /**
   * Go to specific slide
   */
  goToSlide(index) {
    const slides = document.querySelectorAll('.announcement-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  /**
   * Start auto-rotation
   */
  startAutoRotate() {
    setInterval(() => {
      if (document.querySelector('.announcement-carousel')) {
        this.changeSlide(1);
      }
    }, 5000); // Rotate every 5 seconds
  }

  /**
   * Add styles to page
   */
  addStyles() {
    if (document.getElementById('sales-announcement-styles')) return;

    const style = document.createElement('style');
    style.id = 'sales-announcement-styles';
    style.textContent = `
      .sales-announcement-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        animation: slideDown 0.5s ease-out;
      }

      @keyframes slideDown {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
      }

      .announcement-content {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 20px;
        gap: 15px;
        position: relative;
        min-height: 60px;
      }

      .announcement-icon {
        font-size: 24px;
        flex-shrink: 0;
      }

      .announcement-text {
        flex: 1;
        text-align: center;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
      }

      .announcement-text strong {
        color: #000;
        font-weight: 600;
      }

      .discount-badge {
        display: inline-block;
        background: #ff4444;
        color: white;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: bold;
        margin: 0 5px;
      }

      .code-badge {
        display: inline-block;
        background: #333;
        color: white;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-family: monospace;
        margin: 0 5px;
      }

      .countdown {
        color: #ff4444;
        font-weight: 600;
        margin-left: 8px;
      }

      .shop-now-btn {
        background: #4ECDC4;
        color: white;
        padding: 8px 20px;
        border-radius: 20px;
        text-decoration: none;
        font-weight: 600;
        font-size: 13px;
        transition: transform 0.2s, box-shadow 0.2s;
        flex-shrink: 0;
      }

      .shop-now-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      }

      .close-announcement {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.5);
        color: white;
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
        transition: background 0.2s;
      }

      .close-announcement:hover {
        background: rgba(0,0,0,0.8);
      }

      /* Carousel styles */
      .announcement-carousel {
        position: relative;
        min-height: 60px;
      }

      .announcement-slide {
        display: none;
        align-items: center;
        justify-content: center;
        padding: 12px 60px 12px 20px;
        gap: 15px;
        animation: fadeIn 0.5s;
      }

      .announcement-slide.active {
        display: flex;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .carousel-controls {
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .carousel-prev,
      .carousel-next {
        background: rgba(0,0,0,0.3);
        color: white;
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
        transition: background 0.2s;
      }

      .carousel-prev:hover,
      .carousel-next:hover {
        background: rgba(0,0,0,0.6);
      }

      .carousel-dots {
        display: flex;
        gap: 6px;
      }

      .carousel-dots .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(0,0,0,0.3);
        cursor: pointer;
        transition: background 0.2s, transform 0.2s;
      }

      .carousel-dots .dot.active {
        background: rgba(0,0,0,0.7);
        transform: scale(1.2);
      }

      /* Mobile responsive */
      @media (max-width: 768px) {
        .announcement-content,
        .announcement-slide {
          flex-direction: column;
          padding: 15px 40px 15px 15px;
          gap: 10px;
        }

        .announcement-text {
          font-size: 13px;
        }

        .shop-now-btn {
          width: 100%;
          text-align: center;
        }

        .announcement-icon {
          font-size: 20px;
        }
      }

      /* Push down main content */
      body {
        padding-top: 60px;
      }
    `;
    
    document.head.appendChild(style);
  }
}

// Initialize on page load
if (typeof window !== 'undefined') {
  window.salesAnnouncementSystem = null;
  
  document.addEventListener('DOMContentLoaded', () => {
    window.salesAnnouncementSystem = new SalesAnnouncementSystem();
  });
}

// Export for use in admin panel
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SalesAnnouncementSystem;
}
