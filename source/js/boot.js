(function() {
  // Init order matters! Settings must be initialized first

  function init() {
    console.log('[Firefly Hexo] Initializing...');

    // Core init is handled by inline script in layout.ejs
    // This handles post-DOM features

    // Initialize theme manager
    if (window.ThemeManager) ThemeManager.init();

    // Initialize wallpaper manager
    if (window.WallpaperManager) WallpaperManager.init();

    // Initialize display settings
    if (window.DisplaySettings) DisplaySettings.init();

    // Initialize search
    if (window.LocalSearch) LocalSearch.init();

    // Initialize TOC
    if (window.TOC) TOC.init();

    // Initialize scroll behaviors
    if (window.ScrollManager) ScrollManager.init();

    // Initialize post layout switcher
    if (window.PostLayoutManager) PostLayoutManager.init();

    // Initialize typewriter effects
    document.querySelectorAll('.typewriter').forEach(function(el) {
      if (window.TypewriterEffect) new TypewriterEffect(el);
    });

    // Initialize sakura
    if (window.Sakura) Sakura.init();

    // Initialize banner carousel
    if (window.BannerCarousel) BannerCarousel.init();

    // Initialize music player
    if (window.MusicPlayer) MusicPlayer.init();

    // Initialize encrypted post
    if (window.EncryptedPost) EncryptedPost.init();

    // Initialize fancybox
    if (window.FancyboxManager) FancyboxManager.init();

    console.log('[Firefly Hexo] Initialized successfully');
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
