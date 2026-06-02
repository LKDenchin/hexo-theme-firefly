(function() {
  const Settings = {
    // ============================================================
    // Constants
    // ============================================================
    THEME_LIGHT: 'light',
    THEME_DARK: 'dark',
    THEME_SYSTEM: 'system',
    WALLPAPER_BANNER: 'banner',
    WALLPAPER_FULLSCREEN: 'fullscreen',
    WALLPAPER_OVERLAY: 'overlay',
    WALLPAPER_NONE: 'none',

    // ============================================================
    // Storage keys
    // ============================================================
    KEYS: {
      theme: 'theme',
      hue: 'hue',
      wallpaperMode: 'wallpaperMode',
      overlayOpacity: 'overlayOpacity',
      overlayBlur: 'overlayBlur',
      overlayCardOpacity: 'overlayCardOpacity',
      wavesEnabled: 'wavesEnabled',
      gradientEnabled: 'gradientEnabled',
      bannerTitleEnabled: 'bannerTitleEnabled',
      bannerCarouselEnabled: 'bannerCarouselEnabled',
      sakuraEnabled: 'sakuraEnabled',
      postListLayout: 'postListLayout',
    },

    // ============================================================
    // THEME MANAGEMENT
    // ============================================================

    /**
     * Retrieve the stored theme preference from localStorage.
     * Returns null if no preference has been saved.
     */
    getStoredTheme: function() {
      return localStorage.getItem(this.KEYS.theme) || null;
    },

    /**
     * Get the default theme from the document's data-theme attribute,
     * falling back to 'light' if not set.
     */
    getDefaultTheme: function() {
      return document.documentElement.dataset.theme || this.THEME_LIGHT;
    },

    /**
     * Resolve a theme value to either 'light' or 'dark'.
     * If the value is 'system', it checks the OS-level preference
     * via the prefers-color-scheme media query.
     */
    resolveTheme: function(themeValue) {
      if (themeValue === this.THEME_SYSTEM) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? this.THEME_DARK
          : this.THEME_LIGHT;
      }
      return themeValue === this.THEME_DARK ? this.THEME_DARK : this.THEME_LIGHT;
    },

    /**
     * Set the theme mode. Persists to localStorage, applies the
     * appropriate CSS class and data attributes, and dispatches a
     * 'themechange' custom event so that other components can react.
     */
    setTheme: function(mode) {
      localStorage.setItem(this.KEYS.theme, mode);
      var resolved = this.resolveTheme(mode);
      var isDark = resolved === this.THEME_DARK;

      // Apply / remove the dark class on <html>
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Update data-theme for code-highlighting libraries
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

      // Notify any listeners
      document.dispatchEvent(new CustomEvent('themechange', {
        detail: { mode: mode, resolved: resolved, isDark: isDark }
      }));
    },

    /**
     * Cycle through the three available theme modes:
     * light -> dark -> system -> light ...
     */
    cycleTheme: function() {
      var current = this.getStoredTheme() || this.getDefaultTheme();
      var order = [this.THEME_LIGHT, this.THEME_DARK, this.THEME_SYSTEM];
      var idx = order.indexOf(current);
      var next = order[(idx + 1) % order.length];
      return next;
    },

    // ============================================================
    // HUE MANAGEMENT
    // ============================================================

    /**
     * Get the current hue value (0-360).
     * Reads from localStorage first, then falls back to the CSS
     * custom property --hue on the :root element.
     */
    getHue: function() {
      var stored = localStorage.getItem(this.KEYS.hue);
      if (stored !== null) {
        var parsed = parseInt(stored, 10);
        if (!isNaN(parsed)) return parsed;
      }

      var style = getComputedStyle(document.documentElement);
      var cssHue = style.getPropertyValue('--hue');
      if (cssHue) {
        var trimmed = cssHue.trim();
        if (trimmed !== '') {
          var cssParsed = parseInt(trimmed, 10);
          if (!isNaN(cssParsed)) return cssParsed;
        }
      }

      return 165; // sensible default hue
    },

    /**
     * Set the hue value, clamped to [0, 360].
     * Persists to localStorage, updates the CSS variable, and
     * dispatches a 'huechange' event.
     */
    setHue: function(value) {
      var hue = Math.max(0, Math.min(360, parseInt(value, 10) || 165));
      localStorage.setItem(this.KEYS.hue, hue);
      document.documentElement.style.setProperty('--hue', hue);
      document.dispatchEvent(new CustomEvent('huechange', { detail: { hue: hue } }));
    },

    // ============================================================
    // WALLPAPER MODE MANAGEMENT
    // ============================================================

    /**
     * Retrieve the stored wallpaper mode from localStorage.
     * Returns null if nothing has been saved yet.
     */
    getWallpaperMode: function() {
      return this.WALLPAPER_BANNER;
    },

    /**
     * Persist and apply a wallpaper mode.
     */
    setWallpaperMode: function(mode) {
      this.applyWallpaperMode(this.WALLPAPER_BANNER);
      document.dispatchEvent(new CustomEvent('wallpaperchange', { detail: { mode: this.WALLPAPER_BANNER } }));
    },

    /**
     * Apply a wallpaper mode to the DOM immediately (without saving).
     * This is called both from setWallpaperMode and during page load
     * to restore the previously-saved mode.
     */
    applyWallpaperMode: function(mode) {
      var actualMode = this.WALLPAPER_BANNER;
      document.documentElement.setAttribute('data-wallpaper-mode', actualMode);
      var body = document.body;
      var wrapper = document.getElementById('wallpaper-wrapper');
      var isHome = document.body.classList.contains('is-home');
      var isMobile = window.innerWidth < 1024;
      var isMobileNonHome = isMobile && !isHome;

      // Reset every wallpaper-related class first
      body.classList.remove('enable-banner', 'no-banner-layout', 'wallpaper-transparent');

      // Default: banner-style wallpaper at top of page
      body.classList.add('enable-banner');
      if (wrapper) {
        wrapper.classList.remove('wallpaper-overlay', 'wallpaper-fullscreen');
        if (isMobileNonHome) {
          wrapper.style.display = 'none';
          wrapper.classList.add('mobile-hide-banner');
        } else {
          wrapper.style.display = 'block';
          wrapper.classList.remove('mobile-hide-banner');
        }
      }

      // Apply main content positioning
      var mainContentWrapper = document.querySelector('.z-30.pointer-events-none');
      if (mainContentWrapper) {
        mainContentWrapper.style.setProperty("transition", "none", "important");

        if (isMobileNonHome) {
          mainContentWrapper.classList.add('mobile-main-no-banner');
        } else {
          mainContentWrapper.classList.remove('mobile-main-no-banner');
        }

        if (isMobile && isHome) {
          mainContentWrapper.style.removeProperty('top');
          mainContentWrapper.style.position = '';
          mainContentWrapper.style.zIndex = '';
          mainContentWrapper.style.setProperty('margin-top', '0', 'important');
        } else if (isMobileNonHome) {
          mainContentWrapper.style.setProperty('top', '5.5rem', 'important');
          mainContentWrapper.style.position = '';
          mainContentWrapper.style.zIndex = '';
          mainContentWrapper.style.setProperty('margin-top', '0', 'important');
        } else if (!isHome) {
          mainContentWrapper.style.setProperty('top', 'calc(var(--banner-height) - 3rem)', 'important');
          mainContentWrapper.style.position = '';
          mainContentWrapper.style.zIndex = '';
          mainContentWrapper.style.setProperty('margin-top', '0', 'important');
        } else {
          mainContentWrapper.style.removeProperty('top');
          mainContentWrapper.style.position = '';
          mainContentWrapper.style.zIndex = '';
          mainContentWrapper.style.removeProperty('margin-top');
        }

        mainContentWrapper.style.visibility = 'visible';

        requestAnimationFrame(function() {
          mainContentWrapper.style.removeProperty('transition');
        });
      }

      // Banner title overlay visibility
      var bannerTextOverlay = document.querySelector('.home-text-overlay');
      if (bannerTextOverlay) {
        if (isHome) {
          bannerTextOverlay.classList.remove('hidden');
        } else {
          bannerTextOverlay.classList.add('hidden');
        }
      }
    },

    // ============================================================
    // OVERLAY SETTINGS
    // ============================================================

    /**
     * Set overlay opacity (0.0 - 1.0).
     */
    setOverlayOpacity: function(value) {
      var val = Math.max(0, Math.min(1, parseFloat(value)));
      localStorage.setItem(this.KEYS.overlayOpacity, val);
      document.documentElement.style.setProperty('--overlay-opacity', val);
    },

    /**
     * Get the stored overlay opacity, or the CSS default.
     */
    getOverlayOpacity: function() {
      var stored = localStorage.getItem(this.KEYS.overlayOpacity);
      if (stored !== null) {
        var parsed = parseFloat(stored);
        if (!isNaN(parsed)) return parsed;
      }
      var cssVal = getComputedStyle(document.documentElement).getPropertyValue('--overlay-opacity');
      if (cssVal && cssVal.trim() !== '') {
        return parseFloat(cssVal.trim());
      }
      return 0.5;
    },

    /**
     * Set overlay blur in pixels (integer).
     */
    setOverlayBlur: function(value) {
      var val = Math.max(0, parseInt(value, 10) || 0);
      localStorage.setItem(this.KEYS.overlayBlur, val);
      document.documentElement.style.setProperty('--overlay-blur', val + 'px');
    },

    /**
     * Get the stored overlay blur, or the CSS default.
     */
    getOverlayBlur: function() {
      var stored = localStorage.getItem(this.KEYS.overlayBlur);
      if (stored !== null) {
        var parsed = parseInt(stored, 10);
        if (!isNaN(parsed)) return parsed;
      }
      return 0;
    },

    /**
     * Set card transparency when wallpaper overlay is active (0.0 - 1.0).
     */
    setOverlayCardOpacity: function(value) {
      var val = Math.max(0, Math.min(1, parseFloat(value)));
      localStorage.setItem(this.KEYS.overlayCardOpacity, val);
      document.documentElement.style.setProperty('--card-transparent-opacity', val);
    },

    /**
     * Get the stored card overlay opacity.
     */
    getOverlayCardOpacity: function() {
      var stored = localStorage.getItem(this.KEYS.overlayCardOpacity);
      if (stored !== null) {
        var parsed = parseFloat(stored);
        if (!isNaN(parsed)) return parsed;
      }
      return 0.85;
    },

    // ============================================================
    // TOGGLES (boolean flags)
    // ============================================================

    /**
     * Enable or disable the animated wave effect.
     */
    setWavesEnabled: function(enabled) {
      localStorage.setItem(this.KEYS.wavesEnabled, String(enabled));
      document.documentElement.setAttribute('data-waves-enabled', String(enabled));
    },

    /**
     * Check if waves are enabled.
     */
    isWavesEnabled: function() {
      var stored = localStorage.getItem(this.KEYS.wavesEnabled);
      if (stored !== null) return stored === 'true';
      return true; // default: enabled
    },

    /**
     * Enable or disable gradient backgrounds.
     */
    setGradientEnabled: function(enabled) {
      localStorage.setItem(this.KEYS.gradientEnabled, String(enabled));
      document.documentElement.setAttribute('data-gradient-enabled', String(enabled));
    },

    /**
     * Check if gradient is enabled.
     */
    isGradientEnabled: function() {
      var stored = localStorage.getItem(this.KEYS.gradientEnabled);
      if (stored !== null) return stored === 'true';
      return true; // default: enabled
    },

    /**
     * Enable or disable the banner title text.
     */
    setBannerTitleEnabled: function(enabled) {
      localStorage.setItem(this.KEYS.bannerTitleEnabled, String(enabled));
      document.documentElement.setAttribute('data-banner-title-enabled', String(enabled));
    },

    /**
     * Check if the banner title is enabled.
     */
    isBannerTitleEnabled: function() {
      var stored = localStorage.getItem(this.KEYS.bannerTitleEnabled);
      if (stored !== null) return stored === 'true';
      return true;
    },

    /**
     * Enable or disable the banner carousel.
     */
    setBannerCarouselEnabled: function(enabled) {
      localStorage.setItem(this.KEYS.bannerCarouselEnabled, String(enabled));
    },

    /**
     * Check if the banner carousel is enabled.
     */
    isBannerCarouselEnabled: function() {
      var stored = localStorage.getItem(this.KEYS.bannerCarouselEnabled);
      if (stored !== null) return stored === 'true';
      return true;
    },

    /**
     * Enable or disable the sakura (cherry blossom) falling animation.
     */
    setSakuraEnabled: function(enabled) {
      localStorage.setItem(this.KEYS.sakuraEnabled, String(enabled));
    },

    /**
     * Check if sakura animation is enabled.
     */
    isSakuraEnabled: function() {
      var stored = localStorage.getItem(this.KEYS.sakuraEnabled);
      if (stored !== null) return stored === 'true';
      return true;
    },

    // ============================================================
    // POST LIST LAYOUT
    // ============================================================

    /**
     * Set the post list layout mode (e.g. 'list', 'grid', 'card').
     * Updates both localStorage and live DOM attributes.
     */
    setPostListLayout: function(layout) {
      localStorage.setItem(this.KEYS.postListLayout, layout);
      var container = document.querySelector('.post-list-container');
      if (container) {
        container.setAttribute('data-layout', layout);
      }
      var postList = document.querySelector('.post-list');
      if (postList) {
        postList.setAttribute('data-mode', layout);
      }
      document.dispatchEvent(new CustomEvent('layoutchange', { detail: { layout: layout } }));
    },

    /**
     * Get the stored post list layout.
     */
    getPostListLayout: function() {
      return localStorage.getItem(this.KEYS.postListLayout) || 'list';
    },

    // ============================================================
    // RESTORE ALL SETTINGS ON PAGE LOAD
    // ============================================================

    /**
     * Restore every saved setting without dispatching events.
     * Called during init() to make the page appear in its
     * correct state before any UI wires up.
     */
    restoreAll: function() {
      var self = this;

      // --- Theme ---
      var storedTheme = self.getStoredTheme();
      if (storedTheme) {
        var resolved = self.resolveTheme(storedTheme);
        var isDark = resolved === self.THEME_DARK;
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      }

      // --- Hue ---
      var storedHue = localStorage.getItem(self.KEYS.hue);
      if (storedHue !== null) {
        var hue = parseInt(storedHue, 10);
        if (!isNaN(hue)) {
          document.documentElement.style.setProperty('--hue', Math.max(0, Math.min(360, hue)));
        }
      }

      // --- Wallpaper mode ---
      var storedWallpaper = self.getWallpaperMode();
      if (storedWallpaper) {
        self.applyWallpaperMode(storedWallpaper);
      }

      // --- Overlay settings ---
      var opacity = localStorage.getItem(self.KEYS.overlayOpacity);
      if (opacity !== null) {
        document.documentElement.style.setProperty('--overlay-opacity', parseFloat(opacity));
      }

      var blur = localStorage.getItem(self.KEYS.overlayBlur);
      if (blur !== null) {
        document.documentElement.style.setProperty('--overlay-blur', parseInt(blur, 10) + 'px');
      }

      var cardOpacity = localStorage.getItem(self.KEYS.overlayCardOpacity);
      if (cardOpacity !== null) {
        document.documentElement.style.setProperty('--card-transparent-opacity', parseFloat(cardOpacity));
      }

      // --- Toggles ---
      var waves = localStorage.getItem(self.KEYS.wavesEnabled);
      if (waves !== null) {
        document.documentElement.setAttribute('data-waves-enabled', waves);
      }

      var gradient = localStorage.getItem(self.KEYS.gradientEnabled);
      if (gradient !== null) {
        document.documentElement.setAttribute('data-gradient-enabled', gradient);
      }

      var bannerTitle = localStorage.getItem(self.KEYS.bannerTitleEnabled);
      if (bannerTitle !== null) {
        document.documentElement.setAttribute('data-banner-title-enabled', bannerTitle);
      }

      // --- Post list layout ---
      var layout = localStorage.getItem(self.KEYS.postListLayout);
      if (layout) {
        var container = document.querySelector('.post-list-container');
        if (container) container.setAttribute('data-layout', layout);
        var postList = document.querySelector('.post-list');
        if (postList) postList.setAttribute('data-mode', layout);
      }
    },

    // ============================================================
    // SYSTEM THEME LISTENER
    // ============================================================

    /**
     * Watch for OS-level theme changes and react when the user has
     * chosen the 'system' theme setting.
     */
    initSystemThemeListener: function() {
      var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      var self = this;
      var handler = function() {
        var stored = self.getStoredTheme();
        if (stored === self.THEME_SYSTEM) {
          self.setTheme(self.THEME_SYSTEM);
        }
      };

      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handler);
      }
      // Legacy Safari support
      else if (mediaQuery.addListener) {
        mediaQuery.addListener(handler);
      }
    },

    // ============================================================
    // INIT
    // ============================================================

    /**
     * Initialize the settings system:
     * 1. Restore all persisted settings immediately.
     * 2. Start listening for OS theme changes.
     *
     * This should be called on DOMContentLoaded.
     */
    init: function() {
      if (this.initialized) return;
      this.initialized = true;
      this.restoreAll();
      this.initSystemThemeListener();
    }
  };

  // ============================================================
  // Expose to global scope
  // ============================================================
  window.Settings = Settings;
  document.addEventListener('DOMContentLoaded', function() {
    Settings.init();
  });
})();
