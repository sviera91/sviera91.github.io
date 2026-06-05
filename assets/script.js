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
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    // Close on nav link click
    links.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', () => links.classList.remove('open'));
    });
  }
})();

/* ── Typewriter Effect ──────────────────────────── */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  let phrases = [];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let pauseTimer = null;
  let tickTimer = null;

  const TYPE_SPEED = 55;
  const DELETE_SPEED = 28;
  const PAUSE_AFTER = 1800;
  const PAUSE_BEFORE = 400;

  function clearTimers() {
    if (pauseTimer) {
      clearTimeout(pauseTimer);
      pauseTimer = null;
    }
    if (tickTimer) {
      clearTimeout(tickTimer);
      tickTimer = null;
    }
  }

  function tick() {
    const phrase = phrases[phraseIdx] || '';

    if (!isDeleting) {
      charIdx++;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx >= phrase.length) {
        isDeleting = true;
        pauseTimer = setTimeout(tick, PAUSE_AFTER);
        return;
      }
    } else {
      charIdx--;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx <= 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        pauseTimer = setTimeout(tick, PAUSE_BEFORE);
        return;
      }
    }

    tickTimer = setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);
  }

  function start(nextPhrases) {
    const normalized = Array.isArray(nextPhrases) ? nextPhrases.filter(Boolean) : [];
    if (!normalized.length) return;
    clearTimers();
    phrases = normalized;
    phraseIdx = 0;
    charIdx = 0;
    isDeleting = false;
    el.textContent = '';
    tickTimer = setTimeout(tick, 1200);
  }

  window.setTypewriterLanguage = start;
})();

/* ── Localization (EN/ES) ───────────────────────── */
(function initLocalization() {
  const langToggle = document.getElementById('langToggle');
  if (!langToggle) return;

  const translations = {
    en: {
      title: 'Stewart Viera // Sr. Technical Partner Manager',
      description: 'Stewart Viera — Senior Technical Partner Manager at GitHub, LATAM. 10+ years in cloud tech across GitHub, Google, Microsoft, and AWS.',
      text: {
        '#navLinks li:nth-child(1) a': './experience',
        '#navLinks li:nth-child(2) a': './skills',
        '#navLinks li:nth-child(3) a': './certs',
        '#navLinks li:nth-child(4) a': './education',
        '#navLinks li:nth-child(5) a': './community',
        '#navLinks li:nth-child(6) a': 'contact',
        '.hero-meta .tag:nth-child(1)': '📍 New York, NY',
        '.hero-meta .tag:nth-child(2)': '☁️ 10+ years in cloud tech',
        '.hero-meta .tag:nth-child(3)': '🌎 LATAM-focused',
        '#skills .skill-group:nth-of-type(1) .skill-group-title': '☁️ Cloud Platforms',
        '#skills .skill-group:nth-of-type(2) .skill-group-title': '🛠 DevOps & IaC',
        '#skills .skill-group:nth-of-type(3) .skill-group-title': '💻 Languages & Scripting',
        '#skills .skill-group:nth-of-type(4) .skill-group-title': '🤝 Partner & GTM',
        '#skills .skill-group:nth-of-type(5) .skill-group-title': '🌎 Languages',
        '#skills .skill-group:nth-of-type(4) .skill-tag:nth-child(1)': 'Partner Success',
        '#skills .skill-group:nth-of-type(4) .skill-tag:nth-child(2)': 'C-Level Engagement',
        '#skills .skill-group:nth-of-type(4) .skill-tag:nth-child(3)': 'GTM Strategy',
        '#skills .skill-group:nth-of-type(4) .skill-tag:nth-child(4)': 'Technical Pre-sales',
        '#skills .skill-group:nth-of-type(4) .skill-tag:nth-child(5)': 'Executive Briefings',
        '#skills .skill-group:nth-of-type(4) .skill-tag:nth-child(6)': 'Solution Architecture',
        '#skills .skill-group:nth-of-type(5) .skill-tag:nth-child(1)': 'English (native)',
        '#skills .skill-group:nth-of-type(5) .skill-tag:nth-child(2)': 'Spanish (native)',
        '#certs .section-title': '> ls ./certifications',
        '#certs .cert-card:nth-of-type(1) .cert-status': '● Active',
        '#certs .cert-card:nth-of-type(2) .cert-status': '● See Credly',
        '#certs .cert-card:nth-of-type(3) .cert-status': '● See Credly',
        '#certs .cert-card:nth-of-type(4) .cert-status': '● See Credly',
        '#certs .cert-card:nth-of-type(5) .cert-status': '● See Credly',
        '#certs .cert-card:nth-of-type(6) .cert-status': '● See Credly',
        '#certs .cert-card:nth-of-type(7) .cert-status': '● See Credly',
        '#certs .cert-card:nth-of-type(8) .cert-status': '● See Credly',
        '#certs .cert-card:nth-of-type(9) .cert-status': '● See Credly',
        '#education .section-title': '> cat education.txt',
        '#education .edu-card:nth-of-type(1) .edu-note': 'School of Professional Studies · Technology & Information Management focus',
        '#education .edu-card:nth-of-type(2) .edu-note': 'Ying Wu College of Computing · Systems & Networks concentration',
        '#volunteering .section-title': '> ./community --verbose',
        '#volunteering .volunteer-card:nth-of-type(1) p': 'LGBTQIA+ mentorship — pairing queer professionals with emerging technologists navigating careers in tech.',
        '#volunteering .volunteer-card:nth-of-type(2) p': 'Technical mentor for early-stage startups in the GCP ecosystem — architecture reviews, GTM strategy, and scaling guidance.',
        '#volunteering .volunteer-card:nth-of-type(3) p': 'K-12 career speaker inspiring the next generation of technologists from underrepresented communities.',
        '#volunteering .volunteer-card:nth-of-type(4) p': 'Organized and participated in Google\'s NYC Pride events, championing LGBTQIA+ visibility in the workplace.',
        '#contact .section-title': '> contact --open',
        '#contact .contact-card:nth-of-type(1) .contact-label': 'Email',
        '#footer .footer-output': 'Built with ❤️ & late-night vibes by Stewart Viera'
      },
      html: {
        '.terminal-line:nth-of-type(1)': '<span class="prompt">$</span> whoami',
        '.terminal-line.terminal-role': '<span class="prompt">$</span> cat role.txt',
        '.terminal-output': 'Senior Technical Partner Manager <span class="cyan">@GitHub</span> · LATAM',
        '#experience .section-title': '<span class="prompt">&gt;</span> experience.log',
        '#skills .section-title': '<span class="prompt">&gt;</span> skills --list',
        '#certs .section-title': '<span class="prompt">&gt;</span> ls ./certifications',
        '#education .section-title': '<span class="prompt">&gt;</span> cat education.txt',
        '#volunteering .section-title': '<span class="prompt">&gt;</span> ./community --verbose',
        '#contact .section-title': '<span class="prompt">&gt;</span> contact --open',
        '#certs .section-sub': 'For active badge verification, visit my <a href="https://www.credly.com/users/stewart-viera" target="_blank" rel="noopener" class="link-accent">Credly profile →</a>',
        '#experience .timeline-item:nth-of-type(1) .card-role': 'Senior Technical Partner Manager <span class="region-tag">· LATAM</span>',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(1)': 'Driving technical partner success across the LATAM region for GitHub\'s enterprise product portfolio.',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(2)': 'Enabling strategic partners to deliver GitHub solutions — Copilot, GHAS, Actions — to enterprise customers.',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(3)': 'Building deep technical relationships with C-level stakeholders and partner engineering teams.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(1)': 'Guided enterprise customers through cloud-native transformation using GKE, Cloud Run, Anthos, and Vertex AI.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(2)': 'Delivered solutions spanning containerization, microservices, and AI/ML platform adoption across F500 accounts.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(3)': 'Built technical content, demos, and workshops driving 8-figure pipeline impact.',
        '#experience .timeline-item:nth-of-type(2) .sub-role:nth-of-type(1) h5': 'Program Manager — NYC Cloud Space <span class="card-date-sm">Jan 2025 – Jul 2025</span>',
        '#experience .timeline-item:nth-of-type(2) .sub-role:nth-of-type(1) p': 'Managed operations and programming for Google\'s NYC customer experience center — events, executive briefings, and partner showcases.',
        '#experience .timeline-item:nth-of-type(2) .sub-role:nth-of-type(2) h5': 'TPM Fellow — Core Convergence Task Force <span class="card-date-sm">May 2023 – Dec 2023</span>',
        '#experience .timeline-item:nth-of-type(2) .sub-role:nth-of-type(2) p': 'Selected for Google\'s internal TPM Fellowship; contributed to cross-functional product convergence initiatives across GCP and Workspace.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(1)': 'Architected Azure landing zones and DevOps pipelines for enterprise migrations and greenfield cloud deployments.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(2)': 'Specialized in Azure DevOps, AKS, and hybrid identity across financial services and media verticals.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(3)': 'Held Azure Expert certifications: DevOps Engineer Expert, Solutions Architect Expert, Security Engineer.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(1)': 'Delivered cloud transformation engagements as part of AWS ProServe, implementing CI/CD pipelines, Infrastructure as Code, and containerized workloads.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(2)': 'Worked across regulated industries including healthcare and financial services.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(3)': 'Held AWS DevOps Professional and Solutions Architect Associate certifications.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(1)': 'Delivered infrastructure modernization projects including Windows Server migrations, Active Directory, and early Azure IaaS deployments.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(2)': 'Supported enterprise customers across the US Northeast in data center to cloud transitions.',
        '#footer .footer-prompt': '<span class="prompt">$</span> echo "Built with ❤️ &amp; late-night vibes by Stewart Viera"'
      },
      attrs: [
        { selector: '#navToggle', name: 'aria-label', value: 'Toggle menu' },
        { selector: '#langToggle', name: 'aria-label', value: 'Switch language to Spanish' }
      ],
      typewriter: [
        'run partner_success.sh --region LATAM',
        'echo "10+ years in cloud tech"',
        'git push origin future',
        'ssh cloud_architect@github.com',
        'kubectl apply -f career.yaml',
        'terraform apply --target=growth',
        'gh copilot suggest "next chapter"'
      ]
    },
    es: {
      title: 'Stewart Viera // Gerente Técnico Senior de Partners',
      description: 'Stewart Viera — Gerente Técnico Senior de Partners en GitHub, LATAM. Más de 10 años en tecnología cloud en GitHub, Google, Microsoft y AWS.',
      text: {
        '#navLinks li:nth-child(1) a': './experiencia',
        '#navLinks li:nth-child(2) a': './habilidades',
        '#navLinks li:nth-child(3) a': './certs',
        '#navLinks li:nth-child(4) a': './educacion',
        '#navLinks li:nth-child(5) a': './comunidad',
        '#navLinks li:nth-child(6) a': 'contacto',
        '.hero-meta .tag:nth-child(1)': '📍 Nueva York, NY',
        '.hero-meta .tag:nth-child(2)': '☁️ Más de 10 años en tecnología cloud',
        '.hero-meta .tag:nth-child(3)': '🌎 Enfoque LATAM',
        '#skills .skill-group:nth-of-type(1) .skill-group-title': '☁️ Plataformas Cloud',
        '#skills .skill-group:nth-of-type(2) .skill-group-title': '🛠 DevOps e IaC',
        '#skills .skill-group:nth-of-type(3) .skill-group-title': '💻 Lenguajes y scripting',
        '#skills .skill-group:nth-of-type(4) .skill-group-title': '🤝 Partners y GTM',
        '#skills .skill-group:nth-of-type(5) .skill-group-title': '🌎 Idiomas',
        '#skills .skill-group:nth-of-type(4) .skill-tag:nth-child(1)': 'Éxito de Partners',
        '#skills .skill-group:nth-of-type(4) .skill-tag:nth-child(2)': 'Relación con C-Level',
        '#skills .skill-group:nth-of-type(4) .skill-tag:nth-child(3)': 'Estrategia GTM',
        '#skills .skill-group:nth-of-type(4) .skill-tag:nth-child(4)': 'Preventa técnica',
        '#skills .skill-group:nth-of-type(4) .skill-tag:nth-child(5)': 'Executive briefings',
        '#skills .skill-group:nth-of-type(4) .skill-tag:nth-child(6)': 'Arquitectura de soluciones',
        '#skills .skill-group:nth-of-type(5) .skill-tag:nth-child(1)': 'Inglés (nativo)',
        '#skills .skill-group:nth-of-type(5) .skill-tag:nth-child(2)': 'Español (nativo)',
        '#certs .section-title': '> ls ./certificaciones',
        '#certs .cert-card:nth-of-type(1) .cert-status': '● Activa',
        '#certs .cert-card:nth-of-type(2) .cert-status': '● Ver en Credly',
        '#certs .cert-card:nth-of-type(3) .cert-status': '● Ver en Credly',
        '#certs .cert-card:nth-of-type(4) .cert-status': '● Ver en Credly',
        '#certs .cert-card:nth-of-type(5) .cert-status': '● Ver en Credly',
        '#certs .cert-card:nth-of-type(6) .cert-status': '● Ver en Credly',
        '#certs .cert-card:nth-of-type(7) .cert-status': '● Ver en Credly',
        '#certs .cert-card:nth-of-type(8) .cert-status': '● Ver en Credly',
        '#certs .cert-card:nth-of-type(9) .cert-status': '● Ver en Credly',
        '#education .section-title': '> cat educacion.txt',
        '#education .edu-card:nth-of-type(1) .edu-note': 'School of Professional Studies · enfoque en Tecnología y Gestión de la Información',
        '#education .edu-card:nth-of-type(2) .edu-note': 'Ying Wu College of Computing · concentración en Sistemas y Redes',
        '#volunteering .section-title': '> ./comunidad --detallado',
        '#volunteering .volunteer-card:nth-of-type(1) p': 'Mentoría LGBTQIA+ — acompañamiento a profesionales queer y tecnólogos emergentes que están construyendo su carrera en tecnología.',
        '#volunteering .volunteer-card:nth-of-type(2) p': 'Mentor técnico para startups en etapa temprana en el ecosistema de GCP — revisiones de arquitectura, estrategia GTM y guía de escalamiento.',
        '#volunteering .volunteer-card:nth-of-type(3) p': 'Conferencista para estudiantes K-12, inspirando a la próxima generación de tecnólogos de comunidades subrepresentadas.',
        '#volunteering .volunteer-card:nth-of-type(4) p': 'Organicé y participé en eventos de Pride NYC en Google, impulsando la visibilidad LGBTQIA+ en el trabajo.',
        '#contact .section-title': '> contacto --abrir',
        '#contact .contact-card:nth-of-type(1) .contact-label': 'Correo',
        '#footer .footer-output': 'Hecho con ❤️ y vibes nocturnos por Stewart Viera'
      },
      html: {
        '.terminal-line:nth-of-type(1)': '<span class="prompt">$</span> quien_soy',
        '.terminal-line.terminal-role': '<span class="prompt">$</span> cat rol.txt',
        '.terminal-output': 'Gerente Técnico Senior de Partners <span class="cyan">@GitHub</span> · LATAM',
        '#experience .section-title': '<span class="prompt">&gt;</span> experiencia.log',
        '#skills .section-title': '<span class="prompt">&gt;</span> habilidades --lista',
        '#certs .section-title': '<span class="prompt">&gt;</span> ls ./certificaciones',
        '#education .section-title': '<span class="prompt">&gt;</span> cat educacion.txt',
        '#volunteering .section-title': '<span class="prompt">&gt;</span> ./comunidad --detallado',
        '#contact .section-title': '<span class="prompt">&gt;</span> contacto --abrir',
        '#certs .section-sub': 'Para verificar credenciales activas, visita mi <a href="https://www.credly.com/users/stewart-viera" target="_blank" rel="noopener" class="link-accent">perfil de Credly →</a>',
        '#experience .timeline-item:nth-of-type(1) .card-role': 'Gerente Técnico Senior de Partners <span class="region-tag">· LATAM</span>',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(1)': 'Impulsando el éxito técnico de partners en la región LATAM para el portafolio enterprise de GitHub.',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(2)': 'Habilitando partners estratégicos para entregar soluciones de GitHub — Copilot, GHAS y Actions — a clientes enterprise.',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(3)': 'Construyendo relaciones técnicas profundas con stakeholders C-level y equipos de ingeniería de partners.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(1)': 'Guié a clientes enterprise en su transformación cloud-native con GKE, Cloud Run, Anthos y Vertex AI.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(2)': 'Entregué soluciones de contenedorización, microservicios y adopción de plataformas AI/ML en cuentas Fortune 500.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(3)': 'Creé contenido técnico, demos y workshops que impulsaron un pipeline de ocho cifras.',
        '#experience .timeline-item:nth-of-type(2) .sub-role:nth-of-type(1) h5': 'Program Manager — NYC Cloud Space <span class="card-date-sm">Jan 2025 – Jul 2025</span>',
        '#experience .timeline-item:nth-of-type(2) .sub-role:nth-of-type(1) p': 'Gestioné operaciones y programación del centro de experiencia para clientes de Google en NYC — eventos, executive briefings y showcases de partners.',
        '#experience .timeline-item:nth-of-type(2) .sub-role:nth-of-type(2) h5': 'TPM Fellow — Core Convergence Task Force <span class="card-date-sm">May 2023 – Dec 2023</span>',
        '#experience .timeline-item:nth-of-type(2) .sub-role:nth-of-type(2) p': 'Fui seleccionado para el TPM Fellowship interno de Google; contribuí a iniciativas de convergencia de producto entre GCP y Workspace.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(1)': 'Arquitecté landing zones de Azure y pipelines DevOps para migraciones enterprise y despliegues cloud greenfield.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(2)': 'Me especialicé en Azure DevOps, AKS e identidad híbrida para clientes de servicios financieros y medios.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(3)': 'Obtuve certificaciones Azure Expert: DevOps Engineer Expert, Solutions Architect Expert y Security Engineer.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(1)': 'Entregué proyectos de transformación cloud en AWS ProServe, implementando pipelines CI/CD, Infraestructura como Código y cargas containerizadas.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(2)': 'Trabajé en industrias reguladas, incluyendo salud y servicios financieros.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(3)': 'Obtuve certificaciones AWS DevOps Professional y Solutions Architect Associate.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(1)': 'Entregué proyectos de modernización de infraestructura, incluyendo migraciones de Windows Server, Active Directory y despliegues iniciales de Azure IaaS.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(2)': 'Apoyé a clientes enterprise del noreste de EE. UU. en transiciones de data center a cloud.',
        '#footer .footer-prompt': '<span class="prompt">$</span> echo "Hecho con ❤️ &amp; vibes nocturnos por Stewart Viera"'
      },
      attrs: [
        { selector: '#navToggle', name: 'aria-label', value: 'Abrir menú' },
        { selector: '#langToggle', name: 'aria-label', value: 'Cambiar idioma a inglés' }
      ],
      typewriter: [
        'ejecutar partner_success.sh --region LATAM',
        'echo "10+ años en tecnología cloud"',
        'git push origin futuro',
        'ssh arquitecto_cloud@github.com',
        'kubectl apply -f carrera.yaml',
        'terraform apply --target=crecimiento',
        'gh copilot suggest "siguiente capítulo"'
      ]
    }
  };

  function setText(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  function setHTML(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = value;
  }

  function setAttr(selector, name, value) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(name, value);
  }

  function syncToggleState(lang) {
    langToggle.querySelectorAll('.lang-option').forEach((option) => {
      option.classList.toggle('active', option.dataset.langCode === lang);
    });
  }

  function applyLanguage(lang) {
    const copy = translations[lang];
    if (!copy) return;

    document.documentElement.lang = lang;
    document.title = copy.title;
    setAttr('meta[name="description"]', 'content', copy.description);

    Object.entries(copy.text).forEach(([selector, value]) => setText(selector, value));
    Object.entries(copy.html).forEach(([selector, value]) => setHTML(selector, value));
    copy.attrs.forEach((attr) => setAttr(attr.selector, attr.name, attr.value));

    syncToggleState(lang);
    localStorage.setItem('preferredLanguage', lang);

    if (typeof window.setTypewriterLanguage === 'function') {
      window.setTypewriterLanguage(copy.typewriter);
    }
  }

  langToggle.addEventListener('click', () => {
    const currentLang = document.documentElement.lang === 'es' ? 'es' : 'en';
    applyLanguage(currentLang === 'en' ? 'es' : 'en');
  });

  const savedLang = localStorage.getItem('preferredLanguage');
  const initialLang = savedLang === 'es' ? 'es' : 'en';
  applyLanguage(initialLang);
})();

/* ── Scroll Reveal (IntersectionObserver) ───────── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    items.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
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

  items.forEach((el) => observer.observe(el));
})();

/* ── Active nav link highlight ──────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navLinks a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((anchor) => {
            anchor.style.color = anchor.getAttribute('href') === `#${id}` ? 'var(--cyan)' : '';
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => observer.observe(section));
})();
