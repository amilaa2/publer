const STYLES = {
  inbox: { bg: 'rgba(20,168,158,0.35)', color: '#fff', label: 'In' },
  schedule: { bg: 'rgba(255,255,255,0.15)', color: '#fff', label: 'Cal' },
  compose: { bg: '#fff', color: 'var(--teal-deep)', label: '+' },
  posts: { bg: 'rgba(255,255,255,0.15)', color: '#fff', label: 'Po' },
  analytics: { bg: 'rgba(255,255,255,0.15)', color: '#fff', label: 'An' },
  settings: { bg: 'rgba(255,255,255,0.15)', color: '#fff', label: 'Set' },
};

export function NavIcon({ id }) {
  const s = STYLES[id] || STYLES.inbox;
  return (
    <span className="nav-icon-box" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}
