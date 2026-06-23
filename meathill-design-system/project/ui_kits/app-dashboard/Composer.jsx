// Composer.jsx — inline new-download form on the dashboard.
function Composer({ onSubmit }) {
  const [url, setUrl] = React.useState('');
  const [res, setRes] = React.useState('1080');

  function detectPlatform(u) {
    if (/youtu\.?be/i.test(u))    return { icon: 'ph-youtube-logo',   color: '#FF0000' };
    if (/(twitter|x\.com)/i.test(u)) return { icon: 'ph-x-logo',      color: '#14171A' };
    if (/instagram/i.test(u))     return { icon: 'ph-instagram-logo', color: '#E1306C' };
    if (/tiktok/i.test(u))        return { icon: 'ph-tiktok-logo',    color: '#000000' };
    return { icon: 'ph-link', color: 'var(--neutral-500)' };
  }

  function submit(e) {
    e?.preventDefault();
    if (!url) return;
    const p = detectPlatform(url);
    onSubmit?.({ url, resolution: res, ...p });
    setUrl('');
  }

  return (
    <form className="composer" onSubmit={submit}>
      <div className="input-shell">
        <i className="ph ph-link"></i>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste any video URL — YouTube, X, Instagram, TikTok…"
          aria-label="Video URL"
        />
        <button type="button" className="btn btn-sm btn-ghost"
                onClick={async () => { try { setUrl(await navigator.clipboard.readText()); } catch(_){} }}>
          <i className="ph ph-clipboard"></i> Paste
        </button>
      </div>
      <select value={res} onChange={(e) => setRes(e.target.value)} aria-label="Resolution">
        <option value="2160">4K · 2160p</option>
        <option value="1440">2K · 1440p</option>
        <option value="1080">HD · 1080p</option>
        <option value="720">SD · 720p</option>
        <option value="audio">Audio only · m4a</option>
      </select>
      <button type="submit" className="btn btn-lg btn-primary" disabled={!url}>
        <i className="ph ph-download-simple"></i> Download
      </button>
    </form>
  );
}
window.Composer = Composer;
