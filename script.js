const sections = Array.from(document.querySelectorAll('section[id]'));
const allNavLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
  if (sideMenu.classList.contains("show")) {
    sideMenu.classList.remove("show");
  } else {
    sideMenu.classList.add('show');
  }

  if (menuOverlay.classList.contains("show")) {
    menuOverlay.classList.remove("show");
  } else {
    menuOverlay.classList.add('show');
  }
}

function closeMenu() {
  sideMenu.classList.remove('show');
  menuOverlay.classList.remove('show');
}

// Lukk meny når man klikker på en lenke
document.querySelectorAll('.side-menu__links a').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});


const linksById = {};
allNavLinks.forEach(link => {
  const hash = link.getAttribute('href');
  if (!hash || hash === '#') return;
  const id = hash.slice(1);
  (linksById[id] ||= []).push(link);
});

const clearActive = () => allNavLinks.forEach(l => l.classList.remove('active'));
const setActive = (id) => (linksById[id] || []).forEach(l => l.classList.add('active'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      clearActive();
      setActive(e.target.id);
    }
  });
}, {
  root: null,
  rootMargin: '-45% 0px -45% 0px',
  threshold: 0.01
});

sections.forEach(sec => io.observe(sec));

allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    const id = link.getAttribute('href').slice(1);
    clearActive();
    setActive(id);
  });
});

window.addEventListener('load', () => {
  const id = location.hash?.slice(1);
  clearActive();
  setActive(id || 'home');
});