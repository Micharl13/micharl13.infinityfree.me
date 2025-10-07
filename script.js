// Page transition effect

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");

// Add fade-out when navigating away
document.querySelectorAll("a").forEach(link => {
  if (link.hostname === window.location.hostname) {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("#") && !href.startsWith("mailto")) {
        e.preventDefault();
        document.body.classList.remove("fade-in");
        setTimeout(() => {
          window.location.href = href;
            }, 300); // matches the fade duration
          }
        });
      }
    });
  });
