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
