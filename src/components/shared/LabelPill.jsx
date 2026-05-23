import { INBOX_LABELS } from '../../demo/inboxDemoData';

export function LabelPill({ labelId }) {
  const l = INBOX_LABELS.find((x) => x.id === labelId);
  if (!l) return null;
  return (
    <span
      style={{
        background: l.color + '33',
        color: l.color,
        fontSize: 10,
        fontWeight: 700,
        borderRadius: 4,
        padding: '2px 7px',
        letterSpacing: '0.3px',
        border: `1px solid ${l.color}55`,
      }}
    >
      {l.label.toUpperCase()}
    </span>
  );
}
