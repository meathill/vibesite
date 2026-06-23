// TaskTable.jsx — the dashboard task table. Mirrors web-shared/components/task-table.tsx.

function StatusPill({ value, stage }) {
  const labels = { done: 'done', queued: 'queued', running: stage || 'running', failed: 'failed' };
  return (
    <span className={`pill ${value}`}>
      <span className="dot"></span>
      {labels[value] || value}
    </span>
  );
}

function fmtTime(ts) {
  const d = new Date(ts);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function TaskTable({ tasks, onRetry, onDelete }) {
  return (
    <div className="card">
      <div className="card-head">
        <div className="title-row">
          <div className="icon-tile"><i className="ph ph-clock-counter-clockwise"></i></div>
          <div>
            <h2>Recent downloads</h2>
            <div className="sub">Last 50 jobs across all sources · auto-refreshes every 30s</div>
          </div>
        </div>
        <button className="btn btn-sm btn-outline">
          <i className="ph ph-arrows-clockwise"></i> Refresh
        </button>
      </div>
      {tasks.length === 0 ? (
        <div className="empty">
          <i className="ph ph-tray"></i>
          <p>Your queue is empty. Paste a URL above to start your first download.</p>
        </div>
      ) : (
        <table className="tasks">
          <thead>
            <tr>
              <th style={{ width: 70 }}>ID</th>
              <th>Source URL</th>
              <th style={{ width: 110 }}>Status</th>
              <th style={{ width: 150 }}>Created</th>
              <th style={{ width: 220, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td className="id">#{t.id}</td>
                <td className="url">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <i className={`ph ${t.platformIcon}`} style={{ color: t.platformColor, marginRight: 6 }}></i>
                    {t.url}
                  </a>
                </td>
                <td><StatusPill value={t.status} stage={t.stage}/></td>
                <td className="ts">{fmtTime(t.createdAt)}</td>
                <td className="actions">
                  <div className="row">
                    {t.status === 'done' && (
                      <button className="btn btn-xs btn-secondary"><i className="ph ph-download-simple"></i> Get file</button>
                    )}
                    {t.status === 'failed' && (
                      <button className="btn btn-xs btn-secondary" onClick={() => onRetry?.(t.id)}>
                        <i className="ph ph-arrow-counter-clockwise"></i> Retry
                      </button>
                    )}
                    <button
                      className="btn btn-xs btn-danger-outline"
                      disabled={t.status === 'running'}
                      onClick={() => onDelete?.(t.id)}
                    >Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

window.StatusPill = StatusPill;
window.TaskTable = TaskTable;
