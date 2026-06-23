// FilterBar.jsx — status segments + search + lang filter + per-post filter.
function FilterBar({ status, onStatus, lang, onLang, counts, query, onQuery }) {
  const statuses = [
    { key: 'pending', label: 'Pending', count: counts.pending },
    { key: 'approved', label: 'Approved', count: counts.approved },
    { key: 'rejected', label: 'Rejected', count: counts.rejected },
    { key: 'all', label: 'All', count: counts.all },
  ];
  const langs = [
    { key: 'all', label: 'All languages' },
    { key: 'en', label: 'English' },
    { key: 'zh', label: '中文' },
    { key: 'ja', label: '日本語' },
    { key: 'es', label: 'Español' },
    { key: 'de', label: 'Deutsch' },
  ];
  return (
    <div className="filterbar">
      <div className="segmented">
        {statuses.map((s) => (
          <button
            key={s.key}
            className={status === s.key ? 'active' : ''}
            onClick={() => onStatus(s.key)}
          >
            {s.label} <span className="count">{s.count}</span>
          </button>
        ))}
      </div>
      <div className="search">
        <i className="ph ph-magnifying-glass"></i>
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search content, user, post id…"
        />
      </div>
      <div className="pull-right">
        <select
          className="btn btn-sm btn-outline"
          style={{ padding: '0 10px' }}
          value={lang}
          onChange={(e) => onLang(e.target.value)}
        >
          {langs.map((l) => (
            <option key={l.key} value={l.key}>
              {l.label}
            </option>
          ))}
        </select>
        <button className="btn btn-sm btn-outline">
          <i className="ph ph-funnel"></i> Filter by post
        </button>
        <button className="btn btn-sm btn-ghost">
          <i className="ph ph-arrows-clockwise"></i>
        </button>
      </div>
    </div>
  );
}
window.FilterBar = FilterBar;
