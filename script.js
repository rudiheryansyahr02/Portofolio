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
    viewProject: 'Views Project',
    backToProjects: 'Back to Projects'
  }
};

let currentLang = localStorage.getItem('portfolioLang') || 'en';

/* ===== Project Detail Slider State ===== */
let detailCurrentIndex = 0;
let detailTotalSlides = 0;
let detailCleanup = null;

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
    shortDescription: {
      id: 'Guest House As-Syifa adalah sistem booking penginapan berbasis web yang saya kembangkan untuk mempermudah reservasi kamar online dan manajemen operasional guest house.',
      en: 'Guest House As-Syifa is a web-based accommodation booking system I developed to simplify online room reservations and guest house operations management.'
    },
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
      ],
      gallery: [
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
    },
   
  },
  {
    id: 'santap',
    category: {
      id: 'Fullstack Development',
      en: 'Fullstack Development'
    },
    title: 'Santap.in',
    shortDescription: {
      id: 'Santap.in adalah website restoran interaktif yang saya kembangkan dengan desain responsif untuk menampilkan menu, kategori makanan, dan informasi produk secara mudah diakses.',
      en: 'Santap.in is an interactive restaurant website I built with responsive design to showcase menus, food categories, and product details across devices.'
    },
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
    shortDescription: {
      id: 'Brocass adalah sistem IoT untuk pemantauan dan kendali lingkungan kandang ayam broiler secara real-time menggunakan sensor suhu, kelembaban, dan pencahayaan.',
      en: 'Brocass is an IoT system for real-time monitoring and control of broiler coop environment using temperature, humidity, and lighting sensors.'
    },
    description: {
      id: 'Brocass – Smart IoT Coop merupakan sistem kandang ayam broiler berbasis Internet of Things yang dirancang untuk membantu melakukan pemantauan dan pengendalian kondisi lingkungan kandang secara real-time. Sistem memanfaatkan sensor dan aktuator untuk memantau parameter lingkungan serta membantu mengotomatisasi proses pengendalian sesuai kondisi yang terdeteksi.',
      en: 'Brocass – Smart IoT Coop is an Internet of Things-based broiler coop system designed to monitor and control environmental conditions in real time. The system uses sensors and actuators to monitor environmental parameters and support automated control based on detected conditions.'
    },
    overview: {
      id: 'Sistem ini dirancang untuk membantu peternak mengelola kandang dengan lebih efisien melalui pemantauan suhu, kelembaban, dan pencahayaan secara otomatis. Data sensor dikirim ke Firebase untuk monitoring real-time melalui dashboard mobile.',
      en: 'The system is designed to help farmers manage coops more efficiently through automated monitoring of temperature, humidity, and lighting. Sensor data is sent to Firebase for real-time monitoring via a mobile dashboard.'
    },
    images: [
      'images/iot1.webp',
      'images/iot2.webp',
      'images/iot3.webp'
    ],
    tools: [
      'ESP32',
      'Wemos D1 R2',
      'C++',
      'Firebase Realtime Database',
      'DHT22',
      'MQ-135',
      'Water Level Sensor',
      'Relay Module 8ch',
      'DC Fan',
      'Servo Motor',
      'Heating Lamp',
      'DC-DC Buck Converter',
      'Arduino IDE'
    ],
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
      id: 'Graphic Design',
      en: 'Graphic Design'
    },
    title: 'Team Creative PKKMB 2023',
    shortDescription: {
      id: 'Saya bergabung di Team Creative PKKMB 2023 sebagai desainer visual yang merancang materi publikasi, konten media sosial, poster, dan identitas visual event.',
      en: 'I joined Team Creative PKKMB 2023 as a visual designer creating publication materials, social media content, posters, and event visual identity.'
    },
    description: {
      id: 'Saya bergabung di Team Creative PKKMB 2023 sebagai anggota tim kreatif yang merancang kebutuhan visual acara:\n\n• Mendesain materi publikasi, konten media sosial, poster, dan informasi acara\n• Membangun identitas visual konsisten untuk event berskala besar\n• Bekerja kolaboratif dalam tim: diskusi konsep, iterasi desain, penyelesaian tepat waktu\n\nPengalaman ini melatih saya menerjemahkan kebutuhan event ke konsep visual, komunikasi visual, teamwork, dan creative problem solving.',
      en: 'I joined Team Creative PKKMB 2023 as a creative team member designing visual assets for a large-scale event:\n\n• Designed publication materials, social media content, posters, and event information\n• Built a consistent visual identity for the event\n• Collaborated in a team: concept discussions, design iterations, on-time delivery\n\nThis experience sharpened my skills in translating event needs into visual concepts, visual communication, teamwork, and creative problem solving.'
    },
    overview: {
      id: 'Peran: Anggota Team Creative\n\nKontribusi:\n• Graphic Design, Visual Design, Social Media Design\n• Publication Materials, Poster & Promotional Design\n• Information Design, Visual Assets Creation\n• Creative Collaboration & Teamwork\n\nPembelajaran: Desain event bukan sekadar estetika—visual harus menyampaikan informasi jelas, identitas konsisten, fleksibel untuk berbagai kebutuhan. Bekerja dalam tim melatih berdiskusi, menerima masukan, adaptasi ide, dan menyelesaikan pekerjaan bersama.',
      en: 'Role: Creative Team Member\n\nContributions:\n• Graphic Design, Visual Design, Social Media Design\n• Publication Materials, Poster & Promotional Design\n• Information Design, Visual Assets Creation\n• Creative Collaboration & Teamwork\n\nLearning: Event design isn\'t just aesthetics—visuals must communicate clearly, maintain consistent identity, and adapt to varied needs. Teamwork trained me to discuss, receive feedback, adapt ideas, and deliver together.'
    },
    images: [
      'images/pkkmb (3).webp',
      'images/pkkmb (2).webp',
      'images/pkkmb (1).webp',
      'images/3 (1).webp',
      'images/3 (2).webp',
      'images/3 (3).webp',
    ],
    tools: ['Canva', 'Adobe Photoshop', 'Figma'],
    features: {
      id: [
        'Graphic Design',
        'Visual Design',
        'Social Media Design',
        'Publication Materials',
        'Poster & Promotional Design',
        'Information & Announcement Design',
        'Visual Assets Creation',
        'Creative Collaboration',
        'Teamwork',
        'Visual Communication'
      ],
      en: [
        'Graphic Design',
        'Visual Design',
        'Social Media Design',
        'Publication Materials',
        'Poster & Promotional Design',
        'Information & Announcement Design',
        'Visual Assets Creation',
        'Creative Collaboration',
        'Teamwork',
        'Visual Communication'
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
    shortDescription: {
      id: 'Kumpulan karya desain digital (poster, banner, konten media sosial) yang saya buat selama program MSIB Indobot dengan fokus komposisi dan identitas visual.',
      en: 'A collection of digital design works (posters, banners, social media content) I created during the MSIB Indobot program, focusing on composition and visual identity.'
    },
    description: {
      id: 'MSIB Indobot – Digital Design merupakan kumpulan karya desain digital yang dibuat selama mengikuti program MSIB Indobot. Proyek ini mencakup pembuatan berbagai kebutuhan visual seperti poster, banner, dan konten media sosial dengan memperhatikan komposisi, identitas visual, serta kebutuhan komunikasi digital.',
      en: 'MSIB Indobot – Digital Design is a collection of digital design works created during the MSIB Indobot program. The project includes various visual assets such as posters, banners, and social media content, focusing on composition, visual identity, and digital communication needs.'
    },
    overview: {
      id: 'Karya-karya desain ini dibuat dengan sentuhan modern dan berkarakter, mencakup desain poster untuk promosi, banner untuk kebutuhan acara, serta konten media sosial yang konsisten dengan brand guidelines program MSIB Indobot.',
      en: 'The design works feature a modern and distinctive touch, including promotional posters, event banners, and consistent social media content aligned with the MSIB Indobot program brand guidelines.'
    },
    images: [
      'images/msib1.webp',
      'images/msib2 (1).webp',
      'images/msib2 (2).webp',
      'images/msib2 (3).webp',
      'images/a6.svg'
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
    shortDescription: {
      id: 'Cafféra adalah website profil coffee shop yang saya bangun dengan layout responsif untuk menampilkan menu, galeri, dan informasi kontak secara visual menarik.',
      en: 'Cafféra is a coffee shop profile website I built with responsive layout to showcase menu, gallery, and contact info in a visually appealing way.'
    },
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
    id: 'syifamart',
    category: {
      id: 'Web Development',
      en: 'Web Development'
    },
    title: 'SIM Syifamart',
    shortDescription: {
      id: 'SIM Syifamart merupakan project web development yang saya kembangkan melalui berbagai improvement dan pengembangan fitur berdasarkan kebutuhan operasional sistem yang terus berkembang.',
      en: 'SIM Syifamart is a web development project that I continuously improved and developed based on evolving operational requirements.'
    },
    description: {
      id: 'SIM Syifamart adalah salah satu project web development yang saya kembangkan dan lakukan improvement secara bertahap selama sistem digunakan dalam operasional. Saya tidak hanya berfokus pada pembuatan fitur baru, tetapi juga melakukan evaluasi terhadap sistem yang sudah berjalan, memperbaiki data dan proses yang belum akurat, serta menyesuaikan sistem berdasarkan kebutuhan operasional yang terus berkembang.\n\nSalah satu pengembangan yang saya lakukan adalah memperbaiki beberapa data dan proses yang sebelumnya belum berjalan secara akurat agar informasi yang ditampilkan oleh sistem dapat lebih sesuai dengan kondisi sebenarnya. Saya juga mengembangkan modul transaksi deposit untuk mendukung kebutuhan transaksi pengguna secara lebih terstruktur.\n\nSelain itu, saya mengembangkan fitur validasi dan filterisasi produk makanan dan minuman berdasarkan informasi kandungan tertentu, seperti kadar gula dan natrium. Fitur ini dibuat untuk membantu memberikan perhatian lebih terhadap produk yang dikonsumsi oleh siswa dan mendukung proses pemilihan produk yang lebih sesuai dengan kebutuhan kesehatan mereka.\n\nDalam proses pengembangan SIM Syifamart, saya juga terlibat dalam berbagai improvement lain, mulai dari modul transaksi, pengelolaan data, validasi, reporting, penyempurnaan alur sistem, hingga penyesuaian fitur berdasarkan kebutuhan yang muncul selama sistem digunakan.\n\nBagi saya, project ini menjadi pengalaman penting karena saya belajar bahwa web development tidak berhenti ketika sistem berhasil dibuat. Sistem yang sudah berjalan tetap membutuhkan maintenance, evaluasi, debugging, improvement, dan pengembangan berkelanjutan agar tetap relevan dengan kebutuhan pengguna dan operasional.',
      en: 'SIM Syifamart is one of my web development projects where I was involved in continuously improving and developing an existing system based on real operational needs. My work was not limited to building new features, but also included evaluating existing processes, correcting inaccurate data, improving system workflows, and adapting the application as new requirements emerged.\n\nOne of the improvements I worked on was correcting several data and processes that were not yet accurate, ensuring that the information presented by the system was more consistent with actual operational conditions. I also developed a deposit transaction module to support a more structured and manageable transaction process for users.\n\nAnother development I worked on was a product validation and filtering feature based on specific nutritional information, such as sugar and sodium levels. This feature was designed to help provide greater awareness of food and beverage products consumed by students and support a more health-conscious product selection process.\n\nThroughout the development of SIM Syifamart, I also worked on various other improvements, including transaction modules, data management, validation, reporting, system workflows, and feature adjustments based on requirements discovered during the system operation.\n\nFor me, this project became an important web development experience because it taught me that development does not end when a system is launched. A running system requires continuous maintenance, debugging, evaluation, improvement, and adaptation to remain useful and aligned with real-world operational needs.'
    },
    overview: {
      id: 'Peran: Software Developer\n\nKontribusi (What I Worked On):\n• System Improvement — improvement terhadap sistem yang sudah berjalan\n• Data Correction & Validation — memperbaiki data tidak akurat & meningkatkan validasi\n• Deposit Transaction Module — mengembangkan modul transaksi deposit\n• Product Health Filter — validasi/filter produk berdasarkan gula & natrium\n• Transaction Management — pengembangan & penyempurnaan proses transaksi\n• Reporting & Monitoring — pengembangan fitur reporting\n• Bug Fixing & Debugging — menangani masalah saat sistem digunakan\n• System Maintenance — maintenance & improvement berkelanjutan\n• Operational Adaptation — menyesuaikan fitur dengan kebutuhan operasional\n\nDevelopment Process:\nAnalyze → Identify Problems → Develop → Test → Improve → Maintain\n\nSaya memulai dengan memahami permasalahan sistem/kebutuhan baru, menganalisis alur existing, menentukan bagian yang diperbaiki/dikembangkan, implementasi, testing, lalu penyesuaian berdasarkan penggunaan lapangan.\n\nKey Features / Development:\n• Deposit Transaction — modul transaksi deposit untuk pengelolaan saldo\n• Product Health Filter — filter produk berdasarkan gula & natrium\n• Transaction Management — proses transaksi dari pemilihan produk hingga status\n• Order Management — pengelolaan order: pending, pembayaran, pengemasan, pengiriman, selesai\n• Reporting & Monitoring — monitoring aktivitas transaksi & operasional\n• Continuous Improvement — pengembangan berkelanjutan berdasarkan kebutuhan & masalah yang ditemukan\n\nWhat I Learned:\nProject ini mengajarkan saya bahwa software developer bukan hanya membuat fitur bekerja, tapi memahami permasalahan nyata setelah sistem digunakan. Saya belajar lebih teliti kelola data, pahami alur bisnis, cari akar masalah, debugging, dan kembangkan solusi bernilai. Pengalaman ini juga memperkuat pemahaman continuous improvement karena kebutuhan sistem evolusi seiring operasional.',
      en: 'Role: Software Developer\n\nContributions (What I Worked On):\n• System Improvement — improving the running system\n• Data Correction & Validation — fixing inaccurate data & improving validation\n• Deposit Transaction Module — developing deposit transaction module\n• Product Health Filter — validation/filtering products by sugar & sodium\n• Transaction Management — developing & refining transaction processes\n• Reporting & Monitoring — developing reporting features\n• Bug Fixing & Debugging — handling issues found during system usage\n• System Maintenance — continuous maintenance & improvement\n• Operational Adaptation — adapting features to operational needs\n\nDevelopment Process:\nAnalyze → Identify Problems → Develop → Test → Improve → Maintain\n\nI start by understanding system problems or new user needs, analyzing existing flows, determining what to fix/develop, implementing, testing, then adjusting based on real-world usage.\n\nKey Features / Development:\n• Deposit Transaction — deposit module for balance management\n• Product Health Filter — filter products by sugar & sodium levels\n• Transaction Management — transaction flow from product selection to status\n• Order Management — order handling: pending, payment, packing, delivery, completed\n• Reporting & Monitoring — transaction & operational activity monitoring\n• Continuous Improvement — ongoing development based on discovered needs & issues\n\nWhat I Learned:\nThis project taught me that being a software developer is not only about making features work, but also about understanding real problems that appear once a system is in use. I learned to be more careful with data, understand business processes, identify root causes, debug existing systems, and develop solutions that provide real value. This experience also strengthened my understanding of continuous improvement, as system requirements evolve with operational needs.'
    },
    images: [
      'images/sm1.webp',
      'images/sm2.webp',
      'images/sm3.webp',
      'images/sm4.webp',
      'images/sm5.webp',
      'images/sm6.webp',
      'images/sm7.webp',
      'images/sm8.webp',
      'images/sm9.webp',
      'images/sm10.webp',
      'images/sm11.webp',
      'images/sm12.webp',
      'images/sm13.webp',
      'images/sm14.webp',
      'images/sm15.webp',
    ],
    tools: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'REST API'],
    features: {
      id: [
        'System Improvement',
        'Data Correction & Validation',
        'Deposit Transaction Module',
        'Product Health Filter',
        'Transaction Management',
        'Reporting & Monitoring',
        'Bug Fixing & Debugging',
        'System Maintenance',
        'Operational Adaptation',
        'Continuous Improvement'
      ],
      en: [
        'System Improvement',
        'Data Correction & Validation',
        'Deposit Transaction Module',
        'Product Health Filter',
        'Transaction Management',
        'Reporting & Monitoring',
        'Bug Fixing & Debugging',
        'System Maintenance',
        'Operational Adaptation',
        'Continuous Improvement'
      ]
    },
    link: ''
  },
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

  // Group projects by category (localized)
  const categoryGroups = {};
  projects.forEach((project) => {
    const catKey = getLocalizedText(project.category);
    if (!categoryGroups[catKey]) categoryGroups[catKey] = [];
    categoryGroups[catKey].push(project);
  });

  // Sort categories alphabetically
  const sortedCategories = Object.keys(categoryGroups).sort();

  sortedCategories.forEach((catName, catIdx) => {
    // Category header
    const groupHeader = document.createElement('div');
    groupHeader.className = 'skill-category-group';
    groupHeader.innerHTML = `<span class="skill-category-label">${catName}</span>`;
    container.appendChild(groupHeader);

    const groupProjects = categoryGroups[catName];
    groupProjects.forEach((project, idx) => {
      const card = document.createElement('article');
      card.className = 'project-card animate';
      card.setAttribute('data-project-id', project.id);

      const imagesHtml = project.images.slice(0, 3)
        .map((img, i) => `<img src="${img}" alt="${project.title} - Image ${i + 1}" loading="lazy">`)
        .join('');

      const toolsHtml = project.tools
        .map((tool) => `<span class="tool-chip">${tool}</span>`)
        .join('');

      const category = getLocalizedText(project.category);
      const shortDescription = getLocalizedText(project.shortDescription);

      card.innerHTML = `
        <div class="project-slider" data-slider-index="${idx}">
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
          <p class="project-description">${shortDescription}</p>
          <div class="project-tools">${toolsHtml}</div>
          <br>
          <a href="project-detail.html?project=${project.id}" class="btn project-btn">
            <span data-id="Lihat Project" data-en="Views Project">${projectText[currentLang].viewProject}</span> <i class='bx bx-arrow-right'></i>
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

  const images = project.images || [];

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
      track.innerHTML = images.map((img, i) => `<img src="${img}" alt="${project.title} - Image ${i + 1}">`).join('');
    }
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      images.forEach((_, i) => {
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
     const galleryImages = project.gallery && project.gallery.length ? project.gallery : images;
     detailGallery.innerHTML = galleryImages
       .map((img) => `<img src="${img}" alt="${project.title} - gallery image" loading="lazy" decoding="async">`)
       .join('');
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

function initDetailSlider() {
  const sliderEl = document.querySelector('.project-detail-slider');
  const track = sliderEl ? sliderEl.querySelector('.project-slider-track') : null;
  const prevBtn = sliderEl ? sliderEl.querySelector('.slider-prev') : null;
  const nextBtn = sliderEl ? sliderEl.querySelector('.slider-next') : null;
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
    if (e.key === 'ArrowLeft') window.goToDetailSlide(detailCurrentIndex - 1);
    if (e.key === 'ArrowRight') window.goToDetailSlide(detailCurrentIndex + 1);
  };

  if (prevBtn) prevBtn.addEventListener('click', onPrev);
  if (nextBtn) nextBtn.addEventListener('click', onNext);
  if (sliderEl) document.addEventListener('keydown', onKeyDown);

  detailCleanup = () => {
    if (prevBtn) prevBtn.removeEventListener('click', onPrev);
    if (nextBtn) nextBtn.removeEventListener('click', onNext);
    if (sliderEl) document.removeEventListener('keydown', onKeyDown);
  };

  updateDetailSlider();
}

/* ===== Back Navigation ===== */
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
    } catch (err) {
      // fallback to anchor href
    }
  });
}

/* ===== Init ===== */
if (!window.location.pathname.includes('project-detail.html')) {
  renderProjectCards();
}
loadProjectDetail();
initBackNavigation();