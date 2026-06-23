// StatsRow.jsx — 4 metric tiles + upgrade banner.

function StatsRow({ tasks, isPro }) {
  const done = tasks.filter(t => t.status === 'done').length;
  const running = tasks.filter(t => t.status === 'running' || t.status === 'queued').length;
  const failed = tasks.filter(t => t.status === 'failed').length;
  return (
    <div className="stats-row">
      <div className="stat-tile brand">
        <div className="lbl">Plan</div>
        <div className="val">{isPro ? 'Pro' : 'Free'} <span className="accent">{isPro ? '· unlimited' : '· 7 left'}</span></div>
        <div className="trend"><i className="ph ph-crown"></i> {isPro ? 'renews Dec 12' : 'upgrade for 4K HDR'}</div>
      </div>
      <div className="stat-tile">
        <div className="lbl">Downloaded</div>
        <div className="val">{done}</div>
        <div className="trend"><i className="ph ph-arrow-up"></i> 3 this hour</div>
      </div>
      <div className="stat-tile">
        <div className="lbl">In progress</div>
        <div className="val">{running}</div>
        <div className="trend"><i className="ph ph-lightning"></i> avg 18s/job</div>
      </div>
      <div className="stat-tile">
        <div className="lbl">Failed (24h)</div>
        <div className="val">{failed}</div>
        <div className={'trend ' + (failed > 0 ? 'bad' : '')}>
          <i className="ph ph-warning"></i>
          {failed > 0 ? 'one retry available' : 'no errors'}
        </div>
      </div>
    </div>
  );
}

function UpgradeBanner({ visible, onDismiss }) {
  if (!visible) return null;
  return (
    <div className="upgrade-banner">
      <div className="crown"><i className="ph-fill ph-crown"></i></div>
      <div className="copy">
        <b>Unlock unlimited downloads + 4K HDR</b>
        <small>Pro is $9/mo or two months free yearly. Includes CLI, MCP, and 10 GB max file size.</small>
      </div>
      <button className="btn btn-md btn-outline" onClick={onDismiss}>Maybe later</button>
      <a href="../marketing-site/index.html#pricing" className="btn btn-md btn-primary">
        <i className="ph ph-arrow-right"></i> Upgrade
      </a>
    </div>
  );
}

window.StatsRow = StatsRow;
window.UpgradeBanner = UpgradeBanner;
