(function() {
  var FancyboxManager = {
    init: function() {
      // 1. Process image containers across markdown content, dynamic posts, and dynamic image grids
      var containers = document.querySelectorAll('.markdown-body, .dynamic-content, .dynamic-images-grid');
      containers.forEach(function(container) {
        var images = container.querySelectorAll('img');
        images.forEach(function(img) {
          var link = img.closest('a[data-fancybox]');
          if (link) {
            if (!link.getAttribute('data-src') && link.getAttribute('href')) {
              link.setAttribute('data-src', link.getAttribute('href'));
            }
            if (!link.getAttribute('data-caption') && img.alt) {
              link.setAttribute('data-caption', img.alt);
            }
          } else {
            if (!img.hasAttribute('data-src')) {
              img.setAttribute('data-src', img.getAttribute('src') || img.src);
            }
            if (!img.hasAttribute('data-fancybox')) {
              img.setAttribute('data-fancybox', 'gallery');
            }
            if (!img.hasAttribute('data-caption') && img.alt) {
              img.setAttribute('data-caption', img.alt);
            }
          }
        });
      });

      // 2. Bind Fancybox if loaded
      if (typeof Fancybox !== 'undefined' && typeof Fancybox.bind === 'function') {
        try {
          Fancybox.unbind('[data-fancybox]');
        } catch (e) {}
        Fancybox.bind('[data-fancybox]', {
          Hash: false,
          Thumbs: {
            autoStart: false
          }
        });
      } else {
        // Provide fallback zoom handler if Fancybox CDN is not available yet
        this.bindSimpleZoom();
      }
    },

    bindSimpleZoom: function() {
      var targets = document.querySelectorAll('.markdown-body img, .dynamic-content img, .dynamic-img, a[data-fancybox]');
      targets.forEach(function(target) {
        if (!target.dataset.zoomBound) {
          target.dataset.zoomBound = 'true';
          target.style.cursor = 'zoom-in';
          target.addEventListener('click', function(e) {
            if (typeof Fancybox !== 'undefined') return;
            e.preventDefault();
            e.stopPropagation();
            var src = target.getAttribute('data-src') || target.getAttribute('href') || target.getAttribute('src') || target.src;
            if (src) window.open(src, '_blank');
          });
        }
      });
    }
  };

  window.FancyboxManager = FancyboxManager;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      FancyboxManager.init();
    });
  } else {
    FancyboxManager.init();
  }
})();
