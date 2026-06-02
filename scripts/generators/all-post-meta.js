'use strict';

hexo.extend.generator.register('all-post-meta', function(locals) {
  const posts = locals.posts.sort('-date').map(post => {
    return {
      id: post.slug || post._id,
      title: post.title || 'Untitled',
      published: post.date ? post.date.toISOString() : new Date().toISOString(),
      path: hexo.config.root + post.path
    };
  });

  return {
    path: 'api/allPostMeta.json',
    data: JSON.stringify(posts)
  };
});
