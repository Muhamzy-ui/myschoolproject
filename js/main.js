/**
 * COS 106: Introduction to Web Technologies - Term Project
 * Student: MAHMUD BASHIR OLASUNKANMI
 * Matric No: 2025/C/CYB/1339 | Degree: B.Sc. Cybersecurity
 * File: js/main.js - Global Interactions, Theme Switcher & Responsive Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  highlightActiveNav();
});

/**
 * 1. Dark/Light Theme Switcher with LocalStorage persistence
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  // Retrieve saved preference or default to light mode (MIVA University Portal default)
  const savedTheme = localStorage.getItem('miva_portfolio_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(themeToggleBtn, savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('miva_portfolio_theme', newTheme);
    updateThemeIcon(themeToggleBtn, newTheme);
  });
}

function updateThemeIcon(btn, theme) {
  if (theme === 'dark') {
    btn.innerHTML = '☀️';
    btn.setAttribute('aria-label', 'Switch to Light Theme');
    btn.title = 'Switch to Light Mode';
  } else {
    btn.innerHTML = '🌙';
    btn.setAttribute('aria-label', 'Switch to Dark Theme');
    btn.title = 'Switch to Dark Mode';
  }
}

/**
 * 2. Mobile Responsive Navigation Toggle
 */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');

  if (!mobileToggle || !navLinks) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      mobileToggle.innerHTML = '☰';
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * 3. Dynamic Active Navigation Link Indicator
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * 4. Helper Toast Notification
 */
window.showToast = function(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '9999';
    toastContainer.style.display = 'flex';
    toastContainer.style.flexDirection = 'column';
    toastContainer.style.gap = '10px';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '8px';
  toast.style.fontSize = '0.9rem';
  toast.style.fontWeight = '600';
  toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  toast.style.transition = 'all 0.3s ease';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '8px';

  if (type === 'success') {
    toast.style.backgroundColor = '#15803D';
    toast.style.color = '#FFFFFF';
    toast.innerHTML = '✓ ' + message;
  } else if (type === 'danger') {
    toast.style.backgroundColor = '#B91C1C';
    toast.style.color = '#FFFFFF';
    toast.innerHTML = '⚠️ ' + message;
  } else {
    toast.style.backgroundColor = '#0F2C59';
    toast.style.color = '#FFFFFF';
    toast.innerHTML = 'ℹ️ ' + message;
  }

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};
