import { useCompetitorsStore } from '../stores/useCompetitorsStore';
import { CompetitorCards } from '../components/competitors/CompetitorCards';
import { CompetitorActivityFeed } from '../components/competitors/CompetitorActivityFeed';
import { GapAnalysisTable } from '../components/competitors/GapAnalysisTable';
import { ShareOfVoiceChart, PostingFrequencyChart } from '../components/competitors/CompetitorCharts';
import { Link } from 'react-router-dom';

export function CompetitorsPage() {
  const competitors = useCompetitorsStore((s) => s.competitors);
  const yourMetrics = useCompetitorsStore((s) => s.yourMetrics);
  const gapAnalysis = useCompetitorsStore((s) => s.gapAnalysis);
  const activity = useCompetitorsStore((s) => s.activity);
  const shareOfVoice = useCompetitorsStore((s) => s.shareOfVoice);
  const postingFrequency = useCompetitorsStore((s) => s.postingFrequency);
  const dateRange = useCompetitorsStore((s) => s.dateRange);
  const setDateRange = useCompetitorsStore((s) => s.setDateRange);
  const selectedCompetitorId = useCompetitorsStore((s) => s.selectedCompetitorId);
  const setSelectedCompetitor = useCompetitorsStore((s) => s.setSelectedCompetitor);

  const filteredActivity = selectedCompetitorId
    ? activity.filter((a) => a.competitorId === selectedCompetitorId)
    : activity;

  const highGaps = gapAnalysis.filter((g) => g.priority === 'high').length;

  return (
    <div className="page-scroll">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 28 }}>
        <div>
          <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 600, color: 'var(--ink)' }}>Competitor Intelligence</h1>
          <p style={{ margin: 0, color: 'var(--ink-mute)', fontSize: 15, maxWidth: 560 }}>
            Track competitor activity, compare performance, and close content gaps with AI recommendations.
          </p>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--ink-faint)' }}>GET /api/competitors · GET /api/competitors/gap-analysis</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid var(--hairline)', color: 'var(--ink)', background: 'var(--canvas)' }}
        >
          {['Last 7 days', 'Last 30 days', 'Last 90 days'].map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      {highGaps > 0 && (
        <div
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--teal-deep) 100%)',
            color: '#fff',
            borderRadius: 12,
            padding: 20,
            marginBottom: 24,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{highGaps} high-priority gaps detected</div>
            <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>Competitors are outperforming you on video and LinkedIn frequency.</div>
          </div>
          <Link to="/campaigns" className="btn-teal" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Launch AI campaign
          </Link>
        </div>
      )}

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: 'var(--ink)' }}>Tracked competitors</h2>
        <CompetitorCards
          competitors={competitors}
          yourMetrics={yourMetrics}
          selectedId={selectedCompetitorId}
          onSelect={setSelectedCompetitor}
        />
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 32 }}>
        <div style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 12, padding: 20 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Share of voice</h3>
          <ShareOfVoiceChart data={shareOfVoice} />
        </div>
        <div style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 12, padding: 20 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Posting frequency by day</h3>
          <PostingFrequencyChart data={postingFrequency} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24, marginBottom: 32 }}>
        <section>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: 'var(--ink)' }}>Recent competitor activity</h2>
          <CompetitorActivityFeed activity={filteredActivity} competitors={competitors} />
        </section>
        <section>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: 'var(--ink)' }}>Gap analysis</h2>
          <p style={{ fontSize: 13, color: 'var(--ink-mute)', marginBottom: 12 }}>
            Compare your content mix vs. competitor averages. Negative gap = opportunity to catch up.
          </p>
        </section>
      </div>

      <GapAnalysisTable gaps={gapAnalysis} />
    </div>
  );
}
