import './style.css';
import menuData from './menu.json';

/* =========================
   MENU RENDERER
========================== */

const tabsEl = document.getElementById('menuTabs');
const gridEl = document.getElementById('menuGrid');

let activeCategory = 'All';

function buildTabs() {
  const categories = ['All', ...menuData.map(c => c.category)];
  tabsEl.innerHTML = categories.map(cat => `
    <button class="menu-tab ${cat === activeCategory ? 'active' : ''}" data-cat="${cat}">
      ${cat === 'All' ? '🍽 All' : menuData.find(c => c.category === cat).icon + ' ' + cat}
    </button>
  `).join('');

  tabsEl.querySelectorAll('.menu-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      buildTabs();
      buildGrid();
    });
  });
}

function buildGrid() {
  const filtered = activeCategory === 'All'
    ? menuData
    : menuData.filter(c => c.category === activeCategory);

  gridEl.innerHTML = filtered.map(category => `
    <div class="menu-card">
      <div class="menu-card-header">
        <span class="menu-cat-icon">${category.icon}</span>
        <h3>${category.category}</h3>
      </div>
      <div class="menu-items-list">
        ${category.items.map(item => `
          <div class="menu-item">
            <span class="item-name">${item.name}</span>
            <span class="item-dots"></span>
            <span class="price">₹${item.price}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

buildTabs();
buildGrid();

/* =========================
   SMOOTH ACTIVE NAV LINKS
========================== */

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => observer.observe(section));
