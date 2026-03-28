(function () {
  'use strict';

  var STORAGE_KEY = 'essais-dark-mode';

  function initDarkMode() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') {
      document.documentElement.classList.add('dark');
    }
    var toggle = document.querySelector('.progress-bar__dark-toggle');
    if (toggle) {
      updateToggleLabel(toggle);
      toggle.addEventListener('click', function () {
        document.documentElement.classList.toggle('dark');
        var isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem(STORAGE_KEY, isDark);
        updateToggleLabel(toggle);
      });
    }
  }

  function updateToggleLabel(btn) {
    var isDark = document.documentElement.classList.contains('dark');
    btn.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
    btn.setAttribute('aria-label', isDark ? 'Mode clair' : 'Mode sombre');
  }

  function initTOC() {
    var trigger = document.querySelector('.progress-bar__text');
    var overlay = document.querySelector('.toc-overlay');
    if (!trigger || !overlay) return;

    trigger.addEventListener('click', function () {
      overlay.classList.add('open');
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        overlay.classList.remove('open');
      }
    });
  }

  function initKeyboardNav() {
    var prevLink = document.querySelector('.chapter-nav__prev');
    var nextLink = document.querySelector('.chapter-nav__next');

    document.addEventListener('keydown', function (e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (document.querySelector('.toc-overlay.open')) return;

      if (e.key === 'ArrowLeft' && prevLink) {
        window.location.href = prevLink.href;
      } else if (e.key === 'ArrowRight' && nextLink) {
        window.location.href = nextLink.href;
      }
    });
  }

  function initScrollProgress() {
    var fill = document.querySelector('.progress-bar__fill');
    if (!fill) return;

    function updateProgress() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      fill.style.width = Math.min(progress, 100) + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initDarkMode();
    initTOC();
    initKeyboardNav();
    initScrollProgress();
  });
})();
