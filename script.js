// 🔥 DARK BYTE HUB v13 - CLEAN NAVBAR + HISTORY + MOBILE MENU

let currentUser = null;
let particles = [];
let matrixCtx;
let currentSection = "home";

/* ===============================
   INIT EVERYTHING
================================*/

function initEverything() {
  console.log("🚀 DARK BYTE HUB INITIALIZED");

  setTimeout(() => {
    const mainContent = document.getElementById("mainContent");
    if (mainContent) {
      mainContent.style.opacity = "1";
      mainContent.style.display = "block";
    }

    initParticles();
    initMatrixRain();
    initStats();

    bindNavigation();
    bindForms();
    initCourseFilters();

    initNavbar(); // 🔥 MOBILE NAVBAR
    initHistory(); // 🔥 BACK / FORWARD

    updateDashboardAccess();
  }, 500);
}

document.addEventListener("DOMContentLoaded", initEverything);

/* ===============================
   NAVBAR + MOBILE MENU
================================*/

function initNavbar() {
  const toggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!toggle || !mobileMenu) return;

  toggle.addEventListener("click", (e) => {
    e.preventDefault();

    toggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    if (mobileMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  // AUTO CLOSE ON RESIZE

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      mobileMenu.classList.remove("active");
      toggle.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // CLOSE WHEN CLICK NAV

  document.querySelectorAll(".mobile-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      toggle.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });
}

/* ===============================
   HISTORY BACK/FORWARD
================================*/

function initHistory() {
  if (!window.location.hash) {
    history.replaceState({ section: "home" }, "", "#home");
  }

  window.addEventListener("popstate", () => {
    const section = location.hash.replace("#", "") || "home";
    goToSection(section);
  });
}

/* ===============================
   SECTION SWITCHING
================================*/

function goToSection(sectionId) {
  currentSection = sectionId;

  document.querySelectorAll(".section").forEach((sec) => {
    sec.classList.remove("active");
    sec.style.display = "none";
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  document
    .querySelector(`[data-section="${sectionId}"]`)
    ?.classList.add("active");

  const target = document.getElementById(sectionId);

  if (target) {
    target.style.display = "block";

    setTimeout(() => {
      target.classList.add("active");
    }, 50);

    history.pushState({ section: sectionId }, "", `#${sectionId}`);
  }

  // CLOSE MOBILE MENU

  const mobileMenu = document.getElementById("mobileMenu");
  const toggle = document.getElementById("menuToggle");

  if (mobileMenu) mobileMenu.classList.remove("active");
  if (toggle) toggle.classList.remove("active");

  document.body.style.overflow = "auto";
}

/* ===============================
   NAVIGATION BINDINGS
================================*/

function bindNavigation() {
  // SECTION LINKS
  document.querySelectorAll(".nav-link[data-section]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const section = link.dataset.section;

      // LOGIN REQUIRED SECTIONS
      if (
        (section === "dashboard" || section === "certifications") &&
        !currentUser
      ) {
        showLoginModal();
        return;
      }

      goToSection(section);
    });
  });

  // LOGIN BUTTONS
  document.querySelectorAll(".login-trigger").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      showLoginModal();
    });
  });

  // LOGO CLICK
  const logo = document.querySelector(".logo-glow");

  if (logo) {
    logo.addEventListener("click", () => goToSection("home"));
  }
}

/* ===============================
   LOGIN SYSTEM
================================*/

function bindForms() {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) loginForm.addEventListener("submit", handleLogin);
}

function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail")?.value || "";
  const password = document.getElementById("loginPassword")?.value || "";

  if (email === "admin@darkbytehub.com" && password === "darkbyte2026") {
    currentUser = { name: "Cyber Agent 🔥", email };
    loginSuccess();
  } else {
    alert(
      "❌ ACCESS DENIED!\nEmail: admin@darkbytehub.com\nPass: darkbyte2026",
    );
  }
}

function demoLogin(e) {
  e.preventDefault();

  currentUser = { name: "Agent 001 🔥", email: "demo@darkbytehub.com" };

  loginSuccess();
}

function loginSuccess() {
  document.getElementById("loginModal").classList.remove("active");

  document.body.style.overflow = "auto";

  document.getElementById("userProfile").style.display = "flex";
  document.getElementById("userName").textContent = currentUser.name;

  document.getElementById("guestStats").style.display = "none";

  updateDashboardAccess();

  alert(`✅ ACCESS GRANTED!\nWelcome ${currentUser.name}`);
}

function showLoginModal() {
  const modal = document.getElementById("loginModal");

  if (!modal) {
    console.error("Login modal not found");
    return;
  }

  modal.classList.add("active");
  modal.style.display = "flex";

  document.body.style.overflow = "hidden";
}

/* ===============================
   ESC KEY CLOSE
================================*/

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .querySelectorAll(".modal.active, .mobile-menu.active")
      .forEach((el) => el.classList.remove("active"));

    document.body.style.overflow = "auto";
  }
});

/* ===============================
   COURSE FILTER
================================*/

function initCourseFilters() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");

      const filter = btn.dataset.filter;

      document.querySelectorAll(".course-card").forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ===============================
   STATS COUNTER
================================*/

function initStats() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const num = entry.target.querySelector(".stat-number");
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
    });
  });

  document
    .querySelectorAll(".stat-box")
    .forEach((box) => observer.observe(box));
}

/* ===============================
   PARTICLES BACKGROUND
================================*/

function initParticles() {
  const canvas = document.getElementById("particles-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

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
      ctx.fillStyle = "rgba(0,255,136,0.4)";
      ctx.beginPath();

      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

      ctx.fill();
    }
  }

  for (let i = 0; i < 100; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ===============================
   MATRIX RAIN
================================*/

function initMatrixRain() {
  const container = document.querySelector(".matrix-rain");
  if (!container) return;

  const canvas = document.createElement("canvas");

  container.appendChild(canvas);

  canvas.width = 400;
  canvas.height = 400;

  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.position = "absolute";

  matrixCtx = canvas.getContext("2d");

  const chars = "01ABCFGHKLMNPRSTVXYZ!@#$%^&*";
  const fontSize = 14;

  const columns = Math.floor(400 / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    matrixCtx.fillStyle = "rgba(2,4,11,0.08)";
    matrixCtx.fillRect(0, 0, 400, 400);

    matrixCtx.fillStyle = "#00ff88";
    matrixCtx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];

      matrixCtx.fillText(text, i * fontSize, y * fontSize);

      if (y * fontSize > 400 && Math.random() > 0.975) drops[i] = 0;

      drops[i]++;
    });
  }

  setInterval(draw, 50);
}

/* ===============================
   DASHBOARD ACCESS
================================*/

function updateDashboardAccess() {
  const dashboardAccess = document.getElementById("dashboardAccess");

  if (currentUser && dashboardAccess) dashboardAccess.style.display = "block";
}
