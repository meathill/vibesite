# OG image templates

Four 1200×630 templates for Open Graph / Twitter Card share previews. Designed
to be screenshotted (Puppeteer / Playwright) and served at meta tag URLs.

| File | Use it for |
|---|---|
| `01-default.html` | Site root, generic pages — bold tagline + trust stats |
| `02-article.html` | Blog posts — big title + author + reading time |
| `03-feature.html` | Product/feature pages — copy left, terminal/code mock right |
| `04-pro.html`     | Pricing / upgrade pages — centered Pro badge + price |

## Conventions

- **Exact 1200×630.** `html, body { width: 1200px; height: 630px }` and viewport
  meta is omitted — OG images are never responsive.
- **Tokens, not hex.** Every color comes from `colors_and_type.css` so a brand
  retune updates every OG in one place.
- **Dot-grid texture** sits in the bottom-right via a masked
  `radial-gradient` background-image. Subtle but defeats the "flat AI-generated"
  look.
- **Brand mark always in the top-left** (or centered for promotional templates).
  Wordmark always sits next to it.
- **One brand-tinted ornament** per template: top-left radial glow + (optional)
  centered blur burst on promo cards. No more than two.

## Generating real PNGs

The Next.js source (`packages/web/app/[lang]/opengraph-image.tsx`) renders these
dynamically. For a static workflow, use Playwright:

```ts
import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto('file:///path/to/og/01-default.html');
await page.screenshot({ path: 'public/og/default.png', omitBackground: false });
```

For dynamic content (per-post titles, author names, etc.), parameterise via
URL query strings and read them in the HTML — keep the template structural and
let the data come from the consumer.

## Test in the wild

Once deployed, validate the actual share preview with:

- [opengraph.xyz](https://www.opengraph.xyz/) — fast general checker
- Twitter/X Card Validator
- LinkedIn Post Inspector
- Facebook Sharing Debugger (forces re-fetch)
