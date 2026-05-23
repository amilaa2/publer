import { useEffect } from 'react';
import { AIInsightsPanel } from '../components/analytics/AIInsightsPanel';
import { SummaryStatsRow } from '../components/analytics/SummaryStatsRow';
import { PlatformHeatmap } from '../components/analytics/PlatformHeatmap';
import { TopTimesList } from '../components/analytics/TopTimesList';
import { EngagementTrendChart } from '../components/analytics/EngagementTrendChart';
import { useAnalyticsStore } from '../stores/useAnalyticsStore';
import { PLATFORM_LABELS, PLATFORM_SHORT, getChannelColor } from '../utils/platformUtils';
import { PLATFORM_ANALYTICS_META } from '../demo/analyticsDemoData';

const PLATFORMS = ['instagram', 'twitter', 'linkedin', 'facebook'];

export function BestTimesPage() {
  const dateRange = useAnalyticsStore((s) => s.dateRange);
  const setDateRange = useAnalyticsStore((s) => s.setDateRange);
  const insights = useAnalyticsStore((s) => s.insights);
  const summary = useAnalyticsStore((s) => s.summary);
  const heatmaps = useAnalyticsStore((s) => s.heatmaps);
  const bestTimes = useAnalyticsStore((s) => s.bestTimes);
  const trends = useAnalyticsStore((s) => s.trends);
  const fetchAll = useAnalyticsStore((s) => s.fetchAll);

  useEffect(() => {
    fetchAll(PLATFORMS);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load demo analytics once on mount
  }, []);

  return (
    <div className="page-scroll">
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 600, color: 'var(--ink)' }}>Best Time to Post</h1>
        <p style={{ margin: 0, color: 'var(--ink-mute)', fontSize: 15 }}>
          AI-analyzed recommendations based on your audience activity and historical engagement.
        </p>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          style={{
            marginTop: 16,
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--hairline)',
            color: 'var(--ink)',
            background: 'var(--canvas)',
          }}
        >
          {['Last 30 days', 'Last 90 days', 'Last 6 months', 'All time'].map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      <AIInsightsPanel insights={insights} />
      <SummaryStatsRow summary={summary} />

      {PLATFORMS.map((platform) => {
        const meta = PLATFORM_ANALYTICS_META[platform];
        const color = getChannelColor(platform);
        return (
          <section
            key={platform}
            style={{
              background: 'var(--canvas)',
              border: '1px solid var(--hairline)',
              borderRadius: 12,
              padding: 24,
              marginBottom: 24,
              boxShadow: 'var(--shadow-1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: color,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: 14,
                }}
              >
                {PLATFORM_SHORT[platform]}
              </span>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, color: 'var(--ink)' }}>{PLATFORM_LABELS[platform]}</h2>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-mute)' }}>
                  {meta.handle} · {meta.followers.toLocaleString()} followers · {meta.avgEngagement} avg engagement
                </p>
              </div>
            </div>
            <h4 style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--ink-mute)' }}>Engagement heatmap</h4>
            <PlatformHeatmap data={heatmaps[platform]} />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 24,
                marginTop: 24,
              }}
            >
              <TopTimesList times={bestTimes[platform]} platform={platform} />
              <div>
                <h4 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Engagement trend (30 days)</h4>
                <EngagementTrendChart data={trends[platform]} platform={platform} />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
