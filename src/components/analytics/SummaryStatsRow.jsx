export function SummaryStatsRow({ summary }) {
  const stats = [
    { label: 'Total Posts Published', key: 'totalPosts', icon: '📋' },
    { label: 'Avg Engagement Rate', key: 'avgEngagement', icon: '❤️' },
    { label: 'Best Performing Day', key: 'bestDay', icon: '📅' },
    { label: 'Best Performing Time', key: 'bestTime', icon: '⏰' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
      {stats.map((s) => (
        <div key={s.key} style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 12, padding: 20, boxShadow: 'var(--shadow-1)' }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
          <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>{summary[s.key]}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}
