(function() {
  var WaterWaves = {
    init: function() {
      // Waves are CSS-driven, no JS animation needed
      // This handles toggle from settings
      document.addEventListener('waveschange', function(e) {
        document.documentElement.setAttribute('data-waves-enabled', String(e.detail.enabled));
      });
    }
  };

  window.WaterWaves = WaterWaves;
  document.addEventListener('DOMContentLoaded', function() {
    WaterWaves.init();
  });
})();
