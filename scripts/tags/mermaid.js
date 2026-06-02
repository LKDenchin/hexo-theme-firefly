'use strict';

hexo.extend.tag.register('mermaid', function(args, content) {
  return '<div class="mermaid">\n' + content + '\n</div>';
}, { ends: true });
