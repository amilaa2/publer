import { useNavigate } from 'react-router-dom';

export function TopTimesList({ times }) {
  const navigate = useNavigate();
  if (!times?.length) return null;

  return (
    <div>
      <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Top posting times</h4>
      {times.map((t) => (
        <div
          key={t.rank}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 10,
            padding: '10px 0',
            borderBottom: '1px solid var(--hairline)',
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: 'var(--teal-light)',
              color: 'var(--teal-deep)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {t.rank}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{t.slot}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>
              {t.avgEngagement} avg · {t.postCount} posts · score {t.score}
            </div>
            <div style={{ height: 5, background: 'var(--hairline)', borderRadius: 3, marginTop: 6, overflow: 'hidden' }}>
              <div style={{ width: `${t.score}%`, height: '100%', background: 'var(--teal-brand)' }} />
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/compose')}
            style={{
              fontSize: 12,
              color: 'var(--teal-deep)',
              background: 'var(--teal-light)',
              border: '1px solid var(--teal-brand)',
              borderRadius: 6,
              padding: '6px 10px',
              cursor: 'pointer',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            Schedule
          </button>
        </div>
      ))}
    </div>
  );
}
