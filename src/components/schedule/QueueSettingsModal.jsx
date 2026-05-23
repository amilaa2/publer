import { QUEUE_SETTINGS_DEMO } from '../../demo/postsDemoData';

export function QueueSettingsModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay schedule-modal-overlay" onClick={onClose}>
      <div
        className="modal-panel schedule-modal-panel"
        style={{ maxWidth: 400 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: '0 0 16px', color: 'var(--ink)' }}>Queue Settings</h3>
        <p style={{ fontSize: 13, color: 'var(--ink-mute)', marginBottom: 16 }}>
          GET /api/queue/settings · PUT /api/queue/settings
        </p>
        {Object.entries(QUEUE_SETTINGS_DEMO).map(([platform, slots]) => (
          <div key={platform} style={{ marginBottom: 12 }}>
            <strong style={{ textTransform: 'capitalize', color: 'var(--ink)' }}>{platform}</strong>
            <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
              {slots.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: '4px 10px',
                    background: 'var(--teal-light)',
                    borderRadius: 6,
                    fontSize: 13,
                    color: 'var(--teal-deep)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
        <button type="button" className="btn-teal" onClick={onClose} style={{ marginTop: 16 }}>
          Close
        </button>
      </div>
    </div>
  );
}
