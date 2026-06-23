# Marketing site — UI kit

A high-fidelity recreation of the **x-downloader** marketing surface
(`packages/web/app/[lang]/page.tsx` and friends), retuned to the
Meathill warm-red palette and the design system tokens in
`../../colors_and_type.css`.

## What's in it

| File | Component | Mirrors |
|---|---|---|
| `Navbar.jsx`   | Sticky glass nav with brand, link group, lang pill, CTA | `web-shared/components/navbar.tsx` |
| `Hero.jsx`     | Hero headline + inline download form + trust stats     | `app/[lang]/page.tsx` hero + stats |
| `Sections.jsx` | `HowItWorks`, `FeatureGrid`, `AiAgentSection`, `PremiumCta`, `Faq` | `app/[lang]/page.tsx` + `ai-agent-section.tsx` + `faq-section.tsx` + `premium-cta.tsx` |
| `Footer.jsx`   | Cross-site downloader strip + meta links               | `web-shared/components/footer.tsx` |
| `site.css`     | Component CSS; foundations come from `../../colors_and_type.css` | — |
| `index.html`   | Page composition + React/Babel + Phosphor icon font     | — |

## Patterns lifted from the source

- **64px sticky nav** with `backdrop-filter: blur(14px)` over a 70% white background.
- **Hero download form** is `rounded-2xl`, lives in a card with the brand-tinted ambient glow underneath.
- **Trust strip** uses the four-column metric grid from the live home page.
- **Step icons** are 64px tinted tiles with a numbered badge attached to the corner.
- **Feature tiles** are `rounded-2xl` with an inner highlight and a hover lift (`translateY(-2px)`).
- **Premium CTA** is a wide `rounded-3xl` block with a soft top glow — taken straight from `premium-cta.tsx`.
- **FAQ** is `<details>` with a Phosphor `caret-down` that rotates 180° on `open`.

## Conventions used

- All colors come from CSS vars in `colors_and_type.css` — no raw hex inside this folder.
- Icons are Phosphor, served from unpkg as a webfont (`<i class="ph ph-xxx">`). The
  underlying codebase uses `@phosphor-icons/react`; the icon names line up 1:1.
- Buttons use `.btn-{primary,outline,ghost}` × `.btn-{md,lg,xl}` — same vocabulary as
  the `cva` button in `web-shared/components/ui/button.tsx`.
- Section rhythm is 80px vertical padding, 1100px max-width, with `.section-head`
  centered 720px.

## Variations (not yet built)

- Dark mode — the tokens are defined; just add `<html data-theme="dark">` and rebuild.
- Localized variants — the source supports `en/zh/de/fr/es/pt/th`. Copy lives outside
  this kit; swap text and the layout holds.
- Per-product re-skin — change `--brand-500` and the entire surface adapts (this is
  how the source ships X / YouTube / Instagram from one `web-shared` package).
