const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');
const readMoreBtn = document.querySelector('#readMoreBtn');
const moreText = document.querySelector('#more');
const dots = document.querySelector('#dots');
const contactForm = document.querySelector('#contactForm');
const statusMessage = document.querySelector('#status');

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
    readMoreBtn.textContent = isExpanded ? 'Read More' : 'Read Less';
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
      statusMessage.textContent = 'Mohon lengkapi nama, email, dan pesan.';
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

    statusMessage.textContent = 'Mengarahkan ke WhatsApp...';
    statusMessage.className = 'status success';
    window.open(waUrl, '_blank', 'noopener');
  });
}
