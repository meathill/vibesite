/* shared/theme-toggle.js — drop-in dark mode toggle.
   Renders a floating control AND can be embedded in any topbar by calling
   window.MhTheme.mount(targetEl).
   Persists in localStorage as 'mh-theme'.
*/
(function () {
  const KEY = 'mh-theme';
  function read() {
    try { return localStorage.getItem(KEY); } catch (_) { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, v); } catch (_) {}
  }
  function preferred() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }
  function current() { return read() || preferred(); }
  function apply(theme) {
    const root = document.documentElement;
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
  }
  function set(theme) { apply(theme); write(theme); document.dispatchEvent(new CustomEvent('mh-theme', { detail: theme })); }
  function toggle() { set(current() === 'dark' ? 'light' : 'dark'); }

  // Run early so we don't get a light-flash
  apply(current());

  function mount(target, opts) {
    opts = opts || {};
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = (opts.className || 'mh-theme-btn');
    btn.setAttribute('aria-label', 'Toggle theme');
    btn.title = 'Toggle theme (click) · ⌘⇧L';
    const render = () => {
      const isDark = current() === 'dark';
      btn.innerHTML = isDark
        ? '<i class="ph ph-moon-stars"></i>'
        : '<i class="ph ph-sun"></i>';
    };
    render();
    btn.addEventListener('click', () => { toggle(); render(); });
    document.addEventListener('mh-theme', render);
    target.appendChild(btn);
    return btn;
  }

  // Keyboard shortcut: ⌘⇧L / Ctrl⇧L
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
      e.preventDefault();
      toggle();
    }
  });

  window.MhTheme = { current, set, toggle, mount };
})();
