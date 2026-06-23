// Sidebar.jsx — left nav for the dashboard.
function Sidebar({ active = 'downloads', onNav }) {
  const items = [
    { key: 'downloads', icon: 'ph-download-simple', label: 'Downloads', count: 24 },
    { key: 'queue', icon: 'ph-list-checks', label: 'Queue', count: 2 },
    { key: 'failed', icon: 'ph-warning-circle', label: 'Failed', count: 1 },
    { key: 'history', icon: 'ph-clock-counter-clockwise', label: 'History' },
  ];
  const dev = [
    { key: 'cli', icon: 'ph-terminal', label: 'CLI & MCP' },
    { key: 'api', icon: 'ph-code', label: 'API tokens' },
    { key: 'webhooks', icon: 'ph-plug', label: 'Webhooks' },
  ];
  const settings = [
    { key: 'billing', icon: 'ph-credit-card', label: 'Billing' },
    { key: 'settings', icon: 'ph-gear', label: 'Settings' },
  ];
  return (
    <aside className="sidebar">
      <a href="../marketing-site/index.html" className="sb-brand">
        <img src="../../assets/favicon.svg" alt="Meathill" /> Meathill
      </a>
      <div className="sb-group">Tasks</div>
      {items.map((it) => (
        <a
          key={it.key}
          className={'sb-link' + (active === it.key ? ' active' : '')}
          onClick={(e) => {
            e.preventDefault();
            onNav?.(it.key);
          }}
          href="#"
        >
          <i className={`ph ${it.icon}`}></i>
          {it.label}
          {it.count != null && <span className="count">{it.count}</span>}
        </a>
      ))}
      <div className="sb-group">Developer</div>
      {dev.map((it) => (
        <a key={it.key} className="sb-link" href="#" onClick={(e) => e.preventDefault()}>
          <i className={`ph ${it.icon}`}></i>
          {it.label}
        </a>
      ))}
      <div className="sb-group">Account</div>
      {settings.map((it) => (
        <a key={it.key} className="sb-link" href="#" onClick={(e) => e.preventDefault()}>
          <i className={`ph ${it.icon}`}></i>
          {it.label}
        </a>
      ))}
      <div className="sb-spacer"></div>
      <div className="sb-plan">
        <div className="plan-row">
          <div className="avatar">M</div>
          <div className="who">
            <b>Meathill</b>
            <br />
            <small>Free plan · 3/10 today</small>
          </div>
          <i className="ph ph-caret-up-down" style={{ color: 'var(--muted-foreground)' }}></i>
        </div>
      </div>
    </aside>
  );
}
window.Sidebar = Sidebar;
