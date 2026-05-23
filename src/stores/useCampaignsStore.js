import { create } from 'zustand';
import { DEMO_CAMPAIGNS, AI_CAMPAIGN_SUGGESTIONS } from '../demo/campaignsDemoData';
import { withDemoDelay } from '../hooks/useDemoMode';

export const useCampaignsStore = create((set, get) => ({
  campaigns: DEMO_CAMPAIGNS,
  filterStatus: 'all',
  selectedCampaignId: null,
  aiGenerating: false,

  setFilterStatus: (status) => set({ filterStatus: status }),
  selectCampaign: (id) => set({ selectedCampaignId: id }),

  createCampaign: (data) => {
    const campaign = {
      id: `camp${Date.now()}`,
      status: 'draft',
      spent: 0,
      postsPublished: 0,
      reach: 0,
      conversions: 0,
      postsScheduled: 0,
      aiScore: null,
      ...data,
    };
    set((s) => ({ campaigns: [campaign, ...s.campaigns], selectedCampaignId: campaign.id }));
    return campaign;
  },

  updateCampaign: (id, patch) =>
    set((s) => ({
      campaigns: s.campaigns.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    })),

  launchCampaign: (id) => {
    set((s) => ({
      campaigns: s.campaigns.map((c) =>
        c.id === id ? { ...c, status: 'active', aiScore: c.aiScore ?? 85 } : c
      ),
    }));
  },

  deleteCampaign: (id) =>
    set((s) => ({
      campaigns: s.campaigns.filter((c) => c.id !== id),
      selectedCampaignId: s.selectedCampaignId === id ? null : s.selectedCampaignId,
    })),

  generateAiPlan: async (brief, objective, channels) => {
    set({ aiGenerating: true });
    await withDemoDelay(AI_CAMPAIGN_SUGGESTIONS, 1800);
    set({ aiGenerating: false });
    return {
      brief,
      objective,
      channels,
      suggestedPosts: 12,
      estimatedReach: 35000,
      aiScore: 88,
      ...AI_CAMPAIGN_SUGGESTIONS,
    };
  },

  getFilteredCampaigns: () => {
    const { campaigns, filterStatus } = get();
    if (filterStatus === 'all') return campaigns;
    return campaigns.filter((c) => c.status === filterStatus);
  },
}));
