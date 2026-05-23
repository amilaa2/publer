import { create } from 'zustand';
import {
  DEMO_INSIGHTS,
  DEMO_TOP_TIMES,
  DEMO_SUMMARY,
  getHeatmapForPlatform,
  getEngagementTrend,
} from '../demo/analyticsDemoData';
import { withDemoDelay } from '../hooks/useDemoMode';

export const useAnalyticsStore = create((set) => ({
  dateRange: 'Last 30 days',
  insights: DEMO_INSIGHTS,
  summary: DEMO_SUMMARY,
  heatmaps: {},
  bestTimes: DEMO_TOP_TIMES,
  trends: {},

  setDateRange: (range) => set({ dateRange: range }),

  fetchAll: async (platforms) => {
    const heatmaps = {};
    const trends = {};
    for (const p of platforms) {
      heatmaps[p] = await withDemoDelay(getHeatmapForPlatform(p));
      trends[p] = await withDemoDelay(getEngagementTrend(p));
    }
    set({
      heatmaps,
      trends,
      insights: await withDemoDelay(DEMO_INSIGHTS),
      summary: await withDemoDelay(DEMO_SUMMARY),
      bestTimes: await withDemoDelay(DEMO_TOP_TIMES),
    });
  },
}));
