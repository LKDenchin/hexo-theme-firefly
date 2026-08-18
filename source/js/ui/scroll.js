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
      }, { passive: true });
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
    // Close mobile menu helper
    closeMobileMenu() {
      const toggleBtn = document.getElementById('mobile-menu-toggle');
      const menu = document.getElementById('navbar-menu');
      if (!toggleBtn || !menu) return;
      const links = menu.querySelector('.navbar-links');
      const backdrop = document.querySelector('.mobile-menu-backdrop');
      if (links) links.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      var icon = toggleBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'menu';
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

      const closeMenu = () => this.closeMobileMenu();

      const openMenu = () => {
        // Close other popups for mutual exclusion
        const themePopover = document.getElementById('theme-popover');
        if (themePopover) themePopover.classList.add('closed');
        const displayPanel = document.getElementById('display-settings-panel');
        if (displayPanel) displayPanel.classList.add('closed');

        links.classList.add('open');
        backdrop.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        var icon = toggleBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'close';
      };

      // Show toggle only when navbar links overflow or on mobile screens
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
      
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (links.classList.contains('open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      // Close when clicking backdrop
      backdrop.addEventListener('click', closeMenu);
      
      // Close menu when clicking normal links, toggle dropdown accordions on dropdown toggle links
      menu.addEventListener('click', (e) => {
        const dropdownToggle = e.target.closest('.dropdown-toggle');
        if (dropdownToggle && window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          const parent = dropdownToggle.closest('.navbar-dropdown');
          if (parent) {
            parent.classList.toggle('open');
          }
          return;
        }

        const link = e.target.closest('a');
        if (link && !link.classList.contains('dropdown-toggle')) {
          closeMenu();
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && links.classList.contains('open')) {
          closeMenu();
        }
      });

      this.initNavbarExtraButtons();
    },

    // Extra topbar buttons: Music & Play/Wallpaper
    initNavbarExtraButtons() {
      const musicBtn = document.getElementById('nav-music-btn');
      if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (window.__aplayer) {
            window.__aplayer.toggle();
          } else {
            const widget = document.querySelector('.music-widget');
            if (widget) {
              widget.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      }

      const playBtn = document.getElementById('nav-play-btn');
      if (playBtn) {
        playBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (window.Settings) {
            const current = window.Settings.getWallpaperMode();
            const order = ['banner', 'fullscreen', 'overlay', 'none'];
            const idx = order.indexOf(current);
            const next = order[(idx + 1) % order.length];
            window.Settings.setWallpaperMode(next);
          }
        });
      }
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
