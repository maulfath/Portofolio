document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.querySelector('.site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight active nav link based on scroll position
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.site-nav a');

  const setActiveLink = () => {
    let currentId = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentId = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  document.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // One deliberate load animation: draw the stochastic path in the hero
  const samplePath = document.getElementById('samplePath');
  const expectedPath = document.getElementById('expectedPath');
  const jumpDot = document.getElementById('jumpDot');

  if (samplePath && !prefersReducedMotion) {
    const sampleLength = samplePath.getTotalLength();
    const expectedLength = expectedPath.getTotalLength();

    samplePath.style.strokeDasharray = sampleLength;
    samplePath.style.strokeDashoffset = sampleLength;
    expectedPath.style.strokeDasharray = expectedLength;
    expectedPath.style.strokeDashoffset = expectedLength;
    jumpDot.style.opacity = '0';

    requestAnimationFrame(() => {
      samplePath.style.transition = 'stroke-dashoffset 1.8s ease-out';
      expectedPath.style.transition = 'stroke-dashoffset 1.8s ease-out';
      samplePath.style.strokeDashoffset = '0';
      expectedPath.style.strokeDashoffset = '0';
    });

    window.setTimeout(() => {
      jumpDot.style.transition = 'opacity 0.4s ease-in';
      jumpDot.style.opacity = '1';
    }, 900);
  }
});
