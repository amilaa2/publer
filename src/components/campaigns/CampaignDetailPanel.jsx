import { Link } from 'react-router-dom';
import { PLATFORM_SHORT, getChannelColor } from '../../utils/platformUtils';

export function CampaignDetailPanel({ campaign, onLaunch, onDelete }) {
  if (!campaign) {
    return (
      <div style={{ padding: 32, color: 'var(--ink-faint)', textAlign: 'center', background: 'var(--canvas-soft)', borderRadius: 12, border: '1px dashed var(--hairline)' }}>
        Select a campaign to view details
      </div>
    );
  }

  const budgetPct = campaign.budget ? Math.round((campaign.spent / campaign.budget) * 100) : 0;

  return (
    <div style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 12, padding: 24 }}>
      <h2 style={{ margin: '0 0 8px', fontSize: 20, color: 'var(--ink)' }}>{campaign.name}</h2>
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--ink-mute)' }}>{campaign.objective} · {campaign.startDate} → {campaign.endDate}</p>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink)', marginBottom: 20 }}>{campaign.brief}</p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {campaign.channels.map((ch) => (
          <span key={ch} style={{ fontSize: 11, fontWeight: 800, color: '#fff', background: getChannelColor(ch), padding: '4px 10px', borderRadius: 6 }}>
            {PLATFORM_SHORT[ch]}
          </span>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Budget used', value: `$${campaign.spent.toLocaleString()} / $${campaign.budget.toLocaleString()}` },
          { label: 'Reach', value: campaign.reach.toLocaleString() },
          { label: 'Conversions', value: campaign.conversions.toLocaleString() },
          { label: 'Posts', value: `${campaign.postsPublished} / ${campaign.postsScheduled} published` },
          { label: 'AI score', value: campaign.aiScore ?? 'Not generated' },
          { label: 'Status', value: campaign.status },
        ].map((stat) => (
          <div key={stat.label} style={{ background: 'var(--canvas-soft)', padding: 12, borderRadius: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-faint)' }}>{stat.label.toUpperCase()}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginTop: 4 }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {campaign.budget > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginBottom: 6 }}>Budget progress ({budgetPct}%)</div>
          <div style={{ height: 8, background: 'var(--hairline)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(budgetPct, 100)}%`, height: '100%', background: 'var(--teal-brand)' }} />
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {campaign.status === 'draft' && (
          <button type="button" className="btn-teal" onClick={() => onLaunch?.(campaign.id)}>Launch campaign</button>
        )}
        <Link to="/compose" className="btn-ghost" style={{ textDecoration: 'none' }}>Create posts</Link>
        <Link to="/schedule" className="btn-ghost" style={{ textDecoration: 'none' }}>View schedule</Link>
        {campaign.status !== 'active' && (
          <button type="button" onClick={() => onDelete?.(campaign.id)} style={{ marginLeft: 'auto', padding: '8px 14px', border: '1px solid var(--error)', color: 'var(--error)', background: 'var(--error-bg)', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
