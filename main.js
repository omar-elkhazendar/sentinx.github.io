document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Mobile navigation toggle (navbar visible and usable on all devices)
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-links--open');
      navToggle.classList.toggle('nav-toggle--open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-links--open');
        navToggle.classList.remove('nav-toggle--open');
      });
    });
  }

  // Header animation on scroll (subtle shrink / stronger background)
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Scroll reveal animations with staggered effect
  const selectors = '.card, .dashboard-feature, .section-title, .section-subtitle, .glass-panel, .big-picture blockquote';
  const elementsToReveal = document.querySelectorAll(selectors);

  if (!elementsToReveal.length) {
    return;
  }

  elementsToReveal.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(elementsToReveal).indexOf(entry.target);
          const delay = Math.min(index * 80, 600); // cap delay so it stays snappy

          setTimeout(() => {
            entry.target.classList.add('active');
          }, delay);

          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elementsToReveal.forEach(el => observer.observe(el));
  } else {
    // Fallback for very old browsers – just show everything
    elementsToReveal.forEach(el => {
      el.classList.add('active');
    });
  }
});

