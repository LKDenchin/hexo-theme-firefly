'use strict';

hexo.extend.tag.register('note', function(args, content) {
  const type = args[0] || 'info';
  const types = ['info', 'note', 'tip', 'warning', 'danger', 'caution'];
  const validType = types.includes(type) ? type : 'info';
  
  return '<div class="admonition ' + validType + '">\n' +
    '<div class="admonition-title">' + (validType.charAt(0).toUpperCase() + validType.slice(1)) + '</div>\n' +
    content + '\n</div>';
}, { ends: true });
