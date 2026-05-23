export function Avatar({ initials, size = 36, bg = 'var(--primary)' }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.35,
        fontWeight: 600,
        flexShrink: 0,
        letterSpacing: '-0.5px',
      }}
    >
      {initials}
    </div>
  );
}
