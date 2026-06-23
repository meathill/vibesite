// Hero.jsx — hero w/ inline download form + trust bar. Mirrors the
// pattern from packages/web/app/[lang]/page.tsx hero section.
const { useState: useState_Hero } = React;

function Hero() {
  const [url, setUrl] = useState_Hero('');
  return (
    <>
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="dot"></span> 12M+ downloads · all major platforms
        </div>
        <h1>
          Download anything,
          <br />
          <span className="accent">at edge speed.</span>
        </h1>
        <p className="lede">
          A control plane on Cloudflare Workers, a worker fleet on Mac mini and Docker, signed
          end-to-end. Paste a link — we handle the rest.
        </p>

        <form className="dl-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a YouTube, X, or Instagram URL…"
            aria-label="Video URL"
          />
          <button type="button" className="paste">
            <i className="ph ph-clipboard"></i> Paste
          </button>
          <button type="submit" className="btn btn-lg btn-primary">
            <i className="ph ph-download-simple"></i> Download
          </button>
        </form>

        <div className="support-line">
          <span>Works with</span>
          <span className="platform">
            <i className="ph ph-x-logo"></i> X / Twitter
          </span>
          <span>·</span>
          <span className="platform">
            <i className="ph ph-youtube-logo"></i> YouTube
          </span>
          <span>·</span>
          <span className="platform">
            <i className="ph ph-instagram-logo"></i> Instagram
          </span>
          <span>·</span>
          <span className="platform">
            <i className="ph ph-tiktok-logo"></i> TikTok
          </span>
        </div>
      </section>

      <section className="trust">
        <div className="trust-inner">
          <div className="stat">
            <div className="num">
              12<span className="accent">M+</span>
            </div>
            <div className="lbl">Downloads</div>
          </div>
          <div className="stat">
            <div className="num">4K HDR</div>
            <div className="lbl">Max quality</div>
          </div>
          <div className="stat">
            <div className="num">$0</div>
            <div className="lbl">To start</div>
          </div>
          <div className="stat">
            <div className="num">
              99.9<span className="accent">%</span>
            </div>
            <div className="lbl">Uptime</div>
          </div>
        </div>
      </section>
    </>
  );
}

window.Hero = Hero;
