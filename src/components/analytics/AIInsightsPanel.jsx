import { useNavigate } from 'react-router-dom';

export function AIInsightsPanel({ insights }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--teal-deep) 100%)',
        color: '#fff',
        borderRadius: 12,
        padding: 24,
        marginBottom: 24,
      }}
    >
      <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700 }}>AI Insights</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {insights.map((ins, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 8,
              padding: 16,
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 8, color: 'var(--teal-light)' }}>Insight {i + 1}</div>
            <div style={{ fontWeight: 700, marginBottom: 8, lineHeight: 1.35 }}>{ins.title}</div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--on-dark-mute)' }}>{ins.body}</p>
            {ins.cta && (
              <button
                type="button"
                onClick={() => navigate('/compose')}
                style={{
                  marginTop: 12,
                  background: 'var(--teal-brand)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 14px',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {ins.cta.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
