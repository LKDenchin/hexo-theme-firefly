(function() {
  var ThemeManager = {
    popover: null,
    initialized: false,
    
    /**
     * Initialize the theme manager.
     */
    init: function() {
      if (this.initialized) return;
      this.initialized = true;
      this.popover = document.getElementById('theme-popover');
      this.bindThemeToggles();
      this.initSystemListener();
      // Set initial active state of icons
      if (window.Settings) {
        var current = window.Settings.getStoredTheme() || window.Settings.getDefaultTheme();
        this.updateToggleIcons(current);
      }
    },

    /**
     * Bind click handlers to theme toggle buttons and popover items.
     */
    bindThemeToggles: function() {
      var self = this;

      // Theme toggle button clicks: toggle popover open/closed
      document.querySelectorAll('.theme-switch-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.stopPropagation();
          if (self.popover) {
            var willOpen = self.popover.classList.contains('closed');
            if (willOpen) {
              if (window.ScrollManager && window.ScrollManager.closeMobileMenu) {
                window.ScrollManager.closeMobileMenu();
              }
              var displayPanel = document.getElementById('display-settings-panel');
              if (displayPanel) displayPanel.classList.add('closed');
            }
            self.popover.classList.toggle('closed');
          }
        });
      });

      // Theme choices click
      document.querySelectorAll('[data-theme-mode]').forEach(function(item) {
        item.addEventListener('click', function(e) {
          e.stopPropagation();
          var mode = e.currentTarget.dataset.themeMode;
          if (!mode) return;
          if (!window.Settings) {
            console.warn('[ThemeManager] window.Settings not available; skipping theme set.');
            return;
          }
          window.Settings.setTheme(mode);
          self.updateToggleIcons(mode);
          // Close popover
          if (self.popover) {
            self.popover.classList.add('closed');
          }
        });
      });

      // Close popover when clicking outside
      document.addEventListener('click', function(e) {
        if (self.popover && !self.popover.classList.contains('closed')) {
          if (!self.popover.contains(e.target) && !e.target.closest('.theme-switch-btn')) {
            self.popover.classList.add('closed');
          }
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && self.popover && !self.popover.classList.contains('closed')) {
          self.popover.classList.add('closed');
        }
      });
    },

    /**
     * Refresh the visual state of all theme-related UI elements.
     */
    updateToggleIcons: function(mode) {
      var current = window.Settings
        ? window.Settings.getStoredTheme() || window.Settings.getDefaultTheme()
        : document.documentElement.dataset.theme || 'light';

      var resolved = window.Settings
        ? window.Settings.resolveTheme(current)
        : current;

      // --- Inline toggle buttons ---
      document.querySelectorAll('.theme-switch-btn').forEach(function(btn) {
        var sunIcon = btn.querySelector('.sun-icon');
        var moonIcon = btn.querySelector('.moon-icon');

        if (resolved === 'dark') {
          if (sunIcon) sunIcon.style.display = '';
          if (moonIcon) moonIcon.style.display = 'none';
        } else {
          if (sunIcon) sunIcon.style.display = 'none';
          if (moonIcon) moonIcon.style.display = '';
        }
      });

      // --- Dropdown/popover items ---
      document.querySelectorAll('[data-theme-mode]').forEach(function(item) {
        if (item.dataset.themeMode === current) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    },

    /**
     * Listen for the custom 'themechange' event.
     */
    initSystemListener: function() {
      var self = this;
      document.addEventListener('themechange', function(e) {
        if (e.detail && e.detail.mode) {
          self.updateToggleIcons(e.detail.mode);
        }
      });
    }
  };

  // Expose to global scope
  window.ThemeManager = ThemeManager;
  document.addEventListener('DOMContentLoaded', function() {
    ThemeManager.init();
  });
})();
