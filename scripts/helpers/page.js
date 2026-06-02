'use strict';

hexo.extend.helper.register('is_home_page', function() {
  return this.is_home ? this.is_home() : false;
});

hexo.extend.helper.register('is_post_page', function() {
  return this.is_post ? this.is_post() : false;
});

hexo.extend.helper.register('is_archive_page', function() {
  return this.is_archive ? this.is_archive() : false;
});

hexo.extend.helper.register('page_type', function() {
  if (this.is_home()) return 'home';
  if (this.is_post()) return 'post';
  if (this.is_archive()) return 'archive';
  if (this.is_category()) return 'category';
  if (this.is_tag()) return 'tag';
  return 'page';
});
