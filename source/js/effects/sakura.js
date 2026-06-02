(function() {
  var Sakura = {
    canvas: null,
    ctx: null,
    petals: [],
    animationId: null,
    enabled: true,

    config: {
      num: 21,
      limitTimes: -1,
      minSize: 0.4,
      maxSize: 0.7,
      minOpacity: 0.3,
      maxOpacity: 0.8,
      minHSpeed: 0.1,
      maxHSpeed: 0.3,
      minVSpeed: 0.5,
      maxVSpeed: 1.5,
      rotationSpeed: 0.01,
      fadeSpeed: 0.01,
      zIndex: 999
    },

    init: function() {
      // Only init if sakura is enabled (check localStorage)
      var stored = localStorage.getItem('sakuraEnabled');
      if (stored === 'false') return;

      this.canvas = document.createElement('canvas');
      this.canvas.id = 'sakura-canvas';
      this.canvas.style.cssText = [
        'position: fixed',
        'top: 0',
        'left: 0',
        'width: 100%',
        'height: 100%',
        'pointer-events: none',
        'z-index: ' + this.config.zIndex
      ].join(';') + ';';
      document.body.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');

      this.resize();
      window.addEventListener('resize', this.resize.bind(this));

      // Load configurations from window settings if available
      if (window.__SAKURA_CONFIG) {
        Object.assign(this.config, window.__SAKURA_CONFIG);
      }

      this.createPetals();
      this.animate();

      // Listen for sakura toggle
      var self = this;
      document.addEventListener('sakuratoggle', function(e) {
        self.enabled = e.detail.enabled;
        if (self.enabled) {
          self.canvas.style.display = '';
          self.animate();
        } else {
          self.canvas.style.display = 'none';
          if (self.animationId) cancelAnimationFrame(self.animationId);
        }
      });
    },

    resize: function() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },

    createPetals: function() {
      this.petals = [];
      for (var i = 0; i < this.config.num; i++) {
        this.petals.push(this.createPetal());
      }
    },

    createPetal: function() {
      var img = new Image();
      img.src = '/img/sakura.png';
      return {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height * -1,
        size: (this.config.minSize + Math.random() * (this.config.maxSize - this.config.minSize)) * 20,
        opacity: this.config.minOpacity + Math.random() * (this.config.maxOpacity - this.config.minOpacity),
        speedX: this.config.minHSpeed + Math.random() * (this.config.maxHSpeed - this.config.minHSpeed),
        speedY: this.config.minVSpeed + Math.random() * (this.config.maxVSpeed - this.config.minVSpeed),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * this.config.rotationSpeed,
        limitCross: 0,
        img: img
      };
    },

    animate: function() {
      if (!this.enabled) return;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      var self = this;
      this.petals.forEach(function(petal) {
        petal.x += petal.speedX;
        petal.y += petal.speedY;
        petal.rotation += petal.rotationSpeed;

        // Simple petal drawing (rectangle with rotation, sakura.png as image)
        self.ctx.save();
        self.ctx.globalAlpha = petal.opacity;
        self.ctx.translate(petal.x, petal.y);
        self.ctx.rotate(petal.rotation);

        if (petal.img.complete && petal.img.naturalWidth > 0) {
          self.ctx.drawImage(petal.img, -petal.size / 2, -petal.size / 2, petal.size, petal.size);
        } else {
          // Fallback: draw simple pink ellipse
          self.ctx.fillStyle = 'rgba(255, 182, 193, ' + petal.opacity + ')';
          self.ctx.beginPath();
          self.ctx.ellipse(0, 0, petal.size / 2, petal.size / 3, 0, 0, Math.PI * 2);
          self.ctx.fill();
        }

        self.ctx.restore();

        // Check bounds
        if (petal.y > self.canvas.height + petal.size) {
          petal.limitCross++;
          if (self.config.limitTimes === -1 || petal.limitCross < self.config.limitTimes) {
            petal.y = -petal.size;
            petal.x = Math.random() * self.canvas.width;
          }
        }
        if (petal.x > self.canvas.width + petal.size) petal.x = -petal.size;
        if (petal.x < -petal.size) petal.x = self.canvas.width + petal.size;
      });

      this.animationId = requestAnimationFrame(function() {
        self.animate();
      });
    }
  };

  window.Sakura = Sakura;
  document.addEventListener('DOMContentLoaded', function() {
    Sakura.init();
  });
})();
