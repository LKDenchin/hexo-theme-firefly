'use strict';

hexo.extend.helper.register('theme_config', function(key, defaultValue) {
  const theme = hexo.theme.config;
  if (key) {
    const keys = key.split('.');
    let value = theme;
    for (const k of keys) {
      if (value === undefined || value === null) return defaultValue;
      value = value[k];
    }
    return value !== undefined ? value : defaultValue;
  }
  return theme;
});
