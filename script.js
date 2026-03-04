// 🔥 DARK BYTE HUB v13 - AGENT 001 DEMO LOGIN FIXED

let currentUser = null;
let particles = [];
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
   🔥 LOGIN SYSTEM - AGENT 001 FIXED
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

// 🔥 TRY DEMO ACCESS - AGENT 001
function demoLogin(e) {
  e.preventDefault();
  
  // AGENT 001 LOGIN ✅
  currentUser = { 
    name: "Agent 001 🔥", 
    email: "agent001@darkbytehub.com",
    role: "Elite Pentester"
  };

  // CLOSE MODAL
  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
  }

  // SHOW USER PROFILE
  document.getElementById("userProfile").style.display = "flex";
  document.getElementById("userName").textContent = currentUser.name;

  // HIDE GUEST STATS
  document.getElementById("guestStats").style.display = "none";

  // UPDATE DASHBOARD ACCESS
  updateDashboardAccess();

  // SUCCESS MESSAGE
  setTimeout(() => {
    alert(`✅ AGENT 001 ACCESS GRANTED!\nWelcome Elite Pentester\n${currentUser.email}`);
  }, 300);

  document.body.style.overflow = "auto";
}

function loginSuccess() {
  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
  }

  document.body.style.overflow = "auto";

  document.getElementById("userProfile").style.display = "flex";
  document.getElementById("userName").textContent = currentUser.name;

  document.getElementById("guestStats").style.display = "none";

  updateDashboardAccess();

  setTimeout(() => {
    alert(`✅ ACCESS GRANTED!\nWelcome ${currentUser.name}`);
  }, 300);
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

  // CLEAR FORM
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";
}

function logout() {
  currentUser = null;
  
  document.getElementById("userProfile").style.display = "none";
  document.getElementById("guestStats").style.display = "flex";
  document.getElementById("loginModal").style.display = "none";
  
  // RESET DASHBOARD SECTIONS
  document.querySelectorAll(".section").forEach(sec => {
    if (sec.id === "dashboard" || sec.id === "certifications") {
      sec.style.display = "none";
    }
  });

  goToSection("home");
  alert("👋 Logged out successfully");
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

      document.querySelectorAll(".course-card, .lab-card").forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
          card.style.opacity = "1";
        } else {
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
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
   DASHBOARD ACCESS
================================*/

function updateDashboardAccess() {
  const dashboard = document.getElementById("dashboard");
  const certifications = document.getElementById("certifications");

  if (currentUser) {
    if (dashboard) dashboard.style.display = "block";
    if (certifications) certifications.style.display = "block";
  }
}

// 🔥 PLACEHOLDER FUNCTIONS
function startCourse(courseId) {
  alert(`🚀 Starting ${courseId.toUpperCase()} course...`);
}

function downloadCert(certId) {
  alert(`📜 Downloading ${certId.toUpperCase()} certificate...`);
}
function downloadCertificate(course) {
  if (!localStorage.getItem("loggedIn")) {
    showLoginModal(); // 🔐 ONLY HERE
    return;
  }

  alert("🎉 Certificate downloaded for " + course.toUpperCase());
}
/* ===============================
   🔐 AUTH STATE (SINGLE SOURCE)
================================*/

function isLoggedIn() {
  return currentUser !== null;
}

/* ===============================
   NAV FIX – NO LOGIN BLOCK
================================*/

function bindNavigation() {
  document.querySelectorAll(".nav-link[data-section]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      goToSection(link.dataset.section);
    });
  });

  document.querySelectorAll(".login-trigger").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      showLoginModal();
    });
  });
}

/* ===============================
   🎓 CERTIFICATE DOWNLOAD (ONLY HERE LOGIN)
================================*/

function downloadCertificate(course) {
  if (!isLoggedIn()) {
    showLoginModal();
    return;
  }

  generateFakeCertificate(course);
}

/* ===============================
   🧾 FAKE CERTIFICATE GENERATOR
================================*/

function generateFakeCertificate(course) {
  const certName = {
    web: "Web Pentesting Certified",
    network: "Network Pentesting Certified",
    redteam: "Red Team Operator",
    blue: "Blue Team Defender"
  };

  alert(`
🎉 CERTIFICATE ISSUED

Agent: ${currentUser.name}
Course: ${certName[course]}
Year: 2026

(Status: Demo Certificate)
  `);
}

/* ===============================
   LOGIN SUCCESS FIX
================================*/

function loginSuccess() {
  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
  }

  document.body.style.overflow = "auto";

  // SHOW USER
  document.getElementById("userProfile").style.display = "flex";
  document.getElementById("userName").textContent = currentUser.name;

  // 🔥 HIDE TOTAL COUNT / STATS
  const guestStats = document.getElementById("guestStats");
  if (guestStats) {
    guestStats.style.display = "none";
  }

  updateDashboardAccess();

  alert(`✅ Welcome ${currentUser.name}`);
}
/* ===============================
   DEMO LOGIN FIX
================================*/

function demoLogin(e) {
  e.preventDefault();

  currentUser = {
    name: "Agent 001 🔥",
    email: "agent001@darkbytehub.com",
    role: "Elite Pentester"
  };

  loginSuccess(); // 🔥 one single source
}
/* ===============================
   FULL BODY MICRO BUBBLE ENGINE
================================ */

const bubbleCanvas = document.getElementById("microBubbleBg");
const btx = bubbleCanvas.getContext("2d");

let microBubbles = [];

function resizeBubbleCanvas() {
  bubbleCanvas.width = window.innerWidth;
  bubbleCanvas.height = window.innerHeight;
}
resizeBubbleCanvas();
window.addEventListener("resize", resizeBubbleCanvas);

class MicroBubble {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * bubbleCanvas.width;
    this.y = bubbleCanvas.height + Math.random() * 300;
    this.size = Math.random() * 1.8 + 0.6; // MICRO
    this.speed = Math.random() * 0.25 + 0.1;
    this.alpha = Math.random() * 0.35 + 0.15;
  }

  update() {
    this.y -= this.speed;
    if (this.y < -20) this.reset();
  }

  draw() {
    btx.beginPath();
    btx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    btx.fillStyle = `rgba(0, 255, 136, ${this.alpha})`;
    btx.shadowBlur = 10;
    btx.shadowColor = "#00ff88";
    btx.fill();
  }
}

// CREATE BUBBLES
for (let i = 0; i < 180; i++) {
  microBubbles.push(new MicroBubble());
}

function animateMicroBubbles() {
  btx.clearRect(0, 0, bubbleCanvas.width, bubbleCanvas.height);

  microBubbles.forEach(b => {
    b.update();
    b.draw();
  });

  requestAnimationFrame(animateMicroBubbles);
}

animateMicroBubbles();