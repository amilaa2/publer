function genHeatmap() {
  const grid = [];
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      let score = Math.floor(Math.random() * 40);
      if (d >= 1 && d <= 4 && h >= 8 && h <= 18) score += 30 + Math.floor(Math.random() * 40);
      if (d === 5 || d === 6) score += h >= 9 && h <= 14 ? 20 : 0;
      grid.push(Math.min(100, score));
    }
  }
  return grid;
}

export const DEMO_INSIGHTS = [
  { icon: '📈', title: 'Your Tuesday evening posts get 2× more saves', body: "Posts published between 5–7 PM on Tuesdays consistently outperform other slots on Instagram. Your audience appears to browse saved content during commute hours.", cta: { label: 'Schedule for Tuesday 6 PM', action: 'compose-tuesday' } },
  { icon: '🎯', title: 'LinkedIn engagement peaks when you post before 9 AM', body: 'Your professional audience checks LinkedIn before work. Posts published at 7–8 AM on weekdays receive 34% more impressions than midday posts.', cta: null },
  { icon: '📅', title: "You haven't posted on Twitter in 8 days", body: 'Your Twitter engagement historically drops off after 5 days without a post. Consider scheduling something this week to maintain reach.', cta: { label: 'Create a tweet now', action: 'compose-twitter' } },
];

export const DEMO_TOP_TIMES = {
  instagram: [
    { rank: 1, slot: 'Tuesday 6:00 PM', score: 92, avgEngagement: '5.8%', postCount: 14 },
    { rank: 2, slot: 'Wednesday 9:00 AM', score: 87, avgEngagement: '5.2%', postCount: 11 },
    { rank: 3, slot: 'Thursday 12:00 PM', score: 83, avgEngagement: '4.9%', postCount: 9 },
    { rank: 4, slot: 'Saturday 10:00 AM', score: 79, avgEngagement: '4.6%', postCount: 7 },
    { rank: 5, slot: 'Friday 7:00 PM', score: 74, avgEngagement: '4.1%', postCount: 12 },
  ],
  twitter: [
    { rank: 1, slot: 'Wednesday 8:00 AM', score: 91, avgEngagement: '3.2%', postCount: 18 },
    { rank: 2, slot: 'Monday 12:00 PM', score: 85, avgEngagement: '2.9%', postCount: 14 },
    { rank: 3, slot: 'Thursday 5:00 PM', score: 80, avgEngagement: '2.7%', postCount: 10 },
    { rank: 4, slot: 'Sunday 9:00 PM', score: 74, avgEngagement: '2.4%', postCount: 6 },
    { rank: 5, slot: 'Friday 7:00 AM', score: 71, avgEngagement: '2.2%', postCount: 9 },
  ],
  linkedin: [
    { rank: 1, slot: 'Tuesday 9:00 AM', score: 94, avgEngagement: '6.1%', postCount: 12 },
    { rank: 2, slot: 'Wednesday 12:00 PM', score: 89, avgEngagement: '5.7%', postCount: 10 },
    { rank: 3, slot: 'Thursday 8:00 AM', score: 84, avgEngagement: '5.3%', postCount: 8 },
    { rank: 4, slot: 'Monday 7:00 AM', score: 76, avgEngagement: '4.8%', postCount: 7 },
    { rank: 5, slot: 'Friday 10:00 AM', score: 70, avgEngagement: '4.3%', postCount: 9 },
  ],
  facebook: [
    { rank: 1, slot: 'Thursday 1:00 PM', score: 88, avgEngagement: '4.4%', postCount: 11 },
    { rank: 2, slot: 'Wednesday 3:00 PM', score: 83, avgEngagement: '4.0%', postCount: 9 },
    { rank: 3, slot: 'Friday 12:00 PM', score: 79, avgEngagement: '3.8%', postCount: 8 },
    { rank: 4, slot: 'Saturday 11:00 AM', score: 75, avgEngagement: '3.5%', postCount: 6 },
    { rank: 5, slot: 'Sunday 3:00 PM', score: 70, avgEngagement: '3.1%', postCount: 5 },
  ],
};

export const PLATFORM_ANALYTICS_META = {
  instagram: { handle: '@yourbrand', followers: 48200, avgEngagement: '5.2%' },
  twitter: { handle: '@yourbrand', followers: 12400, avgEngagement: '2.8%' },
  linkedin: { handle: 'YourBrand', followers: 8900, avgEngagement: '5.5%' },
  facebook: { handle: 'YourBrand Page', followers: 22100, avgEngagement: '3.9%' },
};

export function getHeatmapForPlatform(platform) {
  return genHeatmap();
}

export function getEngagementTrend(platform) {
  const days = 30;
  const base = { instagram: 5, twitter: 2.5, linkedin: 6, facebook: 3.5 }[platform] || 4;
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(2026, 4, 23 - (days - 1 - i));
    const weekend = date.getDay() === 0 || date.getDay() === 6;
    let v = base + (Math.random() - 0.5) * 2;
    if (platform === 'linkedin' && weekend) v *= 0.7;
    if (platform === 'instagram' && weekend) v *= 1.15;
    return {
      date: date.toISOString().slice(0, 10),
      rate: Math.max(0.5, Math.min(9, v)),
      posts: Math.floor(Math.random() * 3) + 1,
    };
  });
}

export const DEMO_SUMMARY = {
  totalPosts: 47,
  avgEngagement: '4.8%',
  bestDay: 'Tuesday',
  bestTime: '6:00 PM',
};
