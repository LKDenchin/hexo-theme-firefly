(function() {
  var WallpaperManager = {
    initialized: false,
    init: function() {
      if (this.initialized) return;
      this.initialized = true;
      // Wallpaper switching is removed. Always default to banner mode.
    }
  };

  window.WallpaperManager = WallpaperManager;
  document.addEventListener('DOMContentLoaded', function() {
    WallpaperManager.init();
  });
})();
