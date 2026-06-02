(function() {
  const ScrollManager = {
    lastScrollY: 0,
    
    init() {
      if (this.initialized) return;
      this.initialized = true;
      this.bindScroll();
      this.initBackToTop();
      this.initMobileMenu();
    },
    
    bindScroll() {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      });
    },
    
    handleScroll() {
      const scrollY = window.scrollY;
      const navbar = document.getElementById('navbar');
      
      if (navbar) {
        if (scrollY > 10) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
      
      this.lastScrollY = scrollY;
    },
    
    // Mobile menu toggle
    initMobileMenu() {
      const toggleBtn = document.getElementById('mobile-menu-toggle');
      const menu = document.getElementById('navbar-menu');
      if (!toggleBtn || !menu) return;
      
      const links = menu.querySelector('.navbar-links');
      if (!links) return;

      // Show toggle only when navbar links overflow
      const checkOverflow = () => {
        const navbar = document.getElementById('navbar');
        const navbarInner = document.querySelector('#navbar .navbar-inner');
        if (!navbarInner || !navbar) return;
        const brand = navbarInner.querySelector('.navbar-brand');
        const actions = navbarInner.querySelector('.navbar-actions');
        const available = navbarInner.offsetWidth - (brand ? brand.offsetWidth : 0) - (actions ? actions.offsetWidth : 0) - 40;
        if (links.scrollWidth > available || window.innerWidth <= 768) {
          toggleBtn.classList.add('visible');
          navbar.classList.add('mobile-nav');
        } else {
          toggleBtn.classList.remove('visible');
          navbar.classList.remove('mobile-nav');
          links.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      };
      
      checkOverflow();
      window.addEventListener('resize', checkOverflow);
      
      toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = links.classList.toggle('open');
        this.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      
      // Close menu when clicking a link
      menu.addEventListener('click', function(e) {
        if (e.target.closest('a')) {
          links.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
          links.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    },
    
    // Back to top
    initBackToTop() {
      const btn = document.querySelector('.back-to-top-btn');
      if (!btn) return;
      
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      }, { passive: true });
      
      btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };
  
  window.ScrollManager = ScrollManager;
  document.addEventListener('DOMContentLoaded', () => ScrollManager.init());
})();
