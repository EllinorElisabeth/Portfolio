  // Alle seksjoner som har id
  const sections = Array.from(document.querySelectorAll('section[id]'));

  // Alle lenker som peker til #id, både i toppnav og dropdown
  const allNavLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

  // Map: id -> [lenker...]
  const linksById = {};
  allNavLinks.forEach(link => {
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    const id = hash.slice(1);
    (linksById[id] ||= []).push(link);
  });

  const clearActive = () => allNavLinks.forEach(l => l.classList.remove('active'));
  const setActive = (id) => (linksById[id] || []).forEach(l => l.classList.add('active'));

  // Marker seksjonen som treffer "midtsonen" av viewport (stabilt én aktiv)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        clearActive();
        setActive(e.target.id);
      }
    });
  }, {
    root: null,
    rootMargin: '-45% 0px -45% 0px', // midtbånd på ca 10% høyde totalt
    threshold: 0.01
  });

  sections.forEach(sec => io.observe(sec));

  // Snappy følelse ved klikk
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('href').slice(1);
      clearActive();
      setActive(id);
    });
  });

  // Ved last (f.eks. /#projects)
  window.addEventListener('load', () => {
    const id = location.hash?.slice(1);
    clearActive();
    setActive(id || 'home');
  });