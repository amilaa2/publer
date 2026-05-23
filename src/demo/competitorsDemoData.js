export const DEMO_COMPETITORS = [
  { id: 'c1', name: 'Buffer', handle: '@buffer', platform: 'twitter', followers: 284000, postsPerWeek: 18, avgEngagement: 2.1, shareOfVoice: 22 },
  { id: 'c2', name: 'Hootsuite', handle: '@hootsuite', platform: 'linkedin', followers: 198000, postsPerWeek: 14, avgEngagement: 3.4, shareOfVoice: 18 },
  { id: 'c3', name: 'Later', handle: '@latermedia', platform: 'instagram', followers: 156000, postsPerWeek: 21, avgEngagement: 4.8, shareOfVoice: 15 },
  { id: 'c4', name: 'Sprout Social', handle: '@sproutsocial', platform: 'twitter', followers: 112000, postsPerWeek: 12, avgEngagement: 2.9, shareOfVoice: 12 },
];

export const YOUR_BRAND_METRICS = {
  name: 'YourBrand',
  handle: '@yourbrand',
  postsPerWeek: 11,
  avgEngagement: 4.2,
  shareOfVoice: 14,
};

export const GAP_ANALYSIS = [
  { topic: 'Video content (Reels / Shorts)', competitorAvg: 8.2, yours: 2.1, gap: -6.1, priority: 'high', recommendation: 'Competitors post 4× more short-form video. Schedule 3 Reels/week.' },
  { topic: 'Posting frequency (LinkedIn)', competitorAvg: 5.2, yours: 2.0, gap: -3.2, priority: 'high', recommendation: 'Increase LinkedIn to 4–5 posts/week; peers average 5.2.' },
  { topic: 'User-generated content', competitorAvg: 3.1, yours: 0.4, gap: -2.7, priority: 'medium', recommendation: 'Run a UGC hashtag campaign; competitors reshare customer posts weekly.' },
  { topic: 'Educational threads', competitorAvg: 2.8, yours: 3.5, gap: 0.7, priority: 'low', recommendation: 'You lead on Twitter threads — maintain cadence and cross-post highlights.' },
  { topic: 'Product launch teasers', competitorAvg: 1.2, yours: 0.2, gap: -1.0, priority: 'medium', recommendation: 'Add pre-launch countdown series; Buffer ran 5-post teaser arcs last quarter.' },
  { topic: 'Engagement rate (Instagram)', competitorAvg: 3.9, yours: 5.2, gap: 1.3, priority: 'low', recommendation: 'Strength: your IG engagement beats the competitive set. Double down on Stories CTAs.' },
];

export const COMPETITOR_ACTIVITY = [
  { id: 'a1', competitorId: 'c1', competitor: 'Buffer', platform: 'twitter', type: 'thread', summary: '5 tips for batch-scheduling your Q3 content', engagement: 1240, time: '2h ago' },
  { id: 'a2', competitorId: 'c3', competitor: 'Later', platform: 'instagram', type: 'reel', summary: 'Behind the scenes: how we plan 30 days of content', engagement: 4820, time: '4h ago' },
  { id: 'a3', competitorId: 'c2', competitor: 'Hootsuite', platform: 'linkedin', type: 'article', summary: 'State of Social 2026 report — key findings', engagement: 2100, time: 'Yesterday' },
  { id: 'a4', competitorId: 'c4', competitor: 'Sprout Social', platform: 'twitter', type: 'post', summary: 'New analytics dashboard for multi-brand accounts', engagement: 890, time: 'Yesterday' },
  { id: 'a5', competitorId: 'c1', competitor: 'Buffer', platform: 'instagram', type: 'carousel', summary: '10 caption templates that drive saves', engagement: 3200, time: 'Mon' },
  { id: 'a6', competitorId: 'c3', competitor: 'Later', platform: 'tiktok', type: 'video', summary: 'POV: scheduling a month of posts in one afternoon', engagement: 9100, time: 'Mon' },
];

export const SHARE_OF_VOICE_CHART = [
  { name: 'Buffer', value: 22, fill: '#1877f2' },
  { name: 'Hootsuite', value: 18, fill: '#0077b5' },
  { name: 'Later', value: 15, fill: '#e1306c' },
  { name: 'YourBrand', value: 14, fill: '#14a89e' },
  { name: 'Sprout', value: 12, fill: '#1a8cd8' },
  { name: 'Others', value: 19, fill: '#9a9794' },
];

export const POSTING_FREQUENCY = [
  { day: 'Mon', you: 2, competitors: 4.2 },
  { day: 'Tue', you: 3, competitors: 3.8 },
  { day: 'Wed', you: 2, competitors: 4.5 },
  { day: 'Thu', you: 1, competitors: 3.2 },
  { day: 'Fri', you: 2, competitors: 3.0 },
  { day: 'Sat', you: 1, competitors: 2.1 },
  { day: 'Sun', you: 0, competitors: 1.8 },
];
