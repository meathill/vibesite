// Footer.jsx — cross-site strip + meta. Mirrors web-shared/components/footer.tsx.
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-cross">
          <h4>All useful downloaders you need</h4>
          <div className="cross-links">
            <a className="cross-link" href="#">
              <i className="ph ph-x-logo" style={{ color: '#14171A' }}></i>
              X Video Downloader
            </a>
            <a className="cross-link" href="#">
              <i className="ph ph-youtube-logo" style={{ color: '#FF0000' }}></i>
              YouTube Downloader
            </a>
            <a className="cross-link" href="#">
              <i className="ph ph-instagram-logo" style={{ color: '#E1306C' }}></i>
              Instagram Video Download
            </a>
            <a className="cross-link" href="#">
              <i className="ph ph-tiktok-logo" style={{ color: '#000' }}></i>
              TikTok Downloader
            </a>
          </div>
        </div>
        <div className="footer-meta">
          <p>Functional SaaS for the people who actually ship.</p>
          <div className="links">
            <a href="#pricing">Pricing</a>
            <span>·</span>
            <a href="#terms">Terms</a>
            <span>·</span>
            <a href="#privacy">Privacy</a>
            <span>·</span>
            <a href="#contact">Contact</a>
            <span>·</span>
            <a href="https://github.com/meathill"><i className="ph ph-github-logo"></i> GitHub</a>
          </div>
          <p className="copy">© 2026 Meathill LLC · built on Cloudflare, OpenResty, and the open web.</p>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
