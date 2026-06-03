/* ══════════════════════════════════════════════════
   STEWART VIERA — PORTFOLIO SCRIPTS
══════════════════════════════════════════════════ */

/* ── Star Field ─────────────────────────────────── */
(function generateStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  const count = Math.min(160, Math.floor(window.innerWidth / 8));
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() < 0.15 ? 3 : 2;
    star.style.cssText = [
      `left:${(Math.random() * 100).toFixed(2)}%`,
      `top:${(Math.random() * 100).toFixed(2)}%`,
      `width:${size}px`,
      `height:${size}px`,
      `--dur:${(2 + Math.random() * 4).toFixed(2)}s`,
      `--delay:${(Math.random() * 4).toFixed(2)}s`,
      `opacity:${(0.1 + Math.random() * 0.8).toFixed(2)}`
    ].join(';');
    fragment.appendChild(star);
  }
  container.appendChild(fragment);
})();

/* ── Nav scroll effect ──────────────────────────── */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile toggle
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    // Close on nav link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }
})();

/* ── Typewriter Effect ──────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'run partner_success.sh --region LATAM',
    'echo "10+ years in cloud tech"',
    'git push origin future',
    'ssh cloud_architect@github.com',
    'kubectl apply -f career.yaml',
    'terraform apply --target=growth',
    'gh copilot suggest "next chapter"',
  ];

  let phraseIdx  = 0;
  let charIdx    = 0;
  let isDeleting = false;
  let pauseTimer = null;

  const TYPE_SPEED   = 55;
  const DELETE_SPEED = 28;
  const PAUSE_AFTER  = 1800;
  const PAUSE_BEFORE = 400;

  function tick() {
    const phrase = phrases[phraseIdx];

    if (!isDeleting) {
      // Typing
      charIdx++;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === phrase.length) {
        isDeleting = true;
        pauseTimer = setTimeout(tick, PAUSE_AFTER);
        return;
      }
    } else {
      // Deleting
      charIdx--;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        pauseTimer = setTimeout(tick, PAUSE_BEFORE);
        return;
      }
    }

    setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);
  }

  setTimeout(tick, 1200);
})();

/* ── Scroll Reveal (IntersectionObserver) ───────── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    items.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings within the same parent
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
          const delay = siblings.indexOf(entry.target) * 80;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach(el => observer.observe(el));
})();

/* ── Active nav link highlight ──────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navLinks a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--cyan)' : '';
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => observer.observe(s));
})();
