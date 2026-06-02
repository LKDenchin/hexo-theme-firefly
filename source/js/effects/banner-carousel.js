(function() {
  var BannerCarousel = {
    slides: [],
    currentIndex: 0,
    interval: null,
    intervalTime: 5000,

    init: function() {
      this.slides = Array.from(document.querySelectorAll('.banner-image-slide'));
      if (this.slides.length <= 1) return;

      this.intervalTime = parseInt(this.slides[0].dataset.interval) || 5000;
      this.start();
    },

    start: function() {
      if (this.interval) clearInterval(this.interval);
      var self = this;
      this.interval = setInterval(function() {
        self.next();
      }, this.intervalTime);
    },

    stop: function() {
      if (this.interval) clearInterval(this.interval);
    },

    next: function() {
      this.slides[this.currentIndex].classList.remove('active');
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.slides[this.currentIndex].classList.add('active');
    },

    prev: function() {
      this.slides[this.currentIndex].classList.remove('active');
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.slides[this.currentIndex].classList.add('active');
    }
  };

  window.BannerCarousel = BannerCarousel;
  document.addEventListener('DOMContentLoaded', function() {
    BannerCarousel.init();
  });
})();
