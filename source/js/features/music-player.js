(function() {
  var MusicPlayer = {
    init: function() {
      // MetingJS auto-initializes via <meting-js> custom element
      // Handle APlayer instance if present
      this.waitForAPlayer();
    },

    waitForAPlayer: function() {
      var self = this;

      // APlayer is loaded via CDN and creates window.APlayer
      // The <meting-js> element handles initialization
      var checkInterval = setInterval(function() {
        var metingEl = document.querySelector('meting-js');
        if (metingEl && metingEl.aplayer) {
          clearInterval(checkInterval);
          self.onAPlayerReady(metingEl.aplayer);
        }
      }, 500);

      // Timeout after 10 seconds
      setTimeout(function() {
        clearInterval(checkInterval);
      }, 10000);
    },

    onAPlayerReady: function(ap) {
      // Store reference
      window.__aplayer = ap;

      // Force playlist and lyrics to fold/close on startup
      if (ap.lrc) {
        ap.lrc.hide();
      }
      if (ap.list) {
        ap.list.close();
      }

      // Handle volume from settings
      var savedVolume = localStorage.getItem('musicVolume');
      if (savedVolume !== null) {
        ap.volume(parseFloat(savedVolume));
      }

      ap.on('volumechange', function() {
        localStorage.setItem('musicVolume', ap.audio.volume);
      });
    }
  };

  window.MusicPlayer = MusicPlayer;
  document.addEventListener('DOMContentLoaded', function() {
    MusicPlayer.init();
  });
})();
