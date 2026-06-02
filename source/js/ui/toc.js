(function() {
  const TOC = {
    headings: [],
    tocLinks: [],
    
    init() {
      if (this.initialized) return;
      this.initialized = true;
      this.buildTOC();
      this.bindScroll();
      this.bindFloatingButton();
    },
    
    buildTOC() {
      // Get headings from article content
      const container = document.querySelector('.markdown-body');
      if (!container) return;
      
      this.headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const tocContainer = document.querySelector('#toc-body');
      const floatingPanel = document.querySelector('.floating-toc-panel');
      const target = tocContainer || floatingPanel;
      if (!target || this.headings.length === 0) return;
      
      let html = '';
      this.headings.forEach((h, i) => {
        const level = parseInt(h.tagName[1]);
        const id = h.id || `heading-${i}`;
        if (!h.id) h.id = id;
        html += `<div class="toc-item toc-level-${level}">
          <a href="#${id}">${h.textContent}</a>
        </div>`;
      });
      
      target.innerHTML = html;
      this.tocLinks = Array.from(target.querySelectorAll('.toc-item'));

      // Bind click handlers for smooth scrolling with offset
      target.querySelectorAll('.toc-item a').forEach(a => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = a.getAttribute('href').substring(1);
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            const rect = targetEl.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const offset = 80; // 3.5rem navbar + extra padding
            const targetY = rect.top + scrollTop - offset;
            window.scrollTo({
              top: targetY,
              behavior: 'smooth'
            });
            // Update URL hash without causing a page jump
            history.pushState(null, null, `#${targetId}`);
          }
        });
      });
    },
    
    bindScroll() {
      if (this.tocLinks.length === 0) return;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            this.tocLinks.forEach(link => {
              link.classList.toggle('active', link.querySelector('a').getAttribute('href') === `#${id}`);
            });
          }
        });
      }, { rootMargin: '-80px 0px -80% 0px' });
      
      this.headings.forEach(h => observer.observe(h));
    },
    
    bindFloatingButton() {
      const btn = document.querySelector('.floating-toc-btn');
      const panel = document.querySelector('.floating-toc-panel');
      if (!btn || !panel) return;
      
      btn.addEventListener('click', () => {
        panel.classList.toggle('hidden');
      });
    }
  };
  
  window.TOC = TOC;
  document.addEventListener('DOMContentLoaded', () => TOC.init());
})();
