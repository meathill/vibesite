// Sections.jsx — HowItWorks, Features, AiAgent, Faq, PremiumCta.
// One file because each is short and they share rhythm.

function HowItWorks() {
  const steps = [
    {
      icon: 'ph-copy',
      n: 1,
      t: 'Copy the URL',
      d: 'Open the post on X, YouTube, or Instagram, then copy the link from the address bar.',
    },
    {
      icon: 'ph-clipboard',
      n: 2,
      t: 'Paste & queue',
      d: 'Drop it in the field above. The control plane validates, signs, and dispatches to a worker.',
    },
    {
      icon: 'ph-download-simple',
      n: 3,
      t: 'Download from R2',
      d: 'The worker transcodes to the resolution you chose and uploads to R2. You get a direct link.',
    },
  ];
  return (
    <section className="section">
      <div className="section-head">
        <div className="section-eyebrow">How it works</div>
        <h2>From paste to playable in under a minute.</h2>
        <p className="section-lede">
          The same architecture that powers our SaaS — exposed cleanly so you can also run it
          yourself on a Mac mini.
        </p>
      </div>
      <div className="steps">
        {steps.map((s) => (
          <div className="step" key={s.n}>
            <div className="step-icon">
              <i className={`ph ${s.icon}`}></i>
              <span className="step-num">{s.n}</span>
            </div>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureGrid() {
  const features = [
    {
      i: 'ph-sparkle',
      t: 'Original quality',
      d: 'No re-encoding for supported sources. Up to 4K HDR where available — the same bytes that left the platform.',
      brand: true,
    },
    {
      i: 'ph-lightning',
      t: 'Edge dispatch',
      d: 'Cloudflare Queues + Workers means jobs are dispatched in under 200ms, from any region.',
    },
    {
      i: 'ph-shield-check',
      t: 'No watermarks',
      d: 'Clean files. No overlays, no upsells embedded in your video.',
    },
    {
      i: 'ph-device-mobile',
      t: 'Works everywhere',
      d: 'Browser, CLI, MCP, native extension — pick the surface that fits your workflow.',
    },
    {
      i: 'ph-user-minus',
      t: 'No signup to try',
      d: 'The free tier requires nothing more than your URL. Sign in only when you want history.',
    },
    {
      i: 'ph-lock',
      t: 'Signed end-to-end',
      d: 'HMAC between the control plane and every worker. Your jobs can\u2019t be intercepted or replayed.',
    },
  ];
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="section-head">
        <div className="section-eyebrow">Why teams pick Meathill</div>
        <h2>Built like a piece of infrastructure, not a landing page.</h2>
      </div>
      <div className="features">
        {features.map((f) => (
          <div className={'feature' + (f.brand ? ' brand' : '')} key={f.t}>
            <div className="feature-icon">
              <i className={`ph ${f.i}`}></i>
            </div>
            <h3>{f.t}</h3>
            <p>{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AiAgentSection() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="section-head">
        <div className="section-eyebrow">Built for agents</div>
        <h2>Your AI agents speak Meathill natively.</h2>
        <p className="section-lede">
          MCP server, CLI, and llms.txt — the same surface every Claude / Cursor / Codex setup
          expects. No glue code, no swagger spelunking.
        </p>
      </div>
      <div className="agent">
        <div className="agent-card">
          <div className="row">
            <div className="agent-icon">
              <i className="ph ph-plug"></i>
            </div>
            <div style={{ flex: 1 }}>
              <h3>MCP server</h3>
              <p>
                One endpoint, one OAuth scope. Drop the URL into any MCP-aware client and your agent
                can submit and track download jobs.
              </p>
            </div>
          </div>
          <div className="code">
            <span className="com"># claude_desktop_config.json</span>
            <br />
            <span className="key">"meathill"</span>: {`{`} <span className="key">"url"</span>:{' '}
            <span className="str">"https://mcp.meathill.com"</span> {`}`}
          </div>
        </div>
        <div className="agent-card">
          <div className="row">
            <div className="agent-icon">
              <i className="ph ph-terminal"></i>
            </div>
            <div style={{ flex: 1 }}>
              <h3>CLI</h3>
              <p>
                One binary. Runs the same job format as the SaaS, against your own R2 bucket if you
                bring one.
              </p>
            </div>
          </div>
          <div className="code">
            <span className="com"># pull the latest binary</span>
            <br />
            <span className="key">brew install</span> meathill/tap/x-downloader
            <br />
            <span className="key">x-downloader</span> https://x.com/
            <span className="str">user/status/1234</span>
          </div>
        </div>
        <div className="agent-card">
          <div className="row">
            <div className="agent-icon">
              <i className="ph ph-file-text"></i>
            </div>
            <div style={{ flex: 1 }}>
              <h3>llms.txt</h3>
              <p>
                Crawl-friendly description of every public endpoint, written by hand. No giant
                OpenAPI dump.
              </p>
            </div>
          </div>
        </div>
        <div className="agent-card">
          <div className="row">
            <div className="agent-icon">
              <i className="ph ph-code"></i>
            </div>
            <div style={{ flex: 1 }}>
              <h3>REST API</h3>
              <p>JSON in, JSON out. Bearer token auth. Webhooks on every state transition.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PremiumCta() {
  return (
    <section className="cta-wrap">
      <div className="cta">
        <div className="sparkle">
          <i className="ph-fill ph-sparkle"></i>
        </div>
        <h2>Go further with Meathill Pro.</h2>
        <p>
          Unlimited daily downloads, 10 GB file size, full 4K HDR, and access to every agent
          surface. $9/mo or two months free yearly.
        </p>
        <a href="#pricing" className="btn btn-xl btn-primary">
          See pricing <i className="ph ph-arrow-right"></i>
        </a>
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    {
      q: 'Is Meathill free to use?',
      a: 'Yes — the free tier gives you 10 downloads per day with files up to 100 MB. No credit card. Pro unlocks unlimited downloads, 10 GB files, 4K HDR, and the agent surfaces.',
    },
    {
      q: 'Where are the files stored?',
      a: 'On Cloudflare R2 in the region nearest the worker that handled the job. Files are kept for 7 days on the free tier, 30 days on Pro. You can also download to your own R2 bucket via the CLI.',
    },
    {
      q: 'Can I self-host?',
      a: 'Yes. The control plane deploys to Cloudflare Workers (OpenNext) and the worker runs as a Docker image or directly on macOS. The repo includes a one-shot deploy script and migrations.',
    },
    {
      q: 'How is this different from yt-dlp?',
      a: 'We use yt-dlp under the hood for several adapters — but we add a control plane, queue, retry policy, signed callbacks, an admin dashboard, and the agent surfaces (MCP, CLI, llms.txt, REST).',
    },
    {
      q: 'Do you support TikTok / Bilibili / Douyin?',
      a: 'X, YouTube, Instagram, TikTok, Reddit, and a long tail of yt-dlp-supported sources. Bilibili and Douyin are in private beta — ask us for access.',
    },
    {
      q: 'What about copyright?',
      a: 'We only fetch publicly available media. You\u2019re responsible for the legality of your downloads in your jurisdiction.',
    },
  ];
  const [openIdx, setOpenIdx] = React.useState(0);
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="section-head">
        <div className="section-eyebrow">Questions</div>
        <h2>Answered honestly.</h2>
      </div>
      <div className="faq-list">
        {items.map((it, idx) => (
          <details
            key={idx}
            className="faq-item"
            open={openIdx === idx}
            onToggle={(e) => {
              if (e.currentTarget.open) setOpenIdx(idx);
            }}
          >
            <summary>
              {it.q}
              <i className="ph ph-caret-down"></i>
            </summary>
            <p>{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

window.HowItWorks = HowItWorks;
window.FeatureGrid = FeatureGrid;
window.AiAgentSection = AiAgentSection;
window.PremiumCta = PremiumCta;
window.Faq = Faq;
