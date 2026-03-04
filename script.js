// 🔥 DARK BYTE HUB v12.1 - BULLETPROOF BACK/FORWARD + HAMBURGER PERFECT
let currentUser = null;
let particles = [];
let matrixCtx;
let currentSection = 'home';

function initEverything() {
    console.log('🚀 DARK BYTE HUB v12.1 - BACK/FORWARD BULLETPROOF');
    
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.style.opacity = '1';
        mainContent.style.display = 'block';
    }
    
    // Hamburger desktop hide
    updateHamburgerVisibility();
    
    initParticles();
    initMatrixRain();
    initStats();
    bindNavigation();
    bindForms();
    initCourseFilters();
    initHistoryAPI();
    updateDashboardAccess();
}

window.addEventListener('load', initEverything);
document.addEventListener('DOMContentLoaded', initEverything);

// ✅ HAMBURGER DESKTOP HIDE - PERFECT
function updateHamburgerVisibility() {
    const toggle = document.getElementById('menuToggle');
    if (toggle) {
        if (window.innerWidth > 768) {
            toggle.style.display = 'none';
        } else {
            toggle.style.display = 'flex';
        }
    }
}

window.addEventListener('resize', updateHamburgerVisibility);

// ✅ BACK/FORWARD 100% BULLETPROOF
function initHistoryAPI() {
    // Fix initial state
    if (!window.location.hash) {
        window.history.replaceState({section: 'home'}, '', '#home');
    }
    
    window.addEventListener('popstate', function(e) {
        console.log('🔙 BACK/FORWARD DETECTED →', e.state?.section || 'home');
        const section = (e.state?.section || window.location.hash.replace('#', '') || 'home');
        goToSection(section);
    });
}

function goToSection(sectionId) {
    console.log('🎯 NAVIGATING TO:', sectionId);
    
    currentSection = sectionId;
    
    // Hide ALL sections first
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
        section.style.opacity = '0';
        section.style.visibility = 'hidden';
    });
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Activate nav link
    const activeNav = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        setTimeout(() => {
            targetSection.style.opacity = '1';
            targetSection.style.visibility = 'visible';
            targetSection.classList.add('active');
        }, 50);
        
        // Push to browser history
        window.history.pushState({section: sectionId}, '', `#${sectionId}`);
        console.log('✅ SECTION LOADED + HISTORY PUSHED:', sectionId);
    }
    
    // Close mobile menu
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.getElementById('menuToggle');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
}

function bindNavigation() {
    // Nav links
    document.querySelectorAll('.nav-link[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            
            if ((section === 'dashboard' || section === 'certifications') && !currentUser) {
                showLoginModal();
                return;
            }
            
            goToSection(section);
        });
    });
    
    // Logo home
    document.querySelector('.logo-glow')?.addEventListener('click', () => goToSection('home'));
    
    // Login triggers
    document.querySelectorAll('.login-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginModal();
        });
    });
    
    // Hamburger menu
    document.getElementById('menuToggle')?.addEventListener('click', () => {
        const menu = document.querySelector('.mobile-menu');
        const toggle = document.getElementById('menuToggle');
        menu?.classList.toggle('active');
        toggle?.classList.toggle('active');
        document.body.style.overflow = menu?.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Course CTAs
    document.querySelectorAll('.course-cta').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!currentUser) {
                showLoginModal();
                return;
            }
            alert('🚀 Course Started! Welcome to your training journey! 🔥');
        });
    });
}

// Rest of your functions (unchanged)
function updateDashboardAccess() {
    const dashboardAccess = document.getElementById('dashboardAccess');
    if (currentUser && dashboardAccess) {
        dashboardAccess.style.display = 'block';
    }
}

function initParticles() {
    const canvas = document.getElementById('particles-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
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
    
    for (let i = 0; i < 100; i++) particles.push(new Particle());
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

function initMatrixRain() {
    const container = document.querySelector('.matrix-rain');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    canvas.width = 400; canvas.height = 400;
    canvas.style.width = '100%'; canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    
    matrixCtx = canvas.getContext('2d');
    const chars = '01ABCFGHKLMNPRSTVXYZ!@#$%^&*';
    const fontSize = 14;
    const columns = Math.floor(400 / fontSize);
    const drops = Array(columns).fill(1);
    
    function draw() {
        matrixCtx.fillStyle = 'rgba(2, 4, 11, 0.08)';
        matrixCtx.fillRect(0, 0, 400, 400);
        
        matrixCtx.fillStyle = '#00ff88';
        matrixCtx.shadowColor = '#00ff88'; 
        matrixCtx.shadowBlur = 10;
        matrixCtx.font = `${fontSize}px monospace`;
        
        drops.forEach((y, i) => {
            const text = chars[Math.floor(Math.random() * chars.length)];
            matrixCtx.fillText(text, i * fontSize, y * fontSize);
            if (y * fontSize > 400 && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
        matrixCtx.shadowBlur = 0;
    }
    setInterval(draw, 50);
}

function initStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const num = entry.target.querySelector('.stat-number');
                if (!num) return;
                const target = parseInt(num.dataset.target);
                let count = 0;
                const inc = target / 100;
                const timer = setInterval(() => {
                    count += inc;
                    if (count >= target) {
                        num.textContent = target.toLocaleString();
                        clearInterval(timer);
                    } else {
                        num.textContent = Math.floor(count).toLocaleString();
                    }
                }, 20);
                observer.unobserve(entry.target);
            }
        });
    });
    document.querySelectorAll('.stat-box').forEach(box => observer.observe(box));
}

function initCourseFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const cards = document.querySelectorAll('.course-card');
            
            cards.forEach((card, index) => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, index * 100);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function bindForms() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    document.querySelector('.demo-login a')?.addEventListener('click', demoLogin);
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail')?.value || '';
    const password = document.getElementById('loginPassword')?.value || '';
    
    if (email === 'admin@darkbytehub.com' && password === 'darkbyte2026') {
        currentUser = { name: 'Cyber Agent 🔥', email };
        loginSuccess();
    } else {
        alert('❌ ACCESS DENIED!\n\nEmail: admin@darkbytehub.com\nPass: darkbyte2026');
        document.querySelector('#loginForm').style.animation = 'shake 0.5s';
        setTimeout(() => document.querySelector('#loginForm').style.animation = '', 500);
    }
}

function demoLogin(e) {
    e.preventDefault();
    currentUser = { name: 'Agent 001 🔥', email: 'demo@darkbytehub.com' };
    loginSuccess();
}

function loginSuccess() {
    document.getElementById('loginModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    
    document.getElementById('userProfile').style.display = 'flex';
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('guestStats').style.display = 'none';
    
    updateDashboardAccess();
    
    alert(`✅ ACCESS GRANTED!\nWelcome ${currentUser.name}`);
}

function showLoginModal() {
    document.getElementById('loginModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function logout() {
    if (confirm('🔒 Logout Agent?')) {
        currentUser = null;
        location.reload();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active, .mobile-menu.active').forEach(el => {
            el.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});
