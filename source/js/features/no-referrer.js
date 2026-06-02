(function() {
  var domains = window.__NO_REFERRER_DOMAINS;
  if (!domains || !domains.length) return;

  function matchesDomain(url, patterns) {
    try {
      var hostname = new URL(url).hostname;
      return patterns.some(function(pattern) {
        var regexPattern = pattern.replace(/\./g, '\\.').replace(/\*/g, '.*');
        return new RegExp('^' + regexPattern + '$').test(hostname);
      });
    } catch (e) {
      return false;
    }
  }

  function processImage(img) {
    if (!img.src || img.hasAttribute('referrerpolicy')) return;
    if (matchesDomain(img.src, domains)) {
      img.setAttribute('referrerpolicy', 'no-referrer');
    }
  }

  document.querySelectorAll('img').forEach(processImage);

  new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      m.addedNodes.forEach(function(node) {
        if (node.nodeName === 'IMG') processImage(node);
        if (node.querySelectorAll) node.querySelectorAll('img').forEach(processImage);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
