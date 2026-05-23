import { useState, useMemo } from 'react';
import { useCampaignsStore } from '../stores/useCampaignsStore';
import { useUIStore } from '../stores/useUIStore';
import { CampaignCard } from '../components/campaigns/CampaignCard';
import { CampaignDetailPanel } from '../components/campaigns/CampaignDetailPanel';
import { CreateCampaignModal } from '../components/campaigns/CreateCampaignModal';

export function CampaignsPage() {
  const campaigns = useCampaignsStore((s) => s.campaigns);
  const filterStatus = useCampaignsStore((s) => s.filterStatus);
  const setFilterStatus = useCampaignsStore((s) => s.setFilterStatus);
  const selectedCampaignId = useCampaignsStore((s) => s.selectedCampaignId);
  const selectCampaign = useCampaignsStore((s) => s.selectCampaign);
  const createCampaign = useCampaignsStore((s) => s.createCampaign);
  const launchCampaign = useCampaignsStore((s) => s.launchCampaign);
  const deleteCampaign = useCampaignsStore((s) => s.deleteCampaign);
  const generateAiPlan = useCampaignsStore((s) => s.generateAiPlan);
  const aiGenerating = useCampaignsStore((s) => s.aiGenerating);
  const addToast = useUIStore((s) => s.addToast);

  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    if (filterStatus === 'all') return campaigns;
    return campaigns.filter((c) => c.status === filterStatus);
  }, [campaigns, filterStatus]);

  const selected = campaigns.find((c) => c.id === selectedCampaignId) || filtered[0] || null;

  const stats = useMemo(
    () => ({
      active: campaigns.filter((c) => c.status === 'active').length,
      totalReach: campaigns.reduce((s, c) => s + c.reach, 0),
      totalSpent: campaigns.reduce((s, c) => s + c.spent, 0),
    }),
    [campaigns]
  );

  const handleCreate = (data) => {
    createCampaign(data);
    addToast({ type: 'success', message: data.status === 'active' ? 'Campaign launched' : 'Campaign saved as draft' });
  };

  const handleDelete = (id) => {
    deleteCampaign(id);
    addToast({ type: 'info', message: 'Campaign deleted' });
  };

  return (
    <div className="page-content" style={{ overflow: 'auto', padding: 32 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 600, color: 'var(--ink)' }}>AI Marketing Campaigns</h1>
          <p style={{ margin: 0, color: 'var(--ink-mute)', fontSize: 15, maxWidth: 520 }}>
            Plan, generate, and run multi-channel campaigns with AI-powered briefs, captions, and performance tracking.
          </p>
        </div>
        <button type="button" className="btn-teal" onClick={() => setModalOpen(true)}>
          + New campaign
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Active campaigns', value: stats.active },
          { label: 'Total reach', value: stats.totalReach.toLocaleString() },
          { label: 'Total spent', value: `$${stats.totalSpent.toLocaleString()}` },
          { label: 'All campaigns', value: campaigns.length },
        ].map((s) => (
          <div key={s.label} style={{ background: 'var(--canvas)', border: '1px solid var(--hairline)', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)' }}>{s.label.toUpperCase()}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginTop: 4 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['all', 'active', 'draft', 'completed'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilterStatus(f)}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: filterStatus === f ? '2px solid var(--teal-brand)' : '1px solid var(--hairline)',
              background: filterStatus === f ? 'var(--teal-light)' : 'var(--canvas)',
              color: filterStatus === f ? 'var(--teal-deep)' : 'var(--ink)',
              fontWeight: filterStatus === f ? 700 : 500,
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 380px) 1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((c) => (
            <CampaignCard
              key={c.id}
              campaign={c}
              selected={selected?.id === c.id}
              onClick={() => selectCampaign(c.id)}
            />
          ))}
          {filtered.length === 0 && (
            <p style={{ color: 'var(--ink-mute)', fontSize: 14 }}>No campaigns in this view.</p>
          )}
        </div>
        <CampaignDetailPanel
          campaign={selected}
          onLaunch={(id) => {
            launchCampaign(id);
            addToast({ type: 'success', message: 'Campaign is now active' });
          }}
          onDelete={handleDelete}
        />
      </div>

      <CreateCampaignModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
        onGenerateAi={generateAiPlan}
        aiGenerating={aiGenerating}
      />
    </div>
  );
}
