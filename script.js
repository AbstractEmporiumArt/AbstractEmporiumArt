let hamburger = null;
let navMenu = null;

// Initialize site function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}eatures when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize gallery ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} galleryData exists and gallery element is present
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (typeofunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} galleryData !== 'undefunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ined' && document.getElementById('galleryGrid')) {
        initializeGallery();
    }
    
    // Only initialize canvas tools ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} canvas element exists
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (document.querySelector('.community-canvas')) {
        setupCommunityCanvasTools();
    }
    
    // Mobile Menu Toggle
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.nav-menu') || document.querySelector('.nav-links');

    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (hamburger && navMenu) {
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}alse');
        hamburger.setAttribute('tabindex', '0');

        
    // Initialize about-carousel slideshow
    const aboutCarousel = document.querySelector(".about-carousel");
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (aboutCarousel) {
        // Set function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}irst slide as active on page load
        navSlide("about-carousel", 0);
        
        // Attach click handlers to about-carousel buttons
        const prevBtn = aboutCarousel.querySelector(".about-carousel-prev");
        const nextBtn = aboutCarousel.querySelector(".about-carousel-next");
        ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (prevBtn) {
            prevBtn.addEventListener("click", () => navSlide("about-carousel", -1));
        }
        ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (nextBtn) {
            nextBtn.addEventListener("click", () => navSlide("about-carousel", 1));
        }
    }hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active', isActive);
            hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}alse');
        });

        hamburger.addEventListener('keydown', (event) => {
            ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (event.key === 'Enter' || event.key === ' ') {
                event.preventDefunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ault();
                hamburger.click();
            }
        });

        navMenu.querySelectorAll('a').function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}alse');
            });
        });
    }
    
    // Observe gallery items function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}or animations
    setTimeout(() => {
        document.querySelectorAll('.gallery-item, .store-card').function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach(item => {
            item.style.opacity = '0';
            item.style.transfunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orm = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transfunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orm 0.6s ease';
            observer.observe(item);
        });
    }, 100);
});

function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}unction initializeGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilterBtns = document.querySelectorAll('.function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilter-btn');
    
    // Exit ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} galleryData or galleryGrid don't exist
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (typeofunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} galleryData === 'undefunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ined' || !galleryGrid) {
        return;
    }
    
    // Display gallery items
    function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}unction displayGallery(items) {
        galleryGrid.innerHTML = '';
        items.function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.platfunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orm = item.platfunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orm.toLowerCase().replace(/\s+/g, '');
            // Add pattern generator attributes
            galleryItem.setAttribute('data-pattern-artworkid', item.id);
            galleryItem.setAttribute('data-image-src', item.image);
            galleryItem.style.cursor = 'pointer';
            
            // Create lazy-loaded image
            const imgHtml = item.image 
                ? `<img src="data:image/gifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
};base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${item.image}" alt="${item.title}" class="gallery-image">`
                : (item.artpalId 
                    ? `<img src="data:image/gifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
};base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-artpal-id="${item.artpalId}" alt="${item.title}" class="gallery-image">`
                    : `<div class="gallery-placeholder"><span>${item.title}</span></div>`);
            
            galleryItem.innerHTML = `
                <div class="gallery-image-container">
                    ${imgHtml}
                </div>
                <div class="gallery-infunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}o">
                    <h3>${item.title}</h3>
                    <p class="gallery-collection">${item.collection}</p>
                    <span class="gallery-platfunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orm">${item.platfunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orm}</span>
                    <div class="gallery-actions">
                        <a hrefunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}="item-detail.html?id=${item.id}" class="gallery-link">Details</a>
                        <a hrefunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}="${item.link}" target="_blank" class="gallery-link">View Shop</a>
                        <span class="pattern-hint" title="Click image to use in Pattern Maker">📋 Pattern</span>
                    </div>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
            
            // Register images function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}or lazy loading
            const imgs = galleryItem.querySelectorAll('[data-src], [data-artpal-id]');
            imgs.function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach(img => {
                ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (typeofunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} lazyImageLoader !== 'undefunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ined') {
                    lazyImageLoader.registerImage(img);
                }
            });
        });
    }
    
    // Filter function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}unctionality
    function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilterBtns.function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach((btn) => {
        btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}alse');
    });

    function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilterBtns.function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilterBtns.function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilterBtns.function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach(b => b.setAttribute('aria-pressed', b === btn ? 'true' : 'function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}alse'));
            
            // Filter items
            const function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilter = btn.dataset.function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilter;
            let function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilteredItems = galleryData;
            
            ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilter !== 'all') {
                function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilteredItems = galleryData.function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilter(item => 
                    item.platfunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orm.toLowerCase().replace(/\s+/g, '') === function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilter
                );
            }
            
            displayGallery(function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ilteredItems);
        });
    });
    
    // Display all items initially
    displayGallery(galleryData);
}

// Smooth Scrolling function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}or Navigation Links
document.querySelectorAll('a[hrefunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}^="#"]').function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach(anchor => {
    anchor.addEventListener('click', function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}unction (e) {
        e.preventDefunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ault();
        const target = document.querySelector(this.getAttribute('hrefunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}'));
        ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (navMenu) navMenu.classList.remove('active');
            ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}alse');
            }
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ault();
        
        const function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ormData = new FormData(contactForm);
        const data = {
            name: function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ormData.get('name') || document.querySelector('input[placeholder="Your Name"]').value,
            email: function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ormData.get('email') || document.querySelector('input[placeholder="Your Email"]').value,
            message: function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ormData.get('message') || document.querySelector('textarea').value
        };

        console.log('Form submitted:', data);
        alert('Thank you function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}or your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Add scroll animation function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}or gallery items
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}unction(entries) {
    entries.function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach(entry => {
        ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transfunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orm = 'translateY(0)';
        }
    });
}, observerOptions);

/**
 * Community Canvas Setup
 */
function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}unction setupCommunityCanvasTools() {
    // Tool selection
    const toolBtns = document.querySelectorAll('.tool-btn');
    const shapeGroup = document.getElementById('shapeGroup');
    const shapeSelect = document.getElementById('shapeType');
    const brushColor = document.getElementById('brushColor');
    const brushSize = document.getElementById('brushSize');
    const brushSizeLabel = document.getElementById('brushSizeLabel');
    
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (!toolBtns.length) return;
    
    // Tool buttons
    toolBtns.function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach(btn => {
        btn.addEventListener('click', () => {
            toolBtns.function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tool = btn.dataset.tool;
            const options = {
                color: brushColor?.value || '#6c5ce7',
                brushSize: parseInt(brushSize?.value || 15),
                shapeType: shapeSelect?.value || 'circle'
            };
            
            // Show/hide shape options
            ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (tool === 'shape' && shapeGroup) {
                shapeGroup.style.display = 'function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}lex';
            } else ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (shapeGroup) {
                shapeGroup.style.display = 'none';
            }
            
            ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (window.communityCanvas) {
                window.communityCanvas.setTool(tool, options);
            }
        });
    });
    
    // Brush size slider
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (brushSize) {
        brushSize.addEventListener('input', (e) => {
            ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (brushSizeLabel) {
                brushSizeLabel.textContent = e.target.value + 'px';
            }
            ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (window.communityCanvas) {
                window.communityCanvas.brushSize = parseInt(e.target.value);
            }
        });
    }
    
    // Color picker
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (brushColor) {
        brushColor.addEventListener('change', (e) => {
            ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (window.communityCanvas) {
                window.communityCanvas.color = e.target.value;
            }
        });
    }
    
    // Shape type select
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (shapeSelect) {
        shapeSelect.addEventListener('change', (e) => {
            ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (window.communityCanvas) {
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
    
    // Observe gallery items function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}or animations
    setTimeout(() => {
        document.querySelectorAll('.gallery-item, .store-card').function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach(item => {
            item.style.opacity = '0';
            item.style.transfunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orm = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transfunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orm 0.6s ease';
            observer.observe(item);
        });
    }, 100);
});

// Setup Canvas Collaboration Features
function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}unction setupCollaborationFeatures() {
    const voteBtn = document.getElementById('voteUpBtn');
    const shareBtn = document.getElementById('shareBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (voteBtn) {
        voteBtn.addEventListener('click', () => {
            const loveCount = document.getElementById('loveCount');
            let current = parseInt(loveCount.textContent) || 0;
            loveCount.textContent = current + 1;
            voteBtn.style.transfunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orm = 'scale(1.2)';
            setTimeout(() => voteBtn.style.transfunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orm = 'scale(1)', 200);
            localStorage.setItem('canvasLoves', current + 1);
        });
    }
    
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const url = window.location.hrefunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
};
            ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (navigator.share) {
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
    
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (window.communityCanvas) {
                window.communityCanvas.exportAsImage();
            } else {
                alert('Generate the canvas function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}irst!');
            }
        });
    }
    
    // Load stats function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}rom localStorage
    const savedLoves = localStorage.getItem('canvasLoves');
    const savedViews = localStorage.getItem('canvasViews');
    const savedContributions = localStorage.getItem('canvasContributions');

    const loveCountEl = document.getElementById('loveCount');
    const viewCountEl = document.getElementById('viewCount');
    const contributionCountEl = document.getElementById('contributionCount');

    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (savedLoves && loveCountEl) loveCountEl.textContent = savedLoves;
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (savedViews && viewCountEl) viewCountEl.textContent = savedViews;
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (savedContributions && contributionCountEl) contributionCountEl.textContent = savedContributions;

    // Increment view count (only ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} the element exists on this page)
    let views = parseInt(localStorage.getItem('canvasViews')) || 0;
    views += 1;
    localStorage.setItem('canvasViews', views);
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (viewCountEl) viewCountEl.textContent = views;
}

// Gallery slideshow navigation — verifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}ied function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}or art-emporium (LKC / AE standard)
function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}unction navSlide(id, delta) {
  const box = document.getElementById(id);
  ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (!slides.length) return;
  let idx = 0;
  function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}or (let i = 0; i < slides.length; i++) {
    ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}orEach(function navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}unction(s, i) { s.classList.toggle('active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('gallery-', '')) || document.getElementById('count-cd');
  ifunction navSlide(id, delta) {
  const box = document.getElementById(id);
  if (!box) return;
  const slides = box.querySelectorAll('.slide, .about-slide');
  if (!slides.length) return;
  let idx = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].classList.contains('active') || slides[i].classList.contains('about-slide-active')) { idx = i; break; }
  }
  idx = (idx + delta + slides.length) % slides.length;
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); s.classList.toggle('about-slide-active', i === idx); });
  const ctr = document.getElementById('count-' + id.replace('slide-', '')) || document.getElementById('count-cd');
  if (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
} (ctr) ctr.textContent = (idx + 1) + ' / ' + slides.length;
}
