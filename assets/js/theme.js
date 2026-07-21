// TICKORA - theme toggle (dark/light). The instant-apply (no-flash) part runs
// as an inline snippet in each page's <head>; this file just wires the button.
function getStoredTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('tickora_theme', theme); } catch (e) {}
}

function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    setTheme(getStoredTheme() === 'light' ? 'dark' : 'light');
  });
}

document.addEventListener('DOMContentLoaded', initThemeToggle);
