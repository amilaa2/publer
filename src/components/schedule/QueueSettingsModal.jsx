import { QUEUE_SETTINGS_DEMO } from '../../demo/postsDemoData';

export function QueueSettingsModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 8000 }} onClick={onClose}>
      <div style={{ background: 'var(--canvas)', borderRadius: 12, padding: 24, maxWidth: 400, width: '90%' }} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ margin: '0 0 16px' }}>Queue Settings</h3>
        <p style={{ fontSize: 13, color: 'var(--ink-mute)', marginBottom: 16 }}>GET /api/queue/settings · PUT /api/queue/settings</p>
        {Object.entries(QUEUE_SETTINGS_DEMO).map(([platform, slots]) => (
          <div key={platform} style={{ marginBottom: 12 }}>
            <strong style={{ textTransform: 'capitalize' }}>{platform}</strong>
            <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
              {slots.map((t) => (
                <span key={t} style={{ padding: '4px 10px', background: 'var(--teal-light)', borderRadius: 6, fontSize: 13 }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
        <button type="button" className="btn-teal" onClick={onClose} style={{ marginTop: 16 }}>Close</button>
      </div>
    </div>
  );
}
