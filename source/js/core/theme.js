(function() {
  var ThemeManager = {
    /**
     * Initialize the theme manager.
     * Binds click handlers to all theme-switch buttons and dropdown
     * items, then updates the icon state to reflect the current theme.
     */
    init: function() {
      if (this.initialized) return;
      this.initialized = true;
      this.bindThemeToggles();
      this.initSystemListener();
    },

    /**
     * Find every element that can toggle the theme (inline buttons
     * and dropdown menu items) and attach click handlers.
     */
    bindThemeToggles: function() {
      var self = this;

      // --- Inline theme-switch buttons (e.g. in navbar) ---
      document.querySelectorAll('.theme-switch-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          if (!window.Settings) {
            console.warn('[ThemeManager] window.Settings not available; skipping theme toggle.');
            return;
          }
          var nextMode = window.Settings.cycleTheme();
          window.Settings.setTheme(nextMode);
          self.updateToggleIcons(nextMode);
        });
      });

      // --- Theme dropdown items (data-theme-mode attribute) ---
      document.querySelectorAll('[data-theme-mode]').forEach(function(item) {
        item.addEventListener('click', function(e) {
          var mode = e.currentTarget.dataset.themeMode;
          if (!mode) return;
          if (!window.Settings) {
            console.warn('[ThemeManager] window.Settings not available; skipping theme set.');
            return;
          }
          window.Settings.setTheme(mode);
          self.updateToggleIcons(mode);
        });
      });
    },

    /**
     * Refresh the visual state of all theme-related UI elements.
     *
     * For .theme-switch-btn elements it shows/hides the sun/moon
     * child icons depending on whether dark mode is active.
     *
     * For [data-theme-mode] items it adds/removes the 'active' class
     * so the user can see which mode is currently selected.
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
          // Dark theme: show sun (switch to light), hide moon
          if (sunIcon) sunIcon.style.display = '';
          if (moonIcon) moonIcon.style.display = 'none';
        } else {
          // Light theme: show moon (switch to dark), hide sun
          if (sunIcon) sunIcon.style.display = 'none';
          if (moonIcon) moonIcon.style.display = '';
        }
      });

      // --- Dropdown items ---
      document.querySelectorAll('[data-theme-mode]').forEach(function(item) {
        if (item.dataset.themeMode === current) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    },

    /**
     * Listen for the custom 'themechange' event dispatched by
     * window.Settings so the UI stays in sync even when the theme
     * is changed from outside (e.g. programmatically).
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

  // ============================================================
  // Expose to global scope
  // ============================================================
  window.ThemeManager = ThemeManager;
  document.addEventListener('DOMContentLoaded', function() {
    ThemeManager.init();
  });
})();
