// TopBar.jsx — sticky top bar with crumbs + global search + actions.
function TopBar({ section = 'Downloads' }) {
  return (
    <div className="topbar">
      <div className="crumbs">
        <span>Dashboard</span>
        <i className="ph ph-caret-right" style={{ fontSize: 11, opacity: 0.6 }}></i>
        <b>{section}</b>
      </div>
      <div className="actions">
        <div className="search">
          <i className="ph ph-magnifying-glass"></i>
          <input placeholder="Search downloads, urls, IDs…" />
          <kbd>⌘K</kbd>
        </div>
        <button className="btn btn-md btn-ghost" title="Notifications">
          <i className="ph ph-bell"></i>
        </button>
        <ThemeToggle />
      </div>
    </div>
  );
}
window.TopBar = TopBar;
