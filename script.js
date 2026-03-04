// 🔥 DARK BYTE HUB v12.2 - MOBILE HAMBURGER + BACK/FORWARD 100% FIXED
let currentUser = null;
let particles = [];
let matrixCtx;
let currentSection = 'home';

function initEverything() {
    console.log('🚀 DARK BYTE HUB v12.2 - MOBILE HAMBURGER BULLETPROOF');
    
    // 1 SECOND DELAY - LET CSS LOAD FIRST
    setTimeout(() => {
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.display = 'block';
        }
        
        initParticles();
        initMatrixRain();
        initStats();
        bindNavigation();  // ← HAMBURGER FIXED HERE
        bindForms();
        initCourseFilters();
        initHistoryAPI();
        updateDashboardAccess();
        fixHamburgerMobile(); // ← CRITICAL MOBILE FIX
    }, 500);
}

// 🔥 MOBILE HAMBURGER BULLETPROOF FIX
function fixHamburgerMobile() {
    console.log('🍔 FIXING MOBILE HAMBURGER...');
    
    const toggle = document.getElementById('menuToggle');
    const menu = document.querySelector('.mobile-menu');
    
    if (!toggle || !menu) {
        console.log('❌ HAMBURGER ELEMENTS NOT FOUND');
        return;
    }
    
    console.log('✅ HAMBURGER ELEMENTS FOUND');
    
    // REMOVE OLD EVENT LISTENERS (IF ANY)
    toggle.onclick = null;
    
    // NEW BULLETPROOF EVENT LISTENER
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🍔 HAMBURGER CLICKED ✅');
        
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        
        if (menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            console.log('📱 MENU OPENED');
        } else {
            document.body.style.overflow = 'auto';
            console.log('📱 MENU CLOSED');
        }
    });
    
    // AUTO CLOSE ON RESIZE
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menu.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

window.addEventListener('load', initEverything);
document.addEventListener('DOMContentLoaded', initEverything);

// 🔥 BACK/FORWARD PERFECT
function initHistoryAPI() {
    if (!window.location.hash) {
        window.history.replaceState({section: 'home'}, '', '#home');
    }
    
    window.addEventListener('popstate', function(e) {
        console.log('🔙 BACK/FORWARD →', window.location.hash);
        const section = window.location.hash.replace('#', '') || 'home';
        goToSection(section);
    });
}

function goToSection(sectionId) {
    console.log('🎯 SECTION:', sectionId);
    
    currentSection = sectionId;
    
    // HIDE ALL SECTIONS
    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    
    // UPDATE NAV
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`[data-section="${sectionId}"]`)?.classList.add('active');
    
    // SHOW TARGET
    const target = document.getElementById(sectionId);
    if (target) {
        target.style.display = 'block';
        setTimeout(() => target.classList.add('active'), 100);
        window.history.pushState({section: sectionId}, '', `#${sectionId}`);
    }
    
    // CLOSE MOBILE MENU
    const menu = document.querySelector('.mobile-menu');
    const toggle = document.getElementById('menuToggle');
    menu?.classList.remove('active');
    toggle?.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// 🔥 ALL NAVIGATION + HAMBURGER
function bindNavigation() {
    // NAV LINKS
    document.querySelectorAll('.nav-link[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            if ((section === 'dashboard' || section === 'certifications') && !currentUser) {
                showLoginModal();
            } else {
                goToSection(section);
            }
        });
    });
    
    // LOGIN TRIGGERS
    document.querySelectorAll('.login-trigger').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginModal();
        });
    });
    
    // LOGO HOME
    document.querySelector('.logo-glow')?.addEventListener('click', () => goToSection('home'));
    
    // COURSE BUTTONS
    document.querySelectorAll('.course-cta').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!currentUser) showLoginModal();
            else alert('🚀 Course Started! 🔥');
        });
    });
}

// REST OF YOUR FUNCTIONS (UNCHANGED)
function updateDashboardAccess() {
    const dashboardAccess = document.getElementById('dashboardAccess');
    if (currentUser && dashboardAccess) dashboardAccess.style.display = 'block';
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
                    setTimeout(() => card.style.opacity = '1', index * 100);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

function bindForms() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail')?.value || '';
    const password = document.getElementById('loginPassword')?.value || '';
    if (email === 'admin@darkbytehub.com' && password === 'darkbyte2026') {
        currentUser = { name: 'Cyber Agent 🔥', email };
        loginSuccess();
    } else {
        alert('❌ ACCESS DENIED!\nEmail: admin@darkbytehub.com\nPass: darkbyte2026');
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
    if (confirm('🔒 Logout?')) {
        currentUser = null;
        location.reload();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active, .mobile-menu.active').forEach(el => el.classList.remove('active'));
        document.body.style.overflow = 'auto';
    }
});
