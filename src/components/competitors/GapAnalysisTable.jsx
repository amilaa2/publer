import { Link } from 'react-router-dom';

const PRIORITY_STYLES = {
  high: { bg: 'var(--error-bg)', color: 'var(--error)', label: 'High' },
  medium: { bg: 'var(--warning-bg)', color: 'var(--warning)', label: 'Medium' },
  low: { bg: 'var(--success-bg)', color: 'var(--success)', label: 'Low' },
};

export function GapAnalysisTable({ gaps }) {
  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--hairline)', borderRadius: 12, background: 'var(--canvas)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'var(--canvas-soft)', textAlign: 'left' }}>
            <th style={{ padding: '12px 16px', color: 'var(--ink-mute)', fontWeight: 700 }}>Topic</th>
            <th style={{ padding: '12px 16px', color: 'var(--ink-mute)', fontWeight: 700 }}>Competitors avg</th>
            <th style={{ padding: '12px 16px', color: 'var(--ink-mute)', fontWeight: 700 }}>You</th>
            <th style={{ padding: '12px 16px', color: 'var(--ink-mute)', fontWeight: 700 }}>Gap</th>
            <th style={{ padding: '12px 16px', color: 'var(--ink-mute)', fontWeight: 700 }}>Priority</th>
            <th style={{ padding: '12px 16px', color: 'var(--ink-mute)', fontWeight: 700 }}>AI recommendation</th>
          </tr>
        </thead>
        <tbody>
          {gaps.map((row) => {
            const p = PRIORITY_STYLES[row.priority] || PRIORITY_STYLES.medium;
            const gapPositive = row.gap > 0;
            return (
              <tr key={row.topic} style={{ borderTop: '1px solid var(--hairline)' }}>
                <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--ink)' }}>{row.topic}</td>
                <td style={{ padding: '14px 16px', color: 'var(--ink-mute)' }}>{row.competitorAvg}/wk</td>
                <td style={{ padding: '14px 16px', color: 'var(--ink)' }}>{row.yours}/wk</td>
                <td style={{ padding: '14px 16px', fontWeight: 700, color: gapPositive ? 'var(--success)' : 'var(--error)' }}>
                  {gapPositive ? '+' : ''}{row.gap}
                </td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ background: p.bg, color: p.color, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4 }}>
                    {p.label}
                  </span>
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--ink-mute)', maxWidth: 280, lineHeight: 1.45 }}>
                  {row.recommendation}
                  {row.priority === 'high' && (
                    <Link to="/compose" style={{ display: 'block', marginTop: 6, color: 'var(--teal-deep)', fontWeight: 700, fontSize: 12 }}>
                      Create post →
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
