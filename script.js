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

// === Lightbox Functionality ===
const galleryImages = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDate = document.getElementById('lightbox-date');
const closeBtn = document.querySelector('.lightbox .close');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxTitle.textContent = img.dataset.title;
    lightboxDate.textContent = img.dataset.date;
    lightbox.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

// == Menu Dropdown ===
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});

// == Home section hero video play/pause ===
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("heroVideo");
  const toggleBtn = document.getElementById("videoToggle");

  const playIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M8 5v14l11-7z"/>
    </svg>
  `;

  const pauseIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <rect rx="2" x="6" y="4" width="4" height="16"/>
      <rect rx="2" x="14" y="4" width="4" height="16"/>
    </svg>
  `;

  toggleBtn.innerHTML = pauseIcon;

  toggleBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      toggleBtn.innerHTML = pauseIcon;
    } else {
      video.pause();
      toggleBtn.innerHTML = playIcon;
    }
  });
});
