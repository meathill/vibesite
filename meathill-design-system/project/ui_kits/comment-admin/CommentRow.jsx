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
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' +
         d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function TagBadge({ tag, onFilter }) {
  const cls =
    tag === 'Question'    ? 'question'   :
    tag === 'Bug report'  ? 'bug'        :
    tag === 'Criticism'   ? 'criticism'  :
    tag === 'Suggestion'  ? 'suggestion' :
    'greeting';
  return <button className={`tag ${cls}`} onClick={() => onFilter?.(tag)}>{tag}</button>;
}

function StatusPill({ value }) {
  const labels = { approved: 'approved', pending: 'pending', rejected: 'rejected' };
  return (
    <span className={`pill ${value}`}>
      <span className="dot"></span>
      {labels[value] || value}
    </span>
  );
}

function CommentRow({ c, selected, onSelect, onApprove, onReject, onDelete, onShadowBan, onReply, onRemoveReply, onAIReply }) {
  return (
    <tr className={(selected ? 'selected ' : '') + (c.isForeign ? 'foreign' : '')}>
      <td className="check">
        <span className={'cb' + (selected ? ' checked' : '')} onClick={() => onSelect(c.id)}>
          {selected && <i className="ph-bold ph-check"></i>}
        </span>
      </td>
      <td className="id-cell">#{c.id}</td>

      <td className="content-cell">
        <div className="comment-text">{c.content}</div>
        {c.translation && (
          <div className="translation">
            <b><i className="ph ph-translate"></i> {c.lang ? `${c.lang} → en` : 'translation'}</b>
            {c.translation}
          </div>
        )}

        {/* Admin replies */}
        {c.replies && c.replies.length > 0 && (
          <div className="replies">
            {c.replies.map((r, idx) => (
              <div key={idx} className={'reply' + (r.byAI ? ' ai' : '')}>
                {r.content}
                <div className="reply-meta">
                  <span className="by"><i className="ph ph-patch-check"></i>{r.author || 'You'}</span>
                  {r.byAI && <span className="ai-tag"><i className="ph-fill ph-sparkle"></i>AI</span>}
                  <span>· {timeAgo(r.at)}</span>
                </div>
                <div className="reply-actions">
                  <button>Edit</button>
                  <button className="danger" onClick={() => onRemoveReply(c.id, idx)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inline composer — emoji + AI + write */}
        {(!c.replies || c.replies.length === 0) && (
          <div className="reply-composer">
            <span className="label">Reply</span>
            <button className="emoji-btn" onClick={() => onReply(c.id, '❤️')} title="Heart">❤️</button>
            <button className="emoji-btn" onClick={() => onReply(c.id, '👍')} title="Thumbs up">👍</button>
            <button className="emoji-btn" onClick={() => onReply(c.id, '😂')} title="Laugh">😂</button>
            <button className="emoji-btn" onClick={() => onReply(c.id, '🙏')} title="Thanks">🙏</button>
            <button className="ai-pill" onClick={() => onAIReply(c.id)}>
              <i className="ph-fill ph-sparkle"></i> AI reply
            </button>
            <button className="write"><i className="ph ph-pencil-simple"></i> Write</button>
          </div>
        )}
      </td>

      <td className="user-cell">
        <div className="user">
          <div className={'uavatar ' + (c.user.kind || '')}>{c.user.initial}</div>
          <div className="meta">
            <div className="uname">{c.user.name}</div>
            <div className="uemail">{c.user.email}</div>
            <div className={'ufrom' + (c.user.trusted ? ' trust' : '')}>
              <i className={`ph ${c.user.providerIcon || 'ph-google-logo'}`}></i>
              {c.user.trusted ? 'trusted · 14 prior' : (c.user.from || 'google')}
            </div>
          </div>
        </div>
      </td>

      <td className="time-cell">
        <span className="relative">{timeAgo(c.createdAt)}</span>
        {fmtAbs(c.createdAt)}
      </td>

      <td className="post-cell">
        <div className="post">
          <div className="slug">{c.postId}</div>
          <div className="post-tools">
            <button title="Filter by this post"><i className="ph ph-funnel"></i></button>
            <button title="Filter by slug"><i className="ph ph-link-simple"></i></button>
            <a href={c.postId} target="_blank" rel="noopener" title="Open post"><i className="ph ph-arrow-square-out"></i></a>
          </div>
        </div>
      </td>

      <td className="tags-cell">
        {c.tags?.map((t) => <TagBadge key={t} tag={t} />)}
        {c.lang && c.lang !== 'en' && (
          <button className="tag lang"><i className="ph ph-globe"></i> {c.lang}</button>
        )}
      </td>

      <td className="status-cell">
        <div className="status-stack">
          <StatusPill value={c.status} />
          {c.shadowBanned && (
            <span className="pill shadow"><i className="ph ph-eye-slash"></i> banned</span>
          )}
        </div>
      </td>

      <td className="actions-cell">
        <div className="action-grid">
          <button className="iconbtn approve" title="Approve" onClick={() => onApprove(c.id)}>
            <i className="ph ph-check"></i>
          </button>
          <button className="iconbtn reject" title="Reject" onClick={() => onReject(c.id)}>
            <i className="ph ph-x"></i>
          </button>
          <button className="iconbtn" title={c.shadowBanned ? 'Unban' : 'Shadow ban'} onClick={() => onShadowBan(c.id)}>
            <i className={`ph ${c.shadowBanned ? 'ph-eye' : 'ph-eye-slash'}`}></i>
          </button>
          <button className="iconbtn delete" title="Delete" onClick={() => onDelete(c.id)}>
            <i className="ph ph-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}

window.CommentRow = CommentRow;
window.StatusPill = StatusPill;
