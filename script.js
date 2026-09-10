const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const menus = {
  products: {
    label: 'PRODUCTS',
    feature: { title: 'Sun Spectre Control View', text: 'A unified executive view across AI, cyber, technology risk and assurance.', href: 'products.html#control-view', cta: 'Explore the product' },
    columns: [
      { title: 'AI Governance Launchpad', text: 'Stand up accountable AI governance in weeks.', href: 'products.html#ai-launchpad' },
      { title: 'Cyber Resilience Baseline', text: 'Find the exposures that matter and prioritize action.', href: 'products.html#cyber-baseline' },
      { title: 'Digital Risk Reporting Pack', text: 'Turn technical risk into board-ready decisions.', href: 'products.html#reporting-pack' }
    ],
    footer: { lead: 'Not sure where to start?', text: 'Compare packaged engagements and advisory options.', links: [['View all products','products.html'],['Talk to an advisor','talk-to-us.html']] }
  },
  services: {
    label: 'SERVICES',
    feature: { title: 'vCISO & Security Leadership', text: 'Executive security leadership, operating model design and transformation support.', href: 'services.html#vciso', cta: 'Learn more' },
    columns: [
      { title: 'AI Strategy & Governance', text: 'Govern AI adoption, models, data and vendors.', href: 'services.html#ai' },
      { title: 'Cybersecurity & Resilience', text: 'Strategy, architecture, third-party risk and readiness.', href: 'services.html#cyber' },
      { title: 'IT Audit & Assurance', text: 'Risk-based assurance across ITGC, cloud and change.', href: 'services.html#audit' },
      { title: 'GRC & Compliance', text: 'ISO 27001, SOC 2, DORA, NIS2 and control rationalization.', href: 'services.html#grc' },
      { title: 'Cloud & Digital Risk', text: 'Guardrails for cloud, SaaS and transformation.', href: 'services.html#cloud' },
      { title: 'Incident & Resilience Readiness', text: 'Prepare leadership, processes and evidence before pressure hits.', href: 'services.html#readiness' }
    ],
    footer: { lead: 'Facing a high-priority security issue?', text: 'Start with a focused leadership conversation.', links: [['Get a consultation','talk-to-us.html'],['Contact us','contact.html']] }
  },
  industries: {
    label: 'INDUSTRIES',
    feature: { title: 'Financial Services', text: 'Security, resilience and technology assurance for regulated financial institutions.', href: 'industries.html#financial-services', cta: 'Explore financial services' },
    columns: [
      { title: 'Fintech & Payments', text: 'Security that scales with products, APIs and partners.', href: 'industries.html#fintech' },
      { title: 'Insurance', text: 'Cyber and assurance across digital distribution and cloud.', href: 'industries.html#insurance' },
      { title: 'Technology & SaaS', text: 'Build institutional trust without losing delivery speed.', href: 'industries.html#technology' },
      { title: 'Investment & Private Capital', text: 'Diligence, portfolio cyber risk and value protection.', href: 'industries.html#investment' }
    ],
    footer: { lead: 'Operating in a regulated environment?', text: 'We tailor the control model to your business and supervisory context.', links: [['Explore all industries','industries.html'],['Discuss your sector','talk-to-us.html']] }
  },
  insights: {
    label: 'INSIGHTS',
    feature: { title: 'The AI control plane', text: 'Why AI governance needs to become an operating system for decisions and evidence.', href: 'insights.html#ai-control-plane', cta: 'Read the perspective' },
    columns: [
      { title: 'Cyber resilience after prevention', text: 'Design continuity and recoverability as security outcomes.', href: 'insights.html#cyber-resilience' },
      { title: 'From audit to continuous assurance', text: 'Use better signals without compromising independence.', href: 'insights.html#continuous-assurance' },
      { title: 'Board reporting that drives action', text: 'Connect technical evidence to business exposure and decisions.', href: 'insights.html#board-reporting' },
      { title: 'Framework library', text: 'Practical perspectives on NIST, ISO 27001, DORA, NIS2 and AI regulation.', href: 'insights.html#frameworks' }
    ],
    footer: { lead: 'Need a point of view on a live challenge?', text: 'Bring us the question your leadership team is working through.', links: [['Resource center','insights.html'],['Talk to us','talk-to-us.html']] }
  },
  company: {
    label: 'WHY SUN SPECTRE',
    feature: { title: 'Independent thinking. Engineering-grade depth.', text: 'A modern consulting model connecting executive decisions with technical reality.', href: 'about.html', cta: 'Why Sun Spectre' },
    columns: [
      { title: 'Who we are', text: 'Our positioning, principles and experience.', href: 'about.html#who-we-are' },
      { title: 'How we work', text: 'Focused teams, senior delivery and evidence-led execution.', href: 'about.html#how-we-work' },
      { title: 'The 7D Method', text: 'Discover, Diagnose, Design, Defend, Demonstrate, Decide, Develop.', href: 'about.html#method' },
      { title: 'Contact', text: 'Start a conversation with Sun Spectre.', href: 'contact.html' }
    ],
    footer: { lead: 'Build trust without slowing change.', text: 'See how Sun Spectre can support your next decision.', links: [['Get a consultation','talk-to-us.html'],['Contact us','contact.html']] }
  }
};

function menuMarkup(key) {
  const m = menus[key];
  if (!m) return '';
  return `
    <section class="mega-content" data-mega-content="${key}" aria-label="${m.label} menu">
      <div class="mega-kicker">${m.label}</div>
      <a class="mega-feature" href="${m.feature.href}">
        <span><strong>${m.feature.title}</strong><small>${m.feature.text}</small></span>
        <span class="mega-learn">${m.feature.cta} <b>→</b></span>
      </a>
      <div class="mega-columns">${m.columns.map(x => `<a class="mega-link" href="${x.href}"><strong>${x.title}</strong><small>${x.text}</small></a>`).join('')}</div>
      <div class="mega-footer"><span><strong>${m.footer.lead}</strong><small>${m.footer.text}</small></span><span class="mega-footer-links">${m.footer.links.map(x => `<a href="${x[1]}">${x[0]} →</a>`).join('')}</span></div>
    </section>`;
}

function currentPage() {
  const raw = location.pathname.split('/').pop() || 'index.html';
  return raw.toLowerCase();
}

function renderHeader() {
  const host = document.querySelector('[data-site-header]');
  if (!host) return;
  const page = currentPage();
  const current = (file) => page === file ? ' aria-current="page"' : '';
  host.innerHTML = `
    <header class="site-header" data-header>
      <div class="nav-shell">
        <a class="brand" href="index.html" aria-label="Sun Spectre home">
          <img class="brand-logo" src="assets/logo-sun-spectre.svg" alt="Sun Spectre logo">
          <span class="brand-name">SUN <b>SPECTRE</b></span>
        </a>
        <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-menu-toggle><span></span><span></span></button>
        <nav class="main-nav" data-menu aria-label="Primary navigation">
          <a class="nav-link" data-mega-trigger="products" href="products.html"${current('products.html')}>Products <i></i></a>
          <a class="nav-link" data-mega-trigger="services" href="services.html"${current('services.html')}>Services <i></i></a>
          <a class="nav-link" data-mega-trigger="industries" href="industries.html"${current('industries.html')}>Industries <i></i></a>
          <a class="nav-link" data-mega-trigger="insights" href="insights.html"${current('insights.html')}>Insights <i></i></a>
          <a class="nav-link" data-mega-trigger="company" href="about.html"${current('about.html')}>Who we are <i></i></a>
        </nav>
        <div class="nav-actions"><a class="nav-cta primary" href="talk-to-us.html">Get a consultation</a><a class="nav-cta dark" href="contact.html">Contact us</a></div>
      </div>
      <div class="mega-panel" data-mega-panel>${Object.keys(menus).map(menuMarkup).join('')}</div>
    </header>`;
}

function renderFooter() {
  const host = document.querySelector('[data-site-footer]');
  if (!host) return;
  host.innerHTML = `
    <footer class="site-footer">
      <div class="page-shell footer-grid">
        <div class="footer-brand"><a class="brand" href="index.html"><img class="brand-logo" src="assets/logo-sun-spectre.svg" alt=""><span class="brand-name">SUN <b>SPECTRE</b></span></a><p>AI, cybersecurity, technology risk and assurance for organizations building what comes next.</p></div>
        <div><h4>Explore</h4><a href="products.html">Products</a><a href="services.html">Services</a><a href="industries.html">Industries</a><a href="insights.html">Insights</a></div>
        <div><h4>Company</h4><a href="about.html">Who we are</a><a href="talk-to-us.html">Get a consultation</a><a href="contact.html">Contact</a></div>
        <div><h4>Connect</h4><a href="mailto:hello@sunspectre.com">hello@sunspectre.com</a><a href="https://www.linkedin.com/company/sun-spectre/?viewAsMember=true" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
      </div>
      <div class="page-shell footer-bottom"><span>© <span data-year></span> Sun Spectre. All rights reserved.</span><span><a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a> · <a href="responsible-disclosure.html">Responsible Disclosure</a></span></div>
    </footer>`;
}

renderHeader();
renderFooter();

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

const header = document.querySelector('[data-header]');
const panel = document.querySelector('[data-mega-panel]');
const triggers = [...document.querySelectorAll('[data-mega-trigger]')];
let closeTimer;

function openMega(key) {
  if (innerWidth < 980 || !panel) return;
  clearTimeout(closeTimer);
  panel.dataset.open = key;
  panel.classList.add('open');
  document.querySelectorAll('[data-mega-content]').forEach(el => el.classList.toggle('active', el.dataset.megaContent === key));
  triggers.forEach(el => el.classList.toggle('mega-active', el.dataset.megaTrigger === key));
}
function closeMega(delay = 80) {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    if (!panel) return;
    panel.classList.remove('open');
    triggers.forEach(el => el.classList.remove('mega-active'));
  }, delay);
}

triggers.forEach(link => {
  link.addEventListener('mouseenter', () => openMega(link.dataset.megaTrigger));
  link.addEventListener('focus', () => openMega(link.dataset.megaTrigger));
});
if (panel) {
  panel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
  panel.addEventListener('mouseleave', () => closeMega(120));
}
if (header) header.addEventListener('mouseleave', () => closeMega(140));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMega(0); });

document.addEventListener('scroll', () => header?.classList.toggle('scrolled', scrollY > 12), { passive:true });

const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-menu]');
menuToggle?.addEventListener('click', () => {
  const open = mobileMenu?.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(open)));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold:.08, rootMargin:'0px 0px -35px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}

document.querySelectorAll('[data-tilt]').forEach(card => {
  if (reduceMotion) return;
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    card.style.transform = `perspective(1300px) rotateX(${y*-2.2}deg) rotateY(${x*3.2}deg)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = '');
});

document.querySelectorAll('.faq-item button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
});

document.querySelectorAll('form[data-mail-form]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Sun Spectre inquiry — ${data.get('organization') || data.get('name') || 'Website'}`);
    const body = encodeURIComponent([
      `Name: ${data.get('name') || ''}`,
      `Work email: ${data.get('email') || ''}`,
      `Organization: ${data.get('organization') || ''}`,
      `Interest: ${data.get('interest') || ''}`,
      '',
      `${data.get('message') || ''}`
    ].join('\n'));
    location.href = `mailto:hello@sunspectre.com?subject=${subject}&body=${body}`;
  });
});