// === Portfolio Site Scripts ===

// Read fade duration from CSS so JS and CSS stay in sync
const FADE_DURATION_MS = (() => {
  try {
    const v = getComputedStyle(document.documentElement).getPropertyValue('--fade-duration').trim();
    return v ? Math.round(parseFloat(v)) : 300;
  } catch {
    return 300;
  }
})();

// Fade-in: wait a couple of frames so the initial 'opacity: 0' is painted, then remove the class.
// This avoids the "no transition" race condition.
document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.classList.remove('fade');
  }));
});

// Make sure pages restored from BF cache also show correctly
window.addEventListener('pageshow', (e) => {
  if (e.persisted) document.body.classList.remove('fade');
});

// Fade-out before navigating to another HTML page
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#')) return; // skip empty and in-page anchors
  if (!href.endsWith('.html')) return; // only intercept internal HTML pages

  link.addEventListener('click', (e) => {
    // allow open-in-new-tab / modifier clicks
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;

    e.preventDefault();
    document.body.classList.add('fade');
    setTimeout(() => {
      window.location.href = href;
    }, FADE_DURATION_MS);
  });
});
