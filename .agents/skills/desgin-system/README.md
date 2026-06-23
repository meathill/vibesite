# Meathill Design System

A design system for **Meathill** — the SaaS suite by Bevis Tseng / Meathill
covering edge-deployed downloaders (X / YouTube / Instagram / TikTok),
the Awesome Comment commenting platform, and future utility SaaS in the
same family.

The vibe is **functional, premium, trust-building.** Built on top of a
real Tailwind v4 + Base UI + Phosphor codebase, so every token here has
a concrete production analogue.

## Index

| Path                    | What's in it |
|---|---|
| `colors_and_type.css`   | All color, type, radius, shadow, motion and semantic tokens — the source of truth. Import this in any HTML you write. **Dark mode tokens included** under `[data-theme='dark']`. |
| `assets/`               | `logo-mark.svg`, `logo-wordmark.svg`, `logo-mark-dark.svg`, `favicon.svg` |
| `preview/`              | 24 small cards that populate the **Design System** tab — colors, type, components |
| `shared/`               | `theme-toggle.js` + matching CSS + a React wrapper (`ThemeToggle.jsx`) — drop-in dark/light toggle that persists in `localStorage` and respects `prefers-color-scheme`. Keyboard shortcut: <kbd>⌘⇧L</kbd>. |
| `ui_kits/marketing-site/` | High-fidelity React recreation of the marketing surface (English + Chinese variants) |
| `ui_kits/app-dashboard/`  | High-fidelity React recreation of the user dashboard (with live state) |
| `ui_kits/comment-admin/`  | Awesome Comment moderation surface — live row state, batch actions, AI templates |
| `emails/`               | Five table-based transactional email templates (download complete, payment receipt, comment notification, quota warning, welcome) |
| `og/`                   | Four 1200×630 OG image templates (default, article, feature, pro) — designed to be screenshotted into PNGs |
| `states/`               | Six edge / empty states (404, payment failed, quota exhausted, empty queue, empty inbox, worker offline) in a single gallery file |
| `SKILL.md`              | Skill manifest — makes this folder usable as a Claude Code / Agent Skill |
| `_research/`            | Source files imported from upstream repos (read-only reference) |

## Brand context

We pulled context from two upstream repos:

- [`meathill/x-downloader`](https://github.com/meathill/x-downloader) — a polyglot
  video-downloader SaaS with three branded surfaces (X, YouTube, Instagram) sharing
  a `web-shared` component library. **Stack: Next.js 16 + React 19 + Tailwind v4 +
  Base UI + Phosphor + Cloudflare Workers/Queues/R2 + D1 + Stripe + better-auth.**
- [`awesome-comment/awesome-comment`](https://github.com/awesome-comment/awesome-comment)
  — an embeddable AI-powered comment system with admin panel. **Stack: Vue 3 + Nuxt 3
  + Nuxt UI + DaisyUI + TiDB Cloud + Upstash Redis.**

Both ship as Meathill-authored, self-hostable open source with an optional managed
tier. Together they shape an aesthetic that's **infrastructure-first, agent-friendly,
and built on the edge** rather than enterprise-corporate.

> **Read these repos directly** if you want to do better work — every component
> we recreated has a richer real-world implementation upstream. Especially worth
> reading: `packages/web-shared/components/` in x-downloader (production-grade
> Tailwind v4 + Base UI patterns), and `packages/admin/pages/admin/comments.vue`
> in awesome-comment (the comment moderation table).

## Content fundamentals

### Voice

- **Functional over emotional.** We are talking to people who ship things.
  Sentences are short, claims are concrete. "Edge-deployed control plane on
  Cloudflare Workers" is good copy; "Empower your creative workflow" is not.
- **No marketing speak.** No "delight," no "unleash," no "supercharge."
- **Numbers carry weight.** "10 GB max file," "200ms dispatch," "$9/mo" — pick
  the number that's defensible and let it do the persuading.
- **First person plural only when committing.** "We handle the rest." "We sign
  every callback with HMAC." Otherwise default to second person — "You get a
  direct R2 link."
- **Mild dry humor is OK.** "Functional SaaS for the people who actually ship."
  Self-aware, never sarcastic at the user.

### Examples lifted from the source

> X video downloader · download x video, twitter video downloader, x to mp4

> A modern, feature-rich comment system built with Vue3 and Nuxt3, designed for
> static sites and modern web applications.

> Engage with your global audience effortlessly. AI-powered comment system that
> breaks language barriers and provides seamless authentication.

> 一个面向个人部署的 X（Twitter）视频下载系统，采用"控制面 + 执行面"分离架构

### Casing & punctuation

- Sentence case for headings (not Title Case). `From paste to playable in under a minute.`
- Eyebrows are UPPERCASE with `letter-spacing: 0.06em`.
- Buttons are sentence case: `Get started`, `Download .mp4`, `View pricing →`.
- Em-dashes (`—`) for asides, middle dots (`·`) for inline separators (`v1.4 · 2026`).
- Trailing period on hero subtitles and full-sentence section heads. Snappy two-word
  buttons skip it.
- Numbers: `4K` not `4k`. `$9/mo` not `$9 / month` on cards. `10 GB`, `200ms`, `99.9%`.

### Emoji

**Don't.** Phosphor covers icon needs; emoji creep in only when speaker-style language
demands it (e.g. comment shortcuts in the awesome-comment admin like 👍/❤️/😂 — but
those are a deliberate user-facing feature, not chrome).

## Visual foundations

### Color

A **warm-red** palette anchored on `--brand-500` = `oklch(0.58 0.22 28)` — sits
roughly between YouTube red and a deeper TiDB-style crimson. All tokens are OKLCH
for clean `--alpha()` and `color-mix()` composition.

- **Page background** is a warm off-white (`--neutral-50`, hue 60) with a subtle top
  radial wash. Never pure white, never cool blue.
- **Cards** are pure white (`--neutral-0`) with a 1px warm-neutral border (~5–8%
  alpha) and an inset 1px white top edge for a subtle bevel.
- **Primary action** is one strong red CTA per viewport. Never two reds competing.
- **Semantic** colors stay warm: success is olive-green (hue 142, not teal); warning
  is amber; destructive shares the brand red family; info is a warm neutral gray,
  **not blue** (Facebook blue would clash with the warm palette).
- We explicitly avoid: cool blue, purple, yellow (Mu Yi territory), and pure
  black-on-white minimalism.

### Type

- **Display** — `Sora` 600/700/800. Geometric, modern, slight tech edge. Used for
  hero, h1–h4, card titles, big metric values.
- **Sans** — `Plus Jakarta Sans` 400/500/600/700. The workhorse for body, UI,
  forms, tables, buttons.
- **Mono** — `JetBrains Mono` 400/500/600 (ligatures off). Code, IDs, timestamps,
  shell commands.
- **All three from Google Fonts**, loaded at the top of `colors_and_type.css`. No
  font files are vendored.
- Scale runs `2xs` (11px) through `6xl` (72px). UI bottoms out at 11px for micro
  labels; never below.

### Background, surface & layering

- One radial wash from top-center (brand at ~18% alpha), one secondary wash
  bottom-right (amber, very subtle). Static — does not animate.
- Glass nav: 70% white + 14px blur, sitting on top of the wash.
- Card stack: `--neutral-100` (panel) → `--neutral-0` (card) → `--popover` w/ shadow-md.
- Premium CTAs add a soft top glow via radial gradient over the brand-tinted block.

### Borders & shadows

- Borders are `1px solid var(--border)` (~92% lightness, hue 48). Cards usually pair
  border + inset highlight, never border + heavy outer shadow.
- Shadows are warm-tinted (hue 28, very low chroma), almost transparent. `--shadow-xs`
  on most cards; `--shadow-md` for popovers; `--shadow-xl` for dialogs.
- The branded `--shadow-primary` glow is reserved for the single most important CTA.

### Corner radii

`--radius = 12px`. Buttons get `lg` (12px). Inputs `xl` (16px). Cards `2xl` (20px).
Hero CTA blocks `3xl` (24px). Pills and avatars `--radius-full`. Cards always sit
**one notch above** their interactive contents.

### Spacing

Stock Tailwind 4px unit. Section vertical padding is 80px desktop; 1100px max-width;
section heads centered at 720px.

### Motion

`ease-out` (`cubic-bezier(.2,.8,.2,1)`) is the default. Three durations: **fast
120ms** for hover/focus, **base 180ms** for toggle/dropdown, **slow 280ms** for
dialog enter. **No bounce, no spring.** Animated feedback is at most two elements
at a time.

### Hover, press, focus

- **Hover** — background shifts from `--primary` to `--primary-hover` (brand-600),
  or background ramps to `--accent` for outline/ghost. Borders go from `--border`
  to `oklch(0.20 0.05 28 / 14%)` on interactive cards. No `transform: scale()`.
- **Press** — `--primary-active` (brand-700), `box-shadow: var(--shadow-xs)`,
  `translateY(0.5px)`. Subtle "click down" feel.
- **Focus** — solid 2px `--ring` (brand-500) with 2px offset on buttons; for inputs,
  border goes to `--ring` and a 3px brand-tinted glow joins the inset shadow.

### Use of transparency & blur

- `backdrop-filter: blur(14px)` on the sticky navbar and dashboard topbar over a
  70% white background.
- 12% / 14% alpha for tinted status pills.
- Avoid blur elsewhere — it gets expensive and the design doesn't need it.

### Layout & fixed elements

- Pages center-aligned with max-width 1100–1280px.
- The marketing nav is sticky with a backdrop blur.
- The dashboard uses a sticky topbar AND a fixed-width 240px sidebar.
- We use CSS grid and flex `gap`, **never bare margins on siblings.**

### Cards (anatomy)

```
┌──────────────────────────────── radius-2xl ───────────────────┐
│  border 1px var(--border)                                     │
│  inset-shadow 0 1px rgba(255,255,255,0.7)   ← white top edge  │
│  box-shadow var(--shadow-xs)                                  │
│  padding 24px                                                 │
│                                                               │
│  [44×44 icon tile · radius-lg · neutral-100]                  │
│                                                               │
│  Card title — Sora 600 / 16px                                 │
│  Body copy — Plus Jakarta 400 / 14px / muted-foreground       │
└───────────────────────────────────────────────────────────────┘
hover:  border → 14% warm-black · box-shadow → md · translateY(-2px)
```

## Iconography

We use **Phosphor Icons** (`@phosphor-icons/react` in production, served as a
webfont from `unpkg.com/@phosphor-icons/web` in this design system for portability).

- **Weight: regular** for ~95% of UI. `fill` and `duotone` are reserved for the
  premium-CTA sparkle, plan crowns, success check-marks, and other "moments of
  emphasis."
- **Sizes: 14px** in xs buttons, **16–18px** inline, **20px** in feature/agent
  cards, **22–26px** in icon tiles, **32–48px** in hero badges.
- **No SVG hand-drawing.** If Phosphor doesn't have it, we substitute the closest
  Phosphor option. (Phosphor has 1500+ glyphs — there's almost always a match.)
- **No emoji** in chrome.
- **No mixing icon sets.** Brand logos (X, YouTube, Instagram, TikTok, GitHub,
  Google) are all in Phosphor; we use those, not the original logos, so they
  visually integrate.
- The `awesome-comment` admin uses Heroicons in its source — we treat that as
  legacy and **convert to Phosphor on touch.**

### Icon classes (font version)

```html
<i class="ph ph-download-simple"></i>            <!-- regular -->
<i class="ph-fill ph-sparkle"></i>               <!-- fill -->
<i class="ph-duotone ph-rocket"></i>             <!-- duotone -->
```

The font CSS is at
`https://unpkg.com/@phosphor-icons/web@2.1.2/src/regular/style.css` (plus `/fill/`
and `/duotone/` for the other weights). Same glyph names as the React package.

### Logos

- `assets/logo-mark.svg` — 120×120 brand mark for app icons, favicons, og-images
- `assets/logo-mark-dark.svg` — dark-mode mark on near-black
- `assets/logo-wordmark.svg` — horizontal lockup for navbars/footers
- `assets/favicon.svg` — 32×32 simplified favicon

### Font substitution flag

⚠️ The upstream codebase doesn't ship explicit web fonts — it falls back to
`ui-sans-serif, system-ui`. We chose **Sora / Plus Jakarta Sans / JetBrains
Mono** from Google Fonts as best matches for the desired "functional, premium,
slightly geometric" feel. **If you have brand font files, replace the `@import`
at the top of `colors_and_type.css` and update `--font-display / --font-sans /
--font-mono`.**

## UI kits

| Kit | Path | What's there |
|---|---|---|
| **Marketing site** | `ui_kits/marketing-site/index.html` · `index-zh.html` | Sticky nav, hero with inline download form, 4-up trust strip, 3-up how-it-works, 6-up feature grid, AI agent surfaces, premium CTA, FAQ, cross-product footer. Chinese variant uses Noto Sans SC fallback. |
| **App dashboard**  | `ui_kits/app-dashboard/index.html`  | Sidebar with grouped nav, sticky topbar with command-K search, 4 stat tiles, upgrade banner, new-download composer, live task table — paste a URL and watch it walk through queued → downloading → transcoding → done |
| **Comment admin**  | `ui_kits/comment-admin/index.html`  | Awesome Comment moderation table — multi-select rows to reveal a batch bar with emoji + AI templates, per-row inline emoji/AI reply, foreign-language translation blocks, status segments + lang filter + search |

Each kit has a `README.md` explaining which source files it mirrors and what
patterns were lifted. Open the marketing site, then click `Get started →` in the
nav to navigate to the dashboard.

## Dark mode

Toggle anywhere with <kbd>⌘⇧L</kbd> (Mac) / <kbd>Ctrl⇧L</kbd> (Windows). Or
click the sun/moon icon in any UI kit's top bar. Choice persists in
`localStorage`. On first visit we respect `prefers-color-scheme`.

The whole token system pivots in `[data-theme='dark']`:

- `--primary` shifts from `oklch(0.58 0.22 28)` to `oklch(0.68 0.20 30)` —
  higher lightness, slightly lower chroma — so the warm red stays readable on
  dark.
- Neutrals collapse to a 3-step warm-near-black palette (`bg` → `card` →
  `popover`) anchored on hue 30, never cool slate.
- Shadows become near-invisible; the system leans on borders + brightness lift
  for depth on dark surfaces.
- Selection highlight, glass surfaces, and the brand gradient all swap to
  dark-tuned variants automatically.

If your design hardcodes `var(--neutral-900)` or `rgba(255,255,255,X)`, it
won't dark-mode. Always use semantic tokens (`--foreground`, `--card`,
`--muted`, `--glass-bg`) — those are what flip.

## Localization

The marketing site ships in English (`index.html`) and Chinese
(`index-zh.html`).  `colors_and_type.css` lists **Noto Sans SC** as a fallback
in both `--font-display` and `--font-sans`, so Sora handles Latin and Noto
Sans SC handles CJK in the same heading. The Chinese variant lives in a
separate `Components-zh.jsx` because copy lives in component bodies — for
production with `next-intl` or similar, lift the strings into dictionaries.

## Email templates

Five table-based templates in `emails/`: download complete, payment receipt,
new comment notification, quota warning, welcome. Tables for layout, system
fonts only (Outlook can't render web fonts reliably), hex colors (oklch isn't
email-safe), light-only (iOS Mail's auto-dark shifts warm reds toward
orange).

## OG (social share) images

Four 1200×630 templates in `og/` — default, article, feature, pro. Design
once, screenshot into PNGs with Playwright, serve at `og:image` meta URLs.

## Edge & empty states

`states/index.html` is a single gallery with six panels designed to drop into
product surfaces: 404, payment failed, quota exhausted, empty queue, empty
inbox, worker offline. Every state uses semantic tokens — dark mode and brand
re-tunes apply for free.

## Caveats

- **Fonts are best-effort** — see the substitution flag above.
- **Logos are placeholder marks** (a clean geometric "M") — replace with the
  user-supplied lockup if available.
