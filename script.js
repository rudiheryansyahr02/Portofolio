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

function getLocalizedText(value) {
  if (typeof value === 'object' && value !== null) {
    return value[currentLang] || value.id || value.en || '';
  }
  return value || '';
}

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-id]').forEach((el) => {
    const langText = el.getAttribute('data-' + lang);
    if (langText) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.value = langText;
      } else {
        el.textContent = langText;
      }
    }
    const ariaLang = el.getAttribute('data-aria-' + lang);
    if (ariaLang) el.setAttribute('aria-label', ariaLang);
  });

  document.querySelectorAll('[data-ph-id]').forEach((el) => {
    el.setAttribute('placeholder', el.getAttribute('data-ph-' + lang));
  });

  document.querySelectorAll('[data-aria-id]').forEach((el) => {
    el.setAttribute('aria-label', el.getAttribute('data-aria-' + lang));
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
  langToggle.addEventListener('click', () => {
    applyLang(currentLang === 'id' ? 'en' : 'id');
  });
}

/* ===== Project Data ===== */
const projects = [
  {
    id: 'guesthouse',
    category: {
      id: 'Fullstack Development',
      en: 'Fullstack Development'
    },
    title: 'Guest House As-Syifa',
    description: {
      id: 'Guest House As-Syifa merupakan sistem booking penginapan berbasis web yang dikembangkan untuk mempermudah proses reservasi kamar secara online sekaligus membantu pengelola dalam mengelola operasional guest house. Sistem mencakup informasi kamar, ketersediaan kamar, proses booking, pembayaran melalui transfer bank, upload bukti pembayaran, verifikasi pembayaran, serta pengelolaan data customer.',
      en: 'Guest House As-Syifa is a web-based accommodation booking system developed to simplify online room reservations while helping administrators manage guest house operations. The system includes room information, room availability, booking management, bank transfer payments, payment proof uploads, payment verification, and customer data management.'
    },
    overview: {
      id: 'Pada sisi admin, sistem menyediakan dashboard untuk mengelola kamar, lokasi, fasilitas, foto kamar, harga periode, menu sarapan, data booking, pembayaran, serta laporan transaksi. Sistem juga dilengkapi dengan fitur monitoring pendapatan dan rekap data booking untuk membantu proses pengelolaan operasional.',
      en: 'On the administrative side, the system provides a dashboard for managing rooms, locations, facilities, room photos, seasonal pricing, breakfast options, bookings, payments, and transaction reports. The system also includes revenue monitoring and booking summaries to support day-to-day operational management.'
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
    features: {
      id: [
        'Booking kamar secara online',
        'Kalender ketersediaan kamar',
        'Detail kamar & galeri foto',
        'Manajemen customer',
        'Login Google OAuth',
        'Layanan sarapan/tambahan',
        'Ringkasan booking',
        'Pembayaran melalui transfer bank',
        'Upload bukti pembayaran',
        'Verifikasi pembayaran',
        'Manajemen status booking',
        'Manajemen kamar',
        'Manajemen fasilitas',
        'Manajemen sarapan',
        'Statistik dashboard',
        'Monitoring pendapatan',
        'Laporan booking'
      ],
      en: [
        'Online room booking',
        'Room availability calendar',
        'Room details & photo gallery',
        'Customer management',
        'Google OAuth login',
        'Breakfast/additional services',
        'Booking summary',
        'Bank transfer payment',
        'Payment proof upload',
        'Payment verification',
        'Booking status management',
        'Room management',
        'Facility management',
        'Breakfast management',
        'Dashboard statistics',
        'Revenue monitoring',
        'Booking reports'
      ]
    },
    link: ''
  },
  {
    id: 'santap',
    category: {
      id: 'Fullstack Development',
      en: 'Fullstack Development'
    },
    title: 'Santap.in',
    description: {
      id: 'Santap.in merupakan website restoran interaktif yang dirancang untuk memberikan pengalaman pengguna yang lebih mudah dalam melihat informasi restoran, menu, kategori makanan, dan detail produk. Website menggunakan desain responsif agar dapat memberikan pengalaman yang nyaman pada berbagai perangkat.',
      en: 'Santap.in is an interactive restaurant website designed to provide users with an easier way to explore restaurant information, menus, food categories, and product details. The website uses a responsive design to provide a comfortable experience across different devices.'
    },
    overview: {
      id: 'Project ini berfokus pada penyajian informasi restoran secara modern dan terstruktur dengan menggabungkan frontend yang responsif dengan sistem backend yang mendukung pengelolaan data. Antarmuka dirancang agar pengguna dapat menemukan informasi menu dengan cepat dan mudah.',
      en: 'The project focuses on presenting restaurant information in a modern and structured way by combining a responsive frontend with a backend system that supports data management. The interface is designed to help users discover menu information quickly and easily.'
    },
    images: [
      'images/a2.webp',
      'images/porto1 (1).webp',
      'images/porto1 (2).webp'
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    features: {
      id: [
        'Desain website responsif',
        'Tampilan menu interaktif',
        'Sistem informasi restoran',
        'Integrasi database'
      ],
      en: [
        'Responsive website design',
        'Interactive menu display',
        'Restaurant information system',
        'Database integration'
      ]
    },
    link: 'https://github.com/rudiheryansyahr02'
  },
  {
    id: 'brocass',
    category: {
      id: 'Internet of Things',
      en: 'Internet of Things'
    },
    title: 'Brocass – Smart IoT Coop',
    description: {
      id: 'Brocass – Smart IoT Coop merupakan sistem kandang ayam broiler berbasis Internet of Things yang dirancang untuk membantu melakukan pemantauan dan pengendalian kondisi lingkungan kandang secara real-time. Sistem memanfaatkan sensor dan aktuator untuk memantau parameter lingkungan serta membantu mengotomatisasi proses pengendalian sesuai kondisi yang terdeteksi.',
      en: 'Brocass – Smart IoT Coop is an Internet of Things-based broiler coop system designed to monitor and control environmental conditions in real time. The system uses sensors and actuators to monitor environmental parameters and support automated control based on detected conditions.'
    },
    overview: {
      id: 'Sistem ini dirancang untuk membantu peternak mengelola kandang dengan lebih efisien melalui pemantauan suhu, kelembaban, dan pencahayaan secara otomatis. Data sensor dikirim ke Firebase untuk monitoring real-time melalui dashboard mobile.',
      en: 'The system is designed to help farmers manage coops more efficiently through automated monitoring of temperature, humidity, and lighting. Sensor data is sent to Firebase for real-time monitoring via a mobile dashboard.'
    },
    images: [
      'images/a4.svg',
      'images/porto1 (3).webp',
      'images/porto1 (4).webp'
    ],
    tools: ['ESP32', 'Wemos D1', 'C++', 'Firebase', 'DHT22'],
    features: {
      id: [
        'Pemantauan real-time',
        'Kontrol lingkungan otomatis',
        'Pencatatan data sensor',
        'Dashboard mobile'
      ],
      en: [
        'Real-time monitoring',
        'Automated environmental control',
        'Sensor data logging',
        'Mobile dashboard'
      ]
    },
    link: 'https://github.com/rudiheryansyahr02'
  },
  {
    id: 'pkkmb',
    category: {
      id: 'Video Editing',
      en: 'Video Editing'
    },
    title: 'PKKMB 2023 – Video Highlight',
    description: {
      id: 'PKKMB 2023 – Video Highlight merupakan proyek editing video yang mengolah dokumentasi kegiatan PKKMB 2023 menjadi sebuah video highlight yang lebih menarik dan komunikatif. Proyek ini berfokus pada penyusunan alur visual, transisi, sinkronisasi audio, serta pengolahan visual untuk menyampaikan suasana dan momen utama kegiatan.',
      en: 'PKKMB 2023 – Video Highlight is a video editing project that transforms documentation from the 2023 student orientation program into an engaging and communicative highlight video. The project focuses on visual storytelling, transitions, audio synchronization, and visual enhancement to present the atmosphere and key moments of the event.'
    },
    overview: {
      id: 'Video ini menggabungkan momen-momen terbaik acara menjadi satu cerita visual yang menarik dengan editing yang dinamis, mencakup transisi halus, color grading, serta sinkronisasi audio untuk menciptakan suasana yang imersif bagi penonton.',
      en: 'The video combines the best moments of the event into an engaging visual story with dynamic editing, including smooth transitions, color grading, and audio synchronization to create an immersive atmosphere for viewers.'
    },
    images: [
      'images/a5.svg',
      'images/3 (1).webp',
      'images/3 (2).webp'
    ],
    tools: ['CapCut', 'Adobe Premiere', 'After Effects'],
    features: {
      id: [
        'Transisi dinamis',
        'Color grading',
        'Sinkronisasi audio',
        'Motion graphics'
      ],
      en: [
        'Dynamic transitions',
        'Color grading',
        'Audio synchronization',
        'Motion graphics'
      ]
    },
    link: ''
  },
  {
    id: 'msib',
    category: {
      id: 'Graphic Design',
      en: 'Graphic Design'
    },
    title: 'MSIB Indobot – Digital Design',
    description: {
      id: 'MSIB Indobot – Digital Design merupakan kumpulan karya desain digital yang dibuat selama mengikuti program MSIB Indobot. Proyek ini mencakup pembuatan berbagai kebutuhan visual seperti poster, banner, dan konten media sosial dengan memperhatikan komposisi, identitas visual, serta kebutuhan komunikasi digital.',
      en: 'MSIB Indobot – Digital Design is a collection of digital design works created during the MSIB Indobot program. The project includes various visual assets such as posters, banners, and social media content, focusing on composition, visual identity, and digital communication needs.'
    },
    overview: {
      id: 'Karya-karya desain ini dibuat dengan sentuhan modern dan berkarakter, mencakup desain poster untuk promosi, banner untuk kebutuhan acara, serta konten media sosial yang konsisten dengan brand guidelines program MSIB Indobot.',
      en: 'The design works feature a modern and distinctive touch, including promotional posters, event banners, and consistent social media content aligned with the MSIB Indobot program brand guidelines.'
    },
    images: [
      'images/a6.svg',
      'images/porto1 (5).webp',
      'images/porto1 (6).webp'
    ],
    tools: ['Canva', 'Figma', 'Adobe Photoshop'],
    features: {
      id: [
        'Desain poster',
        'Konten media sosial',
        'Identitas brand',
        'Aset siap cetak'
      ],
      en: [
        'Poster design',
        'Social media content',
        'Brand identity',
        'Print-ready assets'
      ]
    },
    link: 'https://github.com/rudiheryansyahr02'
  },
  {
    id: 'caffera',
    category: {
      id: 'Web Development',
      en: 'Web Development'
    },
    title: 'Cafféra – Coffee Shop Profile',
    description: {
      id: 'Cafféra – Coffee Shop Profile merupakan website profil coffee shop yang dirancang untuk menampilkan informasi bisnis secara modern dan menarik. Website menyediakan informasi menu, galeri, serta informasi kontak dengan layout responsif yang berfokus pada kenyamanan pengguna dan penyajian visual.',
      en: 'Cafféra – Coffee Shop Profile is a coffee shop profile website designed to present business information in a modern and engaging way. The website provides menu information, a gallery, and contact details through a responsive layout focused on user experience and visual presentation.'
    },
    overview: {
      id: 'Website ini dibangun dengan fokus pada presentasi visual yang elegan dan pengalaman pengguna yang nyaman. Layout responsif memastikan tampilan optimal di berbagai perangkat, mulai dari desktop hingga mobile.',
      en: 'The website is built with a focus on elegant visual presentation and comfortable user experience. The responsive layout ensures optimal display across various devices, from desktop to mobile.'
    },
    images: [
      'images/a1.webp',
      'images/porto1 (7).webp',
      'images/porto1 (8).webp'
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    features: {
      id: [
        'Layout responsif',
        'Showcase menu',
        'Bagian galeri',
        'Integrasi kontak'
      ],
      en: [
        'Responsive layout',
        'Menu showcase',
        'Gallery section',
        'Contact integration'
      ]
    },
    link: 'https://github.com/rudiheryansyahr02'
  },
  {
    id: 'trendora',
    category: {
      id: 'E-Commerce',
      en: 'E-Commerce'
    },
    title: 'Trendora – Fashion Online Store',
    description: {
      id: 'Trendora – Fashion Online Store merupakan website e-commerce fashion yang dirancang untuk menampilkan katalog produk secara responsif dan interaktif. Sistem menyediakan fitur seperti katalog produk, pencarian, filter kategori, keranjang belanja, serta dashboard untuk mendukung pengelolaan data toko.',
      en: 'Trendora – Fashion Online Store is a responsive and interactive fashion e-commerce website designed to showcase product catalogs. The system provides features such as product catalogs, search, category filtering, shopping cart functionality, and an admin dashboard to support store data management.'
    },
    overview: {
      id: 'Toko online ini menyediakan pengalaman belanja yang intuitif dengan fitur pencarian produk, filter kategori, dan keranjang belanja yang mudah digunakan. Dashboard admin memungkinkan pengelolaan produk, pesanan, dan data toko secara terpusat.',
      en: 'This online store provides an intuitive shopping experience with product search, category filtering, and an easy-to-use shopping cart. The admin dashboard enables centralized management of products, orders, and store data.'
    },
    images: [
      'images/a3.webp',
      'images/porto1 (9).webp',
      'images/porto1 (10).webp'
    ],
    tools: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    features: {
      id: [
        'Katalog produk',
        'Filter kategori',
        'Keranjang belanja',
        'Dashboard admin'
      ],
      en: [
        'Product catalog',
        'Category filtering',
        'Shopping cart',
        'Admin dashboard'
      ]
    },
    link: 'https://github.com/rudiheryansyahr02'
  }
];

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

    const category = getLocalizedText(project.category);
    const description = getLocalizedText(project.description);

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
        <span class="project-badge">${category}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${description}</p>
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
  const backProjects = document.querySelector('.back-projects span');

  if (detailTitle) detailTitle.textContent = project.title;
  if (detailCategory) detailCategory.textContent = getLocalizedText(project.category);
  if (detailDescription) detailDescription.textContent = getLocalizedText(project.description);

  if (backProjects) {
    backProjects.textContent = projectText[currentLang].backToProjects;
  }

  if (detailTools) {
    detailTools.innerHTML = project.tools.map((tool) => `<span class="tool-chip">${tool}</span>`).join('');
  }

  if (detailFeatures) {
    const features = project.features[currentLang] || [];
    detailFeatures.innerHTML = features.map((f) => `<li>${f}</li>`).join('');
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

  // Update section headings
  const overviewHeading = document.querySelector('.project-detail-section h2[data-id="Ringkasan Project"]');
  const toolsHeading = document.querySelector('.project-detail-section h2[data-id="Tools & Teknologi"]');
  const featuresHeading = document.querySelector('.project-detail-section h2[data-id="Fitur Utama"]');
  const galleryHeading = document.querySelector('.project-detail-section h2[data-id="Galeri Project"]');
  const visitLink = document.querySelector('.project-detail-link');

  if (overviewHeading) overviewHeading.textContent = currentLang === 'id' ? 'Ringkasan Project' : 'Project Overview';
  if (toolsHeading) toolsHeading.textContent = currentLang === 'id' ? 'Tools & Teknologi' : 'Tools & Technologies';
  if (featuresHeading) featuresHeading.textContent = currentLang === 'id' ? 'Fitur Utama' : 'Key Features';
  if (galleryHeading) galleryHeading.textContent = currentLang === 'id' ? 'Galeri Project' : 'Project Gallery';
  if (visitLink) visitLink.textContent = currentLang === 'id' ? 'Kunjungi Project' : 'Visit Project';
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