'use strict';

const { stripHTML } = require('hexo-util');

hexo.extend.helper.register('get_excerpt', function(content, length) {
  if (!content) return '';
  const plain = stripHTML(content).trim();
  const maxLen = length || 200;
  if (plain.length <= maxLen) return plain;
  return plain.substring(0, maxLen) + '...';
});

hexo.extend.helper.register('get_reading_time', function(content, lang) {
  if (!content) return '1 min';
  const plain = stripHTML(content);
  const wordsPerMinute = 200;
  const charsPerMinute = 500;
  
  // For CJK, count characters. For others, count words.
  if (lang === 'zh-CN' || lang === 'zh-TW' || lang === 'ja') {
    const minutes = Math.ceil(plain.length / charsPerMinute);
    return Math.max(1, minutes) + ' min';
  }
  const words = plain.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes) + ' min';
});

// Alias: readingTime(post.content, language) - used in post-card.ejs
hexo.extend.helper.register('readingTime', function(content, lang) {
  if (!content) return '1 min';
  const plain = typeof content === 'string' ? content : (content._content || content.content || '');
  return hexo.extend.helper.get('get_reading_time').call(this, plain, lang);
});

hexo.extend.helper.register('get_word_count', function(content) {
  if (!content) return 0;
  return stripHTML(content).length;
});

// Alias: wordcount(page) - used in meta-top.ejs  
hexo.extend.helper.register('wordcount', function(page) {
  const content = page.content || page._content || '';
  return stripHTML(content).length;
});

// full_date(date, format) - used in meta-top.ejs
hexo.extend.helper.register('full_date', function(date, format) {
  if (!date) return '';
  const moment = require('moment');
  return moment(date).format(format || 'YYYY-MM-DD');
});

// min2read(page, {awl, wpm}) - used in meta-top.ejs
hexo.extend.helper.register('min2read', function(page, opts) {
  opts = opts || {};
  const awl = parseInt(opts.awl, 10) || 0;
  const wpm = parseInt(opts.wpm, 10) || 200;
  const content = page.content || page._content || '';
  const plain = stripHTML(content);
  
  if (awl > 0) {
    // awl: average word length, for CJK
    const chars = plain.length;
    const words = Math.floor(chars / awl);
    return Math.max(1, Math.ceil(words / wpm));
  }
  
  // Default: count words
  const words = plain.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wpm));
});

// compare_date(d1, d2) - returns true if d2 > d1 (post was updated after creation)
hexo.extend.helper.register('compare_date', function(d1, d2) {
  if (!d1 || !d2) return false;
  return d2.valueOf() > d1.valueOf();
});

hexo.extend.helper.register('get_cover_image', function(post) {
  if (post.cover) return post.cover;
  if (post.thumbnail) return post.thumbnail;
  if (post.image) return post.image;
  return null;
});

// 注册 strip_html 为 helper — post-card.ejs 中直接以函数形式调用
hexo.extend.helper.register('strip_html', function(str) {
  return stripHTML(str);
});

// related_posts 存根 — 需要 hexo-generator-related-posts 插件
// 如果插件未安装，返回空字符串避免模板报错
hexo.extend.helper.register('related_posts', function(opts) {
  try {
    var posts = hexo.locals.get('posts');
    if (!posts) return '';
    var count = (opts && opts.maxCount) ? parseInt(opts.maxCount, 10) : 6;
    var related = posts.sort('-date').limit(count);
    var result = '';
    related.each(function(post) {
      result += '<a href="' + hexo.config.root + (post.path || '') + '" class="related-post-item">' + (post.title || '') + '</a>';
    });
    return result;
  } catch (e) {
    return '';
  }
});

// fa_icon(name) - Maps icon name to FontAwesome 6 class names
hexo.extend.helper.register('fa_icon', function(name) {
  if (!name) return '';
  name = name.toLowerCase().trim();
  const mapping = {
    'home': 'fa-solid fa-house',
    'archive': 'fa-solid fa-box-archive',
    'category': 'fa-regular fa-folder',
    'categories': 'fa-regular fa-folder',
    'tag': 'fa-solid fa-tag',
    'tags': 'fa-solid fa-tags',
    'about': 'fa-regular fa-user',
    'user': 'fa-regular fa-user',
    'users': 'fa-solid fa-users',
    'friends': 'fa-solid fa-users',
    'guestbook': 'fa-regular fa-comment-dots',
    'message-square': 'fa-regular fa-comment-dots',
    'bangumi': 'fa-solid fa-tv',
    'tv': 'fa-solid fa-tv',
    'gallery': 'fa-regular fa-image',
    'image': 'fa-regular fa-image',
    'images': 'fa-regular fa-images',
    'settings': 'fa-solid fa-gear',
    'search': 'fa-solid fa-magnifying-glass',
    'x': 'fa-solid fa-xmark',
    'close': 'fa-solid fa-xmark',
    'chevron-down': 'fa-solid fa-chevron-down',
    'chevron-up': 'fa-solid fa-chevron-up',
    'chevron-left': 'fa-solid fa-chevron-left',
    'chevron-right': 'fa-solid fa-chevron-right',
    'sun': 'fa-solid fa-sun',
    'moon': 'fa-solid fa-moon',
    'calendar': 'fa-regular fa-calendar',
    'calendar-days': 'fa-regular fa-calendar-days',
    'date-fill': 'fa-regular fa-calendar-days',
    'edit': 'fa-regular fa-pen-to-square',
    'clock': 'fa-regular fa-clock',
    'clock-fill': 'fa-regular fa-clock',
    'chart': 'fa-solid fa-chart-line',
    'list': 'fa-solid fa-list-ul',
    'file-text': 'fa-regular fa-file-lines',
    'eye': 'fa-regular fa-eye',
    'github': 'fa-brands fa-github',
    'email': 'fa-regular fa-envelope',
    'envelope': 'fa-regular fa-envelope',
    'rss': 'fa-solid fa-rss',
    'twitter': 'fa-brands fa-twitter',
    'facebook': 'fa-brands fa-facebook',
    'weibo': 'fa-brands fa-weibo',
    'cc': 'fa-brands fa-creative-commons',
    'cc-by': 'fa-brands fa-creative-commons-by',
    'cc-nc': 'fa-brands fa-creative-commons-nc',
    'cc-sa': 'fa-brands fa-creative-commons-sa',
    'alipay': 'fa-solid fa-credit-card',
    'wechat': 'fa-brands fa-weixin',
    'weixin': 'fa-brands fa-weixin',
    'music': 'fa-solid fa-music',
    'book': 'fa-solid fa-book'
  };
  if (name.startsWith('fa-') || name.includes(' fa-')) {
    return name;
  }
  return mapping[name] || `fa-solid fa-${name}`;
});

