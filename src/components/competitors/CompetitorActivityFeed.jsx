import { PLATFORM_SHORT, getChannelColor } from '../../utils/platformUtils';

export function CompetitorActivityFeed({ activity, competitors }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {activity.map((item) => {
        const comp = competitors.find((c) => c.id === item.competitorId);
        const color = getChannelColor(item.platform);
        return (
          <div
            key={item.id}
            style={{
              padding: 14,
              background: 'var(--canvas)',
              border: '1px solid var(--hairline)',
              borderRadius: 10,
              borderLeft: `4px solid ${color}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <div>
                <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{item.competitor}</span>
                <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, color }}>{PLATFORM_SHORT[item.platform]}</span>
                <span style={{ marginLeft: 6, fontSize: 11, color: 'var(--ink-faint)', textTransform: 'capitalize' }}>{item.type}</span>
              </div>
              <span style={{ fontSize: 11, color: 'var(--ink-faint)', whiteSpace: 'nowrap' }}>{item.time}</span>
            </div>
            <p style={{ margin: '8px 0 6px', fontSize: 13, color: 'var(--ink)', lineHeight: 1.4 }}>{item.summary}</p>
            <span style={{ fontSize: 12, color: 'var(--ink-mute)', fontWeight: 600 }}>
              {item.engagement.toLocaleString()} engagements
              {comp && ` · ${comp.postsPerWeek} posts/wk avg`}
            </span>
          </div>
        );
      })}
    </div>
  );
}
