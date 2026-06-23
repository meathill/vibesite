// ThemeToggle.jsx — React wrapper around window.MhTheme.
function ThemeToggle() {
  const [theme, setTheme] = React.useState(() => window.MhTheme?.current() || 'light');
  React.useEffect(() => {
    const fn = (e) => setTheme(e.detail);
    document.addEventListener('mh-theme', fn);
    return () => document.removeEventListener('mh-theme', fn);
  }, []);
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      className="mh-theme-btn"
      aria-label="Toggle theme"
      title="Toggle theme (⌘⇧L)"
      onClick={() => window.MhTheme.toggle()}
    >
      <i className={`ph ${isDark ? 'ph-moon-stars' : 'ph-sun'}`}></i>
    </button>
  );
}
window.ThemeToggle = ThemeToggle;
