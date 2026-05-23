import { create } from 'zustand';
import {
  DEMO_COMPETITORS,
  YOUR_BRAND_METRICS,
  GAP_ANALYSIS,
  COMPETITOR_ACTIVITY,
  SHARE_OF_VOICE_CHART,
  POSTING_FREQUENCY,
} from '../demo/competitorsDemoData';

export const useCompetitorsStore = create((set) => ({
  competitors: DEMO_COMPETITORS,
  yourMetrics: YOUR_BRAND_METRICS,
  gapAnalysis: GAP_ANALYSIS,
  activity: COMPETITOR_ACTIVITY,
  shareOfVoice: SHARE_OF_VOICE_CHART,
  postingFrequency: POSTING_FREQUENCY,
  selectedCompetitorId: null,
  dateRange: 'Last 30 days',

  setDateRange: (range) => set({ dateRange: range }),
  setSelectedCompetitor: (id) => set({ selectedCompetitorId: id }),
}));
