# Email templates

Five production-style transactional emails, written as table-based HTML so they
hold up across Gmail web, Apple Mail, Outlook 365, and most modern clients.

| File | When it sends |
|---|---|
| `01-download-complete.html`  | Worker finishes a job and the file lands in R2 |
| `02-payment-receipt.html`    | Stripe webhook → successful invoice |
| `03-comment-notification.html` | A new comment lands and needs moderation (awesome-comment) |
| `04-quota-warning.html`      | User hits 80% of daily free quota |
| `05-welcome.html`            | First sign-up → verify email + getting-started checklist |

## Conventions

- **Single column, 560px wide.** Centered inside a 100% outer table for the
  outer canvas background.
- **Tables, not flex/grid.** Every layout primitive is a `<table cellpadding=0 cellspacing=0 role=presentation>`.
- **Inline styles where it matters** (color, background, border-radius on cards
  and buttons). `<style>` block holds the rest — modern clients respect it.
- **System fonts only** — `-apple-system, BlinkMacSystemFont, 'Segoe UI',
  system-ui, sans-serif`. Web fonts are unreliable in Outlook so we don't ship
  Sora / Plus Jakarta in email.
- **Light mode only.** `meta name="color-scheme" content="light only"` because
  iOS Mail's auto-dark color shifts make warm reds look orange. We can opt back
  in once we have hand-tuned dark variants.
- **Hex palette** (oklch isn't reliable in email):
  - Brand red: `#c43820`
  - Page bg: `#fbfaf7`
  - Card bg: `#ffffff`
  - Border: `#ece5d6` / `#e2dccf`
  - Body text: `#2a1e15` / `#1a1208`
  - Muted text: `#5a4a3a` / `#8a7864`
  - Success: `#6a9e4b` text / `#356428`
- **Preheader text** — the first hidden `<span class="preheader">` is what shows
  in inbox preview rows. Always write one.
- **CTAs**: one primary, optionally one outline secondary. No competing reds.

## How to test

1. Open each file in a browser to visually QA at 560px.
2. Paste into [Litmus](https://litmus.com) or [Email on Acid](https://www.emailonacid.com)
   to render across actual clients before going live.
3. For Outlook desktop (Windows), expect minor radius softening — that's
   acceptable, the brand still reads.

## Want to localize?

Each template is plain HTML with literal copy. To make a `_zh` variant: copy
the file, swap the strings, and pick a CJK-safe system stack —
`-apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`
instead of the default.
