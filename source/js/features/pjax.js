(function() {
  function initPjax() {
    if (typeof Pjax === 'undefined') {
      console.warn('[PJAX] Pjax library is not loaded');
      return;
    }

    try {
      window.pjax = new Pjax({
        selectors: [
          'title',
          '#banner-overlay-container',
          '#navbar-menu',
          '#main-content',
          '.sidebar-right'
        ],
        elements: 'a[href]:not([target="_blank"]):not([href^="#"]):not([href^="javascript:"]):not([download])',
        switches: {
          '#banner-overlay-container': Pjax.switches.outerHTML,
          '#main-content': Pjax.switches.outerHTML,
          '#navbar-menu': Pjax.switches.outerHTML,
          '.sidebar-right': Pjax.switches.outerHTML
        },
        cacheBust: false,
        scrollTo: false
      });

      console.log('[Firefly Hexo] PJAX initialized successfully');
    } catch (err) {
      console.error('[Firefly Hexo] PJAX init error:', err);
    }

    document.addEventListener('pjax:send', function() {
      var mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.style.opacity = '0.4';
        mainContent.style.transition = 'opacity 0.15s ease';
      }
    });

    document.addEventListener('pjax:complete', function() {
      var mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.style.opacity = '1';
      }

      // Update body class (is-home)
      var isHomeNew = !!document.querySelector('#banner-overlay-container .home-text-overlay');
      if (isHomeNew) {
        document.body.classList.add('is-home');
      } else {
        document.body.classList.remove('is-home');
      }

      // Re-initialize Typewriter effect
      if (typeof window.initTypewriter === 'function') {
        window.initTypewriter();
      }

      // Re-initialize UI & post components
      if (window.TOC && typeof window.TOC.init === 'function') {
        window.TOC.init();
      }
      if (window.PostLayoutManager && typeof window.PostLayoutManager.init === 'function') {
        window.PostLayoutManager.init();
      }
      if (window.ScrollManager && typeof window.ScrollManager.init === 'function') {
        window.ScrollManager.init();
      }

      // Re-initialize calendar widget
      if (typeof window.initCalendar === 'function') {
        window.initCalendar();
      }

      // Process code blocks
      if (typeof window.processCodeBlocks === 'function') {
        setTimeout(window.processCodeBlocks, 50);
      }

      // Fancybox lightbox re-binding
      if (window.Fancybox && typeof window.Fancybox.bind === 'function') {
        try {
          window.Fancybox.unbind('[data-fancybox]');
          window.Fancybox.bind('[data-fancybox]', {});
        } catch (e) {}
      }

      // KaTeX / MathJax re-render
      if (typeof window.renderMathInElement === 'function') {
        window.renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false }
          ]
        });
      } else if (window.MathJax && typeof window.MathJax.typesetPromise === 'function') {
        window.MathJax.typesetPromise();
      }

      // Mermaid re-render
      if (window.mermaid && typeof window.mermaid.run === 'function') {
        window.mermaid.run();
      }

      // Scroll position handling
      if (location.hash) {
        var target = document.querySelector(location.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPjax);
  } else {
    initPjax();
  }
})();
