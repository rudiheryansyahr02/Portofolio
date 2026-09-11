const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const readMoreBtn = document.querySelector('#readMoreBtn');
const moreText = document.querySelector('#more');
const dots = document.querySelector('#dots');
const contactForm = document.querySelector('#contactForm');
const statusMessage = document.querySelector('#status');
const langToggle = document.querySelector('#langToggle');

const closeMenu = () => {
  if (!menuIcon || !navbar) return;
  navbar.classList.remove('active');
  menuIcon.classList.remove('bx-x');
  menuIcon.classList.add('bx-menu');
  menuIcon.setAttribute('aria-expanded', 'false');
  menuIcon.setAttribute('aria-label', 'Buka navigasi');
};

if (menuIcon && navbar) {
  menuIcon.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('active');
    menuIcon.classList.toggle('bx-x', isOpen);
    menuIcon.classList.toggle('bx-menu', !isOpen);
    menuIcon.setAttribute('aria-expanded', String(isOpen));
    menuIcon.setAttribute('aria-label', isOpen ? 'Tutup navigasi' : 'Buka navigasi');
  });

  navLinks.forEach((link) => link.addEventListener('click', closeMenu));
}

if (readMoreBtn && moreText && dots) {
  readMoreBtn.addEventListener('click', () => {
    const isExpanded = readMoreBtn.getAttribute('aria-expanded') === 'true';
    moreText.hidden = isExpanded;
    dots.hidden = !isExpanded;
    readMoreBtn.textContent = isExpanded
      ? readMoreLabels[currentLang].more
      : readMoreLabels[currentLang].less;
    readMoreBtn.setAttribute('aria-expanded', String(!isExpanded));
  });
}

const animateElements = document.querySelectorAll('.animate');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animateElements.forEach((element) => observer.observe(element));
} else {
  animateElements.forEach((element) => element.classList.add('active'));
}

/* ===== Sistem Bahasa (ID / EN) ===== */
const readMoreLabels = {
  id: { more: 'Baca Selengkapnya', less: 'Sembunyikan' },
  en: { more: 'Read More', less: 'Read Less' }
};

const statusText = {
  id: {
    empty: 'Mohon lengkapi nama, email, dan pesan.',
    redirect: 'Mengarahkan ke WhatsApp...'
  },
  en: {
    empty: 'Please fill in your name, email, and message.',
    redirect: 'Redirecting to WhatsApp...'
  }
};

const projectText = {
  id: {
    viewProject: 'Lihat Project',
    backToProjects: 'Kembali ke Project'
  },
  en: {
    viewProject: 'View Project',
    backToProjects: 'Back to Projects'
  }
};

let currentLang = localStorage.getItem('portfolioLang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-en]').forEach((el) => {
    const langText = el.getAttribute('data-' + lang);
    if (langText) el.textContent = langText;
    const ariaLang = el.getAttribute('data-aria-' + lang);
    if (ariaLang) el.setAttribute('aria-label', ariaLang);
  });

  document.querySelectorAll('[data-ph-en]').forEach((el) => {
    el.setAttribute('placeholder', el.getAttribute('data-ph-' + lang));
  });

  document.querySelectorAll('[data-aria-id]').forEach((el) => {
    el.setAttribute('aria-label', el.getAttribute('data-aria-' + lang));
  });

  if (langToggle) langToggle.textContent = lang === 'id' ? 'EN' : 'ID';
  localStorage.setItem('portfolioLang', lang);
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    applyLang(currentLang === 'id' ? 'en' : 'id');
  });
}

applyLang(currentLang);

/* ===== Form Contact -> WhatsApp ===== */
if (contactForm && statusMessage) {
  const waNumber = '62895605976398';

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = (data.get('from_name') || '').toString().trim();
    const email = (data.get('from_email') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const subject = (data.get('subject') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    if (!name || !email || !message) {
      statusMessage.textContent = statusText[currentLang].empty;
      statusMessage.className = 'status error';
      return;
    }

    const text =
      `Halo Rudi, saya ingin menghubungi Anda.\n\n` +
      `*Data Diri*\n` +
      `Nama: ${name}\n` +
      `Email: ${email}\n` +
      (phone ? `No. Telepon: ${phone}\n` : '') +
      (subject ? `Subjek: ${subject}\n` : '') +
      `\n*Pesan:*\n${message}`;

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

    statusMessage.textContent = statusText[currentLang].redirect;
    statusMessage.className = 'status success';
    window.open(waUrl, '_blank', 'noopener');
  });
}

/* ===== Project Data ===== */
const projects = [
  {
    id: 'guesthouse',
    category: 'Fullstack Development',
    title: 'Guest House As-Syifa',
     description: {
      id: 'Sistem booking Guest House yang terintegrasi untuk mengelola ketersediaan kamar, reservasi, pembayaran, verifikasi transaksi, data customer, hingga manajemen operasional melalui dashboard admin.',
      en: 'An integrated Guest House booking system designed to manage room availability, reservations, payments, transaction verification, customer data, and operational management through an admin dashboard.'
    },
    images: [
      'images/porto1 (1).webp',
      'images/porto1 (15).webp',
      'images/porto1 (9).webp',
      'images/porto1 (16).webp',
      'images/porto1 (13).webp',
      'images/porto1 (8).webp',
      'images/porto1 (7).webp',
      'images/porto1 (6).webp',
      'images/porto1 (4).webp',
      'images/porto1 (3).webp',
      'images/porto1 (2).webp',
      'images/porto1 (21).webp',
      'images/porto1 (10).webp',
      'images/porto1 (11).webp',
      'images/porto1 (19).webp',
      'images/porto1 (20).webp',
      'images/porto1 (17).webp',
      'images/porto1 (18).webp',
    ],
    tools: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Google OAuth', 'PhpSpreadsheet'],
    features: [
      'Online room booking',
      'Room availability calendar',
      'Room detail & photo gallery',
      'Customer management',
      'Google OAuth login',
      'Breakfast/additional service',
      'Booking summary',
      'Transfer bank payment',
      'Payment proof upload',
      'Payment verification',
      'Booking status management',
      'Room management',
      'Facility management',
      'Breakfast management',
      'Dashboard statistics',
      'Revenue monitoring',
      'Booking reports'
    ],
    link: ''
  },
  {
    id: 'santap',
    category: 'Fullstack Development',
    title: 'Santap.in',
    description: 'Website restoran interaktif yang dirancang untuk memberikan pengalaman pengguna yang lebih mudah dalam melihat menu dan informasi restoran. Proyek ini mengintegrasasikan frontend yang responsif dengan backend yang andal.',
    images: [
      'images/a2.webp',
      'images/porto1 (1).webp',
      'images/porto1 (2).webp'
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    features: [
      'Responsive website design',
      'Interactive menu display',
      'Restaurant information system',
      'Database integration'
    ],
    link: 'https://github.com/rudiheryansyahr02'
  },
  {
    id: 'brocass',
    category: 'Internet of Things',
    title: 'Brocass – Smart IoT Coop',
    description: 'Kandang pintar berbasis IoT yang mengotomatisasi pemeliharaan lingkungan broiler. Proyek ini memanfaatkan sensor dan aktuator untuk memantau serta mengontrol suhu, kelembaban, dan pencahayaan secara real-time.',
    images: [
      'images/a4.svg',
      'images/porto1 (3).webp',
      'images/porto1 (4).webp'
    ],
    tools: ['ESP32', 'Wemos D1', 'C++', 'Firebase', 'DHT22'],
    features: [
      'Real-time monitoring',
      'Automated environmental control',
      'Sensor data logging',
      'Mobile dashboard'
    ],
    link: 'https://github.com/rudiheryansyahr02'
  },
  {
    id: 'pkkmb',
    category: 'Video Editing',
    title: 'PKKMB 2023 – Video Highlight',
    description: 'Dokumentasi video highlight kegiatan PKKMB 2023. Proyek ini menggabungkan momen-momen terbaik acara menjadi satu cerita visual yang menarik dengan editing yang dinamis.',
    images: [
      'images/a5.svg',
      'images/3 (1).webp',
      'images/3 (2).webp'
    ],
    tools: ['CapCut', 'Adobe Premiere', 'After Effects'],
    features: [
      'Dynamic transitions',
      'Color grading',
      'Audio synchronization',
      'Motion graphics'
    ],
    link: ''
  },
  {
    id: 'msib',
    category: 'Graphic Design',
    title: 'MSIB Indobot – Digital Design',
    description: 'Karya desain digital yang dihasilkan selama program MSIB Indobot 2024. Proyek ini mencakup desain poster, banner, dan konten media sosial dengan sentuhan modern dan berkarakter.',
    images: [
      'images/a6.svg',
      'images/porto1 (5).webp',
      'images/porto1 (6).webp'
    ],
    tools: ['Canva', 'Figma', 'Adobe Photoshop'],
    features: [
      'Poster design',
      'Social media content',
      'Brand identity',
      'Print-ready assets'
    ],
    link: 'https://github.com/rudiheryansyahr02'
  },
  {
    id: 'caffera',
    category: 'Web Development',
    title: 'Cafféra – Coffee Shop Profile',
    description: 'Profil digital coffee shop Cafféra yang menampilkan menu, galeri, dan informasi kontak secara elegan. Fokus pada presentasi visual yang menarik dan pengalaman pengguna yang nyaman.',
    images: [
      'images/a1.webp',
      'images/porto1 (7).webp',
      'images/porto1 (8).webp'
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    features: [
      'Responsive layout',
      'Menu showcase',
      'Gallery section',
      'Contact integration'
    ],
    link: 'https://github.com/rudiheryansyahr02'
  },
  {
    id: 'trendora',
    category: 'E-Commerce',
    title: 'Trendora – Fashion Online Store',
    description: 'Toko online fashion dengan katalog produk yang responsif. Fitur utama meliputi filter kategori, pencarian produk, dan keranjang belanja yang intuitif.',
    images: [
      'images/a3.webp',
      'images/porto1 (9).webp',
      'images/porto1 (10).webp'
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    features: [
      'Product catalog',
      'Category filtering',
      'Shopping cart',
      'Admin dashboard'
    ],
    link: 'https://github.com/rudiheryansyahr02'
  }
];

/* ===== Render Project Cards ===== */
function renderProjectCards() {
  const container = document.querySelector('#hardSkillsContainer');
  if (!container) return;

  container.innerHTML = '';

  projects.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'project-card animate';
    card.setAttribute('data-project-id', project.id);

    const imagesHtml = project.images
      .map((img, i) => `<img src="${img}" alt="${project.title} - Image ${i + 1}" loading="lazy">`)
      .join('');

    const toolsHtml = project.tools
      .map((tool) => `<span class="tool-chip">${tool}</span>`)
      .join('');

    card.innerHTML = `
      <div class="project-slider" data-slider-index="${index}">
        <div class="project-slider-track">${imagesHtml}</div>
        <button class="slider-btn slider-prev" data-aria-id="Gambar sebelumnya" data-aria-en="Previous image">
          <i class='bx bx-chevron-left'></i>
        </button>
        <button class="slider-btn slider-next" data-aria-id="Gambar berikutnya" data-aria-en="Next image">
          <i class='bx bx-chevron-right'></i>
        </button>
        <div class="slider-dots"></div>
      </div>
      <div class="project-content">
        <span class="project-badge">${project.category}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tools">${toolsHtml}</div>
        <a href="project-detail.html?project=${project.id}" class="btn project-btn">
          <span data-id="Lihat Project" data-en="View Project">${projectText[currentLang].viewProject}</span> <i class='bx bx-arrow-right'></i>
        </a>
      </div>
    `;

    container.appendChild(card);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      observer.observe(card);
    } else {
      card.classList.add('active');
    }
  });

  initSliders();
}

/* ===== Slider Logic ===== */
function initSliders() {
  const sliders = document.querySelectorAll('.project-slider');
  sliders.forEach((slider) => {
    const track = slider.querySelector('.project-slider-track');
    const slides = track.querySelectorAll('img');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    const dotsContainer = slider.querySelector('.slider-dots');
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayInterval;

    const updateSlider = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    };

    const goTo = (index) => {
      currentIndex = (index + totalSlides) % totalSlides;
      updateSlider();
    };

    const next = () => goTo(currentIndex + 1);
    const prev = () => goTo(currentIndex - 1);

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('data-aria-id', `Ke slide ${i + 1}`);
      dot.setAttribute('data-aria-en', `Go to slide ${i + 1}`);
      dot.setAttribute('aria-label', `${currentLang === 'id' ? 'Ke slide' : 'Go to slide'} ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? next() : prev();
      }
    });

    // Keyboard navigation
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });

    // Autoplay
    const startAutoplay = () => {
      autoplayInterval = setInterval(next, 5000);
    };
    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
    };

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('touchstart', stopAutoplay, { passive: true });
    slider.addEventListener('touchend', startAutoplay);

    startAutoplay();
  });
}

/* ===== Project Detail Page Logic ===== */
function loadProjectDetail() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('project');
  if (!projectId) return;

  const project = projects.find((p) => p.id === projectId);
  if (!project) return;

  const detailTitle = document.querySelector('.project-detail-title');
  const detailCategory = document.querySelector('.project-detail-category');
  const detailDescription = document.querySelector('.project-detail-description');
  const detailTools = document.querySelector('.project-detail-tools');
  const detailFeatures = document.querySelector('.project-detail-features');
  const detailSlider = document.querySelector('.project-detail-slider');
  const detailGallery = document.querySelector('.project-detail-gallery');
  const detailLink = document.querySelector('.project-detail-link');

  if (detailTitle) detailTitle.textContent = project.title;
  if (detailCategory) detailCategory.textContent = project.category;
  if (detailDescription) detailDescription.textContent = project.description;

  if (detailTools) {
    detailTools.innerHTML = project.tools.map((tool) => `<span class="tool-chip">${tool}</span>`).join('');
  }

  if (detailFeatures) {
    detailFeatures.innerHTML = project.features.map((f) => `<li>${f}</li>`).join('');
  }

  if (detailSlider) {
    const track = detailSlider.querySelector('.project-slider-track');
    const dotsContainer = detailSlider.querySelector('.slider-dots');
    if (track) {
      track.innerHTML = project.images.map((img, i) => `<img src="${img}" alt="${project.title} - Image ${i + 1}">`).join('');
    }
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      project.images.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
          dot.setAttribute('data-aria-id', `Ke slide ${i + 1}`);
          dot.setAttribute('data-aria-en', `Go to slide ${i + 1}`);
          dot.setAttribute('aria-label', `${currentLang === 'id' ? 'Ke slide' : 'Go to slide'} ${i + 1}`);
        dot.addEventListener('click', () => goToDetailSlide(i));
        dotsContainer.appendChild(dot);
      });
    }
    initDetailSlider();
  }

  if (detailGallery) {
    detailGallery.innerHTML = project.images.map((img) => `<img src="${img}" alt="${project.title}" loading="lazy">`).join('');
  }

  if (detailLink) {
    if (project.link) {
      detailLink.href = project.link;
      detailLink.style.display = 'inline-block';
    } else {
      detailLink.style.display = 'none';
    }
  }
}

let detailCurrentIndex = 0;
let detailTotalSlides = 0;

function initDetailSlider() {
  const track = document.querySelector('.project-detail-slider .project-slider-track');
  const slides = track ? track.querySelectorAll('img') : [];
  const prevBtn = document.querySelector('.project-detail-slider .slider-prev');
  const nextBtn = document.querySelector('.project-detail-slider .slider-next');
  const dots = document.querySelectorAll('.project-detail-slider .dot');
  detailTotalSlides = slides.length;

  const updateDetailSlider = () => {
    if (track) track.style.transform = `translateX(-${detailCurrentIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === detailCurrentIndex));
  };

  window.goToDetailSlide = (index) => {
    detailCurrentIndex = (index + detailTotalSlides) % detailTotalSlides;
    updateDetailSlider();
  };

  if (prevBtn) prevBtn.addEventListener('click', () => window.goToDetailSlide(detailCurrentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => window.goToDetailSlide(detailCurrentIndex + 1));

  if (window.location.pathname.includes('project-detail.html')) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') window.goToDetailSlide(detailCurrentIndex - 1);
      if (e.key === 'ArrowRight') window.goToDetailSlide(detailCurrentIndex + 1);
    });
  }
}

/* ===== Init ===== */
if (!window.location.pathname.includes('project-detail.html')) {
  renderProjectCards();
}
loadProjectDetail();
