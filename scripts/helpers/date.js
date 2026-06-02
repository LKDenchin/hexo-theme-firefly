'use strict';

const moment = require('moment');

hexo.extend.helper.register('format_date', function(date, format) {
  return moment(date).format(format || 'YYYY-MM-DD');
});

hexo.extend.helper.register('days_ago', function(date) {
  return moment(date).fromNow();
});

hexo.extend.helper.register('site_running_days', function(startDate) {
  if (!startDate) return '--';
  return moment().diff(moment(startDate), 'days');
});
