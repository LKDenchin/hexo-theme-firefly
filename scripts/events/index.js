'use strict';

hexo.on('generateBefore', function() {
  if (this.theme.config) {
    // Merge default configs
    const path = require('path');
    const fs = require('fs');
    
    // Inject theme config as global data
    const config = this.theme.config;
    this.locals.set('theme_config', config);
  }
});
