import { heatmapColor } from '../../utils/colorUtils';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function PlatformHeatmap({ data }) {
  if (!data?.length) return <p style={{ fontSize: 13, color: 'var(--ink-mute)' }}>Loading heatmap…</p>;

  const rows = [];
  for (let hour = 0; hour < 24; hour++) {
    rows.push(
      <div key={hour} style={{ display: 'contents' }}>
        <div style={{ color: 'var(--ink-mute)', padding: '2px 4px', textAlign: 'right', fontSize: 10, fontWeight: 600 }}>
          {hour % 3 === 0 ? `${String(hour).padStart(2, '0')}:00` : ''}
        </div>
        {DAYS.map((dayLabel, day) => {
          const idx = day * 24 + hour;
          const score = data[idx] ?? 0;
          const bg = heatmapColor(score);
          return (
            <div
              key={`${day}-${hour}`}
              title={`${dayLabel} ${hour}:00 · Score: ${score}`}
              style={{
                width: 32,
                height: 20,
                background: bg,
                borderRadius: 2,
                border: '1px solid var(--hairline)',
                fontSize: 0,
              }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `40px repeat(7, 32px)`, gap: 2, fontSize: 10 }}>
        <div />
        {DAYS.map((d) => (
          <div key={d} style={{ textAlign: 'center', color: 'var(--ink-mute)', padding: 4, fontWeight: 700 }}>
            {d}
          </div>
        ))}
        {rows}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8, fontSize: 10, color: 'var(--ink-mute)', alignItems: 'center' }}>
        <span>Low</span>
        {['#eceae6', '#d4f0ee', '#7dd3ca', '#14a89e', '#0e3030'].map((c) => (
          <span key={c} style={{ width: 24, height: 12, background: c, borderRadius: 2, border: '1px solid var(--hairline)' }} />
        ))}
        <span>High</span>
      </div>
    </div>
  );
}
