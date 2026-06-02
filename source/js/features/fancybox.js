(function() {
  var FancyboxManager = {
    init: function() {
      if (typeof Fancybox === 'undefined') {
        // If Fancybox isn't loaded, provide simple zoom fallback
        this.bindSimpleZoom();
        return;
      }

      // Initialize Fancybox for images in markdown content
      Fancybox.bind('[data-fancybox]', {});

      // Auto-detect image groups
      var images = document.querySelectorAll('.markdown-body img');
      if (images.length > 0) {
        images.forEach(function(img) {
          img.setAttribute('data-fancybox', 'gallery');
          img.setAttribute('data-caption', img.alt || '');
        });
      }
    },

    bindSimpleZoom: function() {
      // Fallback: open image in new tab
      document.querySelectorAll('.markdown-body img').forEach(function(img) {
        img.addEventListener('click', function() {
          window.open(img.src, '_blank');
        });
      });
    }
  };

  window.FancyboxManager = FancyboxManager;
  document.addEventListener('DOMContentLoaded', function() {
    FancyboxManager.init();
  });
})();
