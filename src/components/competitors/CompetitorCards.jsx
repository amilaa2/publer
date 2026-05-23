import { getChannelColor, PLATFORM_SHORT } from '../../utils/platformUtils';

export function CompetitorCards({ competitors, yourMetrics, onSelect, selectedId }) {
  const all = [{ id: 'you', ...yourMetrics, isYou: true }, ...competitors.map((c) => ({ ...c, isYou: false }))];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
      {all.map((c) => {
        const selected = selectedId === c.id || (!selectedId && c.isYou);
        const color = c.isYou ? 'var(--teal-brand)' : getChannelColor(c.platform);
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect?.(c.isYou ? null : c.id)}
            style={{
              textAlign: 'left',
              padding: 16,
              borderRadius: 12,
              border: selected ? `2px solid ${color}` : '1px solid var(--hairline)',
              background: selected ? `${color}12` : 'var(--canvas)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{c.name}</span>
              {!c.isYou && (
                <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', background: color, padding: '2px 6px', borderRadius: 4 }}>
                  {PLATFORM_SHORT[c.platform]}
                </span>
              )}
              {c.isYou && (
                <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--teal-deep)', background: 'var(--teal-light)', padding: '2px 6px', borderRadius: 4 }}>
                  YOU
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{c.handle || c.name}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12, fontSize: 12 }}>
              <div>
                <div style={{ color: 'var(--ink-faint)', fontSize: 10, fontWeight: 600 }}>POSTS/WK</div>
                <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{c.postsPerWeek}</div>
              </div>
              <div>
                <div style={{ color: 'var(--ink-faint)', fontSize: 10, fontWeight: 600 }}>ENGAGEMENT</div>
                <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{c.avgEngagement}%</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
