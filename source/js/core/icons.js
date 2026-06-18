(function() {
  /**
   * Icon System — Material Symbols Outlined
   *
   * Templates use <span class="material-symbols-outlined">icon_name</span>.
   * The CSS @font-face loads the variable font; ligatures render automatically.
   *
   * This script only kicks in when the font FAILS to load, replacing each
   * ligature span with a Unicode fallback character so the UI stays usable.
   */

  var IconSystem = {
    /* =========================================================================
     * Unicode fallback map — used only when the web font is unavailable.
     * ========================================================================= */
    fallbacks: {
      // Navigation
      'home':                     '\u{1F3E0}',
      'arrow_back':               '\u2190',
      'arrow_forward':            '\u2192',
      'chevron_right':            '\u25B6',
      'chevron_left':             '\u25C0',
      'expand_more':              '\u25BC',
      'expand_less':              '\u25B2',
      'subdirectory_arrow_right': '\u21B3',
      'north_east':               '\u2197',
      'open_in_new':              '\u2197',
      'menu_open':                '\u2630',
      'menu_close':               '\u2715',
      'navigate_before':          '\u25C0',
      'navigate_next':            '\u25B6',

      // Actions
      'search':           '\u{1F50D}',
      'close':            '\u2715',
      'menu':             '\u2630',
      'more_horiz':       '\u22EF',
      'more_vert':        '\u22EE',
      'refresh':          '\u21BB',
      'sync':             '\u21BB',
      'arrow_upward':     '\u2191',
      'arrow_downward':   '\u2193',
      'arrow_left':       '\u2190',
      'arrow_right':      '\u2192',
      'add':              '+',
      'remove':           '\u2212',
      'delete':           '\u{1F5D1}',
      'content_copy':     '\u{1F4CB}',
      'check':            '\u2713',
      'done':             '\u2713',
      'edit':             '\u270E',
      'settings':         '\u2699\uFE0F',
      'build':            '\u{1F527}',
      'bookmark':         '\u{1F516}',
      'bookmark_added':   '\u{1F516}',
      'favorite':         '\u2605',
      'star':             '\u2B50',
      'share':            '\u{1F517}',
      'send':             '\u{1F4E8}',
      'download':         '\u2B07',
      'upload':           '\u2B06',
      'push_pin':         '\u{1F4CC}',
      'link':             '\u{1F517}',
      'visibility':       '\u{1F441}',
      'visibility_off':   '\u{1F441}',
      'play_arrow':       '\u25B6\uFE0F',
      'pause':            '\u23F8',
      'skip_previous':    '\u23EE',
      'skip_next':        '\u23ED',
      'shuffle':          '\u{1F500}',
      'repeat':           '\u{1F501}',
      'repeat_one':       '\u{1F501}',
      'queue_music':      '\u{1F3B5}',
      'volume_down':      '\u{1F509}',
      'volume_mute':      '\u{1F507}',
      'volume_off':       '\u{1F507}',

      // Content
      'description':       '\u{1F4C4}',
      'article':           '\u{1F4F0}',
      'folder':            '\u{1F4C1}',
      'folder_open':       '\u{1F4C2}',
      'archive':           '\u{1F4E6}',
      'insert_drive_file': '\u{1F4C4}',
      'cloud':             '\u2601',
      'cloud_queue':       '\u2601',
      'photo':             '\u{1F5BC}',
      'image':             '\u{1F5BC}',
      'movie':             '\u{1F3AC}',
      'music_note':        '\u{1F3B5}',
      'headphones':        '\u{1F3A7}',
      'volume_up':         '\u{1F50A}',
      'file_text':         '\u{1F4C4}',
      'file':              '\u{1F4C4}',
      'text_snippet':      '\u{1F4DD}',
      'code_blocks':       '\u{1F4BB}',

      // Communication
      'mail':          '\u2709\uFE0F',
      'email':         '\u2709\uFE0F',
      'chat':          '\u{1F4AC}',
      'forum':         '\u{1F4AC}',
      'rss_feed':      '\u{1F4E1}',
      'rss':           '\u{1F4E1}',
      'language':      '\u{1F310}',
      'translate':     '\u{1F310}',
      'message':       '\u{1F4AC}',
      'send_message':  '\u{1F4E8}',

      // People
      'person':         '\u{1F464}',
      'group':          '\u{1F465}',
      'person_add':     '\u{1F464}',
      'account_circle': '\u{1F464}',
      'face':           '\u{1F642}',
      'user':           '\u{1F464}',
      'users':          '\u{1F465}',

      // Time
      'schedule':       '\u{1F550}',
      'calendar_today': '\u{1F4C5}',
      'calendar_month': '\u{1F4C5}',
      'calendar':       '\u{1F4C5}',
      'clock':          '\u{1F550}',
      'update':         '\u{1F550}',
      'history':        '\u{1F550}',
      'timer':          '\u23F1',
      'alarm':          '\u23F0',
      'date_range':     '\u{1F4C5}',

      // Toggle / Controls
      'toggle_on':               '\u2611',
      'toggle_off':              '\u2610',
      'check_box':               '\u2611',
      'check_box_outline_blank': '\u2610',
      'radio_button_checked':    '\u25CF',
      'radio_button_unchecked':  '\u25CB',
      'switch':                  '\u25CF',
      'switch_off':              '\u25CB',

      // Status
      'info':         '\u2139\uFE0F',
      'warning':      '\u26A0\uFE0F',
      'error':        '\u274C',
      'help':         '\u2753',
      'verified':     '\u2705',
      'lock':         '\u{1F512}',
      'lock_open':    '\u{1F513}',
      'key':          '\u{1F511}',
      'security':     '\u{1F512}',
      'alert_circle': '\u26A0\uFE0F',
      'check_circle': '\u2705',
      'cancel':       '\u274C',

      // Social / Tech
      'code':         '\u{1F4BB}',
      'terminal':     '\u{1F4BB}',
      'bug_report':   '\u{1F41B}',
      'lightbulb':    '\u{1F4A1}',
      'extension':    '\u{1F9E9}',
      'puzzle':       '\u{1F9E9}',
      'power':        '\u23FB',
      'github':       '\u{1F419}',
      'gite':          '\u{1F419}',
      'twitter':      '\u{1F426}',
      'git':          '\u{1F419}',
      'server':       '\u{1F4BB}',
      'database':     '\u{1F4BE}',
      'cloud_server': '\u2601',
      'cpu':          '\u{1F4BB}',

      // Commerce
      'shopping_cart': '\u{1F6D2}',
      'sell':          '\u{1F3F7}',
      'local_offer':   '\u{1F3F7}',
      'wallet':        '\u{1F45B}',
      'tag':           '\u{1F3F7}',
      'price_tag':     '\u{1F3F7}',

      // Misc / Theme
      'dark_mode':         '\u{1F319}',
      'light_mode':        '\u2600\uFE0F',
      'sun':               '\u2600\uFE0F',
      'moon':              '\u{1F319}',
      'theme':             '\u{1F319}',
      'brightness_medium': '\u263C',
      'contrast':          '\u263C',
      'palette':           '\u{1F3A8}',
      'format_paint':      '\u{1F3A8}',
      'auto_awesome':      '\u2728',
      'trending_up':       '\u2197',
      'trending_down':     '\u2198',
      'monitor_heart':     '\u2764\uFE0F',
      'water_drop':        '\u{1F4A7}',
      'eco':               '\u{1F343}',
      'heart':             '\u2764\uFE0F',
      'fire':              '\u{1F525}',
      'pin':               '\u{1F4CC}',
      'copy':              '\u{1F4CB}',
      'attach_money':      '\u{1F4B0}',
      'attach_money_off':  '\u{1F4B0}',
      'money_off':         '\u{1F4B0}',
      'copyright':         '\u00A9',
      'hash':              '\u0023',
      'at_sign':           '\u0040',
      'percent':           '\u0025',

      // Layout
      'view_list':  '\u2630',
      'grid_view':  '\u229E',
      'dashboard':  '\u229E',
      'book':       '\u{1F4D6}',
      'image':      '\u{1F5BC}',
      'music':      '\u{1F3B5}',
      'category':   '\u{1F4C2}',
      'external':   '\u2197',
      'apps':       '\u229E',
      'layers':     '\u{1F4CC}',
      'list':       '\u2630',

      // Site Info Icons
      'globe':             '\u{1F30D}',
      'building':          '\u{1F3ED}',
      'shield':            '\u{1F6E1}',
      'check_circle_outline': '\u2713',
      'computer':          '\u{1F4BB}',
      'mobile':            '\u{1F4F1}',
      'laptop':            '\u{1F4BB}',
      'cog':               '\u2699\uFE0F',
      'wrench':            '\u{1F527}',
      'calendar_clock':    '\u{1F550}',
      'os':                '\u{1F4BB}',
      'platform':          '\u{1F3ED}',
      'license':           '\u{1F6E1}',
      'dns':               '\u{1F5A5}',
      'deployed_code':     '\u{1F4E6}',
      'library_music':     '\u{1F3B5}',
      
      // Extended Material Symbols Icons
      'palette_outline':   '\u{1F3A8}',
      'subtitles_off_outline_rounded': '\u{1F3AD}',
      'sparkles':          '\u2728',
      'package':           '\u{1F4E6}',
      'server':            '\u{1F4BB}',
      'cloud_queue':       '\u2601',
      'schedule':          '\u{1F550}',
      'code_blocks':       '\u{1F4BB}',
      'terminal':          '\u{1F4BB}',
      'database':          '\u{1F4BE}',
      'cpu':               '\u{1F4BB}',
      'cloud_server':      '\u2601',
      'bug_report':        '\u{1F41B}',
      'lightbulb':         '\u{1F4A1}',
      'extension':         '\u{1F9E9}',
      'puzzle':            '\u{1F9E9}',
      'power':             '\u23FB',
      'twitter':           '\u{1F426}',
      'git':               '\u{1F419}',
      'shopping_cart':     '\u{1F6D2}',
      'sell':              '\u{1F3F7}',
      'local_offer':       '\u{1F3F7}',
      'wallet':            '\u{1F45B}',
      'price_tag':         '\u{1F3F7}',
      'dark_mode':         '\u{1F319}',
      'light_mode':        '\u2600\uFE0F',
      'brightness_medium': '\u263C',
      'contrast':          '\u263C',
      'format_paint':      '\u{1F3A8}',
      'auto_awesome':      '\u2728',
      'trending_up':       '\u2197',
      'trending_down':     '\u2198',
      'monitor_heart':     '\u2764\uFE0F',
      'water_drop':        '\u{1F4A7}',
      'eco':               '\u{1F343}',
      'attach_money':      '\u{1F4B0}',
      'attach_money_off':  '\u{1F4B0}',
      'money_off':         '\u{1F4B0}',
      'copyright':         '\u00A9',
      'at_sign':           '\u0040',
      'percent':           '\u0025',
      'view_list':         '\u2630',
      'grid_view':         '\u229E',
      'dashboard':         '\u229E',
      'book':              '\u{1F4D6}',
      'music':             '\u{1F3B5}',
      'category':          '\u{1F4C2}',
      'external':          '\u2197',
      'apps':              '\u229E',
      'layers':            '\u{1F4CC}',
      'folder_open':       '\u{1F4C2}',
      'archive':           '\u{1F4E6}',
      'insert_drive_file': '\u{1F4C4}',
      'photo':             '\u{1F5BC}',
      'movie':             '\u{1F3AC}',
      'headphones':        '\u{1F3A7}',
      'volume_up':         '\u{1F50A}',
      'file_text':         '\u{1F4C4}',
      'text_snippet':      '\u{1F4DD}',
      'mail':              '\u2709\uFE0F',
      'email':             '\u2709\uFE0F',
      'chat':              '\u{1F4AC}',
      'forum':             '\u{1F4AC}',
      'rss_feed':          '\u{1F4E1}',
      'language':          '\u{1F310}',
      'translate':         '\u{1F310}',
      'message':           '\u{1F4AC}',
      'send_message':      '\u{1F4E8}',
      'person':            '\u{1F464}',
      'group':             '\u{1F465}',
      'person_add':        '\u{1F464}',
      'account_circle':    '\u{1F464}',
      'face':              '\u{1F642}',
      'user':              '\u{1F464}',
      'users':             '\u{1F465}',
      'calendar_today':    '\u{1F4C5}',
      'calendar_month':    '\u{1F4C5}',
      'timer':             '\u23F1',
      'alarm':             '\u23F0',
      'date_range':        '\u{1F4C5}',
      'toggle_on':         '\u2611',
      'toggle_off':        '\u2610',
      'check_box':         '\u2611',
      'check_box_outline_blank': '\u2610',
      'radio_button_checked': '\u25CF',
      'radio_button_unchecked': '\u25CB',
      'switch':            '\u25CF',
      'switch_off':        '\u25CB',
      'verified':          '\u2705',
      'lock_open':         '\u{1F513}',
      'key':               '\u{1F511}',
      'security':          '\u{1F512}',
      'alert_circle':      '\u26A0\uFE0F',
      'check_circle':      '\u2705',
      'play_arrow':        '\u25B6\uFE0F',
      'skip_previous':     '\u23EE',
      'skip_next':         '\u23ED',
      'shuffle':           '\u{1F500}',
      'repeat_one':        '\u{1F501}',
      'queue_music':       '\u{1F3B5}',
      'volume_down':       '\u{1F509}',
      'volume_mute':       '\u{1F507}',
      'volume_off':        '\u{1F507}',
      'home':              '\u{1F3E0}',
      'arrow_back':        '\u2190',
      'arrow_forward':     '\u2192',
      'chevron_right':     '\u25B6',
      'chevron_left':      '\u25C0',
      'expand_more':       '\u25BC',
      'expand_less':       '\u25B2',
      'subdirectory_arrow_right': '\u21B3',
      'north_east':        '\u2197',
      'open_in_new':       '\u2197',
      'menu_open':         '\u2630',
      'menu_close':        '\u2715',
      'navigate_before':   '\u25C0',
      'navigate_next':     '\u25B6',
      'search':            '\u{1F50D}',
      'close':             '\u2715',
      'menu':              '\u2630',
      'more_horiz':        '\u22EF',
      'more_vert':         '\u22EE',
      'refresh':           '\u21BB',
      'sync':              '\u21BB',
      'arrow_upward':      '\u2191',
      'arrow_downward':    '\u2193',
      'arrow_left':        '\u2190',
      'arrow_right':       '\u2192',
      'add':               '+',
      'remove':            '\u2212',
      'delete':            '\u{1F5D1}',
      'content_copy':      '\u{1F4CB}',
      'check':             '\u2713',
      'done':              '\u2713',
      'edit':              '\u270E',
      'settings':          '\u2699\uFE0F',
      'build':             '\u{1F527}',
      'bookmark':          '\u{1F516}',
      'bookmark_added':    '\u{1F516}',
      'favorite':          '\u2605',
      'star':              '\u2B50',
      'share':             '\u{1F517}',
      'send':              '\u{1F4E8}',
      'download':          '\u2B07',
      'upload':            '\u2B06',
      'push_pin':          '\u{1F4CC}',
      'link':              '\u{1F517}',
      'visibility':        '\u{1F441}',
      'visibility_off':    '\u{1F441}',
      'description':       '\u{1F4C4}',
      'article':           '\u{1F4F0}',
      'folder':            '\u{1F4C1}',
      'info':              '\u2139\uFE0F',
      'warning':           '\u26A0\uFE0F',
      'error':             '\u274C',
      'help':              '\u2753',
      'cancel':            '\u274C',
    },

    /* =========================================================================
     * Replace all .material-symbols-outlined spans with Unicode fallbacks.
     * Only called when the web font fails to load.
     * ========================================================================= */
    replaceAllMaterialIconsWithFallback: function() {
      var self = this;
      var spans = document.querySelectorAll('.material-symbols-outlined');
      for (var i = 0; i < spans.length; i++) {
        self.patchUnknownIcons(spans[i]);
      }
    },

    /* =========================================================================
     * Replace a single span's ligature text with a Unicode fallback character.
     * ========================================================================= */
    patchUnknownIcons: function(span) {
      var iconName = (span.textContent || '').trim();
      if (!iconName) return;

      var normalizedName = iconName;

      var fallback = this.fallbacks[normalizedName];
      if (fallback) {
        span.textContent = fallback;
        span.classList.add('icon-unknown');
      } else {
        // Completely unknown icon — dim it
        span.classList.add('icon-unknown');
      }
    },

    /* =========================================================================
     * Handle [data-icon] elements (legacy config-driven icons).
     * Supports formats:
     * - icon-name (direct Material Symbols ligature)
     * ========================================================================= */
    renderDataIcons: function() {
      var self = this;
      document.querySelectorAll('[data-icon]').forEach(function(el) {
        var iconName = el.dataset.icon;
        if (!iconName) return;
        
        // Use the icon name directly as Material Symbols ligature
        el.className = 'material-symbols-outlined';
        el.textContent = iconName;
      });
    },

    /* =========================================================================
     * Public init — run once on DOM ready.
     *
     * If the Material Symbols font loaded successfully, the ligatures render
     * natively and we do nothing. If it failed, we swap in Unicode fallbacks.
     * ========================================================================= */
    init: function() {
      var self = this;

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function() {
          var loaded = document.fonts.check('16px "Material Symbols Outlined"');
          if (!loaded) {
            // Font failed to load — activate fallbacks
            self.replaceAllMaterialIconsWithFallback();
            self.renderDataIcons();
          }
          // Font loaded successfully — ligatures work natively, do nothing
        });
      } else {
        // Older browsers without Font Loading API — assume font may not load
        setTimeout(function() {
          self.replaceAllMaterialIconsWithFallback();
          self.renderDataIcons();
        }, 2000);
      }
    }
  };

  window.IconSystem = IconSystem;
  document.addEventListener('DOMContentLoaded', function() {
    IconSystem.init();
  });
})();
