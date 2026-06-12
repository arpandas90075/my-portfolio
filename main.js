/* ════════════════════════════════════════════
   ARPAN DAS PORTFOLIO — main.js
   Shared across all pages
════════════════════════════════════════════ */

/* ── PAGE TRANSITION ── */
function navigateTo(url) {
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(8px)';
  document.body.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  setTimeout(() => { window.location.href = url; }, 300);
}

/* ── CURSOR GLOW ── */
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top  = e.clientY + 'px';
  });
}

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
});

/* ── MOBILE NAV TOGGLE ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  // close nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ── MATRIX CANVAS (home only) ── */
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;

  function initMatrix() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    const fontSize = 13;
    cols = Math.floor(W / fontSize);
    drops = Array(cols).fill(1);
  }

  const chars = 'アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789</>{}[]=#$@!?';

  function drawMatrix() {
    ctx.fillStyle = 'rgba(9,11,16,0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(99,102,241,0.5)';
    ctx.font = '13px JetBrains Mono, monospace';
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 13, drops[i] * 13);
      if (drops[i] * 13 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  initMatrix();
  window.addEventListener('resize', initMatrix);
  setInterval(drawMatrix, 50);
}

/* ── TYPEWRITER (home only) ── */
const roleDynamic = document.getElementById('roleDynamic');
if (roleDynamic) {
  const roles = [
    'web interfaces.',
    'clean code.',
    'safety apps.',
    'study platforms.',
    'cool things.'
  ];
  let ri = 0, ci = 0, deleting = false;

  function typeWriter() {
    const current = roles[ri];
    if (!deleting) {
      roleDynamic.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(typeWriter, 1600); return; }
    } else {
      roleDynamic.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(typeWriter, deleting ? 55 : 90);
  }
  setTimeout(typeWriter, 800);
}

/* ── COUNTER ANIMATION (home only) ── */
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let count = 0;
    const step = target / 50;
    const interval = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = Math.floor(count);
      if (count >= target) clearInterval(interval);
    }, 30);
  });
}

// Trigger counters when hero is visible
const heroSection = document.getElementById('hero');
if (heroSection) {
  const heroObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounters(); heroObs.disconnect(); } });
  }, { threshold: 0.4 });
  heroObs.observe(heroSection);
}

/* ── SKILL BAR ANIMATION ── */
function animateSkillBars() {
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const fill = bar.querySelector('.skill-bar-fill');
    const width = bar.dataset.width;
    if (fill && width) fill.style.width = width + '%';
  });
}

const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) {
  const skillsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateSkillBars(); skillsObs.disconnect(); } });
  }, { threshold: 0.2 });
  skillsObs.observe(skillsGrid);
}

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── CONTACT FORM ── */
function handleSend() {
  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const msg = document.getElementById('contactMsg')?.value.trim();
  const btn = document.getElementById('sendBtn');
  const success = document.getElementById('formSuccess');

  if (!name || !email || !msg) {
    // Shake the button
    if (btn) {
      btn.style.animation = 'shake 0.4s ease';
      setTimeout(() => btn.style.animation = '', 400);
    }
    return;
  }

  // Simulate sending
  if (btn) {
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending...';
  }
  setTimeout(() => {
    if (btn) {
      btn.querySelector('span').textContent = 'Sent ✓';
      btn.style.background = '#22c55e';
    }
    if (success) success.style.display = 'block';
  }, 1000);
}

/* ── NAV LINK ACTIVE STATE (based on current page) ── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  link.classList.remove('active');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ── ADD SHAKE KEYFRAME ── */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%,100%{transform:translateX(0)}
  25%{transform:translateX(-6px)}
  75%{transform:translateX(6px)}
}`;
document.head.appendChild(shakeStyle);

/* ── HERO PHOTO HOVER TILT (home only) ── */
const heroImg = document.getElementById('heroImg') || document.querySelector('.hero-img');
if (heroImg) {
  heroImg.parentElement.addEventListener('mousemove', (e) => {
    const rect = heroImg.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    heroImg.style.transform = `rotateY(${dx * 12}deg) rotateX(${-dy * 12}deg) scale(1.03)`;
    heroImg.style.transition = 'transform 0.1s ease';
  });
  heroImg.parentElement.addEventListener('mouseleave', () => {
    heroImg.style.transform = '';
    heroImg.style.transition = 'transform 0.5s ease';
  });
}

/* ── PARTICLE BURST on nav logo click ── */
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.addEventListener('click', (e) => {
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.style.cssText = `
        position:fixed;
        width:6px;height:6px;
        background:var(--accent);
        border-radius:50%;
        pointer-events:none;
        z-index:9999;
        left:${e.clientX}px;
        top:${e.clientY}px;
        transition:transform 0.6s ease, opacity 0.6s ease;
      `;
      document.body.appendChild(p);
      const angle = (i / 8) * Math.PI * 2;
      const dist  = 40 + Math.random() * 30;
      requestAnimationFrame(() => {
        p.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) scale(0)`;
        p.style.opacity   = '0';
      });
      setTimeout(() => p.remove(), 650);
    }
    navigateTo('index.html');
  });
}

/* ── TIMELINE ANIMATION ── */
document.querySelectorAll('.tl-item').forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => {
          item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, i * 150);
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  obs.observe(item);
});

/* ── PROJECT CARDS STAGGER ── */
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

/* ── STRIP ITEMS HOVER GLOW ── */
document.querySelectorAll('.strip-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.background = 'rgba(99,102,241,0.04)';
  });
  item.addEventListener('mouseleave', () => {
    item.style.background = '';
  });
});
