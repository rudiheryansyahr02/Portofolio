/* ===== PORTFOLIO SCRIPT — Rudi Heryansyah Rohdiana ===== */

/* ===== PRELOADER ===== */
// Sembunyikan secepat mungkin: saat load, atau fallback 2.5 detik (tanpa jeda buatan).
const hidePreloader = () => {
  const preloader = document.getElementById('preloader');
  if (preloader) preloader.classList.add('hidden');
};
if (document.readyState === 'complete') {
  hidePreloader();
} else {
  window.addEventListener('load', hidePreloader);
}
setTimeout(hidePreloader, 2500);

/* ===== SCROLL PROGRESS ===== */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
}

/* ===== CUSTOM CURSOR ===== */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const outer = document.getElementById('cursorOuter');
  if (!cursor || !outer) return;
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let cx = 0, cy = 0, ox = 0, oy = 0;
    document.addEventListener('mousemove', (e) => {
      cx = e.clientX; cy = e.clientY;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
    });
    const animateOuter = () => {
      ox += (cx - ox) * 0.12;
      oy += (cy - oy) * 0.12;
      outer.style.left = ox + 'px';
      outer.style.top = oy + 'px';
      requestAnimationFrame(animateOuter);
    };
    animateOuter();
    const hoverEls = document.querySelectorAll('a, button, .project-card, .exp-card, .filter-btn, .work-step, .contact-link, .service-box, .timeline-gallery img');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }
}

/* ===== NAVBAR ===== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const header = document.querySelector('.header');

function initNavigation() {
  if (!menuIcon || !navbar) return;

  const closeMenu = () => {
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
    menuIcon.classList.add('bx-menu');
    menuIcon.setAttribute('aria-expanded', 'false');
    menuIcon.setAttribute('aria-label', 'Buka navigasi');
  };

  menuIcon.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x', isOpen);
    menuIcon.classList.toggle('bx-menu', !isOpen);
    menuIcon.setAttribute('aria-expanded', String(isOpen));
    menuIcon.setAttribute('aria-label', isOpen ? 'Tutup navigasi' : 'Buka navigasi');
  });

  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
      closeMenu();
    }
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ===== NAVBAR SCROLL BEHAVIOR ===== */
function initNavbarScroll() {
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ===== ACTIVE NAV LINK (IntersectionObserver) ===== */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id="home"]');
  const links = document.querySelectorAll('.navbar a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
}

/* ===== SCROLL ANIMATIONS (IntersectionObserver) ===== */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const animEls = document.querySelectorAll('.animate');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));

    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animEls.forEach(el => animObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
    animEls.forEach(el => el.classList.add('active'));
  }
}

/* ===== COUNTER ANIMATION ===== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1800;
      const start = performance.now();
      const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = target;
      };
      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ===== BACK TO TOP ===== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  const footerBtn = document.getElementById('backToTop');

  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  btn.addEventListener('click', scrollTop);
  if (footerBtn) footerBtn.addEventListener('click', scrollTop);
}

/* ===== TYPING EFFECT ===== */
function initTypingEffect() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const words = ['Fullstack Developer', 'Web Developer', 'IoT Enthusiast', 'Problem Solver', 'Creative Developer'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  el.parentNode.insertBefore(cursor, el.nextSibling);

  const type = () => {
    const current = words[wordIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === current.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }
    setTimeout(type, delay);
  };

  setTimeout(type, 800);
}

/* ===== HERO PARTICLES ===== */
function initHeroParticles() {
  const canvas = document.getElementById('heroParticles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.size = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(249,115,22,${this.alpha})`;
      ctx.fill();
    }
  }

  const count = Math.min(40, Math.floor(canvas.width * canvas.height / 20000));
  for (let i = 0; i < count; i++) particles.push(new Particle());

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(animate);
  };
  animate();
}

/* ===== READ MORE ===== */
function initReadMore() {
  const btn = document.querySelector('#readMoreBtn');
  const moreText = document.querySelector('#more');
  const dots = document.querySelector('#dots');
  if (!btn || !moreText || !dots) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    moreText.hidden = isExpanded;
    dots.hidden = !isExpanded;
    btn.textContent = isExpanded ? readMoreLabels[currentLang].more : readMoreLabels[currentLang].less;
    btn.setAttribute('aria-expanded', String(!isExpanded));
  });
}

/* ===== PROJECT FILTER ===== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll('.project-grid .project-card');
      cards.forEach(card => {
        const cat = card.dataset.category || '';
        const show = filter === 'all' || cat === filter;
        card.classList.toggle('hidden', !show);
        if (show) {
          card.style.animation = 'none';
          card.offsetHeight;
          card.style.animation = '';
        }
      });
    });
  });
}

/* ===== LIGHTBOX ===== */
let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(images, index) {
  lightboxImages = images;
  lightboxIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  if (!lb || !img) return;
  img.src = lightboxImages[lightboxIndex];
  img.alt = `Image ${lightboxIndex + 1}`;
  if (counter) counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.hidden = true;
  document.body.style.overflow = '';
}

function lightboxGo(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  if (img) { img.src = lightboxImages[lightboxIndex]; }
  if (counter) counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
}

function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lightboxOverlay')?.addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev')?.addEventListener('click', () => lightboxGo(-1));
  document.getElementById('lightboxNext')?.addEventListener('click', () => lightboxGo(1));
}

/* ===== PROJECT MODAL ===== */
function openProjectModal(project) {
  const modal = document.getElementById('projectModal');
  const body = document.getElementById('modalBody');
  if (!modal || !body) return;

  const images = project.images || [];
  const category = getLocalizedText(project.category);
  const description = getLocalizedText(project.description);
  const overview = getLocalizedText(project.overview);
  const features = project.features[currentLang] || project.features.en || [];

  const toolsHtml = project.tools.map(t => `<span class="tool-chip">${t}</span>`).join('');
  const featuresHtml = features.map(f => `<li class="modal-feature-item">${f}</li>`).join('');

  const galleryImages = project.gallery && project.gallery.length ? project.gallery : images;
  const galleryHtml = galleryImages
    .map((img, i) => `<img src="${img}" alt="${project.title} screenshot ${i + 1}" loading="lazy" class="modal-gallery-img" data-index="${i}">`)
    .join('');

  const linkHtml = project.link
    ? `<div class="modal-links"><a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class='bx bx-link-external'></i> View on GitHub</a></div>`
    : '';

  body.innerHTML = `
    <div class="modal-header">
      <span class="modal-category">${category}</span>
      <h2 class="modal-title">${project.title}</h2>
      <p class="modal-desc">${description}</p>
    </div>
    ${overview ? `
    <div class="modal-section">
      <h4>Project Overview</h4>
      <p>${overview}</p>
    </div>` : ''}
    <div class="modal-section">
      <h4>Technologies Used</h4>
      <div class="modal-tools">${toolsHtml}</div>
    </div>
    ${features.length ? `
    <div class="modal-section">
      <h4>Key Features</h4>
      <ul class="modal-features">${featuresHtml}</ul>
    </div>` : ''}
    ${galleryImages.length ? `
    <div class="modal-section">
      <h4>Gallery</h4>
      <div class="modal-gallery">${galleryHtml}</div>
    </div>` : ''}
    ${linkHtml}
  `;

  // Gallery lightbox in modal
  body.querySelectorAll('.modal-gallery-img').forEach((img, idx) => {
    img.addEventListener('click', () => openLightbox(galleryImages, idx));
  });

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  const firstFocusable = modal.querySelector('button, a, [tabindex="0"]');
  if (firstFocusable) firstFocusable.focus();
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
}

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;
  document.getElementById('modalClose')?.addEventListener('click', closeProjectModal);
  document.getElementById('modalOverlay')?.addEventListener('click', closeProjectModal);
}

/* ===== COMMAND PALETTE ===== */
function initCommandPalette() {
  const palette = document.getElementById('commandPalette');
  const input = document.getElementById('commandInput');
  const list = document.getElementById('commandList');
  if (!palette || !input || !list) return;

  const open = () => {
    palette.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => { input.focus(); }, 50);
  };
  const close = () => {
    palette.hidden = true;
    document.body.style.overflow = '';
    input.value = '';
    list.querySelectorAll('li').forEach(li => li.classList.remove('hidden'));
  };

  // Ctrl/Cmd + K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      palette.hidden ? open() : close();
    }
    if (e.key === 'Escape' && !palette.hidden) close();
  });

  document.getElementById('commandOverlay')?.addEventListener('click', close);

  // Filter
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    list.querySelectorAll('li').forEach(li => {
      li.classList.toggle('hidden', !li.textContent.toLowerCase().includes(q));
    });
  });

  // Execute
  list.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      const href = li.dataset.href;
      const action = li.dataset.action;
      const external = li.dataset.external;
      if (action === 'download-cv') {
        const a = document.createElement('a');
        a.href = 'LAPORAN_Rudi_Heryansyah_Rohdiana.pdf';
        a.download = '';
        a.click();
      } else if (href && external) {
        window.open(href, '_blank', 'noopener');
      } else if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
      close();
    });
    // Keyboard navigation in list
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') li.click();
    });
  });

  // Keyboard arrow navigation
  input.addEventListener('keydown', (e) => {
    const items = [...list.querySelectorAll('li:not(.hidden)')];
    const active = list.querySelector('li.selected');
    let idx = items.indexOf(active);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (active) active.classList.remove('selected');
      idx = (idx + 1) % items.length;
      items[idx]?.classList.add('selected');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (active) active.classList.remove('selected');
      idx = (idx - 1 + items.length) % items.length;
      items[idx]?.classList.add('selected');
    } else if (e.key === 'Enter') {
      if (active) active.click();
    }
  });
}

/* ===== GLOBAL KEYBOARD ===== */
function initGlobalKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeLightbox();
    }
    if (!document.getElementById('lightbox')?.hidden) {
      if (e.key === 'ArrowLeft') lightboxGo(-1);
      if (e.key === 'ArrowRight') lightboxGo(1);
    }
  });
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.querySelector('#status');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.from_name?.value?.trim() || '';
    const email = form.from_email?.value?.trim() || '';
    const subject = form.subject?.value?.trim() || '';
    const message = form.message?.value?.trim() || '';

    // Basic validation
    let valid = true;
    [form.from_name, form.from_email, form.subject, form.message].forEach(field => {
      if (field && !field.value.trim()) {
        field.classList.add('error');
        valid = false;
      } else if (field) {
        field.classList.remove('error');
      }
    });

    if (!valid) {
      if (statusEl) {
        statusEl.textContent = statusText[currentLang].empty;
        statusEl.className = 'status error';
      }
      return;
    }

    if (message.length < 10) {
      if (statusEl) {
        statusEl.textContent = currentLang === 'id' ? 'Pesan terlalu pendek (min 10 karakter).' : 'Message too short (min 10 characters).';
        statusEl.className = 'status error';
      }
      return;
    }

    const waNumber = '62895605976398';
    const text = `Halo Rudi, saya ingin menghubungi Anda.\n\n*Data Diri*\nNama: ${name}\nEmail: ${email}${subject ? `\nSubjek: ${subject}` : ''}\n\n*Pesan:*\n${message}`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

    if (statusEl) {
      statusEl.textContent = statusText[currentLang].redirect;
      statusEl.className = 'status success';
    }
    window.open(waUrl, '_blank', 'noopener');
  });

  // Remove error on input
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('error'));
  });
}

/* ===== TIMELINE GALLERY LIGHTBOX ===== */
function initTimelineLightbox() {
  document.querySelectorAll('.timeline-gallery img').forEach(img => {
    img.addEventListener('click', () => {
      const gallery = img.closest('.timeline-gallery');
      const imgs = [...gallery.querySelectorAll('img')].map(i => i.src);
      const idx = imgs.indexOf(img.src);
      openLightbox(imgs, idx);
    });
  });
}

/* ===== LANGUAGE SYSTEM ===== */
const readMoreLabels = {
  id: { more: 'Baca Selengkapnya', less: 'Sembunyikan' },
  en: { more: 'Read More', less: 'Read Less' }
};
const statusText = {
  id: { empty: 'Mohon lengkapi nama, email, dan pesan.', redirect: 'Mengarahkan ke WhatsApp...' },
  en: { empty: 'Please fill in your name, email, and message.', redirect: 'Redirecting to WhatsApp...' }
};
const projectText = {
  id: { viewProject: 'Lihat Project', backToProjects: 'Kembali ke Project' },
  en: { viewProject: 'View Project', backToProjects: 'Back to Projects' }
};
let currentLang = localStorage.getItem('portfolioLang') || 'en';
const langToggle = document.querySelector('#langToggle');

function getLocalizedText(value) {
  if (typeof value === 'object' && value !== null) {
    return value[currentLang] || value.id || value.en || '';
  }
  return value || '';
}

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-id]').forEach(el => {
    const langText = el.getAttribute('data-' + lang);
    if (langText) {
      if (el.tagName === 'INPUT' && el.type === 'submit') el.value = langText;
      else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = langText;
      else el.textContent = langText;
    }
    const ariaLang = el.getAttribute('data-aria-' + lang);
    if (ariaLang) el.setAttribute('aria-label', ariaLang);
  });

  document.querySelectorAll('[data-ph-id]').forEach(el => {
    const ph = el.getAttribute('data-ph-' + lang);
    if (ph) el.setAttribute('placeholder', ph);
  });

  if (langToggle) langToggle.textContent = lang === 'id' ? 'EN' : 'ID';
  localStorage.setItem('portfolioLang', lang);

  refreshProjectContent();
}

function refreshProjectContent() {
  if (!window.location.pathname.includes('project-detail.html')) {
    renderProjectCards();
  } else {
    loadProjectDetail();
  }
}

if (langToggle) {
  langToggle.addEventListener('click', () => applyLang(currentLang === 'id' ? 'en' : 'id'));
}

/* ===== PROJECT DATA ===== */
const projects = [
  {
    id: 'guesthouse',
    category: { id: 'Fullstack Development', en: 'Fullstack Development' },
    title: 'Guest House As-Syifa',
    shortDescription: {
      id: 'Sistem booking penginapan berbasis web untuk mempermudah reservasi kamar online dan manajemen operasional guest house.',
      en: 'A web-based accommodation booking system to simplify online room reservations and guest house operations management.'
    },
    description: {
      id: 'Guest House As-Syifa merupakan sistem booking penginapan berbasis web yang dikembangkan untuk mempermudah proses reservasi kamar secara online sekaligus membantu pengelola dalam mengelola operasional guest house. Sistem mencakup informasi kamar, ketersediaan kamar, proses booking, pembayaran melalui transfer bank, upload bukti pembayaran, verifikasi pembayaran, serta pengelolaan data customer.',
      en: 'Guest House As-Syifa is a web-based accommodation booking system developed to simplify online room reservations while helping administrators manage guest house operations. The system includes room information, room availability, booking management, bank transfer payments, payment proof uploads, payment verification, and customer data management.'
    },
    overview: {
      id: 'Pada sisi admin, sistem menyediakan dashboard untuk mengelola kamar, lokasi, fasilitas, foto kamar, harga periode, menu sarapan, data booking, pembayaran, serta laporan transaksi. Sistem juga dilengkapi dengan fitur monitoring pendapatan dan rekap data booking.',
      en: 'On the admin side, the system provides a dashboard for managing rooms, locations, facilities, room photos, seasonal pricing, breakfast options, bookings, payments, and transaction reports, including revenue monitoring and booking summaries.'
    },
    images: [
      'images/gh1.webp','images/porto1 (1).webp','images/porto1 (7).webp'
    ],
    tools: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Google OAuth', 'PhpSpreadsheet'],
    features: {
      id: ['Booking kamar online','Kalender ketersediaan','Detail kamar & galeri','Manajemen customer','Login Google OAuth','Layanan sarapan','Pembayaran transfer bank','Upload bukti bayar','Verifikasi pembayaran','Manajemen status booking','Dashboard admin','Monitoring pendapatan','Laporan booking'],
      en: ['Online room booking','Availability calendar','Room details & gallery','Customer management','Google OAuth login','Breakfast services','Bank transfer payment','Payment proof upload','Payment verification','Booking status management','Admin dashboard','Revenue monitoring','Booking reports'],
      gallery: [
        'images/gh1.webp','images/porto1 (1).webp','images/porto1 (7).webp'
      ]
    }
  },
  {
    id: 'foodcourt',
    category: { id: 'Web Development', en: 'Web Development' },
    title: 'Foodcourt Multi-Tenant System',
    shortDescription: {
      id: 'Sistem informasi manajemen foodcourt berbasis web untuk mengelola menu, transaksi, laporan, dan operasional kantin secara digital.',
      en: 'A web-based foodcourt management information system to handle menu, transactions, reports, and canteen operations digitally.'
    },
    description: {
      id: 'Foodcourt Multi-Tenant System adalah sistem informasi manajemen berbasis web yang dikembangkan untuk mendukung operasional foodcourt secara digital. Sistem mencakup manajemen menu, transaksi penjualan, pengelolaan data tenant, laporan keuangan, dan monitoring aktivitas foodcourt secara real-time.',
      en: 'Foodcourt Multi-Tenant System is a web-based management information system developed to support digital foodcourt operations. The system includes menu management, sales transactions, tenant data management, financial reports, and real-time foodcourt activity monitoring.'
    },
    overview: {
      id: 'Peran: Fullstack Developer\n\nSistem ini dibangun untuk mempermudah pengelolaan foodcourt secara terpusat. Dari manajemen menu dan transaksi harian hingga pelaporan keuangan, semuanya terintegrasi dalam satu platform web yang mudah digunakan.',
      en: 'Role: Fullstack Developer\n\nThis system was built to simplify centralized foodcourt management. From menu management and daily transactions to financial reporting, everything is integrated in one easy-to-use web platform.'
    },
    images: [
      'images/fc.webp','images/fc (1).webp','images/fc (2).webp'
    ],
    tools: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'REST API'],
    features: {
      id: ['Manajemen menu & kategori','Transaksi penjualan','Manajemen tenant','Laporan keuangan','Dashboard monitoring','Manajemen pengguna','Print invoice','Rekap data harian'],
      en: ['Menu & category management','Sales transactions','Tenant management','Financial reports','Monitoring dashboard','User management','Print invoice','Daily data recap']
    },
    link: ''
  },
  {
    id: 'syifamart',
    category: { id: 'Web Development', en: 'Web Development' },
    title: 'Syifamart Retail System',
    shortDescription: {
      id: 'Project web development dengan improvement berkelanjutan — deposit transaction, product health filter, dan optimasi sistem operasional yang terus berkembang.',
      en: 'A web development project with continuous improvement — deposit transactions, product health filter, and ongoing operational system optimization.'
    },
    description: {
      id: 'Syifamart Retail System adalah project web development yang saya kembangkan dan lakukan improvement secara bertahap. Saya tidak hanya membangun fitur baru, tetapi juga mengevaluasi sistem yang sudah berjalan, memperbaiki data, serta menyesuaikan sistem berdasarkan kebutuhan operasional yang terus berkembang.',
      en: 'Syifamart Retail System is a web development project where I continuously improved and developed an existing system based on real operational needs. My work included building new features, evaluating existing processes, correcting data, and adapting the application as new requirements emerged.'
    },
    overview: {
      id: 'Peran: Software Developer\n\nKontribusi:\n• System Improvement\n• Data Correction & Validation\n• Deposit Transaction Module\n• Product Health Filter (gula & natrium)\n• Transaction Management\n• Reporting & Monitoring\n• Bug Fixing & Debugging\n• Continuous Improvement\n\nProses: Analyze → Identify → Develop → Test → Improve → Maintain',
      en: 'Role: Software Developer\n\nContributions:\n• System Improvement\n• Data Correction & Validation\n• Deposit Transaction Module\n• Product Health Filter (sugar & sodium)\n• Transaction Management\n• Reporting & Monitoring\n• Bug Fixing & Debugging\n• Continuous Improvement\n\nProcess: Analyze → Identify → Develop → Test → Improve → Maintain'
    },
    images: [
      'images/sm.webp','images/sm (1).webp','images/sm (2).webp'
    ],
    tools: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'REST API'],
    features: {
      id: ['System Improvement','Data Correction & Validation','Deposit Transaction Module','Product Health Filter','Transaction Management','Reporting & Monitoring','Bug Fixing & Debugging','System Maintenance','Continuous Improvement'],
      en: ['System Improvement','Data Correction & Validation','Deposit Transaction Module','Product Health Filter','Transaction Management','Reporting & Monitoring','Bug Fixing & Debugging','System Maintenance','Continuous Improvement']
    },
    link: ''
  },
  {
    id: 'dashboard',
    category: { id: 'Fullstack Development', en: 'Fullstack Development' },
    title: 'Qatrindo Dashboard System',
    shortDescription: {
      id: 'Dashboard internal multi-unit Qatrindo untuk monitoring operasional dan keuangan lintas unit usaha (foodcourt, syifamart, konveksi, toko bangunan, guest house).',
      en: 'An internal multi-unit Qatrindo dashboard for operational and financial monitoring across business units (foodcourt, syifamart, konveksi, building supply, guest house).'
    },
    description: {
      id: 'Qatrindo Dashboard System adalah aplikasi web internal berbasis PHP native MVC yang digunakan untuk memonitor operasional dan keuangan beberapa unit usaha Qatrindo sekaligus. Sistem terhubung ke 8 basis data (dashboard, absensi, foodcourt, konveksi, syifamart, guest house, toko bangunan, FadiPay) dan menampilkan total pendapatan per unit per tanggal, perbandingan pendapatan antarperiode lintas unit, rekap target pencapaian, piutang, serta kas biro (jurnal harian).',
      en: 'Qatrindo Dashboard System is an internal web application built with native PHP MVC to monitor operations and finances across multiple Qatrindo business units at once. It connects to 8 databases (dashboard, absensi, foodcourt, konveksi, syifamart, guest house, toko bangunan, FadiPay) and displays total revenue per unit per date, cross-unit revenue comparison, achievement target recap, receivables, and office cash (daily journal).'
    },
    overview: {
      id: 'Peran: Fullstack Developer\n\nModul utama:\n• Dashboard monitoring total pendapatan 5 unit per tanggal\n• Master Target Pencapaian per unit (grafik Highcharts + status Tercapai/On Progress)\n• Perbandingan pendapatan antarperiode lintas unit (Highcharts)\n• Piutang per unit\n• Kas Biro / Jurnal Harian (import & export Excel/PDF)\n• Master Akun & Master Unit (soft delete)\n• Risalah Rapat (multi-PIC, export PDF/Excel)\n• SOP & Kebijakan (upload PDF, verifikasi pembayaran)\n\nTeknologi: PHP native MVC, MySQL 8, Bootstrap, jQuery + DataTables, Chart.js/Highcharts, Composer (mPDF, PhpSpreadsheet, Dompdf), auth via tabel admins/master_pegawai (bcrypt), deployment Docker + Ansible + Jenkins.',
      en: 'Role: Fullstack Developer\n\nMain modules:\n• Dashboard monitoring total revenue of 5 units per date\n• Achievement target per unit (Highcharts chart + Tercapai/On Progress status)\n• Cross-period revenue comparison (Highcharts)\n• Receivables per unit\n• Office Cash / Daily Journal (import & export Excel/PDF)\n• Master Account & Master Unit (soft delete)\n• Meeting Minutes (multi-PIC, PDF/Excel export)\n• SOP & Policies (PDF upload, payment verification)\n\nTech: native PHP MVC, MySQL 8, Bootstrap, jQuery + DataTables, Chart.js/Highcharts, Composer (mPDF, PhpSpreadsheet, Dompdf), auth via admins/master_pegawai tables (bcrypt), deployment Docker + Ansible + Jenkins.'
    },
    images: ['images/db (1).webp','images/db (3).webp','images/db (2).webp', 'images/db (4).webp'],
    tools: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'jQuery', 'DataTables', 'Highcharts', 'Composer', 'Docker', 'Ansible'],
    features: {
      id: ['Dashboard monitoring multi-unit','Target pencapaian per unit','Perbandingan pendapatan antarperiode','Kas biro / jurnal harian (import & export)','Master akun & unit','Risalah rapat (multi-PIC)','SOP & kebijakan (upload PDF)','Piutang per unit','Grafik Highcharts/Chart.js','Auth bcrypt + session','Deployment Docker + Ansible'],
      en: ['Multi-unit monitoring dashboard','Achievement target per unit','Cross-period revenue comparison','Office cash / daily journal (import & export)','Master account & unit','Meeting minutes (multi-PIC)','SOP & policies (PDF upload)','Receivables per unit','Highcharts/Chart.js charts','Bcrypt auth + session','Docker + Ansible deployment']
    },
    link: 'https://github.com/rudiheryansyahr02'
  },
  {
    id: 'absen',
    category: { id: 'Fullstack Development', en: 'Fullstack Development' },
    title: 'Face Attendance System',
    shortDescription: {
      id: 'Sistem absensi karyawan berbasis foto dan GPS untuk memantau kehadiran, lembur, dan pengajuan izin/cuti secara real-time.',
      en: 'An employee attendance system based on photo and GPS for real-time monitoring of attendance, overtime, and leave requests.'
    },
    description: {
      id: 'Face Attendance System (SIM Absensi Qatrindo) adalah aplikasi web internal berbasis PHP native MVC untuk pencatatan kehadiran karyawan. Absensi dilakukan dengan foto (base64) dan koordinat GPS yang divalidasi terhadap lokasi kerja (Haversine) dalam radius tertentu, lalu disimpan beserta status (tepat waktu/telat) dan shift yang berlaku. Sistem juga mencakup absensi kegiatan (sholat fardu + bukti), lembur dengan approval, pengajuan izin/cuti 2 tingkat (PJ → HRD), jadwal shift, dan rekap per pegawai/tanggal.',
      en: 'Face Attendance System (SIM Qatrindo Presensi) is an internal web application built with native PHP MVC for employee attendance recording. Attendance is captured with a photo (base64) and GPS coordinates validated against the work location (Haversine) within a defined radius, then stored with status (on time/late) and the applicable shift. The system also covers activity attendance (daily prayers + proof), overtime with approval, 2-level leave requests (supervisor → HR), shift scheduling, and per-employee/date recap.'
    },
    overview: {
      id: 'Peran: Fullstack Developer\n\nModul utama:\n• Absensi masuk & pulang (foto + GPS + validasi lokasi Haversine)\n• Absensi kegiatan (sholat fardu + bukti foto)\n• Lembur (pengajuan + approval via Telegram)\n• Pengajuan izin/cuti (2 tingkat: PJ → HRD)\n• Jadwal shift (impor/ekspor Excel)\n• Master: pegawai, lokasi, shift, absensi, pengajuan, perusahaan, atasan langsung\n• Rekap absensi per pegawai/tanggal + dashboard monitoring\n• Sinkronisasi dua arah dengan HRD (hrd_investasi)\n\nIntegrasi: file center (unggah foto via cURL), Telegram Bot API (approval inline keyboard), database hrd_investasi. Teknologi: PHP native MVC, MySQL 8 + MySQL 5.7, Bootstrap, jQuery, SweetAlert2, deployment Docker + Ansible + Nginx.',
      en: 'Role: Fullstack Developer\n\nMain modules:\n• Clock-in & clock-out (photo + GPS + Haversine location validation)\n• Activity attendance (daily prayers + photo proof)\n• Overtime (request + approval via Telegram)\n• Leave requests (2 levels: supervisor → HR)\n• Shift scheduling (Excel import/export)\n• Master: employee, location, shift, attendance, request, company, direct supervisor\n• Attendance recap per employee/date + monitoring dashboard\n• Two-way sync with HRD (hrd_investasi)\n\nIntegrations: file center (photo upload via cURL), Telegram Bot API (inline-keyboard approval), hrd_investasi database. Tech: native PHP MVC, MySQL 8 + MySQL 5.7, Bootstrap, jQuery, SweetAlert2, deployment Docker + Ansible + Nginx.'
    },
    images: ['images/absen (2).webp','images/absen (1).webp','images/absen (3).webp','images/absen (4).webp'],
    tools: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'jQuery', 'SweetAlert2', 'Telegram Bot API', 'cURL', 'Docker', 'Ansible'],
    features: {
      id: ['Absensi masuk & pulang (foto + GPS)','Validasi lokasi Haversine + radius','Shift reguler & shift','Absensi kegiatan (sholat fardu + bukti)','Lembur + approval Telegram','Pengajuan izin/cuti 2 tingkat','Jadwal shift (impor/ekspor Excel)','Rekap per pegawai/tanggal','Sinkronisasi HRD','Notifikasi Telegram','Dashboard monitoring'],
      en: ['Clock-in & clock-out (photo + GPS)','Haversine location validation + radius','Regular & shift schedules','Activity attendance (prayers + proof)','Overtime + Telegram approval','2-level leave requests','Shift scheduling (Excel import/export)','Per-employee/date recap','HRD sync','Telegram notifications','Monitoring dashboard']
    },
    link: 'https://github.com/rudiheryansyahr02'
  },
  {
    id: 'brocass',
    category: { id: 'Internet of Things', en: 'Internet of Things' },
    title: 'Brocass – Smart IoT Coop',
    shortDescription: {
      id: 'Sistem IoT real-time untuk pemantauan dan kendali lingkungan kandang ayam broiler menggunakan sensor suhu, kelembaban, dan pencahayaan.',
      en: 'A real-time IoT system for monitoring and controlling broiler coop environment using temperature, humidity, and lighting sensors.'
    },
    description: {
      id: 'Brocass – Smart IoT Coop adalah sistem kandang ayam broiler berbasis IoT untuk memantau dan mengendalikan kondisi lingkungan secara real-time. Sistem memanfaatkan sensor dan aktuator untuk memantau parameter lingkungan serta mengotomatisasi pengendalian.',
      en: 'Brocass – Smart IoT Coop is an IoT-based broiler coop system designed to monitor and control environmental conditions in real time using sensors and actuators.'
    },
    overview: {
      id: 'Sistem ini membantu peternak mengelola kandang lebih efisien melalui pemantauan suhu, kelembaban, dan pencahayaan secara otomatis. Data sensor dikirim ke Firebase untuk monitoring real-time melalui dashboard mobile.',
      en: 'This system helps farmers manage coops more efficiently through automated monitoring of temperature, humidity, and lighting. Sensor data is sent to Firebase for real-time monitoring via a mobile dashboard.'
    },
    images: ['images/iot1.webp','images/iot2.webp','images/iot3.webp'],
    tools: ['ESP32','Wemos D1 R2','C++','Firebase Realtime Database','DHT22','MQ-135','Water Level Sensor','Relay Module 8ch','DC Fan','Servo Motor','Heating Lamp','Arduino IDE'],
    features: {
      id: ['Pemantauan real-time','Kontrol lingkungan otomatis','Pencatatan data sensor','Dashboard mobile'],
      en: ['Real-time monitoring','Automated environmental control','Sensor data logging','Mobile dashboard']
    },
    link: 'https://github.com/rudiheryansyahr02'
  },
  {
    id: 'pkkmb',
    category: { id: 'Graphic Design', en: 'Graphic Design' },
    title: 'Team Creative PKKMB 2023',
    shortDescription: {
      id: 'Bergabung sebagai desainer visual yang merancang materi publikasi, konten media sosial, poster, dan identitas visual event PKKMB 2023.',
      en: 'Joined as a visual designer creating publication materials, social media content, posters, and event visual identity for PKKMB 2023.'
    },
    description: {
      id: 'Bergabung di Team Creative PKKMB 2023 sebagai anggota tim kreatif yang merancang kebutuhan visual acara berskala besar: publikasi, konten media sosial, poster, identitas visual, serta bekerja kolaboratif dalam tim.',
      en: 'Joined Team Creative PKKMB 2023 as a creative team member designing visual assets for a large-scale event: publications, social media content, posters, visual identity, and collaborative teamwork.'
    },
    overview: {
      id: 'Peran: Anggota Team Creative\n\nKontribusi:\n• Graphic Design, Visual Design, Social Media Design\n• Publication Materials, Poster & Promotional Design\n• Information Design, Visual Assets Creation\n• Creative Collaboration & Teamwork',
      en: 'Role: Creative Team Member\n\nContributions:\n• Graphic Design, Visual Design, Social Media Design\n• Publication Materials, Poster & Promotional Design\n• Information Design, Visual Assets Creation\n• Creative Collaboration & Teamwork'
    },
    images: ['images/pkkmb (3).webp','images/pkkmb (2).webp','images/pkkmb (1).webp','images/3 (1).webp','images/3 (2).webp','images/3 (3).webp'],
    tools: ['Canva', 'Adobe Photoshop', 'Figma'],
    features: {
      id: ['Graphic Design','Visual Design','Social Media Design','Publication Materials','Poster & Promotional Design','Visual Assets Creation','Creative Collaboration','Teamwork'],
      en: ['Graphic Design','Visual Design','Social Media Design','Publication Materials','Poster & Promotional Design','Visual Assets Creation','Creative Collaboration','Teamwork']
    },
    link: ''
  },
  {
    id: 'msib',
    category: { id: 'Graphic Design', en: 'Graphic Design' },
    title: 'MSIB Indobot – Digital Design',
    shortDescription: {
      id: 'Koleksi karya desain digital (poster, banner, konten media sosial) selama program MSIB Indobot dengan fokus komposisi dan identitas visual.',
      en: 'A collection of digital design works (posters, banners, social media content) during the MSIB Indobot program, focusing on composition and visual identity.'
    },
    description: {
      id: 'MSIB Indobot – Digital Design adalah kumpulan karya desain digital yang dibuat selama program MSIB Indobot. Mencakup poster, banner, dan konten media sosial dengan memperhatikan komposisi, identitas visual, dan kebutuhan komunikasi digital.',
      en: 'MSIB Indobot – Digital Design is a collection of digital design works created during the MSIB Indobot program, including posters, banners, and social media content, focusing on composition, visual identity, and digital communication.'
    },
    overview: {
      id: 'Karya-karya ini dibuat dengan sentuhan modern dan berkarakter, mencakup desain poster promosi, banner acara, dan konten media sosial yang konsisten dengan brand guidelines program MSIB Indobot.',
      en: 'The works feature a modern and distinctive touch, including promotional posters, event banners, and social media content aligned with the MSIB Indobot program brand guidelines.'
    },
    images: ['images/msib1.webp','images/msib2 (1).webp','images/msib2 (2).webp','images/msib2 (3).webp'],
    tools: ['Canva', 'Figma', 'Adobe Photoshop'],
    features: {
      id: ['Desain poster','Konten media sosial','Identitas brand','Aset siap cetak'],
      en: ['Poster design','Social media content','Brand identity','Print-ready assets']
    },
    link: 'https://github.com/rudiheryansyahr02'
  }
];

/* ===== RENDER PROJECT CARDS ===== */
function renderProjectCards() {
  const container = document.querySelector('#projectGrid') || document.querySelector('#hardSkillsContainer');
  if (!container) return;

  container.innerHTML = '';

  // Check if we're on services section (hardSkillsContainer)
  const isServicesMode = container.id === 'hardSkillsContainer';

  if (isServicesMode) {
    // Group by category
    const groups = {};
    projects.forEach(p => {
      const cat = getLocalizedText(p.category);
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    Object.keys(groups).sort().forEach((catName) => {
      const header = document.createElement('div');
      header.className = 'skill-category-group';
      header.innerHTML = `<span class="skill-category-label">${catName}</span>`;
      container.appendChild(header);
      groups[catName].forEach((project, idx) => {
        container.appendChild(createProjectCard(project, idx, true));
      });
    });
  } else {
    // Projects section — flat grid with filter support
    projects.forEach((project, idx) => {
      const card = createProjectCard(project, idx, false);
      card.dataset.category = getLocalizedText(project.category);
      container.appendChild(card);
    });
  }

  initProjectFilter();
}

function createProjectCard(project, idx, compact) {
  const card = document.createElement('article');
  card.className = 'project-card animate';
  card.setAttribute('data-project-id', project.id);

  const firstImage = project.images && project.images.length ? project.images[0] : '';
  const toolsHtml = project.tools.slice(0, 5).map(t => `<span class="tool-chip">${t}</span>`).join('');
  const category = getLocalizedText(project.category);
  const shortDesc = getLocalizedText(project.shortDescription);

  card.innerHTML = `
    ${firstImage ? `<div class="project-card-media"><img src="${firstImage}" alt="${project.title}" loading="lazy" decoding="async"></div>` : ''}
    <div class="project-content">
      <span class="project-badge">${category}</span>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${shortDesc}</p>
      <div class="project-tools">${toolsHtml}</div>
      <div style="margin-top:auto;padding-top:1.2rem;display:flex;gap:0.8rem;flex-wrap:wrap;">
        <button class="btn project-btn open-modal-btn" data-project-id="${project.id}">
          <span data-id="Lihat Detail" data-en="View Details">${projectText[currentLang].viewProject}</span> <i class='bx bx-info-circle'></i>
        </button>
        <a href="project-detail.html?project=${project.id}" class="btn btn-ghost" style="padding:0.7rem 1.4rem;font-size:1.3rem;height:auto;border-radius:3rem;">
          <span data-id="Detail" data-en="Full Page">Full Page</span> <i class='bx bx-arrow-right'></i>
        </a>
      </div>
    </div>
  `;

  // Observe for animation
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(card);
  } else {
    card.classList.add('active');
  }

  // Modal button
  card.querySelector('.open-modal-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const p = projects.find(pr => pr.id === project.id);
    if (p) openProjectModal(p);
  });

  return card;
}

/* ===== PROJECT DETAIL PAGE ===== */
let detailCurrentIndex = 0;
let detailTotalSlides = 0;
let detailCleanup = null;

function loadProjectDetail() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('project');
  if (!projectId) return;

  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  const images = project.images || [];

  const detailTitle = document.querySelector('.project-detail-title');
  const detailCategory = document.querySelector('.project-detail-category');
  const detailDescription = document.querySelector('.project-detail-description');
  const detailTools = document.querySelector('.project-detail-tools');
  const detailFeatures = document.querySelector('.project-detail-features');
  const detailSlider = document.querySelector('.project-detail-slider');
  const detailGallery = document.querySelector('.project-detail-gallery');
  const detailLink = document.querySelector('.project-detail-link');
  const backProjectsSpan = document.querySelector('.back-projects span');

  if (detailTitle) detailTitle.textContent = project.title;
  if (detailCategory) detailCategory.textContent = getLocalizedText(project.category);
  if (detailDescription) detailDescription.textContent = getLocalizedText(project.description);
  if (backProjectsSpan) backProjectsSpan.textContent = projectText[currentLang].backToProjects;

  if (detailTools) {
    detailTools.innerHTML = project.tools.map(t => `<span class="tool-chip">${t}</span>`).join('');
  }
  if (detailFeatures) {
    const features = project.features[currentLang] || [];
    detailFeatures.innerHTML = features.map(f => `<li>${f}</li>`).join('');
  }
  if (detailSlider) {
    const track = detailSlider.querySelector('.project-slider-track');
    const dotsContainer = detailSlider.querySelector('.slider-dots');
    if (track) track.innerHTML = images.map((img, i) => `<img src="${img}" alt="${project.title} - Image ${i + 1}">`).join('');
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      images.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToDetailSlide(i));
        dotsContainer.appendChild(dot);
      });
    }
    initDetailSlider();
  }
  if (detailGallery) {
    const galleryImgs = (project.features?.gallery) || images;
    detailGallery.innerHTML = galleryImgs.map((img, i) => `<img src="${img}" alt="${project.title} gallery ${i + 1}" loading="lazy" decoding="async">`).join('');
    // Lightbox for gallery
    detailGallery.querySelectorAll('img').forEach((img, idx) => {
      img.addEventListener('click', () => openLightbox(galleryImgs, idx));
    });
  }
  if (detailLink) {
    if (project.link) {
      detailLink.href = project.link;
      detailLink.style.display = 'inline-flex';
    } else {
      detailLink.style.display = 'none';
    }
  }
}

function initDetailSlider() {
  const sliderEl = document.querySelector('.project-detail-slider');
  const track = sliderEl?.querySelector('.project-slider-track');
  const prevBtn = sliderEl?.querySelector('.slider-prev');
  const nextBtn = sliderEl?.querySelector('.slider-next');
  const dots = sliderEl ? sliderEl.querySelectorAll('.dot') : [];
  detailTotalSlides = track ? track.querySelectorAll('img').length : 0;
  detailCurrentIndex = 0;

  const updateDetailSlider = () => {
    if (track) track.style.transform = `translateX(-${detailCurrentIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === detailCurrentIndex));
  };

  window.goToDetailSlide = (index) => {
    if (!detailTotalSlides) return;
    detailCurrentIndex = (index + detailTotalSlides) % detailTotalSlides;
    updateDetailSlider();
  };

  if (detailCleanup) detailCleanup();
  const onPrev = () => window.goToDetailSlide(detailCurrentIndex - 1);
  const onNext = () => window.goToDetailSlide(detailCurrentIndex + 1);
  const onKeyDown = (e) => {
    if (document.getElementById('lightbox')?.hidden !== false) {
      if (e.key === 'ArrowLeft') window.goToDetailSlide(detailCurrentIndex - 1);
      if (e.key === 'ArrowRight') window.goToDetailSlide(detailCurrentIndex + 1);
    }
  };

  if (prevBtn) prevBtn.addEventListener('click', onPrev);
  if (nextBtn) nextBtn.addEventListener('click', onNext);
  document.addEventListener('keydown', onKeyDown);

  detailCleanup = () => {
    if (prevBtn) prevBtn.removeEventListener('click', onPrev);
    if (nextBtn) nextBtn.removeEventListener('click', onNext);
    document.removeEventListener('keydown', onKeyDown);
  };

  updateDetailSlider();
}

/* ===== BACK NAVIGATION ===== */
function initBackNavigation() {
  const backEl = document.getElementById('backProjects');
  if (!backEl) return;
  backEl.addEventListener('click', (e) => {
    const referrer = document.referrer || '';
    try {
      if (referrer && new URL(referrer).origin === window.location.origin && window.history.length > 1) {
        e.preventDefault();
        window.history.back();
      }
    } catch (_) { /* fallback to anchor */ }
  });
}

/* ===== INIT ALL ===== */
applyLang(currentLang);
initScrollProgress();
initNavigation();
initNavbarScroll();
initActiveNav();
initScrollReveal();
initCounters();
initBackToTop();
initLightbox();
initProjectModal();
initCommandPalette();
initGlobalKeyboard();
initContactForm();
initTimelineLightbox();
initReadMore();

if (!window.location.pathname.includes('project-detail.html')) {
  renderProjectCards();
  initTypingEffect();
  initHeroParticles();
  // Defer cursor to avoid layout thrash
  requestAnimationFrame(initCursor);
} else {
  loadProjectDetail();
  initBackNavigation();
}
