// 🔥 DARK BYTE HUB v9.5 - BACK BUTTON BULLETPROOF
let currentUser = null;
let particles = [];
let matrixCtx;
let currentSection = 'home';

function initEverything() {
    console.log('🚀 DARK BYTE HUB v9.5 - BACK/FORWARD PERFECT');
    
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.style.opacity = '1';
        mainContent.style.display = 'block';
    }
    
    initParticles();
    initMatrixRain();
    initStats();
    bindNavigation();
    bindForms();
    initHistoryAPI();
}

window.addEventListener('load', initEverything);
document.addEventListener('DOMContentLoaded', initEverything);

function initHistoryAPI() {
    // 🔥 BACK/FORWARD BUTTONS - BULLETPROOF
    window.addEventListener('popstate', function(e) {
        console.log('🔙 BACK BUTTON PRESSED');
        const hash = window.location.hash.replace('#', '') || 'home';
        goToSection(hash);
    });
    
    // Initial state
    if (!window.location.hash) {
        window.history.replaceState(null, null, '#home');
    }
}

function goToSection(sectionId) {
    console.log('➡️ GO TO:', sectionId);
    
    currentSection = sectionId;
    
    // Update URL first
    window.history.pushState({section: sectionId}, '', `#${sectionId}`);
    
    // Switch sections
    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
    }
    
    // Update nav active
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) activeLink.classList.add('active');
    
    // Close mobile menu
    document.querySelector('.mobile-menu')?.classList.remove('active');
    
    console.log('✅ SECTION CHANGED:', sectionId);
}

// 🔥 ALL OTHER FUNCTIONS SAME
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
        matrixCtx.shadowColor = '#00ff88'; matrixCtx.shadowBlur = 10;
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

function bindNavigation() {
    document.querySelectorAll('.nav-link[data-section], .login-trigger').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset?.section;
            
            if (section && (section === 'dashboard' || section === 'certifications') && !currentUser) {
                showLoginModal();
                return;
            }
            
            if (section) goToSection(section);
        });
    });
    
    document.querySelector('.logo-glow')?.addEventListener('click', () => goToSection('home'));
    document.getElementById('menuToggle')?.addEventListener('click', () => {
        document.querySelector('.mobile-menu')?.classList.toggle('active');
    });
}

function bindForms() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
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
    
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('certifications').style.display = 'block';
    
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

function startCourse(course) {
    alert(`🚀 Starting ${course.toUpperCase()} course!\nModule 1 loading...`);
}

function downloadCert(cert) {
    alert(`📜 ${cert.toUpperCase()} Certificate Downloaded!`);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active, .mobile-menu.active').forEach(el => {
            el.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});
