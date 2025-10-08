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

// Header shrink on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.backgroundColor = '#111';
    header.style.boxShadow = '0 2px 15px rgba(0, 255, 136, 0.2)';
  } else {
    header.style.backgroundColor = 'var(--gray)';
    header.style.boxShadow = 'none';
  }
});

// Reveal animation when scrolling
const revealElements = document.querySelectorAll('.section');
const revealOnScroll = () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
};

revealElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'all 0.8s ease-out';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
