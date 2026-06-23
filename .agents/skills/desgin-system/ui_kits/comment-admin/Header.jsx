// Header.jsx — sticky brand header + tabs + user menu.
function Header({ tab = 'comments' }) {
  const tabs = [
    { key: 'comments', label: 'Comments', i: 'ph-chat-circle-dots' },
    { key: 'analytics', label: 'Analytics', i: 'ph-chart-bar' },
    { key: 'templates', label: 'AI templates', i: 'ph-sparkle' },
    { key: 'prompts', label: 'Prompts', i: 'ph-magic-wand' },
    { key: 'settings', label: 'Settings', i: 'ph-gear' },
  ];
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <img src="../../assets/favicon.svg" alt="Meathill" />
          <b>Meathill</b>
          <span className="product">
            <i className="ph ph-chat-circle-dots"></i> Comments
          </span>
        </div>
        <nav className="header-tabs">
          {tabs.map((t) => (
            <a
              key={t.key}
              href="#"
              className={tab === t.key ? 'active' : ''}
              onClick={(e) => e.preventDefault()}
            >
              <i className={`ph ${t.i}`}></i>
              {t.label}
            </a>
          ))}
        </nav>
        <div className="header-right">
          <button
            className="btn btn-md btn-ghost"
            title="Notifications"
            style={{ width: 36, padding: 0 }}
          >
            <i className="ph ph-bell"></i>
          </button>
          <ThemeToggle />
          <div className="avatar" title="meathill@example.com">
            M
          </div>
        </div>
      </div>
    </header>
  );
}
window.AdminHeader = Header;
