(function() {
  class TypewriterEffect {
    constructor(element) {
      this.el = element;
      var textsAttr = element.dataset.texts || element.dataset.text;
      if (!textsAttr) return;
      // Support JSON array via data-texts, or single string via data-text
      try {
        this.texts = JSON.parse(textsAttr);
        if (typeof this.texts === 'string') this.texts = [this.texts];
      } catch (e) {
        this.texts = [textsAttr];
      }
      this.speed = parseInt(element.dataset.speed) || 100;
      this.deleteSpeed = parseInt(element.dataset.deleteSpeed) || 50;
      this.pauseTime = parseInt(element.dataset.pauseTime) || 2000;
      this.currentTextIndex = 0;
      this.charIndex = 0;
      this.isDeleting = false;
      this.timer = null;

      if (this.texts.length > 0) this.start();
    }

    start() {
      if (this.texts.length === 1) {
        this.typeText(this.texts[0]);
        return;
      }
      this.tick();
    }

    tick() {
      const currentText = this.texts[this.currentTextIndex];

      if (this.isDeleting) {
        this.charIndex--;
        this.el.textContent = currentText.substring(0, this.charIndex);
      } else {
        this.charIndex++;
        this.el.textContent = currentText.substring(0, this.charIndex);
      }

      let delay = this.isDeleting ? this.deleteSpeed : this.speed;

      if (!this.isDeleting && this.charIndex === currentText.length) {
        // Finished typing
        if (this.texts.length > 1) {
          delay = this.pauseTime;
          this.isDeleting = true;
        } else {
          return; // Stop for single text
        }
      } else if (this.isDeleting && this.charIndex === 0) {
        // Finished deleting
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        delay = 300;
      }

      this.timer = setTimeout(() => this.tick(), delay);
    }

    typeText(text) {
      if (this.timer) clearTimeout(this.timer);
      this.charIndex = 0;
      const segmenter = new Intl.Segmenter(navigator.language, { granularity: 'grapheme' });
      const segments = [...segmenter.segment(text)];

      segments.forEach((seg, i) => {
        setTimeout(() => {
          this.el.textContent = text.substring(0, seg.index + seg.segment.length);
        }, i * this.speed);
      });
    }

    destroy() {
      if (this.timer) clearTimeout(this.timer);
    }
  }

  function init() {
    document.querySelectorAll('.typewriter').forEach(el => {
      new TypewriterEffect(el);
    });
  }

  window.TypewriterEffect = TypewriterEffect;
  document.addEventListener('DOMContentLoaded', init);
})();
