import { PLATFORM_SHORT, getChannelColor } from '../../utils/platformUtils';

const STATUS_STYLES = {
  active: { bg: 'var(--teal-light)', color: 'var(--teal-deep)', label: 'Active' },
  draft: { bg: '#eceae6', color: 'var(--ink-mute)', label: 'Draft' },
  completed: { bg: 'var(--success-bg)', color: 'var(--success)', label: 'Completed' },
};

export function CampaignCard({ campaign, selected, onClick }) {
  const status = STATUS_STYLES[campaign.status] || STATUS_STYLES.draft;
  const budgetPct = campaign.budget ? Math.round((campaign.spent / campaign.budget) * 100) : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: 20,
        borderRadius: 12,
        border: selected ? '2px solid var(--teal-brand)' : '1px solid var(--hairline)',
        background: selected ? 'var(--teal-light)' : 'var(--canvas)',
        cursor: 'pointer',
        boxShadow: selected ? 'var(--shadow-2)' : 'var(--shadow-1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{campaign.name}</h3>
        <span style={{ background: status.bg, color: status.color, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4 }}>
          {status.label}
        </span>
      </div>
      <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--ink-mute)', lineHeight: 1.4 }}>
        {campaign.brief.length > 100 ? `${campaign.brief.slice(0, 100)}…` : campaign.brief}
      </p>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {campaign.channels.map((ch) => (
          <span key={ch} style={{ fontSize: 10, fontWeight: 800, color: '#fff', background: getChannelColor(ch), padding: '2px 6px', borderRadius: 4 }}>
            {PLATFORM_SHORT[ch]}
          </span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: 12 }}>
        <div>
          <div style={{ color: 'var(--ink-faint)', fontWeight: 600, fontSize: 10 }}>BUDGET</div>
          <div style={{ fontWeight: 700, color: 'var(--ink)' }}>${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</div>
        </div>
        <div>
          <div style={{ color: 'var(--ink-faint)', fontWeight: 600, fontSize: 10 }}>REACH</div>
          <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{campaign.reach.toLocaleString()}</div>
        </div>
        <div>
          <div style={{ color: 'var(--ink-faint)', fontWeight: 600, fontSize: 10 }}>AI SCORE</div>
          <div style={{ fontWeight: 700, color: campaign.aiScore ? 'var(--teal-deep)' : 'var(--ink-faint)' }}>
            {campaign.aiScore ?? '—'}
          </div>
        </div>
      </div>
      {campaign.budget > 0 && (
        <div style={{ marginTop: 12, height: 6, background: 'var(--hairline)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(budgetPct, 100)}%`, height: '100%', background: 'var(--teal-brand)' }} />
        </div>
      )}
    </button>
  );
}
