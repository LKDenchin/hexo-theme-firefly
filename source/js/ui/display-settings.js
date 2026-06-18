(function() {
  const DisplaySettings = {
    panel: null,
    initialized: false,
    
    init() {
      if (this.initialized) return;
      this.initialized = true;
      
      this.panel = document.getElementById('display-settings-panel');
      if (!this.panel) return;
      
      this.bindToggle();
      this.bindHueSlider();
      this.bindTransparencySliders();
      this.bindWallpaperButtons();
      this.bindToggles();
      this.bindResetButtons();
    },
    
    toggle() {
      if (!this.panel) return;
      const isOpen = !this.panel.classList.contains('closed');
      if (isOpen) {
        this.panel.classList.add('closed');
        document.body.style.overflow = '';
      } else {
        this.panel.classList.remove('closed');
        this.syncAllValues();
      }
    },
    
    bindToggle() {
      const toggleBtn = document.querySelector('.display-settings-toggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => this.toggle());
      }
      
      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (this.panel && !this.panel.classList.contains('closed')) {
          if (!this.panel.contains(e.target) && !e.target.closest('.display-settings-toggle')) {
            this.toggle();
          }
        }
      });
      
      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.panel && !this.panel.classList.contains('closed')) {
          this.toggle();
        }
      });
    },
    
    // Hue color slider
    bindHueSlider() {
      const slider = this.panel.querySelector('.hue-slider');
      if (!slider) return;
      slider.value = window.Settings.getHue();
      slider.addEventListener('input', (e) => {
        window.Settings.setHue(e.target.value);
      });
    },
    
    bindTransparencySliders() {
      const self = this;
      // Show/hide based on current wallpaper mode
      this.updateTransparencySection();
      document.addEventListener('wallpaperchange', () => this.updateTransparencySection());

      const bindSlider = (id, getter, setter, valueSuffix, elId) => {
        const slider = this.panel.querySelector(id);
        if (!slider) return;
        // Convert stored decimal (0.0-1.0) to percentage for display
        var storedDecimal = getter();
        var percentVal = Math.round(storedDecimal * 100);
        slider.value = percentVal;
        const display = document.getElementById(elId);
        if (display) display.textContent = percentVal + valueSuffix;
        slider.addEventListener('input', (e) => {
          const percent = parseInt(e.target.value, 10);
          const decimal = percent / 100;
          setter(decimal);
          if (display) display.textContent = percent + valueSuffix;
        });
      };
      bindSlider('#slider-wallpaper-opacity', () => window.Settings.getOverlayOpacity(), (v) => window.Settings.setOverlayOpacity(v), '%', 'val-wallpaper-opacity');
      bindSlider('#slider-card-transparency', () => window.Settings.getOverlayCardOpacity(), (v) => window.Settings.setOverlayCardOpacity(v), '%', 'val-card-transparency');

      // Background blur slider — uses integer pixel values, not 0-1 decimals
      const blurSlider = this.panel.querySelector('#slider-background-blur');
      if (blurSlider) {
        const blurDisplay = document.getElementById('val-background-blur');
        var storedBlur = window.Settings.getOverlayBlur();
        blurSlider.value = storedBlur;
        if (blurDisplay) blurDisplay.textContent = storedBlur + 'px';
        blurSlider.addEventListener('input', (e) => {
          const px = parseInt(e.target.value, 10);
          window.Settings.setOverlayBlur(px);
          if (blurDisplay) blurDisplay.textContent = px + 'px';
        });
      }
    },

    updateTransparencySection() {
      const section = this.panel ? this.panel.querySelector('.transparency-section') : null;
      if (!section) return;
      const mode = window.Settings ? window.Settings.getWallpaperMode() : 'banner';
      section.style.display = (mode === 'overlay') ? '' : 'none';
    },
    
    bindRangeSlider(id, callback) {
      const slider = this.panel.querySelector(`#${id}`);
      if (!slider) return;
      slider.addEventListener('input', (e) => callback(parseFloat(e.target.value)));
      // Update display value
      const display = slider.parentElement.querySelector('.range-value');
      if (display) {
        slider.addEventListener('input', (e) => { display.textContent = e.target.value; });
      }
    },
    
    // Wallpaper mode buttons
    bindWallpaperButtons() {
      const self = this;
      this.panel.querySelectorAll('.wallpaper-mode-buttons button').forEach(btn => {
        btn.addEventListener('click', () => {
          const mode = btn.dataset.wallpaper;
          if (!mode) return;
          window.Settings.setWallpaperMode(mode);
          btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    },

    // Toggle switches
    bindToggles() {
      this.bindCheckboxToggle('toggle-waves', (checked) => window.Settings.setWavesEnabled(checked));
      this.bindCheckboxToggle('toggle-gradient', (checked) => window.Settings.setGradientEnabled(checked));
      this.bindCheckboxToggle('toggle-banner-title', (checked) => window.Settings.setBannerTitleEnabled(checked));
      this.bindCheckboxToggle('toggle-sakura', (checked) => window.Settings.setSakuraEnabled(checked));
      this.bindCheckboxToggle('toggle-banner-carousel', (checked) => window.Settings.setBannerCarouselEnabled(checked));
    },
    
    bindCheckboxToggle(id, callback) {
      const checkbox = this.panel.querySelector(`#${id}`);
      if (!checkbox) return;
      checkbox.addEventListener('change', (e) => callback(e.target.checked));
    },
    
    // Reset buttons
    bindResetButtons() {
      this.panel.querySelectorAll('.settings-reset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const section = btn.dataset.resetSection;
          this.resetSection(section);
        });
      });
    },
    
    resetSection(section) {
      switch(section) {
        case 'theme':
          window.Settings.setHue(165);
          const hueSlider = this.panel.querySelector('.hue-slider');
          if (hueSlider) hueSlider.value = 165;
          break;
        case 'layout':
          window.Settings.setPostListLayout('list');
          break;
      }
      this.syncAllValues();
    },
    
    // Sync UI values to match stored settings
    syncAllValues() {
      if (typeof window.Settings === 'undefined') return;
      // Sync hue slider
      const hueSlider = this.panel.querySelector('.hue-slider');
      if (hueSlider) hueSlider.value = window.Settings.getHue();

      // Sync wallpaper mode buttons
      const currentWallpaper = window.Settings.getWallpaperMode();
      this.panel.querySelectorAll('.wallpaper-mode-buttons button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.wallpaper === currentWallpaper);
      });

      // Sync layout buttons
      const currentLayout = window.Settings.getPostListLayout();
      this.panel.querySelectorAll('.layout-buttons button[data-layout]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.layout === currentLayout);
      });

      // Sync toggle switches
      const syncCheckbox = (id, key) => {
        const cb = this.panel.querySelector(`#${id}`);
        const val = localStorage.getItem(key);
        if (cb && val !== null) cb.checked = val === 'true';
      };
      syncCheckbox('toggle-waves', 'wavesEnabled');
      syncCheckbox('toggle-gradient', 'gradientEnabled');
      syncCheckbox('toggle-banner-title', 'bannerTitleEnabled');
      syncCheckbox('toggle-sakura', 'sakuraEnabled');
      syncCheckbox('toggle-banner-carousel', 'bannerCarouselEnabled');
    }
  };
  
  window.DisplaySettings = DisplaySettings;
  document.addEventListener('DOMContentLoaded', () => DisplaySettings.init());
})();
