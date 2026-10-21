/**
 * @fileoverview main.js – Shared entry point injected into every page.
 * Responsibilities:
 *   1. Inject a shared navbar and footer into the DOM.
 *   2. Handle dark/light theme toggle (persisted in localStorage).
 *   3. Handle hamburger / mobile menu.
 *   4. Mark the active nav link based on the current page.
 */

import { storageGet, storageSet, KEYS } from './storage.js';

// ─── Nav items ────────────────────────────────────────────────
/** @type {{ label: string, href: string }[]} */
const NAV_ITEMS = [
  { label: 'Home',         href: '/index.html' },
  { label: 'Graph',        href: '/pages/graph.html' },
  { label: 'Matrix',       href: '/pages/matrix.html' },
  { label: 'Probability',  href: '/pages/probability.html' },
  { label: 'Number Theory',href: '/pages/number-theory.html' },
  { label: 'Equations',    href: '/pages/equations.html' },
  { label: 'Converter',    href: '/pages/converter.html' },
  { label: 'Formulas',     href: '/pages/formulas.html' },
  { label: 'Quiz',         href: '/pages/quiz.html' },
  { label: 'Dashboard',    href: '/pages/dashboard.html' },
  { label: 'Fractals',     href: '/pages/fractals.html' },
  { label: 'About',        href: '/pages/about.html' },
];

// ─── Path helper ──────────────────────────────────────────────
/**
 * Convert an absolute path like "/pages/graph.html" to a relative path
 * that works when the file is opened directly (file://) or via Live Server.
 * @param {string} absoluteHref - e.g. "/pages/graph.html"
 * @returns {string}
 */
function toRelativeHref(absoluteHref) {
  const currentPath = window.location.pathname;
  // Depth: how many folder levels deep is the current file?
  // index.html → depth 0, pages/*.html → depth 1
  const depth = (currentPath.match(/\//g) || []).length - 1;
  const prefix = depth <= 0 ? '.' : Array(depth).fill('..').join('/');

  // absoluteHref starts with '/' so strip it
  return prefix + absoluteHref;
}

// ─── Navbar HTML ──────────────────────────────────────────────
/**
 * Build navbar HTML string.
 * @returns {string}
 */
function buildNavbar() {
  const currentPath = window.location.pathname;

  const linksHTML = NAV_ITEMS.map(item => {
    const href = toRelativeHref(item.href);
    // Check active: match the file name
    const isActive = currentPath.endsWith(item.href.replace('/', '')) ||
                     (item.href === '/index.html' && (currentPath === '/' || currentPath.endsWith('index.html')));
    return `<li><a href="${href}" ${isActive ? 'class="active"' : ''}>${item.label}</a></li>`;
  }).join('');

  const mobileLinksHTML = NAV_ITEMS.map(item => {
    const href = toRelativeHref(item.href);
    return `<a href="${href}">${item.label}</a>`;
  }).join('');

  return `
    <nav id="navbar" role="navigation" aria-label="Main navigation">
      <div class="nav-inner">
        <a class="nav-brand" href="${toRelativeHref('/index.html')}" aria-label="MathVerse Home">
          <div class="brand-icon" aria-hidden="true">∑</div>
          <span>MathVerse</span>
        </a>

        <ul class="nav-links" role="list">${linksHTML}</ul>

        <div class="nav-right">
          <button id="theme-toggle" aria-label="Toggle dark/light theme" title="Toggle theme">🌙</button>
          <button id="hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" role="menu" aria-hidden="true">
        ${mobileLinksHTML}
      </div>
    </nav>
  `;
}

// ─── Footer HTML ──────────────────────────────────────────────
/**
 * Build footer HTML string.
 * @returns {string}
 */
function buildFooter() {
  const toolLinks = [
    ['Graph Plotter',       '/pages/graph.html'],
    ['Matrix Calculator',   '/pages/matrix.html'],
    ['Probability Sim',     '/pages/probability.html'],
    ['Equation Solver',     '/pages/equations.html'],
    ['Formula Library',     '/pages/formulas.html'],
    ['Quiz Arena',          '/pages/quiz.html'],
  ];

  const toolHTML = toolLinks.map(([label, href]) =>
    `<li><a href="${toRelativeHref(href)}">${label}</a></li>`
  ).join('');

  return `
    <footer id="footer" role="contentinfo">
      <div class="footer-inner">
        <div class="footer-brand">
          <a class="nav-brand" href="${toRelativeHref('/index.html')}" style="text-decoration:none;">
            <div class="brand-icon" style="width:32px;height:32px;font-size:1rem;" aria-hidden="true">∑</div>
            <span style="font-weight:800;color:var(--text-primary);">MathVerse</span>
          </a>
          <p>An interactive math learning hub built for curious minds.</p>
        </div>

        <nav class="footer-links" aria-label="Footer tools navigation">
          <h4>Tools</h4>
          <ul role="list">${toolHTML}</ul>
        </nav>

        <div class="footer-contact">
          <h4>Project</h4>
          <p style="font-size:0.85rem;margin-bottom:0.4rem;">Developer: <strong style="color:var(--text-primary);">Salman Hassan</strong></p>
          <p style="font-size:0.85rem;margin-bottom:0.4rem;">Web Engineering Project</p>
          <a href="${toRelativeHref('/pages/contact.html')}" class="btn btn-secondary" style="margin-top:0.75rem;font-size:0.8rem;padding:0.4rem 0.9rem;">Contact</a>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} MathVerse · Built with ❤️ using HTML5, Tailwind CSS &amp; Vanilla JS</p>
      </div>
    </footer>
  `;
}

// ─── Theme management ─────────────────────────────────────────
/**
 * Apply the saved or preferred theme on page load.
 */
function initTheme() {
  const saved = storageGet(KEYS.THEME, null);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved !== null ? saved === 'dark' : prefersDark;

  if (!isDark) {
    document.documentElement.classList.add('light-theme');
  }
  updateThemeToggleIcon(!isDark);
}

/**
 * Update the theme-toggle button icon.
 * @param {boolean} isLight
 */
function updateThemeToggleIcon(isLight) {
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = isLight ? '🌙' : '☀️';
}

/**
 * Toggle between dark and light themes.
 */
function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light-theme');
  storageSet(KEYS.THEME, isLight ? 'light' : 'dark');
  updateThemeToggleIcon(isLight);
}

// ─── Hamburger menu ───────────────────────────────────────────
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(/** @type {Node} */ (e.target)) &&
        !menu.contains(/** @type {Node} */ (e.target))) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    }
  });
}

// ─── Bootstrap ────────────────────────────────────────────────
/**
 * Inject navbar and footer, then wire up interactions.
 * Call this from every page's DOMContentLoaded handler.
 */
export function initPage() {
  // Inject navbar before the first child of body
  const navContainer = document.createElement('div');
  navContainer.innerHTML = buildNavbar();
  document.body.insertBefore(navContainer.firstElementChild, document.body.firstChild);

  // Inject footer after the last child of body
  const footerContainer = document.createElement('div');
  footerContainer.innerHTML = buildFooter();
  document.body.appendChild(footerContainer.firstElementChild);

  // Theme
  initTheme();

  // Wire theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Hamburger
  initHamburger();
}

// Auto-init if this script is loaded in a page context
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
