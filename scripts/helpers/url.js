'use strict';

hexo.extend.helper.register('is_active', function(path, page) {
  if (!page || !page.path) return '';
  if (path === '/' && page.path === 'index.html') return 'active';
  if (page.path.startsWith(path)) return 'active';
  return '';
});

hexo.extend.helper.register('resolve_url', function(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) {
    return url;
  }
  return hexo.config.root + url.replace(/^\//, '');
});
