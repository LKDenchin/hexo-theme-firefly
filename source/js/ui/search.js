(function() {
  const LocalSearch = {
    index: null,
    results: [],
    selectedIndex: -1,
    modal: null,
    input: null,
    resultsContainer: null,
    
    init() {
      if (this.initialized) return;
      this.initialized = true;
      
      this.modal = document.getElementById('search-modal');
      this.input = this.modal ? this.modal.querySelector('input') : null;
      this.resultsContainer = this.modal ? this.modal.querySelector('.search-results') : null;
      if (!this.modal) return;
      
      this.bindEvents();
      this.loadIndex();
    },
    
    async loadIndex() {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', window.__SEARCH_PATH__ || '/search.xml', true);
        xhr.onload = () => {
          if (xhr.status === 200) {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xhr.responseText, 'application/xml');
            this.index = [];
            xml.querySelectorAll('entry').forEach(entry => {
              this.index.push({
                title: entry.querySelector('title')?.textContent || '',
                path: entry.querySelector('url')?.textContent || '',
                content: entry.querySelector('content')?.textContent || '',
                date: entry.querySelector('date')?.textContent || ''
              });
            });
          }
        };
        xhr.send();
      } catch(e) { console.warn('Search index load failed:', e); }
    },
    
    bindEvents() {
      // Toggle buttons
      document.querySelectorAll('.search-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => this.open());
      });
      
      // Close button
      const closeBtn = this.modal.querySelector('.close-btn');
      if (closeBtn) closeBtn.addEventListener('click', () => this.close());
      
      // Backdrop click
      const backdrop = this.modal.querySelector('.search-backdrop');
      if (backdrop) backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.close();
      });
      
      // Input
      if (this.input) {
        this.input.addEventListener('input', (e) => this.search(e.target.value));
        this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
      }
      
      // Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.classList.contains('open')) this.close();
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); this.open(); }
      });
    },
    
    open() {
      this.modal.classList.add('open');
      if (this.input) { this.input.value = ''; this.input.focus(); }
      this.results = [];
      this.selectedIndex = -1;
      this.renderResults();
    },
    
    close() {
      this.modal.classList.remove('open');
    },
    
    search(query) {
      if (!this.index || !query.trim()) {
        this.results = [];
        this.renderResults();
        return;
      }
      const q = query.toLowerCase();
      this.results = this.index.filter(entry => {
        return entry.title.toLowerCase().includes(q) || entry.content.toLowerCase().includes(q);
      }).slice(0, 20);
      this.selectedIndex = -1;
      this.renderResults();
    },
    
    stripHtmlAndMarkdown(text) {
      if (!text) return '';
      
      // Parse HTML to strip all layout and styling components
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = text;
      
      // Remove code elements, images, style, script etc. entirely so they don't clutter excerpts
      tempDiv.querySelectorAll('pre, code, img, style, script, noscript, table, iframe').forEach(el => el.remove());
      
      let cleanText = tempDiv.textContent || tempDiv.innerText || '';
      
      // Strip any markdown structures that might be left
      cleanText = cleanText
        .replace(/<!--[\s\S]*?-->/g, '') // comments
        .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1') // images
        .replace(/\[([^\]]*)\]\([^\)]+\)/g, '$1') // links
        .replace(/^[#\s]+/gm, '') // headers
        .replace(/^[\s-*+>]+/gm, '') // lists/quotes
        .replace(/`([^`]+)`/g, '$1') // inline code
        .replace(/\s+/g, ' ') // collapse whitespaces
        .trim();
        
      return cleanText;
    },

    getExcerpt(content, query) {
      const cleanContent = this.stripHtmlAndMarkdown(content);
      if (!query) return cleanContent.substring(0, 150);
      
      const index = cleanContent.toLowerCase().indexOf(query.toLowerCase());
      if (index === -1) {
        return cleanContent.substring(0, 150);
      }
      
      const start = Math.max(0, index - 40);
      const end = Math.min(cleanContent.length, index + 110);
      let excerpt = cleanContent.substring(start, end);
      if (start > 0) excerpt = '...' + excerpt;
      if (end < cleanContent.length) excerpt = excerpt + '...';
      return excerpt;
    },
    
    renderResults() {
      if (!this.resultsContainer) return;
      
      if (this.results.length === 0) {
        this.resultsContainer.innerHTML = this.input?.value ? 
          '<div class="search-empty">No results found</div>' :
          '<div class="search-hint">Type to search <kbd>Ctrl+K</kbd></div>';
        return;
      }
      
      this.resultsContainer.innerHTML = this.results.map((r, i) => `
        <a href="${r.path}" class="search-result-item ${i === this.selectedIndex ? 'active' : ''}" data-index="${i}">
          <div class="result-title">${this.highlight(r.title, this.input?.value || '')}</div>
          <div class="result-excerpt">${this.highlight(this.getExcerpt(r.content, this.input?.value || ''), this.input?.value || '')}</div>
        </a>
      `).join('');
    },
    
    highlight(text, query) {
      if (!query) return text;
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
    },
    
    handleKeydown(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.results.length - 1);
        this.renderResults();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        this.renderResults();
      } else if (e.key === 'Enter') {
        if (this.selectedIndex >= 0 && this.results[this.selectedIndex]) {
          window.location.href = this.results[this.selectedIndex].path;
        }
      }
    }
  };
  
  window.LocalSearch = LocalSearch;
  document.addEventListener('DOMContentLoaded', () => LocalSearch.init());
})();
