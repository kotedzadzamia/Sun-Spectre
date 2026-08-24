const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const cursor = document.querySelector('.spectral-cursor');

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 20);
};
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (!reduced && cursor) {
  window.addEventListener('pointermove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  }, { passive: true });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const heroVisual = document.querySelector('.hero-visual');
if (heroVisual && !reduced) {
  heroVisual.addEventListener('pointermove', (e) => {
    const r = heroVisual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    heroVisual.style.transform = `perspective(1200px) rotateX(${y * -3.5}deg) rotateY(${x * 5}deg)`;
  });
  heroVisual.addEventListener('pointerleave', () => {
    heroVisual.style.transform = '';
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
