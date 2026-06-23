/* @ds-bundle: {"format":3,"namespace":"MeathillDesignSystem_019e2c","components":[],"sourceHashes":{"shared/ThemeToggle.jsx":"a1bbe3752474","shared/theme-toggle.js":"5948e686e998","ui_kits/app-dashboard/Composer.jsx":"f19cbd56d5c3","ui_kits/app-dashboard/Sidebar.jsx":"35c5c76109da","ui_kits/app-dashboard/StatsRow.jsx":"a3e3f9968e88","ui_kits/app-dashboard/TaskTable.jsx":"c42259cf1211","ui_kits/app-dashboard/TopBar.jsx":"44d7b9ee0595","ui_kits/comment-admin/AITemplateModal.jsx":"ebb3e8cee52d","ui_kits/comment-admin/BatchActions.jsx":"71c61730c517","ui_kits/comment-admin/CommentRow.jsx":"1b08ef2b48de","ui_kits/comment-admin/FilterBar.jsx":"2f38d5428c20","ui_kits/comment-admin/Header.jsx":"1330161e1396","ui_kits/comment-admin/StatBar.jsx":"95e611b52761","ui_kits/marketing-site/Components-zh.jsx":"48f5bf71f110","ui_kits/marketing-site/Footer.jsx":"720033c06856","ui_kits/marketing-site/Hero.jsx":"196ee27c649b","ui_kits/marketing-site/Navbar.jsx":"faab93a57d5c","ui_kits/marketing-site/Sections.jsx":"9883fb240e70"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MeathillDesignSystem_019e2c = window.MeathillDesignSystem_019e2c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// shared/ThemeToggle.jsx
try { (() => {
// ThemeToggle.jsx — React wrapper around window.MhTheme.
function ThemeToggle() {
  const [theme, setTheme] = React.useState(() => window.MhTheme?.current() || 'light');
  React.useEffect(() => {
    const fn = e => setTheme(e.detail);
    document.addEventListener('mh-theme', fn);
    return () => document.removeEventListener('mh-theme', fn);
  }, []);
  const isDark = theme === 'dark';
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "mh-theme-btn",
    "aria-label": "Toggle theme",
    title: "Toggle theme (\u2318\u21E7L)",
    onClick: () => window.MhTheme.toggle()
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${isDark ? 'ph-moon-stars' : 'ph-sun'}`
  }));
}
window.ThemeToggle = ThemeToggle;
})(); } catch (e) { __ds_ns.__errors.push({ path: "shared/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// shared/theme-toggle.js
try { (() => {
/* shared/theme-toggle.js — drop-in dark mode toggle.
   Renders a floating control AND can be embedded in any topbar by calling
   window.MhTheme.mount(targetEl).
   Persists in localStorage as 'mh-theme'.
*/
(function () {
  const KEY = 'mh-theme';
  function read() {
    try {
      return localStorage.getItem(KEY);
    } catch (_) {
      return null;
    }
  }
  function write(v) {
    try {
      localStorage.setItem(KEY, v);
    } catch (_) {}
  }
  function preferred() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }
  function current() {
    return read() || preferred();
  }
  function apply(theme) {
    const root = document.documentElement;
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');else root.removeAttribute('data-theme');
  }
  function set(theme) {
    apply(theme);
    write(theme);
    document.dispatchEvent(new CustomEvent('mh-theme', {
      detail: theme
    }));
  }
  function toggle() {
    set(current() === 'dark' ? 'light' : 'dark');
  }

  // Run early so we don't get a light-flash
  apply(current());
  function mount(target, opts) {
    opts = opts || {};
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = opts.className || 'mh-theme-btn';
    btn.setAttribute('aria-label', 'Toggle theme');
    btn.title = 'Toggle theme (click) · ⌘⇧L';
    const render = () => {
      const isDark = current() === 'dark';
      btn.innerHTML = isDark ? '<i class="ph ph-moon-stars"></i>' : '<i class="ph ph-sun"></i>';
    };
    render();
    btn.addEventListener('click', () => {
      toggle();
      render();
    });
    document.addEventListener('mh-theme', render);
    target.appendChild(btn);
    return btn;
  }

  // Keyboard shortcut: ⌘⇧L / Ctrl⇧L
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
      e.preventDefault();
      toggle();
    }
  });
  window.MhTheme = {
    current,
    set,
    toggle,
    mount
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "shared/theme-toggle.js", error: String((e && e.message) || e) }); }

// ui_kits/app-dashboard/Composer.jsx
try { (() => {
// Composer.jsx — inline new-download form on the dashboard.
function Composer({
  onSubmit
}) {
  const [url, setUrl] = React.useState('');
  const [res, setRes] = React.useState('1080');
  function detectPlatform(u) {
    if (/youtu\.?be/i.test(u)) return {
      icon: 'ph-youtube-logo',
      color: '#FF0000'
    };
    if (/(twitter|x\.com)/i.test(u)) return {
      icon: 'ph-x-logo',
      color: '#14171A'
    };
    if (/instagram/i.test(u)) return {
      icon: 'ph-instagram-logo',
      color: '#E1306C'
    };
    if (/tiktok/i.test(u)) return {
      icon: 'ph-tiktok-logo',
      color: '#000000'
    };
    return {
      icon: 'ph-link',
      color: 'var(--neutral-500)'
    };
  }
  function submit(e) {
    e?.preventDefault();
    if (!url) return;
    const p = detectPlatform(url);
    onSubmit?.({
      url,
      resolution: res,
      ...p
    });
    setUrl('');
  }
  return /*#__PURE__*/React.createElement("form", {
    className: "composer",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-shell"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-link"
  }), /*#__PURE__*/React.createElement("input", {
    type: "url",
    value: url,
    onChange: e => setUrl(e.target.value),
    placeholder: "Paste any video URL \u2014 YouTube, X, Instagram, TikTok\u2026",
    "aria-label": "Video URL"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-sm btn-ghost",
    onClick: async () => {
      try {
        setUrl(await navigator.clipboard.readText());
      } catch (_) {}
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-clipboard"
  }), " Paste")), /*#__PURE__*/React.createElement("select", {
    value: res,
    onChange: e => setRes(e.target.value),
    "aria-label": "Resolution"
  }, /*#__PURE__*/React.createElement("option", {
    value: "2160"
  }, "4K \xB7 2160p"), /*#__PURE__*/React.createElement("option", {
    value: "1440"
  }, "2K \xB7 1440p"), /*#__PURE__*/React.createElement("option", {
    value: "1080"
  }, "HD \xB7 1080p"), /*#__PURE__*/React.createElement("option", {
    value: "720"
  }, "SD \xB7 720p"), /*#__PURE__*/React.createElement("option", {
    value: "audio"
  }, "Audio only \xB7 m4a")), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-lg btn-primary",
    disabled: !url
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-download-simple"
  }), " Download"));
}
window.Composer = Composer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-dashboard/Composer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-dashboard/Sidebar.jsx
try { (() => {
// Sidebar.jsx — left nav for the dashboard.
function Sidebar({
  active = 'downloads',
  onNav
}) {
  const items = [{
    key: 'downloads',
    icon: 'ph-download-simple',
    label: 'Downloads',
    count: 24
  }, {
    key: 'queue',
    icon: 'ph-list-checks',
    label: 'Queue',
    count: 2
  }, {
    key: 'failed',
    icon: 'ph-warning-circle',
    label: 'Failed',
    count: 1
  }, {
    key: 'history',
    icon: 'ph-clock-counter-clockwise',
    label: 'History'
  }];
  const dev = [{
    key: 'cli',
    icon: 'ph-terminal',
    label: 'CLI & MCP'
  }, {
    key: 'api',
    icon: 'ph-code',
    label: 'API tokens'
  }, {
    key: 'webhooks',
    icon: 'ph-plug',
    label: 'Webhooks'
  }];
  const settings = [{
    key: 'billing',
    icon: 'ph-credit-card',
    label: 'Billing'
  }, {
    key: 'settings',
    icon: 'ph-gear',
    label: 'Settings'
  }];
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar"
  }, /*#__PURE__*/React.createElement("a", {
    href: "../marketing-site/index.html",
    className: "sb-brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/favicon.svg",
    alt: "Meathill"
  }), " Meathill"), /*#__PURE__*/React.createElement("div", {
    className: "sb-group"
  }, "Tasks"), items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.key,
    className: 'sb-link' + (active === it.key ? ' active' : ''),
    onClick: e => {
      e.preventDefault();
      onNav?.(it.key);
    },
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${it.icon}`
  }), it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, it.count))), /*#__PURE__*/React.createElement("div", {
    className: "sb-group"
  }, "Developer"), dev.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.key,
    className: "sb-link",
    href: "#",
    onClick: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${it.icon}`
  }), it.label)), /*#__PURE__*/React.createElement("div", {
    className: "sb-group"
  }, "Account"), settings.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.key,
    className: "sb-link",
    href: "#",
    onClick: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${it.icon}`
  }), it.label)), /*#__PURE__*/React.createElement("div", {
    className: "sb-spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sb-plan"
  }, /*#__PURE__*/React.createElement("div", {
    className: "plan-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar"
  }, "M"), /*#__PURE__*/React.createElement("div", {
    className: "who"
  }, /*#__PURE__*/React.createElement("b", null, "Meathill"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("small", null, "Free plan \xB7 3/10 today")), /*#__PURE__*/React.createElement("i", {
    className: "ph ph-caret-up-down",
    style: {
      color: 'var(--muted-foreground)'
    }
  }))));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-dashboard/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-dashboard/StatsRow.jsx
try { (() => {
// StatsRow.jsx — 4 metric tiles + upgrade banner.

function StatsRow({
  tasks,
  isPro
}) {
  const done = tasks.filter(t => t.status === 'done').length;
  const running = tasks.filter(t => t.status === 'running' || t.status === 'queued').length;
  const failed = tasks.filter(t => t.status === 'failed').length;
  return /*#__PURE__*/React.createElement("div", {
    className: "stats-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-tile brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Plan"), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, isPro ? 'Pro' : 'Free', " ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, isPro ? '· unlimited' : '· 7 left')), /*#__PURE__*/React.createElement("div", {
    className: "trend"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-crown"
  }), " ", isPro ? 'renews Dec 12' : 'upgrade for 4K HDR')), /*#__PURE__*/React.createElement("div", {
    className: "stat-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Downloaded"), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, done), /*#__PURE__*/React.createElement("div", {
    className: "trend"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrow-up"
  }), " 3 this hour")), /*#__PURE__*/React.createElement("div", {
    className: "stat-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "In progress"), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, running), /*#__PURE__*/React.createElement("div", {
    className: "trend"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-lightning"
  }), " avg 18s/job")), /*#__PURE__*/React.createElement("div", {
    className: "stat-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Failed (24h)"), /*#__PURE__*/React.createElement("div", {
    className: "val"
  }, failed), /*#__PURE__*/React.createElement("div", {
    className: 'trend ' + (failed > 0 ? 'bad' : '')
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-warning"
  }), failed > 0 ? 'one retry available' : 'no errors')));
}
function UpgradeBanner({
  visible,
  onDismiss
}) {
  if (!visible) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "upgrade-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crown"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-crown"
  })), /*#__PURE__*/React.createElement("div", {
    className: "copy"
  }, /*#__PURE__*/React.createElement("b", null, "Unlock unlimited downloads + 4K HDR"), /*#__PURE__*/React.createElement("small", null, "Pro is $9/mo or two months free yearly. Includes CLI, MCP, and 10 GB max file size.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-md btn-outline",
    onClick: onDismiss
  }, "Maybe later"), /*#__PURE__*/React.createElement("a", {
    href: "../marketing-site/index.html#pricing",
    className: "btn btn-md btn-primary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrow-right"
  }), " Upgrade"));
}
window.StatsRow = StatsRow;
window.UpgradeBanner = UpgradeBanner;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-dashboard/StatsRow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-dashboard/TaskTable.jsx
try { (() => {
// TaskTable.jsx — the dashboard task table. Mirrors web-shared/components/task-table.tsx.

function StatusPill({
  value,
  stage
}) {
  const labels = {
    done: 'done',
    queued: 'queued',
    running: stage || 'running',
    failed: 'failed'
  };
  return /*#__PURE__*/React.createElement("span", {
    className: `pill ${value}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), labels[value] || value);
}
function fmtTime(ts) {
  const d = new Date(ts);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
function TaskTable({
  tasks,
  onRetry,
  onDelete
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "title-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "icon-tile"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-clock-counter-clockwise"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Recent downloads"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "Last 50 jobs across all sources \xB7 auto-refreshes every 30s"))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-outline"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrows-clockwise"
  }), " Refresh")), tasks.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-tray"
  }), /*#__PURE__*/React.createElement("p", null, "Your queue is empty. Paste a URL above to start your first download.")) : /*#__PURE__*/React.createElement("table", {
    className: "tasks"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      width: 70
    }
  }, "ID"), /*#__PURE__*/React.createElement("th", null, "Source URL"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 110
    }
  }, "Status"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 150
    }
  }, "Created"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 220,
      textAlign: 'right'
    }
  }, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, tasks.map(t => /*#__PURE__*/React.createElement("tr", {
    key: t.id
  }, /*#__PURE__*/React.createElement("td", {
    className: "id"
  }, "#", t.id), /*#__PURE__*/React.createElement("td", {
    className: "url"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${t.platformIcon}`,
    style: {
      color: t.platformColor,
      marginRight: 6
    }
  }), t.url)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusPill, {
    value: t.status,
    stage: t.stage
  })), /*#__PURE__*/React.createElement("td", {
    className: "ts"
  }, fmtTime(t.createdAt)), /*#__PURE__*/React.createElement("td", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, t.status === 'done' && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-xs btn-secondary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-download-simple"
  }), " Get file"), t.status === 'failed' && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-xs btn-secondary",
    onClick: () => onRetry?.(t.id)
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrow-counter-clockwise"
  }), " Retry"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-xs btn-danger-outline",
    disabled: t.status === 'running',
    onClick: () => onDelete?.(t.id)
  }, "Delete"))))))));
}
window.StatusPill = StatusPill;
window.TaskTable = TaskTable;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-dashboard/TaskTable.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app-dashboard/TopBar.jsx
try { (() => {
// TopBar.jsx — sticky top bar with crumbs + global search + actions.
function TopBar({
  section = 'Downloads'
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumbs"
  }, /*#__PURE__*/React.createElement("span", null, "Dashboard"), /*#__PURE__*/React.createElement("i", {
    className: "ph ph-caret-right",
    style: {
      fontSize: 11,
      opacity: 0.6
    }
  }), /*#__PURE__*/React.createElement("b", null, section)), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-magnifying-glass"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search downloads, urls, IDs\u2026"
  }), /*#__PURE__*/React.createElement("kbd", null, "\u2318K")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-md btn-ghost",
    title: "Notifications"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-bell"
  })), /*#__PURE__*/React.createElement(ThemeToggle, null)));
}
window.TopBar = TopBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app-dashboard/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/comment-admin/AITemplateModal.jsx
try { (() => {
// AITemplateModal.jsx — pick an AI reply template. Mirrors the prompt-template
// system from _research/admin/components/prompt/executor.vue.

function AITemplateModal({
  open,
  onClose,
  onPick
}) {
  if (!open) return null;
  const templates = [{
    id: 'helpful',
    icon: 'ph-lifebuoy',
    name: 'Helpful answer',
    desc: 'Write a kind, accurate reply that addresses the question.',
    preview: 'Thanks for the question! Here\u2019s how it works: …'
  }, {
    id: 'thanks',
    icon: 'ph-hand-heart',
    name: 'Acknowledge feedback',
    desc: 'Thank the commenter, restate what they raised, promise follow-up.',
    preview: 'Thanks so much for taking the time to share this — …'
  }, {
    id: 'bug',
    icon: 'ph-bug',
    name: 'Triage bug report',
    desc: 'Ask for repro steps and environment in a friendly tone.',
    preview: 'Sorry you hit this. Could you share the URL, browser, and …'
  }, {
    id: 'roadmap',
    icon: 'ph-road-horizon',
    name: 'On the roadmap',
    desc: 'Acknowledge the feature request and link to the public roadmap.',
    preview: 'Great suggestion! This is on our roadmap — you can follow …'
  }, {
    id: 'translate',
    icon: 'ph-translate',
    name: 'Translate then answer',
    desc: 'Translate the comment, write a reply in their language.',
    preview: '[zh] 谢谢你的留言！这是…'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-scrim",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "AI reply templates"), /*#__PURE__*/React.createElement("p", null, "Pick a template \u2014 we\\u2019ll generate a contextual reply for each selected comment using GPT or Gemini.")), /*#__PURE__*/React.createElement("button", {
    className: "close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-x"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "modal-body"
  }, templates.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: "tmpl",
    onClick: () => onPick(t)
  }, /*#__PURE__*/React.createElement("div", {
    className: "tmpl-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${t.icon}`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("b", null, t.name), /*#__PURE__*/React.createElement("p", null, t.desc), /*#__PURE__*/React.createElement("div", {
    className: "preview"
  }, t.preview))))), /*#__PURE__*/React.createElement("div", {
    className: "modal-foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-outline",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-primary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-plus"
  }), " New template"))));
}
window.AITemplateModal = AITemplateModal;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/comment-admin/AITemplateModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/comment-admin/BatchActions.jsx
try { (() => {
// BatchActions.jsx — sticky batch bar with emoji shortcuts + AI templates +
// approve / reject / delete. Mirrors batch-actions.vue.

function BatchActions({
  count,
  onEmoji,
  onAITemplate,
  onApprove,
  onReject,
  onDelete
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "batchbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "selcount"
  }, "Selected ", /*#__PURE__*/React.createElement("b", null, count), " comments"), /*#__PURE__*/React.createElement("div", {
    className: "group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "grouplbl"
  }, "Quick reply"), /*#__PURE__*/React.createElement("button", {
    className: "emoji-btn",
    onClick: () => onEmoji('❤️'),
    title: "Heart"
  }, "\u2764\uFE0F"), /*#__PURE__*/React.createElement("button", {
    className: "emoji-btn",
    onClick: () => onEmoji('👍'),
    title: "Thumbs up"
  }, "\uD83D\uDC4D"), /*#__PURE__*/React.createElement("button", {
    className: "emoji-btn",
    onClick: () => onEmoji('😂'),
    title: "Laugh"
  }, "\uD83D\uDE02"), /*#__PURE__*/React.createElement("button", {
    className: "emoji-btn",
    onClick: () => onEmoji('🙏'),
    title: "Thanks"
  }, "\uD83D\uDE4F"), /*#__PURE__*/React.createElement("button", {
    className: "emoji-btn",
    onClick: () => onEmoji('🎉'),
    title: "Celebrate"
  }, "\uD83C\uDF89")), /*#__PURE__*/React.createElement("div", {
    className: "group"
  }, /*#__PURE__*/React.createElement("span", {
    className: "grouplbl"
  }, "AI"), /*#__PURE__*/React.createElement("button", {
    className: "ai-tmpl",
    onClick: onAITemplate
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-sparkle"
  }), " AI reply\u2026")), /*#__PURE__*/React.createElement("div", {
    className: "pull-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-success",
    onClick: onApprove
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-check"
  }), " Approve"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-warning",
    onClick: onReject
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-x"
  }), " Reject"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-danger",
    onClick: onDelete
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-trash"
  }), " Delete")));
}
window.BatchActions = BatchActions;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/comment-admin/BatchActions.jsx", error: String((e && e.message) || e) }); }

// ui_kits/comment-admin/CommentRow.jsx
try { (() => {
// CommentRow.jsx — single row in the moderation table. Faithful to
// _research/admin/components/comments/comment-row.vue:
// — checkbox + id, content with optional translation, chat-bubble replies,
//   inline emoji reply composer, user, time, post id, tags, status, actions.

function timeAgo(ts) {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
function fmtAbs(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  }) + ' ' + d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
}
function TagBadge({
  tag,
  onFilter
}) {
  const cls = tag === 'Question' ? 'question' : tag === 'Bug report' ? 'bug' : tag === 'Criticism' ? 'criticism' : tag === 'Suggestion' ? 'suggestion' : 'greeting';
  return /*#__PURE__*/React.createElement("button", {
    className: `tag ${cls}`,
    onClick: () => onFilter?.(tag)
  }, tag);
}
function StatusPill({
  value
}) {
  const labels = {
    approved: 'approved',
    pending: 'pending',
    rejected: 'rejected'
  };
  return /*#__PURE__*/React.createElement("span", {
    className: `pill ${value}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), labels[value] || value);
}
function CommentRow({
  c,
  selected,
  onSelect,
  onApprove,
  onReject,
  onDelete,
  onShadowBan,
  onReply,
  onRemoveReply,
  onAIReply
}) {
  return /*#__PURE__*/React.createElement("tr", {
    className: (selected ? 'selected ' : '') + (c.isForeign ? 'foreign' : '')
  }, /*#__PURE__*/React.createElement("td", {
    className: "check"
  }, /*#__PURE__*/React.createElement("span", {
    className: 'cb' + (selected ? ' checked' : ''),
    onClick: () => onSelect(c.id)
  }, selected && /*#__PURE__*/React.createElement("i", {
    className: "ph-bold ph-check"
  }))), /*#__PURE__*/React.createElement("td", {
    className: "id-cell"
  }, "#", c.id), /*#__PURE__*/React.createElement("td", {
    className: "content-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "comment-text"
  }, c.content), c.translation && /*#__PURE__*/React.createElement("div", {
    className: "translation"
  }, /*#__PURE__*/React.createElement("b", null, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-translate"
  }), " ", c.lang ? `${c.lang} → en` : 'translation'), c.translation), c.replies && c.replies.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "replies"
  }, c.replies.map((r, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: 'reply' + (r.byAI ? ' ai' : '')
  }, r.content, /*#__PURE__*/React.createElement("div", {
    className: "reply-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "by"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-patch-check"
  }), r.author || 'You'), r.byAI && /*#__PURE__*/React.createElement("span", {
    className: "ai-tag"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-sparkle"
  }), "AI"), /*#__PURE__*/React.createElement("span", null, "\xB7 ", timeAgo(r.at))), /*#__PURE__*/React.createElement("div", {
    className: "reply-actions"
  }, /*#__PURE__*/React.createElement("button", null, "Edit"), /*#__PURE__*/React.createElement("button", {
    className: "danger",
    onClick: () => onRemoveReply(c.id, idx)
  }, "Delete"))))), (!c.replies || c.replies.length === 0) && /*#__PURE__*/React.createElement("div", {
    className: "reply-composer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, "Reply"), /*#__PURE__*/React.createElement("button", {
    className: "emoji-btn",
    onClick: () => onReply(c.id, '❤️'),
    title: "Heart"
  }, "\u2764\uFE0F"), /*#__PURE__*/React.createElement("button", {
    className: "emoji-btn",
    onClick: () => onReply(c.id, '👍'),
    title: "Thumbs up"
  }, "\uD83D\uDC4D"), /*#__PURE__*/React.createElement("button", {
    className: "emoji-btn",
    onClick: () => onReply(c.id, '😂'),
    title: "Laugh"
  }, "\uD83D\uDE02"), /*#__PURE__*/React.createElement("button", {
    className: "emoji-btn",
    onClick: () => onReply(c.id, '🙏'),
    title: "Thanks"
  }, "\uD83D\uDE4F"), /*#__PURE__*/React.createElement("button", {
    className: "ai-pill",
    onClick: () => onAIReply(c.id)
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-sparkle"
  }), " AI reply"), /*#__PURE__*/React.createElement("button", {
    className: "write"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-pencil-simple"
  }), " Write"))), /*#__PURE__*/React.createElement("td", {
    className: "user-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user"
  }, /*#__PURE__*/React.createElement("div", {
    className: 'uavatar ' + (c.user.kind || '')
  }, c.user.initial), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "uname"
  }, c.user.name), /*#__PURE__*/React.createElement("div", {
    className: "uemail"
  }, c.user.email), /*#__PURE__*/React.createElement("div", {
    className: 'ufrom' + (c.user.trusted ? ' trust' : '')
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${c.user.providerIcon || 'ph-google-logo'}`
  }), c.user.trusted ? 'trusted · 14 prior' : c.user.from || 'google')))), /*#__PURE__*/React.createElement("td", {
    className: "time-cell"
  }, /*#__PURE__*/React.createElement("span", {
    className: "relative"
  }, timeAgo(c.createdAt)), fmtAbs(c.createdAt)), /*#__PURE__*/React.createElement("td", {
    className: "post-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "post"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slug"
  }, c.postId), /*#__PURE__*/React.createElement("div", {
    className: "post-tools"
  }, /*#__PURE__*/React.createElement("button", {
    title: "Filter by this post"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-funnel"
  })), /*#__PURE__*/React.createElement("button", {
    title: "Filter by slug"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-link-simple"
  })), /*#__PURE__*/React.createElement("a", {
    href: c.postId,
    target: "_blank",
    rel: "noopener",
    title: "Open post"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrow-square-out"
  }))))), /*#__PURE__*/React.createElement("td", {
    className: "tags-cell"
  }, c.tags?.map(t => /*#__PURE__*/React.createElement(TagBadge, {
    key: t,
    tag: t
  })), c.lang && c.lang !== 'en' && /*#__PURE__*/React.createElement("button", {
    className: "tag lang"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-globe"
  }), " ", c.lang)), /*#__PURE__*/React.createElement("td", {
    className: "status-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "status-stack"
  }, /*#__PURE__*/React.createElement(StatusPill, {
    value: c.status
  }), c.shadowBanned && /*#__PURE__*/React.createElement("span", {
    className: "pill shadow"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-eye-slash"
  }), " banned"))), /*#__PURE__*/React.createElement("td", {
    className: "actions-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "action-grid"
  }, /*#__PURE__*/React.createElement("button", {
    className: "iconbtn approve",
    title: "Approve",
    onClick: () => onApprove(c.id)
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-check"
  })), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn reject",
    title: "Reject",
    onClick: () => onReject(c.id)
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-x"
  })), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    title: c.shadowBanned ? 'Unban' : 'Shadow ban',
    onClick: () => onShadowBan(c.id)
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${c.shadowBanned ? 'ph-eye' : 'ph-eye-slash'}`
  })), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn delete",
    title: "Delete",
    onClick: () => onDelete(c.id)
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-trash"
  })))));
}
window.CommentRow = CommentRow;
window.StatusPill = StatusPill;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/comment-admin/CommentRow.jsx", error: String((e && e.message) || e) }); }

// ui_kits/comment-admin/FilterBar.jsx
try { (() => {
// FilterBar.jsx — status segments + search + lang filter + per-post filter.
function FilterBar({
  status,
  onStatus,
  lang,
  onLang,
  counts,
  query,
  onQuery
}) {
  const statuses = [{
    key: 'pending',
    label: 'Pending',
    count: counts.pending
  }, {
    key: 'approved',
    label: 'Approved',
    count: counts.approved
  }, {
    key: 'rejected',
    label: 'Rejected',
    count: counts.rejected
  }, {
    key: 'all',
    label: 'All',
    count: counts.all
  }];
  const langs = [{
    key: 'all',
    label: 'All languages'
  }, {
    key: 'en',
    label: 'English'
  }, {
    key: 'zh',
    label: '中文'
  }, {
    key: 'ja',
    label: '日本語'
  }, {
    key: 'es',
    label: 'Español'
  }, {
    key: 'de',
    label: 'Deutsch'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "filterbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "segmented"
  }, statuses.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.key,
    className: status === s.key ? 'active' : '',
    onClick: () => onStatus(s.key)
  }, s.label, " ", /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, s.count)))), /*#__PURE__*/React.createElement("div", {
    className: "search"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-magnifying-glass"
  }), /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: e => onQuery(e.target.value),
    placeholder: "Search content, user, post id\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pull-right"
  }, /*#__PURE__*/React.createElement("select", {
    className: "btn btn-sm btn-outline",
    style: {
      padding: '0 10px'
    },
    value: lang,
    onChange: e => onLang(e.target.value)
  }, langs.map(l => /*#__PURE__*/React.createElement("option", {
    key: l.key,
    value: l.key
  }, l.label))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-outline"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-funnel"
  }), " Filter by post"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-sm btn-ghost"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrows-clockwise"
  }))));
}
window.FilterBar = FilterBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/comment-admin/FilterBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/comment-admin/Header.jsx
try { (() => {
// Header.jsx — sticky brand header + tabs + user menu.
function Header({
  tab = 'comments'
}) {
  const tabs = [{
    key: 'comments',
    label: 'Comments',
    i: 'ph-chat-circle-dots'
  }, {
    key: 'analytics',
    label: 'Analytics',
    i: 'ph-chart-bar'
  }, {
    key: 'templates',
    label: 'AI templates',
    i: 'ph-sparkle'
  }, {
    key: 'prompts',
    label: 'Prompts',
    i: 'ph-magic-wand'
  }, {
    key: 'settings',
    label: 'Settings',
    i: 'ph-gear'
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: "header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/favicon.svg",
    alt: "Meathill"
  }), /*#__PURE__*/React.createElement("b", null, "Meathill"), /*#__PURE__*/React.createElement("span", {
    className: "product"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-chat-circle-dots"
  }), " Comments")), /*#__PURE__*/React.createElement("nav", {
    className: "header-tabs"
  }, tabs.map(t => /*#__PURE__*/React.createElement("a", {
    key: t.key,
    href: "#",
    className: tab === t.key ? 'active' : '',
    onClick: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${t.i}`
  }), t.label))), /*#__PURE__*/React.createElement("div", {
    className: "header-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-md btn-ghost",
    title: "Notifications",
    style: {
      width: 36,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-bell"
  })), /*#__PURE__*/React.createElement(ThemeToggle, null), /*#__PURE__*/React.createElement("div", {
    className: "avatar",
    title: "meathill@example.com"
  }, "M"))));
}
window.AdminHeader = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/comment-admin/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/comment-admin/StatBar.jsx
try { (() => {
// StatBar.jsx — top stat strip.
function StatBar({
  counts
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "statbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat featured"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Pending review"), /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, counts.pending, " ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "need attention")), /*#__PURE__*/React.createElement("span", {
    className: "delta warn"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrow-up"
  }), " +12 last hour")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Total today"), /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, "142"), /*#__PURE__*/React.createElement("span", {
    className: "delta"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrow-up"
  }), " +24% vs y\u2019day")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Auto-approved"), /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, "87 ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "/ 61%")), /*#__PURE__*/React.createElement("span", {
    className: "delta"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-robot"
  }), " spam filter on")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Foreign-language"), /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, "31 ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "/ 9 langs")), /*#__PURE__*/React.createElement("span", {
    className: "delta"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-translate"
  }), " auto-translate")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "AI replies sent"), /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, "28"), /*#__PURE__*/React.createElement("span", {
    className: "delta"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-sparkle"
  }), " avg 4.8s")));
}
window.StatBar = StatBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/comment-admin/StatBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Components-zh.jsx
try { (() => {
// Hero-zh.jsx — 中文版 hero (中文文案 + 同样的下载表单)。
function HeroZh() {
  const [url, setUrl] = React.useState('');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), " 1200 \u4E07\u6B21\u4E0B\u8F7D \xB7 \u4E3B\u6D41\u5E73\u53F0\u8986\u76D6"), /*#__PURE__*/React.createElement("h1", null, "\u4E0B\u8F7D\u4EFB\u4F55\u4E1C\u897F\uFF0C", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "\u8FB9\u7F18\u901F\u5EA6\u3002")), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "\u63A7\u5236\u9762\u8DD1\u5728 Cloudflare Workers\uFF0C\u6267\u884C\u9762\u8DD1\u5728 Mac mini \u548C Docker \u4E0A\uFF0C\u7AEF\u5230\u7AEF HMAC \u7B7E\u540D\u3002\u7C98\u8D34\u94FE\u63A5\uFF0C\u5269\u4E0B\u7684\u4EA4\u7ED9\u6211\u4EEC\u3002"), /*#__PURE__*/React.createElement("form", {
    className: "dl-form",
    onSubmit: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("input", {
    type: "url",
    value: url,
    onChange: e => setUrl(e.target.value),
    placeholder: "\u7C98\u8D34 YouTube\u3001X\u3001Instagram \u94FE\u63A5\u2026",
    "aria-label": "\u89C6\u9891\u94FE\u63A5"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "paste"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-clipboard"
  }), " \u7C98\u8D34"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-lg btn-primary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-download-simple"
  }), " \u4E0B\u8F7D")), /*#__PURE__*/React.createElement("div", {
    className: "support-line"
  }, /*#__PURE__*/React.createElement("span", null, "\u652F\u6301\u5E73\u53F0"), /*#__PURE__*/React.createElement("span", {
    className: "platform"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-x-logo"
  }), " X / \u63A8\u7279"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "platform"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-youtube-logo"
  }), " YouTube"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "platform"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-instagram-logo"
  }), " Instagram"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "platform"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-tiktok-logo"
  }), " \u6296\u97F3"))), /*#__PURE__*/React.createElement("section", {
    className: "trust"
  }, /*#__PURE__*/React.createElement("div", {
    className: "trust-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "1200", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "\u4E07+")), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "\u603B\u4E0B\u8F7D")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "4K HDR"), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "\u6700\u9AD8\u753B\u8D28")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "\xA50"), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "\u514D\u8D39\u8D77\u6B65")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "99.9", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "%")), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "\u53EF\u7528\u6027")))));
}
function NavbarZh() {
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-inner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "nav-brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/favicon.svg",
    alt: "Meathill"
  }), "Meathill"), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "active"
  }, "\u4EA7\u54C1"), /*#__PURE__*/React.createElement("a", {
    href: "#use-cases"
  }, "\u4F7F\u7528\u573A\u666F"), /*#__PURE__*/React.createElement("a", {
    href: "#pricing"
  }, "\u4EF7\u683C"), /*#__PURE__*/React.createElement("a", {
    href: "#extension"
  }, "\u6D4F\u89C8\u5668\u6269\u5C55"), /*#__PURE__*/React.createElement("a", {
    href: "#docs"
  }, "\u6587\u6863"))), /*#__PURE__*/React.createElement("div", {
    className: "nav-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "lang-pill"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-globe"
  }), " \u4E2D\u6587"), /*#__PURE__*/React.createElement(ThemeToggle, null), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "btn btn-md btn-ghost"
  }, "\u767B\u5F55"), /*#__PURE__*/React.createElement("a", {
    href: "../app-dashboard/index.html",
    className: "btn btn-md btn-primary"
  }, "\u7ACB\u5373\u5F00\u59CB \u2192"))));
}
function HowItWorksZh() {
  const steps = [{
    icon: 'ph-copy',
    n: 1,
    t: '复制链接',
    d: '在 X、YouTube、Instagram 上打开内容，从地址栏复制链接。'
  }, {
    icon: 'ph-clipboard',
    n: 2,
    t: '粘贴入队',
    d: '粘贴到上方输入框。控制面校验、签名，分发给最近的 worker。'
  }, {
    icon: 'ph-download-simple',
    n: 3,
    t: '从 R2 下载',
    d: 'Worker 按你选择的清晰度转码后上传 R2，你拿到直连下载地址。'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "\u5DE5\u4F5C\u539F\u7406"), /*#__PURE__*/React.createElement("h2", null, "\u4ECE\u7C98\u8D34\u5230\u64AD\u653E\uFF0C\u4E00\u5206\u949F\u4EE5\u5185\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "section-lede"
  }, "\u652F\u6491\u6211\u4EEC SaaS \u670D\u52A1\u7684\u540C\u4E00\u5957\u67B6\u6784 \u2014 \u5B8C\u6574\u5F00\u6E90\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u5728\u81EA\u5BB6\u7684 Mac mini \u4E0A\u8DD1\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "steps"
  }, steps.map(s => /*#__PURE__*/React.createElement("div", {
    className: "step",
    key: s.n
  }, /*#__PURE__*/React.createElement("div", {
    className: "step-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${s.icon}`
  }), /*#__PURE__*/React.createElement("span", {
    className: "step-num"
  }, s.n)), /*#__PURE__*/React.createElement("h3", null, s.t), /*#__PURE__*/React.createElement("p", null, s.d)))));
}
function FeatureGridZh() {
  const features = [{
    i: 'ph-sparkle',
    t: '原画下载',
    d: '受支持的源站不二次转码。最高 4K HDR — 就是平台原始的字节流。',
    brand: true
  }, {
    i: 'ph-lightning',
    t: '边缘分发',
    d: 'Cloudflare Queues + Workers，任务派发 200ms 以内，全球任意区域。'
  }, {
    i: 'ph-shield-check',
    t: '没有水印',
    d: '干净文件，不嵌入任何水印或广告。'
  }, {
    i: 'ph-device-mobile',
    t: '到处可用',
    d: '浏览器、CLI、MCP、原生扩展 — 选你工作流里最顺手的入口。'
  }, {
    i: 'ph-user-minus',
    t: '免注册试用',
    d: '免费档不需要任何账号，只要一个链接。需要历史记录时再登录。'
  }, {
    i: 'ph-lock',
    t: '端到端签名',
    d: '控制面与每个 worker 之间 HMAC 签名。任务不可拦截、不可重放。'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "\u56E2\u961F\u4E3A\u4EC0\u4E48\u9009 Meathill"), /*#__PURE__*/React.createElement("h2", null, "\u5F53\u57FA\u7840\u8BBE\u65BD\u505A\uFF0C\u4E0D\u5F53\u843D\u5730\u9875\u505A\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "features"
  }, features.map(f => /*#__PURE__*/React.createElement("div", {
    className: 'feature' + (f.brand ? ' brand' : ''),
    key: f.t
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${f.i}`
  })), /*#__PURE__*/React.createElement("h3", null, f.t), /*#__PURE__*/React.createElement("p", null, f.d)))));
}
function AiAgentSectionZh() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "\u4E3A Agent \u800C\u8BBE\u8BA1"), /*#__PURE__*/React.createElement("h2", null, "\u4F60\u7684 AI agent \u5929\u7136\u61C2 Meathill\u3002"), /*#__PURE__*/React.createElement("p", {
    className: "section-lede"
  }, "MCP server\u3001CLI\u3001llms.txt \u2014 \u4EFB\u4F55 Claude / Cursor / Codex \u63A5\u5F97\u4E0A\u7684\u6807\u51C6\u63A5\u53E3\u3002\u65E0\u9700\u80F6\u6C34\u4EE3\u7801\uFF0C\u65E0\u9700\u7FFB Swagger \u6587\u6863\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "agent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "agent-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "agent-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-plug"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", null, "MCP server"), /*#__PURE__*/React.createElement("p", null, "\u4E00\u4E2A endpoint\uFF0C\u4E00\u4E2A OAuth scope\u3002\u628A URL \u586B\u8FDB\u4EFB\u4F55\u652F\u6301 MCP \u7684\u5BA2\u6237\u7AEF\uFF0C\u4F60\u7684 agent \u5C31\u80FD\u63D0\u4EA4\u548C\u8DDF\u8E2A\u4E0B\u8F7D\u4EFB\u52A1\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "code"
  }, /*#__PURE__*/React.createElement("span", {
    className: "com"
  }, "# claude_desktop_config.json"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "key"
  }, "\"meathill\""), ": ", `{`, " ", /*#__PURE__*/React.createElement("span", {
    className: "key"
  }, "\"url\""), ": ", /*#__PURE__*/React.createElement("span", {
    className: "str"
  }, "\"https://mcp.meathill.com\""), " ", `}`)), /*#__PURE__*/React.createElement("div", {
    className: "agent-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "agent-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-terminal"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", null, "\u547D\u4EE4\u884C"), /*#__PURE__*/React.createElement("p", null, "\u4E00\u4E2A\u4E8C\u8FDB\u5236\u6587\u4EF6\u3002\u4E0E SaaS \u8DD1\u7684\u662F\u540C\u4E00\u5957\u4EFB\u52A1\u683C\u5F0F\uFF0C\u53EF\u4EE5\u8BA9\u4EFB\u52A1\u7ED3\u679C\u76F4\u63A5\u843D\u5230\u4F60\u81EA\u5DF1\u7684 R2 bucket\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "code"
  }, /*#__PURE__*/React.createElement("span", {
    className: "com"
  }, "# \u5B89\u88C5\u6700\u65B0\u7248"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "key"
  }, "brew install"), " meathill/tap/x-downloader", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "key"
  }, "x-downloader"), " https://x.com/", /*#__PURE__*/React.createElement("span", {
    className: "str"
  }, "user/status/1234"))), /*#__PURE__*/React.createElement("div", {
    className: "agent-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "agent-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-file-text"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", null, "llms.txt"), /*#__PURE__*/React.createElement("p", null, "\u5BF9\u722C\u866B\u53CB\u597D\u7684\u63A5\u53E3\u6E05\u5355\uFF0C\u624B\u5199\u7EF4\u62A4\u3002\u6CA1\u6709\u81C3\u80BF\u7684 OpenAPI dump\u3002")))), /*#__PURE__*/React.createElement("div", {
    className: "agent-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "agent-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-code"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", null, "REST API"), /*#__PURE__*/React.createElement("p", null, "JSON \u8FDB\uFF0CJSON \u51FA\u3002Bearer token \u9274\u6743\u3002\u6BCF\u4E00\u6B21\u72B6\u6001\u53D8\u5316\u90FD\u6709 webhook \u901A\u77E5\u3002"))))));
}
function PremiumCtaZh() {
  return /*#__PURE__*/React.createElement("section", {
    className: "cta-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sparkle"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-sparkle"
  })), /*#__PURE__*/React.createElement("h2", null, "\u5347\u7EA7 Meathill Pro\uFF0C\u505A\u66F4\u591A\u3002"), /*#__PURE__*/React.createElement("p", null, "\u6BCF\u65E5\u65E0\u9650\u4E0B\u8F7D\uFF0C10 GB \u5355\u6587\u4EF6\u4E0A\u9650\uFF0C\u5B8C\u6574 4K HDR\uFF0C\u5168\u90E8 agent \u63A5\u53E3\u53EF\u7528\u3002\u6708\u4ED8 \xA569 \u6216\u5E74\u4ED8\u76F4\u63A5\u7701\u4E24\u4E2A\u6708\u3002"), /*#__PURE__*/React.createElement("a", {
    href: "#pricing",
    className: "btn btn-xl btn-primary"
  }, "\u67E5\u770B\u4EF7\u683C ", /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrow-right"
  }))));
}
function FaqZh() {
  const items = [{
    q: 'Meathill 免费使用吗？',
    a: '是的 — 免费档每天 10 次下载，单文件最大 100 MB，不需要信用卡。Pro 开放无限下载、10 GB 文件、4K HDR 和所有 agent 接口。'
  }, {
    q: '文件保存在哪里？',
    a: '保存在距离 worker 最近的 Cloudflare R2 区域。免费档保留 7 天，Pro 保留 30 天。也可以通过 CLI 让文件直接落到你自己的 R2 bucket。'
  }, {
    q: '可以自部署吗？',
    a: '可以。控制面通过 OpenNext 部署到 Cloudflare Workers，worker 可以跑在 Docker 镜像里，也可以直接跑在 macOS 上。仓库里有一键部署脚本和迁移脚本。'
  }, {
    q: '与 yt-dlp 有什么区别？',
    a: '我们部分适配器底层用 yt-dlp，但我们加了控制面、任务队列、重试策略、签名回调、管理后台和 agent 接口（MCP、CLI、llms.txt、REST）。'
  }, {
    q: '支持哪些站点？',
    a: 'X、YouTube、Instagram、TikTok、Reddit，以及 yt-dlp 支持的长尾站点。B 站和抖音处于私测阶段，可以联系我们申请。'
  }, {
    q: '版权问题怎么办？',
    a: '我们只抓取公开可访问的媒体。你自己负责确保下载行为在所在司法管辖区内合法。'
  }];
  const [openIdx, setOpenIdx] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "\u7591\u95EE"), /*#__PURE__*/React.createElement("h2", null, "\u8BDA\u5B9E\u4F5C\u7B54\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "faq-list"
  }, items.map((it, idx) => /*#__PURE__*/React.createElement("details", {
    key: idx,
    className: "faq-item",
    open: openIdx === idx,
    onToggle: e => {
      if (e.currentTarget.open) setOpenIdx(idx);
    }
  }, /*#__PURE__*/React.createElement("summary", null, it.q, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-caret-down"
  })), /*#__PURE__*/React.createElement("p", null, it.a)))));
}
function FooterZh() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-cross"
  }, /*#__PURE__*/React.createElement("h4", null, "\u987A\u4FBF\u770B\u770B\u5176\u4ED6\u4E0B\u8F7D\u5668"), /*#__PURE__*/React.createElement("div", {
    className: "cross-links"
  }, /*#__PURE__*/React.createElement("a", {
    className: "cross-link",
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-x-logo",
    style: {
      color: '#14171A'
    }
  }), "X / \u63A8\u7279\u89C6\u9891\u4E0B\u8F7D"), /*#__PURE__*/React.createElement("a", {
    className: "cross-link",
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-youtube-logo",
    style: {
      color: '#FF0000'
    }
  }), "YouTube \u4E0B\u8F7D"), /*#__PURE__*/React.createElement("a", {
    className: "cross-link",
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-instagram-logo",
    style: {
      color: '#E1306C'
    }
  }), "Instagram \u89C6\u9891\u4E0B\u8F7D"), /*#__PURE__*/React.createElement("a", {
    className: "cross-link",
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-tiktok-logo",
    style: {
      color: '#000'
    }
  }), "\u6296\u97F3 / TikTok \u4E0B\u8F7D"))), /*#__PURE__*/React.createElement("div", {
    className: "footer-meta"
  }, /*#__PURE__*/React.createElement("p", null, "\u7ED9\u5B9E\u5E72\u6D3E\u7528\u7684\u529F\u80FD\u578B SaaS\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#pricing"
  }, "\u4EF7\u683C"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "#terms"
  }, "\u670D\u52A1\u6761\u6B3E"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "#privacy"
  }, "\u9690\u79C1\u653F\u7B56"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "#contact"
  }, "\u8054\u7CFB\u6211\u4EEC"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/meathill"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-github-logo"
  }), " GitHub")), /*#__PURE__*/React.createElement("p", {
    className: "copy"
  }, "\xA9 2026 Meathill \xB7 \u57FA\u4E8E Cloudflare\u3001OpenResty \u4E0E\u5F00\u653E\u7F51\u7EDC\u3002"))));
}
window.HeroZh = HeroZh;
window.NavbarZh = NavbarZh;
window.HowItWorksZh = HowItWorksZh;
window.FeatureGridZh = FeatureGridZh;
window.AiAgentSectionZh = AiAgentSectionZh;
window.PremiumCtaZh = PremiumCtaZh;
window.FaqZh = FaqZh;
window.FooterZh = FooterZh;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Components-zh.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Footer.jsx
try { (() => {
// Footer.jsx — cross-site strip + meta. Mirrors web-shared/components/footer.tsx.
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-cross"
  }, /*#__PURE__*/React.createElement("h4", null, "All useful downloaders you need"), /*#__PURE__*/React.createElement("div", {
    className: "cross-links"
  }, /*#__PURE__*/React.createElement("a", {
    className: "cross-link",
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-x-logo",
    style: {
      color: '#14171A'
    }
  }), "X Video Downloader"), /*#__PURE__*/React.createElement("a", {
    className: "cross-link",
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-youtube-logo",
    style: {
      color: '#FF0000'
    }
  }), "YouTube Downloader"), /*#__PURE__*/React.createElement("a", {
    className: "cross-link",
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-instagram-logo",
    style: {
      color: '#E1306C'
    }
  }), "Instagram Video Download"), /*#__PURE__*/React.createElement("a", {
    className: "cross-link",
    href: "#"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-tiktok-logo",
    style: {
      color: '#000'
    }
  }), "TikTok Downloader"))), /*#__PURE__*/React.createElement("div", {
    className: "footer-meta"
  }, /*#__PURE__*/React.createElement("p", null, "Functional SaaS for the people who actually ship."), /*#__PURE__*/React.createElement("div", {
    className: "links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#pricing"
  }, "Pricing"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "#terms"
  }, "Terms"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "#privacy"
  }, "Privacy"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "#contact"
  }, "Contact"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/meathill"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-github-logo"
  }), " GitHub")), /*#__PURE__*/React.createElement("p", {
    className: "copy"
  }, "\xA9 2026 Meathill LLC \xB7 built on Cloudflare, OpenResty, and the open web."))));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Hero.jsx
try { (() => {
// Hero.jsx — hero w/ inline download form + trust bar. Mirrors the
// pattern from packages/web/app/[lang]/page.tsx hero section.
const {
  useState: useState_Hero
} = React;
function Hero() {
  const [url, setUrl] = useState_Hero('');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), " 12M+ downloads \xB7 all major platforms"), /*#__PURE__*/React.createElement("h1", null, "Download anything,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "at edge speed.")), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "A control plane on Cloudflare Workers, a worker fleet on Mac mini and Docker, signed end-to-end. Paste a link \u2014 we handle the rest."), /*#__PURE__*/React.createElement("form", {
    className: "dl-form",
    onSubmit: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("input", {
    type: "url",
    value: url,
    onChange: e => setUrl(e.target.value),
    placeholder: "Paste a YouTube, X, or Instagram URL\u2026",
    "aria-label": "Video URL"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "paste"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-clipboard"
  }), " Paste"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-lg btn-primary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-download-simple"
  }), " Download")), /*#__PURE__*/React.createElement("div", {
    className: "support-line"
  }, /*#__PURE__*/React.createElement("span", null, "Works with"), /*#__PURE__*/React.createElement("span", {
    className: "platform"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-x-logo"
  }), " X / Twitter"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "platform"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-youtube-logo"
  }), " YouTube"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "platform"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-instagram-logo"
  }), " Instagram"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "platform"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-tiktok-logo"
  }), " TikTok"))), /*#__PURE__*/React.createElement("section", {
    className: "trust"
  }, /*#__PURE__*/React.createElement("div", {
    className: "trust-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "12", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "M+")), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Downloads")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "4K HDR"), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Max quality")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "$0"), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "To start")), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "99.9", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "%")), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, "Uptime")))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Navbar.jsx
try { (() => {
// Navbar.jsx — sticky glass nav, mirrors web-shared/components/navbar.tsx.
const {
  useState
} = React;
function Navbar({
  active = 'home'
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-inner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "nav-brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/favicon.svg",
    alt: "Meathill"
  }), "Meathill"), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: active === 'home' ? 'active' : ''
  }, "Product"), /*#__PURE__*/React.createElement("a", {
    href: "#use-cases"
  }, "Use cases"), /*#__PURE__*/React.createElement("a", {
    href: "#pricing"
  }, "Pricing"), /*#__PURE__*/React.createElement("a", {
    href: "#extension"
  }, "Extension"), /*#__PURE__*/React.createElement("a", {
    href: "#docs"
  }, "Docs"))), /*#__PURE__*/React.createElement("div", {
    className: "nav-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "lang-pill"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-globe"
  }), " EN"), /*#__PURE__*/React.createElement(ThemeToggle, null), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "btn btn-md btn-ghost"
  }, "Sign in"), /*#__PURE__*/React.createElement("a", {
    href: "../app-dashboard/index.html",
    className: "btn btn-md btn-primary"
  }, "Get started \u2192"))));
}
window.Navbar = Navbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Navbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Sections.jsx
try { (() => {
// Sections.jsx — HowItWorks, Features, AiAgent, Faq, PremiumCta.
// One file because each is short and they share rhythm.

function HowItWorks() {
  const steps = [{
    icon: 'ph-copy',
    n: 1,
    t: 'Copy the URL',
    d: 'Open the post on X, YouTube, or Instagram, then copy the link from the address bar.'
  }, {
    icon: 'ph-clipboard',
    n: 2,
    t: 'Paste & queue',
    d: 'Drop it in the field above. The control plane validates, signs, and dispatches to a worker.'
  }, {
    icon: 'ph-download-simple',
    n: 3,
    t: 'Download from R2',
    d: 'The worker transcodes to the resolution you chose and uploads to R2. You get a direct link.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "How it works"), /*#__PURE__*/React.createElement("h2", null, "From paste to playable in under a minute."), /*#__PURE__*/React.createElement("p", {
    className: "section-lede"
  }, "The same architecture that powers our SaaS \u2014 exposed cleanly so you can also run it yourself on a Mac mini.")), /*#__PURE__*/React.createElement("div", {
    className: "steps"
  }, steps.map(s => /*#__PURE__*/React.createElement("div", {
    className: "step",
    key: s.n
  }, /*#__PURE__*/React.createElement("div", {
    className: "step-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${s.icon}`
  }), /*#__PURE__*/React.createElement("span", {
    className: "step-num"
  }, s.n)), /*#__PURE__*/React.createElement("h3", null, s.t), /*#__PURE__*/React.createElement("p", null, s.d)))));
}
function FeatureGrid() {
  const features = [{
    i: 'ph-sparkle',
    t: 'Original quality',
    d: 'No re-encoding for supported sources. Up to 4K HDR where available — the same bytes that left the platform.',
    brand: true
  }, {
    i: 'ph-lightning',
    t: 'Edge dispatch',
    d: 'Cloudflare Queues + Workers means jobs are dispatched in under 200ms, from any region.'
  }, {
    i: 'ph-shield-check',
    t: 'No watermarks',
    d: 'Clean files. No overlays, no upsells embedded in your video.'
  }, {
    i: 'ph-device-mobile',
    t: 'Works everywhere',
    d: 'Browser, CLI, MCP, native extension — pick the surface that fits your workflow.'
  }, {
    i: 'ph-user-minus',
    t: 'No signup to try',
    d: 'The free tier requires nothing more than your URL. Sign in only when you want history.'
  }, {
    i: 'ph-lock',
    t: 'Signed end-to-end',
    d: 'HMAC between the control plane and every worker. Your jobs can\u2019t be intercepted or replayed.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "Why teams pick Meathill"), /*#__PURE__*/React.createElement("h2", null, "Built like a piece of infrastructure, not a landing page.")), /*#__PURE__*/React.createElement("div", {
    className: "features"
  }, features.map(f => /*#__PURE__*/React.createElement("div", {
    className: 'feature' + (f.brand ? ' brand' : ''),
    key: f.t
  }, /*#__PURE__*/React.createElement("div", {
    className: "feature-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: `ph ${f.i}`
  })), /*#__PURE__*/React.createElement("h3", null, f.t), /*#__PURE__*/React.createElement("p", null, f.d)))));
}
function AiAgentSection() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "Built for agents"), /*#__PURE__*/React.createElement("h2", null, "Your AI agents speak Meathill natively."), /*#__PURE__*/React.createElement("p", {
    className: "section-lede"
  }, "MCP server, CLI, and llms.txt \u2014 the same surface every Claude / Cursor / Codex setup expects. No glue code, no swagger spelunking.")), /*#__PURE__*/React.createElement("div", {
    className: "agent"
  }, /*#__PURE__*/React.createElement("div", {
    className: "agent-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "agent-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-plug"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", null, "MCP server"), /*#__PURE__*/React.createElement("p", null, "One endpoint, one OAuth scope. Drop the URL into any MCP-aware client and your agent can submit and track download jobs."))), /*#__PURE__*/React.createElement("div", {
    className: "code"
  }, /*#__PURE__*/React.createElement("span", {
    className: "com"
  }, "# claude_desktop_config.json"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "key"
  }, "\"meathill\""), ": ", `{`, " ", /*#__PURE__*/React.createElement("span", {
    className: "key"
  }, "\"url\""), ": ", /*#__PURE__*/React.createElement("span", {
    className: "str"
  }, "\"https://mcp.meathill.com\""), " ", `}`)), /*#__PURE__*/React.createElement("div", {
    className: "agent-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "agent-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-terminal"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", null, "CLI"), /*#__PURE__*/React.createElement("p", null, "One binary. Runs the same job format as the SaaS, against your own R2 bucket if you bring one."))), /*#__PURE__*/React.createElement("div", {
    className: "code"
  }, /*#__PURE__*/React.createElement("span", {
    className: "com"
  }, "# pull the latest binary"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "key"
  }, "brew install"), " meathill/tap/x-downloader", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "key"
  }, "x-downloader"), " https://x.com/", /*#__PURE__*/React.createElement("span", {
    className: "str"
  }, "user/status/1234"))), /*#__PURE__*/React.createElement("div", {
    className: "agent-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "agent-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-file-text"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", null, "llms.txt"), /*#__PURE__*/React.createElement("p", null, "Crawl-friendly description of every public endpoint, written by hand. No giant OpenAPI dump.")))), /*#__PURE__*/React.createElement("div", {
    className: "agent-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "agent-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-code"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", null, "REST API"), /*#__PURE__*/React.createElement("p", null, "JSON in, JSON out. Bearer token auth. Webhooks on every state transition."))))));
}
function PremiumCta() {
  return /*#__PURE__*/React.createElement("section", {
    className: "cta-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sparkle"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph-fill ph-sparkle"
  })), /*#__PURE__*/React.createElement("h2", null, "Go further with Meathill Pro."), /*#__PURE__*/React.createElement("p", null, "Unlimited daily downloads, 10 GB file size, full 4K HDR, and access to every agent surface. $9/mo or two months free yearly."), /*#__PURE__*/React.createElement("a", {
    href: "#pricing",
    className: "btn btn-xl btn-primary"
  }, "See pricing ", /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrow-right"
  }))));
}
function Faq() {
  const items = [{
    q: 'Is Meathill free to use?',
    a: 'Yes — the free tier gives you 10 downloads per day with files up to 100 MB. No credit card. Pro unlocks unlimited downloads, 10 GB files, 4K HDR, and the agent surfaces.'
  }, {
    q: 'Where are the files stored?',
    a: 'On Cloudflare R2 in the region nearest the worker that handled the job. Files are kept for 7 days on the free tier, 30 days on Pro. You can also download to your own R2 bucket via the CLI.'
  }, {
    q: 'Can I self-host?',
    a: 'Yes. The control plane deploys to Cloudflare Workers (OpenNext) and the worker runs as a Docker image or directly on macOS. The repo includes a one-shot deploy script and migrations.'
  }, {
    q: 'How is this different from yt-dlp?',
    a: 'We use yt-dlp under the hood for several adapters — but we add a control plane, queue, retry policy, signed callbacks, an admin dashboard, and the agent surfaces (MCP, CLI, llms.txt, REST).'
  }, {
    q: 'Do you support TikTok / Bilibili / Douyin?',
    a: 'X, YouTube, Instagram, TikTok, Reddit, and a long tail of yt-dlp-supported sources. Bilibili and Douyin are in private beta — ask us for access.'
  }, {
    q: 'What about copyright?',
    a: 'We only fetch publicly available media. You\u2019re responsible for the legality of your downloads in your jurisdiction.'
  }];
  const [openIdx, setOpenIdx] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-eyebrow"
  }, "Questions"), /*#__PURE__*/React.createElement("h2", null, "Answered honestly.")), /*#__PURE__*/React.createElement("div", {
    className: "faq-list"
  }, items.map((it, idx) => /*#__PURE__*/React.createElement("details", {
    key: idx,
    className: "faq-item",
    open: openIdx === idx,
    onToggle: e => {
      if (e.currentTarget.open) setOpenIdx(idx);
    }
  }, /*#__PURE__*/React.createElement("summary", null, it.q, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-caret-down"
  })), /*#__PURE__*/React.createElement("p", null, it.a)))));
}
window.HowItWorks = HowItWorks;
window.FeatureGrid = FeatureGrid;
window.AiAgentSection = AiAgentSection;
window.PremiumCta = PremiumCta;
window.Faq = Faq;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Sections.jsx", error: String((e && e.message) || e) }); }

})();
