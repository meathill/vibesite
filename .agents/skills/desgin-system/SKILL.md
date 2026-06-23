---
name: meathill-design
description: Use this skill to generate well-branded interfaces and assets for Meathill — the SaaS suite by Bevis Tseng covering x-downloader (X / YouTube / Instagram / TikTok video downloaders) and Awesome Comment — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping with a warm-red, premium-yet-functional aesthetic.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map of this folder

| Need | Open |
|---|---|
| Brand context, voice, visual rules, iconography | `README.md` |
| Every CSS variable (colors, type, radii, shadows, motion) | `colors_and_type.css` |
| Logos and favicons | `assets/` |
| Quick visual reference for every component | `preview/*.html` |
| Drop-in dark-mode toggle (JS + React + CSS) | `shared/` |
| Full marketing page recreation, EN + ZH, React + CSS | `ui_kits/marketing-site/` |
| Full dashboard recreation with live state, React + CSS | `ui_kits/app-dashboard/` |
| Comment moderation surface, React + CSS | `ui_kits/comment-admin/` |
| Transactional email templates (5) | `emails/` |
| OG / social share image templates (4) | `og/` |
| Edge & empty state panels (6) | `states/index.html` |
| Upstream codebase imports (read-only reference) | `_research/` |

## Hot tips

- **Always `@import` `colors_and_type.css` first** in any new HTML. Every other
  rule descends from those vars.
- **Default to Phosphor icons** loaded as a webfont (see README → Iconography).
  Don't draw SVG icons by hand.
- **One primary red per viewport.** If you need a second action color, use the
  outline variant — never a second saturated hue.
- **Sora for display, Plus Jakarta for body, JetBrains Mono for code.** Don't
  substitute without asking. Noto Sans SC kicks in automatically for CJK.
- **Cards are `--radius-2xl`, buttons `--radius-lg`.** Cards always sit one notch
  above the controls inside them.
- **Eyebrows are UPPERCASE + 0.06em tracking** and always `--brand-600`.
- **No emoji in chrome.** No purple, no cool blue, no yellow. No black-and-white-only.
- **For dark mode to work, use semantic tokens.** `var(--foreground)`,
  `var(--card)`, `var(--muted)`, `var(--glass-bg)` — *never* hardcoded
  `var(--neutral-900)` or `rgba(255,255,255,X)` for surfaces.
- **Toggle dark mode with <kbd>⌘⇧L</kbd>** to verify any new design holds up
  in both modes before shipping.
