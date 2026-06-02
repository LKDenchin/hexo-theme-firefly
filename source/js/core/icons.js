(function() {
  var IconSystem = {
    /**
     * Map of Iconify-style icon names to Unicode characters.
     * These provide a lightweight, zero-dependency replacement
     * for heavy icon libraries. The UTF-8 symbols render well
     * on all modern browsers and operating systems.
     */
    icons: {
      'home': '\u{1F3E0}',           // House
      'archive': '\u{1F4C1}',        // File folder
      'search': '\u{1F50D}',         // Magnifying glass
      'theme': '\u{1F319}',          // Moon
      'settings': '\u{2699}\uFE0F',  // Gear
      'sun': '\u{2600}\uFE0F',       // Sun
      'moon': '\u{1F319}',           // Moon
      'rss': '\u{1F4E1}',            // Satellite antenna
      'github': '\u{1F419}',         // Octopus
      'twitter': '\u{1F426}',        // Bird
      'email': '\u{2709}\uFE0F',     // Envelope
      'link': '\u{1F517}',           // Link
      'tag': '\u{1F3F7}\uFE0F',      // Label
      'category': '\u{1F4C2}',       // Open file folder
      'calendar': '\u{1F4C5}',       // Calendar
      'clock': '\u{1F550}',          // Clock
      'chevron-down': '\u25BC',      // Down-pointing triangle
      'chevron-up': '\u25B2',        // Up-pointing triangle
      'chevron-left': '\u25C0',      // Left-pointing triangle
      'chevron-right': '\u25B6',     // Right-pointing triangle
      'external': '\u2197',          // North east arrow
      'close': '\u2715',             // Multiplication X
      'menu': '\u2630',              // Trigram for heaven
      'music': '\u{1F3B5}',          // Musical note
      'book': '\u{1F4D6}',           // Open book
      'image': '\u{1F5BC}\uFE0F',    // Framed picture
      'heart': '\u{2764}\uFE0F',     // Red heart
      'star': '\u2B50',              // Star
      'pin': '\u{1F4CC}',            // Pushpin
      'fire': '\u{1F525}',           // Fire
      'copy': '\u{1F4CB}',           // Clipboard
      'check': '\u2713',             // Check mark
    },

    /**
     * Return the Unicode symbol for a given icon name.
     * Falls back to a small blue diamond if the name is unknown.
     */
    getIcon: function(name) {
      return this.icons[name] || '\u{1F539}';
    },

    /**
     * Replace the text content of a DOM element with the
     * icon for the given name.
     */
    render: function(container, iconName) {
      if (container) {
        container.textContent = this.getIcon(iconName);
      }
    },

    /**
     * Scan the entire document for elements with a [data-icon]
     * attribute and populate them with the matching Unicode icon.
     *
     * Example usage in templates:
     *   <span data-icon="home"></span>
     *   <i data-icon="search"></i>
     */
    init: function() {
      var self = this;
      document.querySelectorAll('[data-icon]').forEach(function(el) {
        var iconName = el.dataset.icon;
        if (iconName) {
          self.render(el, iconName);
        }
      });
    }
  };

  // ============================================================
  // Expose to global scope
  // ============================================================
  window.IconSystem = IconSystem;
  document.addEventListener('DOMContentLoaded', function() {
    IconSystem.init();
  });
})();
