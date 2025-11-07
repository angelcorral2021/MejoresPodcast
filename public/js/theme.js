// Theme handling moved out of HTML to allow stricter CSP (no 'unsafe-inline' for scripts)
(function () {
  function getInitialTheme() {
    try {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  }

  function setTheme(theme) {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    } catch (e) {
      // ignore
    }
  }

  // Apply initial theme as early as possible
  var initial = getInitialTheme();
  setTheme(initial);

  // Expose a global toggle function for the button
  window.__mejoresPodcastsToggleTheme = function () {
    var current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    // update aria-pressed on the button if present
    try {
      var btn = document.getElementById('theme-toggle');
      if (btn) btn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    } catch (e) {}
  };

  // Keep listening to system changes only if user hasn't chosen
  try {
    if (!localStorage.getItem('theme') && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        setTheme(e.matches ? 'dark' : 'light');
      });
    }
  } catch (e) {}
})();

// Attach event listener to the button when DOM is ready
(function () {
  function attach() {
    try {
      var btn = document.getElementById('theme-toggle');
      if (btn) {
        // Reflect initial aria-pressed
        btn.setAttribute('aria-pressed', document.documentElement.classList.contains('dark') ? 'true' : 'false');
        // Avoid duplicate listeners
        btn.addEventListener('click', function () {
          if (window.__mejoresPodcastsToggleTheme) window.__mejoresPodcastsToggleTheme();
        });
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
})();
