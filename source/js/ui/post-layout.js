(function() {
  const PostLayoutManager = {
    init() {
      if (this.initialized) return;
      this.initialized = true;
      this.bindLayoutButtons();
    },
    
    bindLayoutButtons() {
      document.querySelectorAll('.layout-buttons button').forEach(btn => {
        btn.addEventListener('click', () => {
          const layout = btn.dataset.layout;
          if (!layout) return;
          window.Settings.setPostListLayout(layout);
          
          // Update active button state
          btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    }
  };
  
  window.PostLayoutManager = PostLayoutManager;
  document.addEventListener('DOMContentLoaded', () => PostLayoutManager.init());
})();
