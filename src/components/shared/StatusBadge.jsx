const STYLES = {
  published: { background: 'var(--success-bg)', color: 'var(--success)', label: 'Published' },
  scheduled: { background: 'var(--teal-light)', color: 'var(--teal-deep)', label: 'Scheduled' },
  draft: { background: '#eceae6', color: 'var(--ink-mute)', label: 'Draft' },
  failed: { background: 'var(--error-bg)', color: 'var(--error)', label: 'Failed' },
};

export function StatusBadge({ status }) {
  const s = STYLES[status] || STYLES.draft;
  return (
    <span
      style={{
        background: s.background,
        color: s.color,
        fontSize: 11,
        fontWeight: 700,
        borderRadius: 4,
        padding: '3px 8px',
      }}
    >
      {s.label}
    </span>
  );
}
