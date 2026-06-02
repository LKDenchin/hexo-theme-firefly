'use strict';

module.exports = function(locals) {
  const config = this.config;
  const themeConfig = this.theme.config;
  
  if (!themeConfig.search || themeConfig.search.enable === false) return;

  const searchField = 'all';
  const posts = locals.posts.sort('-date');
  
  const xmlItems = posts.map(function(post) {
    const title = post.title || '';
    const content = post.content || '';
    const url = config.root + post.path;
    const date = post.date ? post.date.format('YYYY-MM-DD') : '';
    
    return [
      '<entry>',
      '<title>' + escapeXml(title) + '</title>',
      '<url>' + escapeXml(url) + '</url>',
      '<content>' + escapeXml(stripHtmlForSearch(content)) + '</content>',
      '<date>' + date + '</date>',
      '</entry>'
    ].join('\n');
  });
  
  const xml = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<search>',
    xmlItems.join('\n'),
    '</search>'
  ].join('\n');
  
  return {
    path: themeConfig.search.path || '/local-search.xml',
    data: xml
  };
};

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function stripHtmlForSearch(content) {
  return content
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
