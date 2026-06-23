// Hero-zh.jsx — 中文版 hero (中文文案 + 同样的下载表单)。
function HeroZh() {
  const [url, setUrl] = React.useState('');
  return (
    <>
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="dot"></span> 1200 万次下载 · 主流平台覆盖
        </div>
        <h1>
          下载任何东西，<br/>
          <span className="accent">边缘速度。</span>
        </h1>
        <p className="lede">
          控制面跑在 Cloudflare Workers，执行面跑在 Mac mini 和 Docker 上，端到端 HMAC 签名。粘贴链接，剩下的交给我们。
        </p>

        <form className="dl-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="粘贴 YouTube、X、Instagram 链接…"
            aria-label="视频链接"
          />
          <button type="button" className="paste">
            <i className="ph ph-clipboard"></i> 粘贴
          </button>
          <button type="submit" className="btn btn-lg btn-primary">
            <i className="ph ph-download-simple"></i> 下载
          </button>
        </form>

        <div className="support-line">
          <span>支持平台</span>
          <span className="platform"><i className="ph ph-x-logo"></i> X / 推特</span>
          <span>·</span>
          <span className="platform"><i className="ph ph-youtube-logo"></i> YouTube</span>
          <span>·</span>
          <span className="platform"><i className="ph ph-instagram-logo"></i> Instagram</span>
          <span>·</span>
          <span className="platform"><i className="ph ph-tiktok-logo"></i> 抖音</span>
        </div>
      </section>

      <section className="trust">
        <div className="trust-inner">
          <div className="stat">
            <div className="num">1200<span className="accent">万+</span></div>
            <div className="lbl">总下载</div>
          </div>
          <div className="stat">
            <div className="num">4K HDR</div>
            <div className="lbl">最高画质</div>
          </div>
          <div className="stat">
            <div className="num">¥0</div>
            <div className="lbl">免费起步</div>
          </div>
          <div className="stat">
            <div className="num">99.9<span className="accent">%</span></div>
            <div className="lbl">可用性</div>
          </div>
        </div>
      </section>
    </>
  );
}

function NavbarZh() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="#" className="nav-brand">
            <img src="../../assets/favicon.svg" alt="Meathill" />
            Meathill
          </a>
          <div className="nav-links">
            <a href="#" className="active">产品</a>
            <a href="#use-cases">使用场景</a>
            <a href="#pricing">价格</a>
            <a href="#extension">浏览器扩展</a>
            <a href="#docs">文档</a>
          </div>
        </div>
        <div className="nav-right">
          <button className="lang-pill"><i className="ph ph-globe"></i> 中文</button>
          <ThemeToggle />
          <a href="#" className="btn btn-md btn-ghost">登录</a>
          <a href="../app-dashboard/index.html" className="btn btn-md btn-primary">立即开始 →</a>
        </div>
      </div>
    </nav>
  );
}

function HowItWorksZh() {
  const steps = [
    { icon: 'ph-copy',            n: 1, t: '复制链接',  d: '在 X、YouTube、Instagram 上打开内容，从地址栏复制链接。' },
    { icon: 'ph-clipboard',       n: 2, t: '粘贴入队',  d: '粘贴到上方输入框。控制面校验、签名，分发给最近的 worker。' },
    { icon: 'ph-download-simple', n: 3, t: '从 R2 下载', d: 'Worker 按你选择的清晰度转码后上传 R2，你拿到直连下载地址。' },
  ];
  return (
    <section className="section">
      <div className="section-head">
        <div className="section-eyebrow">工作原理</div>
        <h2>从粘贴到播放，一分钟以内。</h2>
        <p className="section-lede">
          支撑我们 SaaS 服务的同一套架构 — 完整开源，你也可以在自家的 Mac mini 上跑。
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

function FeatureGridZh() {
  const features = [
    { i: 'ph-sparkle',       t: '原画下载',       d: '受支持的源站不二次转码。最高 4K HDR — 就是平台原始的字节流。', brand: true },
    { i: 'ph-lightning',     t: '边缘分发',       d: 'Cloudflare Queues + Workers，任务派发 200ms 以内，全球任意区域。' },
    { i: 'ph-shield-check',  t: '没有水印',       d: '干净文件，不嵌入任何水印或广告。' },
    { i: 'ph-device-mobile', t: '到处可用',       d: '浏览器、CLI、MCP、原生扩展 — 选你工作流里最顺手的入口。' },
    { i: 'ph-user-minus',    t: '免注册试用',     d: '免费档不需要任何账号，只要一个链接。需要历史记录时再登录。' },
    { i: 'ph-lock',          t: '端到端签名',     d: '控制面与每个 worker 之间 HMAC 签名。任务不可拦截、不可重放。' },
  ];
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="section-head">
        <div className="section-eyebrow">团队为什么选 Meathill</div>
        <h2>当基础设施做，不当落地页做。</h2>
      </div>
      <div className="features">
        {features.map((f) => (
          <div className={'feature' + (f.brand ? ' brand' : '')} key={f.t}>
            <div className="feature-icon"><i className={`ph ${f.i}`}></i></div>
            <h3>{f.t}</h3>
            <p>{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AiAgentSectionZh() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="section-head">
        <div className="section-eyebrow">为 Agent 而设计</div>
        <h2>你的 AI agent 天然懂 Meathill。</h2>
        <p className="section-lede">
          MCP server、CLI、llms.txt — 任何 Claude / Cursor / Codex 接得上的标准接口。无需胶水代码，无需翻 Swagger 文档。
        </p>
      </div>
      <div className="agent">
        <div className="agent-card">
          <div className="row">
            <div className="agent-icon"><i className="ph ph-plug"></i></div>
            <div style={{ flex: 1 }}>
              <h3>MCP server</h3>
              <p>一个 endpoint，一个 OAuth scope。把 URL 填进任何支持 MCP 的客户端，你的 agent 就能提交和跟踪下载任务。</p>
            </div>
          </div>
          <div className="code">
            <span className="com"># claude_desktop_config.json</span><br/>
            <span className="key">"meathill"</span>: {`{`} <span className="key">"url"</span>: <span className="str">"https://mcp.meathill.com"</span> {`}`}
          </div>
        </div>
        <div className="agent-card">
          <div className="row">
            <div className="agent-icon"><i className="ph ph-terminal"></i></div>
            <div style={{ flex: 1 }}>
              <h3>命令行</h3>
              <p>一个二进制文件。与 SaaS 跑的是同一套任务格式，可以让任务结果直接落到你自己的 R2 bucket。</p>
            </div>
          </div>
          <div className="code">
            <span className="com"># 安装最新版</span><br/>
            <span className="key">brew install</span> meathill/tap/x-downloader<br/>
            <span className="key">x-downloader</span> https://x.com/<span className="str">user/status/1234</span>
          </div>
        </div>
        <div className="agent-card">
          <div className="row">
            <div className="agent-icon"><i className="ph ph-file-text"></i></div>
            <div style={{ flex: 1 }}>
              <h3>llms.txt</h3>
              <p>对爬虫友好的接口清单，手写维护。没有臃肿的 OpenAPI dump。</p>
            </div>
          </div>
        </div>
        <div className="agent-card">
          <div className="row">
            <div className="agent-icon"><i className="ph ph-code"></i></div>
            <div style={{ flex: 1 }}>
              <h3>REST API</h3>
              <p>JSON 进，JSON 出。Bearer token 鉴权。每一次状态变化都有 webhook 通知。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PremiumCtaZh() {
  return (
    <section className="cta-wrap">
      <div className="cta">
        <div className="sparkle"><i className="ph-fill ph-sparkle"></i></div>
        <h2>升级 Meathill Pro，做更多。</h2>
        <p>每日无限下载，10 GB 单文件上限，完整 4K HDR，全部 agent 接口可用。月付 ¥69 或年付直接省两个月。</p>
        <a href="#pricing" className="btn btn-xl btn-primary">
          查看价格 <i className="ph ph-arrow-right"></i>
        </a>
      </div>
    </section>
  );
}

function FaqZh() {
  const items = [
    { q: 'Meathill 免费使用吗？',
      a: '是的 — 免费档每天 10 次下载，单文件最大 100 MB，不需要信用卡。Pro 开放无限下载、10 GB 文件、4K HDR 和所有 agent 接口。' },
    { q: '文件保存在哪里？',
      a: '保存在距离 worker 最近的 Cloudflare R2 区域。免费档保留 7 天，Pro 保留 30 天。也可以通过 CLI 让文件直接落到你自己的 R2 bucket。' },
    { q: '可以自部署吗？',
      a: '可以。控制面通过 OpenNext 部署到 Cloudflare Workers，worker 可以跑在 Docker 镜像里，也可以直接跑在 macOS 上。仓库里有一键部署脚本和迁移脚本。' },
    { q: '与 yt-dlp 有什么区别？',
      a: '我们部分适配器底层用 yt-dlp，但我们加了控制面、任务队列、重试策略、签名回调、管理后台和 agent 接口（MCP、CLI、llms.txt、REST）。' },
    { q: '支持哪些站点？',
      a: 'X、YouTube、Instagram、TikTok、Reddit，以及 yt-dlp 支持的长尾站点。B 站和抖音处于私测阶段，可以联系我们申请。' },
    { q: '版权问题怎么办？',
      a: '我们只抓取公开可访问的媒体。你自己负责确保下载行为在所在司法管辖区内合法。' },
  ];
  const [openIdx, setOpenIdx] = React.useState(0);
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="section-head">
        <div className="section-eyebrow">疑问</div>
        <h2>诚实作答。</h2>
      </div>
      <div className="faq-list">
        {items.map((it, idx) => (
          <details
            key={idx}
            className="faq-item"
            open={openIdx === idx}
            onToggle={(e) => { if (e.currentTarget.open) setOpenIdx(idx); }}
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

function FooterZh() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-cross">
          <h4>顺便看看其他下载器</h4>
          <div className="cross-links">
            <a className="cross-link" href="#">
              <i className="ph ph-x-logo" style={{ color: '#14171A' }}></i>
              X / 推特视频下载
            </a>
            <a className="cross-link" href="#">
              <i className="ph ph-youtube-logo" style={{ color: '#FF0000' }}></i>
              YouTube 下载
            </a>
            <a className="cross-link" href="#">
              <i className="ph ph-instagram-logo" style={{ color: '#E1306C' }}></i>
              Instagram 视频下载
            </a>
            <a className="cross-link" href="#">
              <i className="ph ph-tiktok-logo" style={{ color: '#000' }}></i>
              抖音 / TikTok 下载
            </a>
          </div>
        </div>
        <div className="footer-meta">
          <p>给实干派用的功能型 SaaS。</p>
          <div className="links">
            <a href="#pricing">价格</a>
            <span>·</span>
            <a href="#terms">服务条款</a>
            <span>·</span>
            <a href="#privacy">隐私政策</a>
            <span>·</span>
            <a href="#contact">联系我们</a>
            <span>·</span>
            <a href="https://github.com/meathill"><i className="ph ph-github-logo"></i> GitHub</a>
          </div>
          <p className="copy">© 2026 Meathill · 基于 Cloudflare、OpenResty 与开放网络。</p>
        </div>
      </div>
    </footer>
  );
}

window.HeroZh = HeroZh;
window.NavbarZh = NavbarZh;
window.HowItWorksZh = HowItWorksZh;
window.FeatureGridZh = FeatureGridZh;
window.AiAgentSectionZh = AiAgentSectionZh;
window.PremiumCtaZh = PremiumCtaZh;
window.FaqZh = FaqZh;
window.FooterZh = FooterZh;
