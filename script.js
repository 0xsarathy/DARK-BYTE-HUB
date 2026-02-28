// FIXED & ENHANCED SCRIPT - NAV + MATRIX FIXED
// GLOBAL VARIABLES
let currentSection = 'home';
let isScrolling = false;
let particles = [];
let matrixCanvas, matrixCtx;

// DOM ELEMENTS
const loader = document.getElementById('loader');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contact-form');
const statNumbers = document.querySelectorAll('.stat-number');

// MAIN NAVIGATION FUNCTION - FIXED
function navigateTo(sectionId) {
  console.log('Navigating to:', sectionId); // Debug log
  
  // Remove active from all sections
  sections.forEach(section => section.classList.remove('active'));
  
  // Add active to target section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // Update nav active states
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionId) {
      link.classList.add('active');
    }
  });
  
  // Close mobile menu
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
  
  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  currentSection = sectionId;
  
  // Trigger scroll animations
  setTimeout(() => window.dispatchEvent(new Event('scroll')), 100);
}

// SERVICE CARD TOGGLE - FIXED
function toggleServiceCard(card) {
  card.classList.toggle('expanded');
  
  const details = card.querySelector('.service-details');
  const icon = card.querySelector('.service-icon i');
  
  if (card.classList.contains('expanded')) {
    details.style.maxHeight = details.scrollHeight + 'px';
    details.style.opacity = '1';
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    details.style.maxHeight = '0';
    details.style.opacity = '0';
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}

// CLOSE MOBILE MENU HELPER
function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}

// INIT ON LOAD
window.addEventListener('load', function() {
  console.log('Site loaded - Initializing...');
  
  // Loader fade out
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
      initAllFeatures(); // Start everything after loader
    }, 500);
  }, 2000);
});

function initAllFeatures() {
  initParticles();
  initMatrixRain(); // FIXED MATRIX
  initScrollAnimations();
  initTrainingSlider();
  animateStats();
  bindNavigationEvents();
  console.log('All features initialized');
}

// EVENT BINDERS - FIXED NAV
function bindNavigationEvents() {
  // Desktop nav
  document.querySelectorAll('.nav-desktop .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      navigateTo(sectionId);
    });
  });
  
  // Mobile nav
  document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      navigateTo(sectionId);
      closeMobileMenu();
    });
  });
  
  // Logo click
  document.querySelector('.logo-glow').addEventListener('click', function() {
    navigateTo('home');
  });
  
  // Hero buttons
  document.querySelectorAll('.hero-buttons button').forEach(btn => {
    btn.addEventListener('click', function() {
      const sectionId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
      navigateTo(sectionId);
    });
  });
  
  // Footer links
  document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
      navigateTo(sectionId);
    });
  });
}

// MOBILE MENU TOGGLE
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// ESCAPE KEY
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// MATRIX RAIN - FIXED WITH ENGLISH CHARS ONLY
function initMatrixRain() {
  const matrixContainer = document.querySelector('.matrix-rain');
  if (!matrixContainer) return;
  
  const matrixCanvas = document.createElement('canvas');
  matrixContainer.appendChild(matrixCanvas);
  
  matrixCanvas.width = 400;
  matrixCanvas.height = 400;
  matrixCanvas.style.width = '100%';
  matrixCanvas.style.height = '100%';
  
  matrixCtx = matrixCanvas.getContext('2d');
  
  // ENGLISH LETTERS + NUMBERS ONLY - FIXED
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  const fontSize = 14;
  const columns = Math.floor(matrixCanvas.width / fontSize);
  
  const drops = Array(columns).fill(1);
  
  function drawMatrix() {
    // Fade effect
    matrixCtx.fillStyle = 'rgba(2, 4, 11, 0.08)';
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    // Green glow text
    matrixCtx.fillStyle = '#00ff88';
    matrixCtx.shadowColor = '#00ff88';
    matrixCtx.shadowBlur = 10;
    matrixCtx.font = `${fontSize}px 'Courier New', monospace`;
    
    drops.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      matrixCtx.fillText(text, i * fontSize, y * fontSize);
      
      // Reset drops that reached bottom
      if (y * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });
    
    matrixCtx.shadowBlur = 0; // Reset shadow
  }
  
  // Animation loop
  const matrixInterval = setInterval(drawMatrix, 50);
  
  // Resize handler
  window.addEventListener('resize', () => {
    matrixCanvas.width = 400;
    matrixCanvas.height = 400;
  });
}

// PARTICLE SYSTEM
function initParticles() {
  const canvas = document.getElementById('particles-bg');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
      ctx.fillStyle = 'rgba(0, 255, 136, 0.4)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// TRAINING SLIDER
function initTrainingSlider() {
  const cards = document.querySelectorAll('.training-card');
  let currentSlide = 0;
  
  setInterval(() => {
    cards[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % cards.length;
    cards[currentSlide].classList.add('active');
  }, 5000);
}

// STATS ANIMATION
function animateStats() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const number = entry.target;
        const target = parseInt(number.dataset.target);
        let count = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            number.textContent = target;
            clearInterval(timer);
          } else {
            number.textContent = Math.floor(count);
          }
        }, 20);
        observer.unobserve(entry.target);
      }
    });
  });
  
  statNumbers.forEach(stat => observer.observe(stat));
}

// SCROLL ANIMATIONS
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.feature-card, .service-card, .case-card, .contact-item').forEach(el => {
    observer.observe(el);
  });
}

// FORM HANDLING
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const button = contactForm.querySelector('button[type="submit"]');
  const originalText = button.innerHTML;
  
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  button.disabled = true;
  
  setTimeout(() => {
    alert('✅ Mission launched successfully! We\'ll contact you within 24 hours. 🚀');
    contactForm.reset();
    button.innerHTML = originalText;
    button.disabled = false;
  }, 2000);
});

// PERFECT SCROLL NAVIGATION
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < 100 && rect.bottom > 100) {
          const sectionId = section.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
      
      ticking = false;
    });
    ticking = true;
  }
  
  // Header shrink
  const header = document.getElementById('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(5, 10, 24, 0.98)';
    header.style.backdropFilter = 'blur(30px)';
    header.style.padding = '0.8rem 5%';
  } else {
    header.style.background = 'rgba(5, 10, 24, 0.95)';
    header.style.backdropFilter = 'blur(20px)';
    header.style.padding = '1rem 5%';
  }
});

// BACK BUTTON SUPPORT
window.addEventListener('popstate', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  navigateTo(hash);
});

// HASH CHANGE
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '') || 'home';
  navigateTo(hash);
});
