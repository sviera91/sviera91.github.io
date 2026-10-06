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
      description: 'Stewart Viera — Senior Technical Partner Manager at GitHub, LATCAN. 10+ years in cloud tech across GitHub, Google, Microsoft, and AWS.',
      text: {
        '#navLinks li:nth-child(1) a': './experience',
        '#navLinks li:nth-child(2) a': './skills',
        '#navLinks li:nth-child(3) a': './certs',
        '#navLinks li:nth-child(4) a': './education',
        '#navLinks li:nth-child(5) a': './community',
        '#navLinks li:nth-child(6) a': 'contact',
        '.hero-meta .tag:nth-child(1)': '📍 New York, NY',
        '.hero-meta .tag:nth-child(2)': '☁️ 10+ years in cloud tech',
        '.hero-meta .tag:nth-child(3)': '🌎 LATCAN (LATAM & Canada)',
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
        '#footer .footer-output': 'Always learning 🧠 · exploring new ideas 🧭 · meeting new people 🤝'
      },
      html: {
        '.terminal-line:nth-of-type(1)': '<span class="prompt">$</span> whoami',
        '.terminal-line.terminal-role': '<span class="prompt">$</span> cat role.txt',
        '.terminal-output': 'Senior Technical Partner Manager <span class="cyan">@GitHub</span> · LATCAN (LATAM &amp; Canada)',
        '#experience .section-title': '<span class="prompt">&gt;</span> experience.log',
        '#skills .section-title': '<span class="prompt">&gt;</span> skills --list',
        '#certs .section-title': '<span class="prompt">&gt;</span> ls ./certifications',
        '#education .section-title': '<span class="prompt">&gt;</span> cat education.txt',
        '#volunteering .section-title': '<span class="prompt">&gt;</span> ./community --verbose',
        '#contact .section-title': '<span class="prompt">&gt;</span> contact --open',
        '#certs .section-sub': 'For active badge verification, visit my <a href="https://www.credly.com/users/stewart-viera" target="_blank" rel="noopener" class="link-accent">Credly profile →</a>',
        '#experience .timeline-item:nth-of-type(1) .card-role': 'Senior Technical Partner Manager <span class="region-tag">· LATCAN (Latin America &amp; Canada)</span>',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(1)': 'Lead technical strategy and enablement for partners across LATCAN — Latin America and Canada — helping them build and deliver enterprise solutions on GitHub.',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(2)': 'Create hands-on workshops, technical labs, and end-to-end demonstrations focused on GitHub Copilot and agentic software development.',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(3)': 'Develop reusable Copilot extensions, canvases, demo repositories, and delivery kits that turn emerging capabilities into repeatable partner offerings.',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(4)': 'Architect practical workflows spanning incident response, release management, developer productivity, security, governance, and platform integrations.',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(5)': 'Connect partner needs, field experience, and product direction to improve technical readiness and accelerate adoption of new GitHub capabilities.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(1)': 'Guided enterprise organizations through application modernization using containers, Kubernetes, serverless platforms, generative AI, and cloud-native architecture.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(2)': 'Designed and led complex proofs of concept that validated solutions for AI-assisted development, intelligent search, data modernization, and cloud operations.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(3)': 'Served as a technical advisor across Cloud Run, GKE, Vertex AI, Gemini, Agentspace, and Google Cloud operations tooling.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(4)': 'Translated business objectives and technical constraints into practical architectures, adoption roadmaps, and implementation strategies.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(5)': 'Created demonstrations, workshops, and technical narratives that made complex platform capabilities accessible to executive and engineering audiences.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(6)': 'Partnered with product, engineering, legal, support, and sales teams to resolve blockers and deliver high-priority customer initiatives.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(7)': 'Helped partners modernize workloads, develop new cloud offerings, and navigate the technical requirements for marketplace publication.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(8)': 'Influenced major enterprise opportunities through technical discovery, solution validation, architectural guidance, and executive engagement.',
        '#experience .sub-role-pm h5': 'Program Manager — NYC Cloud Space <span class="card-date-sm">Jan 2025 – Jul 2025</span>',
        '#experience .sub-role-pm .sub-bullets li:nth-child(1)': 'Managed executive briefing engagements from initial discovery through on-site delivery, aligning each agenda with the customer\'s strategic priorities.',
        '#experience .sub-role-pm .sub-bullets li:nth-child(2)': 'Coordinated account teams, technical specialists, speakers, and leadership to develop customized cloud and AI experiences.',
        '#experience .sub-role-pm .sub-bullets li:nth-child(3)': 'Recruited and prepared subject-matter experts to deliver relevant demonstrations and executive-level technical discussions.',
        '#experience .sub-role-pm .sub-bullets li:nth-child(4)': 'Directed briefing-day logistics and stakeholder coordination to create a seamless customer experience.',
        '#experience .sub-role-tpm h5': 'TPM Fellow — Core Convergence Task Force <span class="card-date-sm">May 2023 – Dec 2023</span>',
        '#experience .sub-role-tpm .sub-bullets li:nth-child(1)': 'Improved visibility into feature requests, blockers, and cross-product dependencies for a cross-functional product initiative.',
        '#experience .sub-role-tpm .sub-bullets li:nth-child(2)': 'Maintained internal documentation and communication channels used to track requests, decisions, and program progress.',
        '#experience .sub-role-tpm .sub-bullets li:nth-child(3)': 'Refined planning and issue-management processes to improve transparency, prioritization, and resolution efficiency.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(1)': 'Led architecture engagements for enterprise organizations in media, entertainment, and telecommunications.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(2)': 'Converted complex business requirements into secure, scalable Azure architectures and actionable modernization plans.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(3)': 'Designed proofs of concept covering cloud automation, observability, virtual desktops, and modern software delivery.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(4)': 'Built technical demonstrations that validated solution feasibility and communicated platform value to engineering and executive audiences.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(5)': 'Guided customers through technical discovery, architecture, validation, and adoption while coordinating with engineering and account teams.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(6)': 'Helped partners design cloud products, strengthen their technical offerings, and prepare solutions for the Azure Marketplace ecosystem.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(1)': 'Led DevOps transformation engagements that helped enterprise organizations establish modern cloud delivery practices on AWS.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(2)': 'Designed CI/CD architectures and deployment strategies for complex, multi-account cloud environments.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(3)': 'Implemented automated delivery pipelines, Infrastructure as Code, and container-based deployment patterns.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(4)': 'Built Python and serverless automation tools that improved operational consistency and reduced repetitive deployment work.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(5)': 'Advised engineering teams on cloud adoption, DevOps operating models, and practices for improving software delivery reliability.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(6)': 'Mentored incoming consultants and supported hands-on technical labs, strengthening knowledge sharing within the organization and technical community.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(1)': 'Delivered end-to-end cloud infrastructure engagements for enterprise organizations across multiple industries.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(2)': 'Designed foundational Azure environments and guided customers through data-center modernization and cloud migration.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(3)': 'Implemented infrastructure automation, identity, application migration, and DevOps solutions for complex enterprise environments.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(4)': 'Developed and delivered technical bootcamps covering Azure, containers, Kubernetes, and automated application delivery.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(5)': 'Presented cloud and DevOps practices to global technical audiences through conferences, workshops, and knowledge-transfer sessions.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(6)': 'Produced reusable webcasts, implementation guides, presentations, and technical documentation that scaled knowledge across teams.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(7)': 'Helped develop new consulting offerings focused on Azure adoption, container platforms, infrastructure automation, and DevOps transformation.',
        '#footer .footer-prompt': '<span class="prompt">$</span> echo "Always learning 🧠 · exploring new ideas 🧭 · meeting new people 🤝"'
      },
      attrs: [
        { selector: '#navToggle', name: 'aria-label', value: 'Toggle menu' },
        { selector: '#langToggle', name: 'aria-label', value: 'Switch language to Spanish' }
      ],
      typewriter: [
        'run partner_success.sh --region LATCAN',
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
      description: 'Stewart Viera — Gerente Técnico Senior de Partners en GitHub, LATCAN. Más de 10 años en tecnología cloud en GitHub, Google, Microsoft y AWS.',
      text: {
        '#navLinks li:nth-child(1) a': './experiencia',
        '#navLinks li:nth-child(2) a': './habilidades',
        '#navLinks li:nth-child(3) a': './certs',
        '#navLinks li:nth-child(4) a': './educacion',
        '#navLinks li:nth-child(5) a': './comunidad',
        '#navLinks li:nth-child(6) a': 'contacto',
        '.hero-meta .tag:nth-child(1)': '📍 Nueva York, NY',
        '.hero-meta .tag:nth-child(2)': '☁️ Más de 10 años en tecnología cloud',
        '.hero-meta .tag:nth-child(3)': '🌎 LATCAN (LATAM y Canadá)',
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
        '#footer .footer-output': 'Siempre aprendiendo 🧠 · explorando nuevas ideas 🧭 · conociendo gente nueva 🤝'
      },
      html: {
        '.terminal-line:nth-of-type(1)': '<span class="prompt">$</span> quien_soy',
        '.terminal-line.terminal-role': '<span class="prompt">$</span> cat rol.txt',
        '.terminal-output': 'Gerente Técnico Senior de Partners <span class="cyan">@GitHub</span> · LATCAN (LATAM y Canadá)',
        '#experience .section-title': '<span class="prompt">&gt;</span> experiencia.log',
        '#skills .section-title': '<span class="prompt">&gt;</span> habilidades --lista',
        '#certs .section-title': '<span class="prompt">&gt;</span> ls ./certificaciones',
        '#education .section-title': '<span class="prompt">&gt;</span> cat educacion.txt',
        '#volunteering .section-title': '<span class="prompt">&gt;</span> ./comunidad --detallado',
        '#contact .section-title': '<span class="prompt">&gt;</span> contacto --abrir',
        '#certs .section-sub': 'Para verificar credenciales activas, visita mi <a href="https://www.credly.com/users/stewart-viera" target="_blank" rel="noopener" class="link-accent">perfil de Credly →</a>',
        '#experience .timeline-item:nth-of-type(1) .card-role': 'Gerente Técnico Senior de Partners <span class="region-tag">· LATCAN (Latinoamérica y Canadá)</span>',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(1)': 'Lidero la estrategia técnica y la habilitación de partners en LATCAN — Latinoamérica y Canadá — ayudándolos a construir y entregar soluciones enterprise sobre GitHub.',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(2)': 'Creo workshops prácticos, laboratorios técnicos y demostraciones de extremo a extremo enfocados en GitHub Copilot y desarrollo de software agéntico.',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(3)': 'Desarrollo extensiones de Copilot, canvases, repositorios de demo y kits de entrega reutilizables que convierten capacidades emergentes en ofertas repetibles para partners.',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(4)': 'Diseño flujos de trabajo prácticos que abarcan respuesta a incidentes, gestión de releases, productividad del desarrollador, seguridad, gobernanza e integraciones de plataforma.',
        '#experience .timeline-item:nth-of-type(1) .card-bullets li:nth-child(5)': 'Conecto las necesidades de los partners, la experiencia de campo y la dirección de producto para mejorar la preparación técnica y acelerar la adopción de nuevas capacidades de GitHub.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(1)': 'Guié a organizaciones enterprise en la modernización de aplicaciones con contenedores, Kubernetes, plataformas serverless, IA generativa y arquitectura cloud-native.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(2)': 'Diseñé y lideré pruebas de concepto complejas que validaron soluciones de desarrollo asistido por IA, búsqueda inteligente, modernización de datos y operaciones cloud.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(3)': 'Actué como asesor técnico en Cloud Run, GKE, Vertex AI, Gemini, Agentspace y las herramientas de operaciones de Google Cloud.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(4)': 'Traduje objetivos de negocio y restricciones técnicas en arquitecturas prácticas, hojas de ruta de adopción y estrategias de implementación.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(5)': 'Creé demostraciones, workshops y narrativas técnicas que hicieron accesibles capacidades complejas de plataforma para audiencias ejecutivas y de ingeniería.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(6)': 'Colaboré con los equipos de producto, ingeniería, legal, soporte y ventas para resolver bloqueos y entregar iniciativas prioritarias de clientes.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(7)': 'Ayudé a partners a modernizar cargas de trabajo, desarrollar nuevas ofertas cloud y cumplir los requisitos técnicos para publicar en el marketplace.',
        '#experience .timeline-item:nth-of-type(2) .card-bullets li:nth-child(8)': 'Influí en oportunidades enterprise clave mediante descubrimiento técnico, validación de soluciones, guía arquitectónica y conversaciones con nivel ejecutivo.',
        '#experience .sub-role-pm h5': 'Program Manager — NYC Cloud Space <span class="card-date-sm">Ene 2025 – Jul 2025</span>',
        '#experience .sub-role-pm .sub-bullets li:nth-child(1)': 'Gestioné executive briefings desde el descubrimiento inicial hasta la entrega presencial, alineando cada agenda con las prioridades estratégicas del cliente.',
        '#experience .sub-role-pm .sub-bullets li:nth-child(2)': 'Coordiné equipos de cuenta, especialistas técnicos, speakers y liderazgo para desarrollar experiencias personalizadas de cloud e IA.',
        '#experience .sub-role-pm .sub-bullets li:nth-child(3)': 'Convoqué y preparé expertos en la materia para entregar demostraciones relevantes y discusiones técnicas de nivel ejecutivo.',
        '#experience .sub-role-pm .sub-bullets li:nth-child(4)': 'Dirigí la logística y la coordinación de stakeholders del día del briefing para lograr una experiencia fluida para el cliente.',
        '#experience .sub-role-tpm h5': 'TPM Fellow — Core Convergence Task Force <span class="card-date-sm">May 2023 – Dic 2023</span>',
        '#experience .sub-role-tpm .sub-bullets li:nth-child(1)': 'Mejoré la visibilidad sobre solicitudes de funcionalidades, bloqueos y dependencias entre productos en una iniciativa multifuncional.',
        '#experience .sub-role-tpm .sub-bullets li:nth-child(2)': 'Mantuve la documentación interna y los canales de comunicación usados para dar seguimiento a solicitudes, decisiones y avances del programa.',
        '#experience .sub-role-tpm .sub-bullets li:nth-child(3)': 'Refiné los procesos de planificación y gestión de incidencias para mejorar la transparencia, la priorización y la eficiencia de resolución.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(1)': 'Lideré proyectos de arquitectura para organizaciones enterprise en medios, entretenimiento y telecomunicaciones.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(2)': 'Convertí requisitos de negocio complejos en arquitecturas de Azure seguras y escalables, con planes de modernización accionables.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(3)': 'Diseñé pruebas de concepto de automatización cloud, observabilidad, escritorios virtuales y entrega moderna de software.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(4)': 'Construí demostraciones técnicas que validaron la viabilidad de las soluciones y comunicaron el valor de la plataforma a audiencias de ingeniería y ejecutivas.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(5)': 'Acompañé a los clientes en el descubrimiento técnico, la arquitectura, la validación y la adopción, coordinando con los equipos de ingeniería y de cuenta.',
        '#experience .timeline-item:nth-of-type(3) .card-bullets li:nth-child(6)': 'Ayudé a partners a diseñar productos cloud, fortalecer sus ofertas técnicas y preparar soluciones para el ecosistema del Azure Marketplace.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(1)': 'Lideré proyectos de transformación DevOps que ayudaron a organizaciones enterprise a establecer prácticas modernas de entrega cloud en AWS.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(2)': 'Diseñé arquitecturas CI/CD y estrategias de despliegue para entornos cloud complejos con múltiples cuentas.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(3)': 'Implementé pipelines de entrega automatizados, Infraestructura como Código y patrones de despliegue basados en contenedores.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(4)': 'Construí herramientas de automatización en Python y serverless que mejoraron la consistencia operativa y redujeron el trabajo manual repetitivo.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(5)': 'Asesoré a equipos de ingeniería en adopción cloud, modelos operativos DevOps y prácticas para mejorar la confiabilidad de la entrega de software.',
        '#experience .timeline-item:nth-of-type(4) .card-bullets li:nth-child(6)': 'Mentoreé a nuevos consultores y apoyé laboratorios técnicos prácticos, fortaleciendo el intercambio de conocimiento dentro de la organización y la comunidad técnica.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(1)': 'Entregué proyectos integrales de infraestructura cloud para organizaciones enterprise de múltiples industrias.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(2)': 'Diseñé entornos base de Azure y guié a los clientes en la modernización de sus data centers y su migración a la nube.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(3)': 'Implementé soluciones de automatización de infraestructura, identidad, migración de aplicaciones y DevOps para entornos enterprise complejos.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(4)': 'Desarrollé e impartí bootcamps técnicos sobre Azure, contenedores, Kubernetes y entrega automatizada de aplicaciones.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(5)': 'Presenté prácticas de cloud y DevOps ante audiencias técnicas globales en conferencias, workshops y sesiones de transferencia de conocimiento.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(6)': 'Produje webcasts, guías de implementación, presentaciones y documentación técnica reutilizables que escalaron el conocimiento entre equipos.',
        '#experience .timeline-item:nth-of-type(5) .card-bullets li:nth-child(7)': 'Ayudé a desarrollar nuevas ofertas de consultoría enfocadas en adopción de Azure, plataformas de contenedores, automatización de infraestructura y transformación DevOps.',
        '#footer .footer-prompt': '<span class="prompt">$</span> echo "Siempre aprendiendo 🧠 · explorando nuevas ideas 🧭 · conociendo gente nueva 🤝"'
      },
      attrs: [
        { selector: '#navToggle', name: 'aria-label', value: 'Abrir menú' },
        { selector: '#langToggle', name: 'aria-label', value: 'Cambiar idioma a inglés' }
      ],
      typewriter: [
        'ejecutar partner_success.sh --region LATCAN',
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
