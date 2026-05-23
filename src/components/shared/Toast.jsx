import { useUIStore } from '../../stores/useUIStore';

const VARIANTS = {
  success: { bg: '#dcfce7', border: '#16a34a', icon: '✅' },
  error: { bg: '#fee2e2', border: '#dc2626', icon: '❌' },
  info: { bg: 'var(--teal-light)', border: 'var(--teal-brand)', icon: 'ℹ️' },
  warning: { bg: '#fef3c7', border: '#d97706', icon: '⚠️' },
};

export function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts);
  const removeToast = useUIStore((s) => s.removeToast);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {toasts.map((t) => {
        const v = VARIANTS[t.type] || VARIANTS.info;
        return (
          <div
            key={t.id}
            style={{
              background: v.bg,
              border: `1px solid ${v.border}`,
              borderRadius: 8,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              minWidth: 280,
              boxShadow: 'var(--shadow-2)',
            }}
          >
            <span>{v.icon}</span>
            <span style={{ flex: 1, fontSize: 14 }}>{t.message}</span>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
