const navToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

const yearNode = document.querySelector('[data-year]');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  if (!button) return;
  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    faqItems.forEach((faq) => faq.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

const galleryButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item.full');

galleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    galleryButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    galleryItems.forEach((item) => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.style.display = show ? 'block' : 'none';
    });
  });
});

const lightbox = document.querySelector('.gallery-lightbox');
const lightboxImg = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    if (!lightbox || !lightboxImg) return;
    const img = item.querySelector('img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
  });
});

if (lightboxClose && lightbox) {
  lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.classList.remove('open');
  });
}

const forms = document.querySelectorAll('form[data-whatsapp]');
forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.querySelector('[name="fullName"]')?.value || 'Customer';
    const email = form.querySelector('[name="email"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const subject = form.querySelector('[name="subject"]')?.value || 'Enquiry';
    const interest = form.querySelector('[name="interest"]')?.value || 'General enquiry';
    const message = form.querySelector('[name="message"]')?.value || '';
    const encoded = encodeURIComponent(
      `Hello Green Valley Dairy Farm,\n\nMy name is ${name}.\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nInterest: ${interest}\n\nMessage: ${message}`
    );
    window.open(`https://wa.me/256704782616?text=${encoded}`, '_blank');
    form.reset();
    const status = form.querySelector('.form-status');
    if (status) {
      status.textContent = 'Your enquiry has been prepared in WhatsApp. Please send it to continue.';
    }
  });
});
