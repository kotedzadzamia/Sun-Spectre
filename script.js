const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const menuToggle = document.querySelector('[data-menu-toggle]');

const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const reveals = [...document.querySelectorAll('.reveal')];
if (reduced || !('IntersectionObserver' in window)) {
  reveals.forEach(el => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px' });
  reveals.forEach(el => observer.observe(el));
}

const deck = document.querySelector('[data-tilt]');
if (deck && !reduced && window.matchMedia('(pointer:fine)').matches) {
  deck.addEventListener('pointermove', e => {
    const r = deck.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    deck.style.transform = `perspective(1400px) rotateX(${y * -2.2}deg) rotateY(${x * 3}deg)`;
  });
  deck.addEventListener('pointerleave', () => deck.style.transform = '');
}

const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a').forEach(link => {
  const target = link.getAttribute('href')?.split('#')[0];
  if (target === current) link.setAttribute('aria-current', 'page');
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
