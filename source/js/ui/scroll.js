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
    
    // Mobile menu toggle with backdrop overlay
    initMobileMenu() {
      const toggleBtn = document.getElementById('mobile-menu-toggle');
      const menu = document.getElementById('navbar-menu');
      if (!toggleBtn || !menu) return;
      
      const links = menu.querySelector('.navbar-links');
      if (!links) return;

      // Create backdrop element for mobile menu overlay
      let backdrop = document.querySelector('.mobile-menu-backdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        document.body.appendChild(backdrop);
      }

      const closeMenu = () => {
        links.classList.remove('open');
        backdrop.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        // Toggle icon back to menu
        var icon = toggleBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      };

      const openMenu = () => {
        links.classList.add('open');
        backdrop.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        // Toggle icon to close
        var icon = toggleBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'close';
      };

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
          closeMenu();
        }
      };
      
      checkOverflow();
      window.addEventListener('resize', checkOverflow);
      
      toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (links.classList.contains('open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      // Close when clicking backdrop
      backdrop.addEventListener('click', closeMenu);
      
      // Close menu when clicking a link
      menu.addEventListener('click', function(e) {
        if (e.target.closest('a')) {
          closeMenu();
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && links.classList.contains('open')) {
          closeMenu();
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
