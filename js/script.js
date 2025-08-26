
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('a.link[href^="#"]');

  const linkById = {};
  navLinks.forEach(link => {
    const hash = link.getAttribute('href');
    if (hash && hash.startsWith('#')) {
      linkById[hash.slice(1)] = link;
    }
  });

  const nav = document.querySelector('.navbar');
  const navH = nav ? nav.offsetHeight : 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navLinks.forEach(l => l.classList.remove('active'));

        const link = linkById[id];
        if (link) link.classList.add('active');
      }
    });
  }, {
    root: null,
    rootMargin: `-${navH}px 0px -40% 0px`,
    threshold: 0.3
  });

  sections.forEach(sec => observer.observe(sec));

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  window.addEventListener('load', () => {
    const current = location.hash?.slice(1);
    if (current && linkById[current]) {
      navLinks.forEach(l => l.classList.remove('active'));
      linkById[current].classList.add('active');
    } else if (linkById['home']) {
      linkById['home'].classList.add('active');
    }
  });

