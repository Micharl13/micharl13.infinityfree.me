// === Portfolio Site Scripts ===

// Smooth fade-in on page load
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('fade');
});

// Fade-out transition before leaving page
document.querySelectorAll('a[href]').forEach(link => {
  const target = link.getAttribute('href');
  if (target && target.endsWith('.html')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.add('fade');
      setTimeout(() => {
        window.location = target;
      }, 300); // Matches CSS fade timing
    });
  }
});
