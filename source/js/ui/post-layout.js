(function() {
  const PostLayoutManager = {
    init() {
      if (this.initialized) return;
      this.initialized = true;
      // Mobile defaults to grid layout (no saved preference yet)
      if (window.innerWidth <= 768 && !localStorage.getItem('postListLayout')) {
        if (window.Settings) window.Settings.setPostListLayout('grid');
      }
      this.bindLayoutButtons();
      this.syncButtonStates();
      // Listen for layout changes from elsewhere (e.g. settings panel)
      document.addEventListener('layoutchange', () => this.syncButtonStates());
    },
    
    syncButtonStates() {
      const current = window.Settings ? window.Settings.getPostListLayout() : 'list';
      document.querySelectorAll('.layout-buttons').forEach(group => {
        group.querySelectorAll('button[data-layout]').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.layout === current);
        });
      });
    },
    
    bindLayoutButtons() {
      document.querySelectorAll('.layout-buttons button[data-layout]').forEach(btn => {
        btn.addEventListener('click', () => {
          const layout = btn.dataset.layout;
          if (!layout) return;
          window.Settings.setPostListLayout(layout);
        });
      });
    }
  };
  
  window.PostLayoutManager = PostLayoutManager;
  document.addEventListener('DOMContentLoaded', () => PostLayoutManager.init());
})();
