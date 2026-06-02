(function() {
  var EncryptedPost = {
    init: function() {
      var container = document.getElementById('encrypted-content');
      if (!container) return;

      var encryptedData = container.dataset.encrypted;
      if (!encryptedData) return;

      this.showPasswordPrompt(container, encryptedData);
    },

    showPasswordPrompt: function(container, encryptedData) {
      container.innerHTML = '<div class="encrypted-prompt" style="text-align:center;padding:2rem;">' +
        '<h3>Encrypted Content</h3>' +
        '<p style="margin:1rem 0;color:var(--text-secondary);">This post is encrypted. Please enter the password.</p>' +
        '<div style="display:flex;gap:0.5rem;justify-content:center;max-width:300px;margin:0 auto;">' +
        '<input type="password" class="encrypt-password-input" placeholder="Password" ' +
        'style="flex:1;padding:0.5rem;border:1px solid var(--line-divider);border-radius:var(--radius-medium);background:var(--btn-regular-bg);color:var(--text-primary);">' +
        '<button class="encrypt-submit btn-regular" style="white-space:nowrap;">Decrypt</button>' +
        '</div>' +
        '<p class="encrypt-error" style="color:red;margin-top:0.5rem;display:none;">Wrong password!</p>' +
        '</div>';

      var input = container.querySelector('.encrypt-password-input');
      var submitBtn = container.querySelector('.encrypt-submit');
      var errorEl = container.querySelector('.encrypt-error');

      var self = this;

      var tryDecrypt = function() {
        var pw = input.value;
        self.decrypt(encryptedData, pw).then(function(result) {
          if (result) {
            container.innerHTML = result;
          } else {
            errorEl.style.display = 'block';
          }
        }).catch(function() {
          errorEl.style.display = 'block';
        });
      };

      submitBtn.addEventListener('click', tryDecrypt);
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') tryDecrypt();
      });
    },

    decrypt: function(encryptedData, password) {
      try {
        // Decode base64 data
        var data = JSON.parse(atob(encryptedData));

        // Convert base64 strings to Uint8Array
        var ivB64 = atob(data.iv);
        var iv = new Uint8Array(ivB64.length);
        for (var i = 0; i < ivB64.length; i++) {
          iv[i] = ivB64.charCodeAt(i);
        }

        var ctB64 = atob(data.ciphertext);
        var ciphertext = new Uint8Array(ctB64.length);
        for (var j = 0; j < ctB64.length; j++) {
          ciphertext[j] = ctB64.charCodeAt(j);
        }

        // Derive key from password
        var enc = new TextEncoder();
        var passwordBytes = enc.encode(password);

        return crypto.subtle.importKey('raw', passwordBytes, 'PBKDF2', false, ['deriveKey']).then(function(keyMaterial) {
          return crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt: iv, iterations: 100000, hash: 'SHA-256' },
            keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
          );
        }).then(function(key) {
          return crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, ciphertext);
        }).then(function(plaintext) {
          return new TextDecoder().decode(plaintext);
        }).catch(function() {
          return null;
        });
      } catch (e) {
        return Promise.resolve(null);
      }
    }
  };

  window.EncryptedPost = EncryptedPost;
  document.addEventListener('DOMContentLoaded', function() {
    EncryptedPost.init();
  });
})();
