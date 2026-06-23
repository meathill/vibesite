# Comment admin — UI kit

A high-fidelity recreation of the **Awesome Comment** moderation surface
(`_research/admin/pages/admin/comments.vue` + the `comments/*.vue` and
`ui/batch-actions.vue` components), restyled to the Meathill design tokens.

## What's interactive

- **Tick any row's checkbox** — the sticky batch action bar slides into view with
  emoji shortcuts, an "AI reply…" trigger, and the three review actions (approve,
  reject, delete).
- **Single-row inline composer** — every comment without a reply has 4 emoji
  shortcuts, an AI reply button (1.1s simulated generation), and a "Write" pill.
- **Status segments** — Pending / Approved / Rejected / All. Counts update live.
- **Language filter + search** — filter by language, fuzzy-search content / user
  / post id.
- **AI templates modal** — pops on bulk AI reply. Five seed templates; pick one
  and watch every selected comment get a tailored draft attached as an AI bubble.
- **Foreign-language rows** get a warm-amber tint, an inline translation block
  styled like a `bg-base-300/50 border-s-4` blockquote — that's the same visual
  pattern in `comment-row.vue` for non-English `postId`s.

## Files

| File | Component | Mirrors |
|---|---|---|
| `Header.jsx`           | Sticky header + product tag + tabs + user avatar | `layouts/admin-header.vue` |
| `StatBar.jsx`          | 5-up live metrics row                            | `daily-stat-by-lang.vue` data shape |
| `FilterBar.jsx`        | Status segments, lang filter, search, per-post   | `comments.vue` filter state |
| `BatchActions.jsx`     | Emoji shortcuts, AI templates, approve/reject/delete | `ui/batch-actions.vue` |
| `CommentRow.jsx`       | One moderation row (full Vue template parity)    | `comments/comment-row.vue` |
| `AITemplateModal.jsx`  | Pick an AI prompt template                       | `components/prompt/executor.vue` |
| `admin.css`            | Component CSS; foundations from `../../colors_and_type.css` | — |
| `index.html`           | Page wires + 8-row seed dataset + transitions    | — |

## Patterns lifted from the source

- **DaisyUI "chat-end / chat-bubble" admin replies** become right-aligned bubbles
  in a warm-red tint, with a corner-style border-radius (`14px 14px 4px 14px`).
- **Emoji shortcuts** (`❤️ 👍 😂 🙏 🎉`) appear both per-row and in the batch bar,
  mirroring `EmojiShortcuts.vue` and `batch-actions.vue`'s parallel surfaces.
- **Tag badges** keep the same vocabulary as `comment-row.vue`: Question (info),
  Bug report (danger), Criticism (warning), Suggestion (success), Greeting
  (neutral) — colors retuned to our warm semantic ramp.
- **`status: pending → approved`** auto-flips after any reply, faithfully copying
  the `comment.status = CommentStatus.Approved` line from `comment-row.vue:onReply`.
- **Foreign rows** get the `bg-base-200` warm wash treatment from the Vue
  template's `notEnglish(postId)` branch.
- **Shadow ban** is a separate eye-slash toggle, distinct from reject — same
  three-state moderation model from the original.

## What I changed deliberately

- Replaced **Bootstrap Icons** (`<i class="bi …">` in the Vue source) with
  **Phosphor**, to match the rest of the Meathill system.
- Heroicons (`i-heroicons-*` in `index.vue`) similarly mapped to Phosphor.
- DaisyUI button styles converted to our `.btn-{primary,success,warning,danger}`.
- Auth0 / TiDB / OpenAI calls stubbed — this is a UI kit, not a runtime.

## What's missing

- The Settings, Prompts, and Analytics tabs are stubs (only the nav entry exists).
- No real markdown rendering in replies — content is plain text. The Vue source
  uses `marked` with a sanitizing renderer; lift that 1:1 if you wire this up.
- No Auth0 / Google One Tap flow — the avatar is hard-coded "M".
