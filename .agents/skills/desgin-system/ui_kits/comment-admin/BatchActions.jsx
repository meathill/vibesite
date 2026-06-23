// BatchActions.jsx — sticky batch bar with emoji shortcuts + AI templates +
// approve / reject / delete. Mirrors batch-actions.vue.

function BatchActions({ count, onEmoji, onAITemplate, onApprove, onReject, onDelete }) {
  return (
    <div className="batchbar">
      <div className="selcount">
        Selected <b>{count}</b> comments
      </div>

      <div className="group">
        <span className="grouplbl">Quick reply</span>
        <button className="emoji-btn" onClick={() => onEmoji('❤️')} title="Heart">
          ❤️
        </button>
        <button className="emoji-btn" onClick={() => onEmoji('👍')} title="Thumbs up">
          👍
        </button>
        <button className="emoji-btn" onClick={() => onEmoji('😂')} title="Laugh">
          😂
        </button>
        <button className="emoji-btn" onClick={() => onEmoji('🙏')} title="Thanks">
          🙏
        </button>
        <button className="emoji-btn" onClick={() => onEmoji('🎉')} title="Celebrate">
          🎉
        </button>
      </div>

      <div className="group">
        <span className="grouplbl">AI</span>
        <button className="ai-tmpl" onClick={onAITemplate}>
          <i className="ph-fill ph-sparkle"></i> AI reply…
        </button>
      </div>

      <div className="pull-right">
        <button className="btn btn-sm btn-success" onClick={onApprove}>
          <i className="ph ph-check"></i> Approve
        </button>
        <button className="btn btn-sm btn-warning" onClick={onReject}>
          <i className="ph ph-x"></i> Reject
        </button>
        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          <i className="ph ph-trash"></i> Delete
        </button>
      </div>
    </div>
  );
}
window.BatchActions = BatchActions;
