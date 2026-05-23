export function Badge({ count }) {
  if (!count || count <= 0) return null;
  return (
    <span
      style={{
        background: 'var(--teal-brand)',
        color: '#fff',
        fontSize: 11,
        fontWeight: 700,
        borderRadius: 9999,
        padding: '1px 7px',
        lineHeight: '18px',
        minWidth: 18,
        textAlign: 'center',
      }}
    >
      {count}
    </span>
  );
}
