'use strict';

const fs = require('fs');
const path = require('path');
const fm = require('hexo-front-matter');

function getDynamics(hexoInstance) {
  const dir = path.join(hexoInstance.source_dir, '_dynamics');
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch(e) {}
    return [];
  }
  
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  const list = [];
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = fm.parse(content);
    
    // Render markdown content to HTML using Hexo's renderer
    const htmlContent = hexoInstance.render.renderSync({ text: parsed._content || '', engine: 'markdown' });
    
    list.push({
      title: parsed.title || '',
      date: parsed.date ? new Date(parsed.date) : new Date(),
      author: parsed.author || hexoInstance.config.author || 'Firefly',
      avatar: parsed.avatar || '/img/default-avatar.png',
      location: parsed.location || '',
      sticky: parsed.sticky || parsed.pinned || false,
      images: parsed.images || [],
      content: htmlContent,
      rawContent: parsed._content || ''
    });
  });
  
  // Sort: pinned/sticky first, then date descending
  list.sort((a, b) => {
    if (a.sticky && !b.sticky) return -1;
    if (!a.sticky && b.sticky) return 1;
    return b.date - a.date;
  });
  
  return list;
}

// Register dynamic generator for the /dynamic/ route
hexo.extend.generator.register('dynamic', function(locals) {
  const dynamicsList = getDynamics(this);
  return {
    path: 'dynamic/index.html',
    data: {
      dynamics: dynamicsList,
      type: 'dynamic',
      title: '动态',
      layout: 'dynamic'
    },
    layout: ['dynamic', 'page']
  };
});

// Register helper for accessing dynamics list inside templates (e.g. sidebar widget)
hexo.extend.helper.register('get_dynamics', function() {
  return getDynamics(this.context || hexo);
});
