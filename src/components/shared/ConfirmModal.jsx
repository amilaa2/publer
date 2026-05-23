import { useUIStore } from '../../stores/useUIStore';

export function ConfirmModal() {
  const activeModal = useUIStore((s) => s.activeModal);
  const modalProps = useUIStore((s) => s.modalProps);
  const closeModal = useUIStore((s) => s.closeModal);

  if (activeModal !== 'confirm') return null;

  const { title, body, confirmLabel = 'Confirm', onConfirm, danger } = modalProps;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9000,
      }}
      onClick={closeModal}
    >
      <div
        style={{
          background: 'var(--canvas)',
          borderRadius: 12,
          padding: 24,
          maxWidth: 400,
          width: '90%',
          boxShadow: 'var(--shadow-3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>{title}</h3>
        <p style={{ margin: '0 0 20px', color: 'var(--ink-mute)', fontSize: 14 }}>{body}</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button type="button" onClick={closeModal} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--hairline)', background: 'var(--canvas)', cursor: 'pointer' }}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => { onConfirm?.(); closeModal(); }}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              background: danger ? 'var(--error)' : 'var(--teal-brand)',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
