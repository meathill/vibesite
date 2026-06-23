// StatBar.jsx — top stat strip.
function StatBar({ counts }) {
  return (
    <div className="statbar">
      <div className="stat featured">
        <span className="lbl">Pending review</span>
        <span className="val">{counts.pending} <span className="accent">need attention</span></span>
        <span className="delta warn"><i className="ph ph-arrow-up"></i> +12 last hour</span>
      </div>
      <div className="stat">
        <span className="lbl">Total today</span>
        <span className="val">142</span>
        <span className="delta"><i className="ph ph-arrow-up"></i> +24% vs y’day</span>
      </div>
      <div className="stat">
        <span className="lbl">Auto-approved</span>
        <span className="val">87 <span className="accent">/ 61%</span></span>
        <span className="delta"><i className="ph ph-robot"></i> spam filter on</span>
      </div>
      <div className="stat">
        <span className="lbl">Foreign-language</span>
        <span className="val">31 <span className="accent">/ 9 langs</span></span>
        <span className="delta"><i className="ph ph-translate"></i> auto-translate</span>
      </div>
      <div className="stat">
        <span className="lbl">AI replies sent</span>
        <span className="val">28</span>
        <span className="delta"><i className="ph ph-sparkle"></i> avg 4.8s</span>
      </div>
    </div>
  );
}
window.StatBar = StatBar;
