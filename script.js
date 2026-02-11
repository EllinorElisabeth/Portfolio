const sections = Array.from(document.querySelectorAll('section[id]'));
const allNavLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const menuToggle = document.getElementById('icon-menu');
const mainContent = document.getElementById('main-content');
const sideMenuLinks = document.querySelectorAll('.side-menu__links a');
const firstSideMenuLink = sideMenuLinks[0];

function setMenuOpen(open) {
  const isOpen = !!open;
  sideMenu.classList.toggle('show', isOpen);
  menuOverlay.classList.toggle('show', isOpen);
  if (mainContent) mainContent.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }
  if (isOpen && firstSideMenuLink) {
    firstSideMenuLink.focus();
  } else if (menuToggle) {
    menuToggle.focus();
  }
}

function toggleMenu() {
  const isOpen = sideMenu.classList.contains('show');
  setMenuOpen(!isOpen);
}

function closeMenu() {
  setMenuOpen(false);
}

if (menuToggle) {
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });
}

// Link pressed - close menu
sideMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// Close menu on esc-btn
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sideMenu.classList.contains('show')) {
    closeMenu();
  }
});


const linksById = {};
allNavLinks.forEach(link => {
  const hash = link.getAttribute('href');
  if (!hash || hash === '#') return;
  const id = hash.replace(/^#/, '').trim();
  if (!id) return;
  (linksById[id] ||= []).push(link);
});

const clearActive = () => {
  allNavLinks.forEach(l => {
    l.classList.remove('active');
    l.removeAttribute('aria-current');
  });
};

const setActive = (id) => {
  const links = linksById[id] || [];
  links.forEach(l => {
    l.classList.add('active');
    l.setAttribute('aria-current', 'page');
  });
};

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
    const href = link.getAttribute('href') || '';
    const id = href.replace(/^#/, '').trim();
    if (id) {
      clearActive();
      setActive(id);
    }
  });
});

window.addEventListener('load', () => {
  const id = (location.hash || '#home').replace(/^#/, '').trim() || 'home';
  clearActive();
  setActive(id);
});
