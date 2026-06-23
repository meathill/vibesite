# App dashboard — UI kit

A high-fidelity recreation of the **x-downloader** user dashboard
(`packages/web/app/admin` + `packages/web-shared/components/dashboard-view.tsx`
+ `task-table.tsx`), restyled to the Meathill design tokens.

## What's interactive

This isn't just a static mock — paste a URL into the composer and the system will:

1. Detect the platform (X / YouTube / Instagram / TikTok) and pick the right icon.
2. Add a new row with status **queued**.
3. After 1.2s, transition to **running · downloading**.
4. After 3.2s, transition to **running · transcoding**.
5. After 5.2s, settle on **done**.

`Retry` re-queues a failed job. `Delete` removes a row. A toast appears for each
action and fades after ~2.5s.

## Files

| File | Component | Mirrors |
|---|---|---|
| `Sidebar.jsx`   | Left navigation with Tasks / Developer / Account groups, user plan footer | `app/admin/_page-shell.tsx` + dashboard nav patterns |
| `TopBar.jsx`    | Sticky glass top with breadcrumbs, command-K search, theme toggle | Custom — fills the gap in the original (which had only nav) |
| `StatsRow.jsx`  | Four metric tiles + `UpgradeBanner` | `dashboard-view.tsx` plan info + new-style stat row |
| `Composer.jsx`  | Inline new-download form with paste, resolution select | `dashboard-download-form.tsx` |
| `TaskTable.jsx` | Headed card + status pills + per-row actions | `task-table.tsx` + `status-badge.tsx` |
| `app.css`       | Surface CSS, ramped off `../../colors_and_type.css` | — |
| `index.html`    | Stateful click-through that ties it all together  | — |

## Patterns lifted from the source

- The **table card** wraps the table with a 16/20px header row holding an icon tile,
  title, subtitle, and a "Refresh" outline button on the right — same composition
  as `task-table.tsx`.
- **Status pills** are oval, 22px tall, with a leading 6px dot — `running` animates
  a slow pulse, matching `status-badge.tsx`'s `animate-pulse` behavior.
- **ID cells** use `font-mono` at 80% opacity, underlined with a dashed brand decoration —
  taken from the live source.
- **Actions** sit in a right-aligned row of xs-sized buttons. Destructive uses the
  `destructive-outline` variant (warm-red text on white), not solid red.
- **Upgrade banner** maps to `upgrade-dialog.tsx` content but inline rather than modal.

## What's missing

- The MCP/CLI/Webhooks pages are not built — only the sidebar entries are stubbed.
- No real auth state — the avatar is hard-coded "M".
- Dark mode wired into the tokens but not exposed as a toggle yet.
