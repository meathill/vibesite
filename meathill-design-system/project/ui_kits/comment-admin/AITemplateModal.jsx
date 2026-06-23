// AITemplateModal.jsx — pick an AI reply template. Mirrors the prompt-template
// system from _research/admin/components/prompt/executor.vue.

function AITemplateModal({ open, onClose, onPick }) {
  if (!open) return null;
  const templates = [
    { id: 'helpful',   icon: 'ph-lifebuoy',
      name: 'Helpful answer',
      desc: 'Write a kind, accurate reply that addresses the question.',
      preview: 'Thanks for the question! Here\u2019s how it works: …' },
    { id: 'thanks',    icon: 'ph-hand-heart',
      name: 'Acknowledge feedback',
      desc: 'Thank the commenter, restate what they raised, promise follow-up.',
      preview: 'Thanks so much for taking the time to share this — …' },
    { id: 'bug',       icon: 'ph-bug',
      name: 'Triage bug report',
      desc: 'Ask for repro steps and environment in a friendly tone.',
      preview: 'Sorry you hit this. Could you share the URL, browser, and …' },
    { id: 'roadmap',   icon: 'ph-road-horizon',
      name: 'On the roadmap',
      desc: 'Acknowledge the feature request and link to the public roadmap.',
      preview: 'Great suggestion! This is on our roadmap — you can follow …' },
    { id: 'translate', icon: 'ph-translate',
      name: 'Translate then answer',
      desc: 'Translate the comment, write a reply in their language.',
      preview: '[zh] 谢谢你的留言！这是…' },
  ];
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3>AI reply templates</h3>
            <p>Pick a template — we\u2019ll generate a contextual reply for each selected comment using GPT or Gemini.</p>
          </div>
          <button className="close" onClick={onClose}><i className="ph ph-x"></i></button>
        </div>
        <div className="modal-body">
          {templates.map((t) => (
            <div key={t.id} className="tmpl" onClick={() => onPick(t)}>
              <div className="tmpl-icon"><i className={`ph ${t.icon}`}></i></div>
              <div style={{ flex: 1 }}>
                <b>{t.name}</b>
                <p>{t.desc}</p>
                <div className="preview">{t.preview}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="modal-foot">
          <button className="btn btn-sm btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-sm btn-primary"><i className="ph ph-plus"></i> New template</button>
        </div>
      </div>
    </div>
  );
}
window.AITemplateModal = AITemplateModal;
