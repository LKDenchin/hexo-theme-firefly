'use strict';

const zlib = require('zlib');

function encode64(data) {
  return Buffer.from(data).toString('base64');
}

function encodePlantUML(text) {
  // PlantUML's deflate + base64 encoding
  const deflated = zlib.deflateRawSync(text, { level: 9 });
  return Buffer.from(deflated).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

hexo.extend.tag.register('plantuml', function(args, content) {
  const themeConfig = this.theme.config;
  const server = (themeConfig && themeConfig.plantuml && themeConfig.plantuml.server) || 'https://www.plantuml.com/plantuml';
  const encoded = encodePlantUML(content.trim());
  return '<img src="' + server.replace(/\/$/, '') + '/svg/' + encoded + '" alt="PlantUML diagram" class="plantuml-diagram">';
}, { ends: true });
