(function() {
  // Back to top button is handled by scroll.js ScrollManager
  // This file can be empty if scroll.js handles it
  // Placeholder for any additional back-to-top specific logic
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (backToTopBtn && !window.ScrollManager) {
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
