export const DEMO_POSTS = [
  { id: 'p1', caption: "Big things are coming 👀 Our new AI scheduler drops this week. Drop a 🔥 if you're hyped!\n\n#SocialMedia #AITools", platforms: ['instagram'], accounts: ['acc1'], scheduledAt: '2026-05-26T09:00:00Z', status: 'scheduled', media: [{ url: 'https://picsum.photos/seed/sched1/800/800', thumbnailUrl: 'https://picsum.photos/seed/sched1/200/200', type: 'image' }] },
  { id: 'p2', caption: 'Stop guessing when to post. Start knowing 📊 Our Best Time feature is live!', platforms: ['twitter', 'linkedin'], accounts: ['acc3', 'acc4'], scheduledAt: '2026-05-26T12:00:00Z', status: 'scheduled', media: [] },
  { id: 'p3', caption: 'Behind the scenes of our content team 📸 Swipe to see how we plan 30 days of content in one afternoon.', platforms: ['instagram', 'facebook'], accounts: ['acc1', 'acc2'], scheduledAt: '2026-05-27T18:00:00Z', status: 'scheduled', media: [{ url: 'https://picsum.photos/seed/sched3/800/800', thumbnailUrl: 'https://picsum.photos/seed/sched3/200/200', type: 'image' }] },
  { id: 'p4', caption: '5 social media mistakes brands make (and how to fix them) 🧵', platforms: ['twitter'], accounts: ['acc3'], scheduledAt: '2026-05-28T08:00:00Z', status: 'scheduled', media: [] },
  { id: 'p5', caption: "Excited to share our Q2 results! Organic reach up 43% across all platforms. Here's what changed. 👇", platforms: ['linkedin'], accounts: ['acc4'], scheduledAt: '2026-05-28T09:00:00Z', status: 'scheduled', media: [] },
  { id: 'p6', caption: 'Your audience is online right now. Are you? ⏰ Schedule smarter with our new queue.', platforms: ['instagram', 'facebook'], accounts: ['acc1', 'acc2'], scheduledAt: '2026-05-23T18:00:00Z', status: 'published', media: [{ url: 'https://picsum.photos/seed/sched6/800/800', thumbnailUrl: 'https://picsum.photos/seed/sched6/200/200', type: 'image' }] },
  { id: 'p7', caption: '3 things we wish we knew before starting our social media strategy… (thread)', platforms: ['twitter'], accounts: ['acc3'], scheduledAt: '2026-05-22T12:00:00Z', status: 'published', media: [] },
  { id: 'p8', caption: "Meet the team behind the brand ✨ We're hiring! Link in bio.", platforms: ['instagram', 'linkedin'], accounts: ['acc1', 'acc4'], scheduledAt: '2026-05-20T09:00:00Z', status: 'published', media: [{ url: 'https://picsum.photos/seed/sched8/800/1000', thumbnailUrl: 'https://picsum.photos/seed/sched8/200/200', type: 'image' }] },
  { id: 'p9', caption: 'Draft: Product launch teaser — DO NOT POST YET', platforms: ['instagram'], accounts: ['acc1'], scheduledAt: null, status: 'draft', media: [] },
  { id: 'p10', caption: 'This is why your reach dropped last month 📉 (and exactly how to fix it)', platforms: ['facebook', 'linkedin'], accounts: ['acc2', 'acc4'], scheduledAt: '2026-05-29T13:00:00Z', status: 'scheduled', media: [] },
  { id: 'p11', caption: "Hot take: more content ≠ more growth. Here's what actually moves the needle 🎯", platforms: ['twitter', 'instagram'], accounts: ['acc3', 'acc1'], scheduledAt: '2026-05-30T17:00:00Z', status: 'scheduled', media: [] },
  { id: 'p12', caption: 'Case study: How @clientname grew their Instagram by 10k followers in 60 days using our platform.', platforms: ['linkedin', 'facebook'], accounts: ['acc4', 'acc2'], scheduledAt: '2026-06-02T09:00:00Z', status: 'scheduled', media: [{ url: 'https://picsum.photos/seed/sched12/800/600', thumbnailUrl: 'https://picsum.photos/seed/sched12/200/200', type: 'image' }] },
  { id: 'p13', caption: 'Behind the scenes of our brand photoshoot 📸 Which shot is your favorite? Drop your pick below 👇', platforms: ['instagram'], accounts: ['acc1'], scheduledAt: '2026-05-15T09:00:00Z', status: 'published', media: [{ url: 'https://picsum.photos/seed/pub1/800/800', thumbnailUrl: 'https://picsum.photos/seed/pub1/200/200', type: 'image' }], stats: { views: 4820, likes: 312, comments: 47, shares: 23 } },
  { id: 'p14', caption: '5 tools we use every day to stay consistent on social media — thread 🧵', platforms: ['twitter'], accounts: ['acc3'], scheduledAt: '2026-05-14T12:00:00Z', status: 'published', media: [], stats: { views: 12400, likes: 891, comments: 134, shares: 432 } },
  { id: 'p15', caption: "Announcing our Series A 🎉 We're thrilled to share that we've raised $8M to build the future of social media management.", platforms: ['linkedin', 'twitter', 'facebook'], accounts: ['acc4', 'acc3', 'acc2'], scheduledAt: '2026-05-10T09:00:00Z', status: 'published', media: [{ url: 'https://picsum.photos/seed/pub3/1200/630', thumbnailUrl: 'https://picsum.photos/seed/pub3/200/200', type: 'image' }], stats: { views: 38200, likes: 2841, comments: 389, shares: 1204 } },
  { id: 'p16', caption: "We tried posting 3x a day for 30 days. Here's what happened to our reach 📊", platforms: ['instagram', 'facebook'], accounts: ['acc1', 'acc2'], scheduledAt: '2026-05-05T18:00:00Z', status: 'published', media: [{ url: 'https://picsum.photos/seed/pub4/800/800', thumbnailUrl: 'https://picsum.photos/seed/pub4/200/200', type: 'image' }], stats: { views: 9100, likes: 671, comments: 88, shares: 56 } },
  { id: 'p17', caption: "Happy Monday! Here's your weekly reminder: consistency > perfection on social media 💪", platforms: ['instagram'], accounts: ['acc1'], scheduledAt: '2026-04-28T09:00:00Z', status: 'published', media: [], stats: { views: 3200, likes: 218, comments: 31, shares: 12 } },
  { id: 'p18', caption: 'Failed to post — image size exceeded platform limit', platforms: ['tiktok'], accounts: ['acc5'], scheduledAt: '2026-05-18T15:00:00Z', status: 'failed', media: [], stats: null, failureReason: 'Video duration exceeds 60 seconds for this account tier.' },
];

export const BEST_TIME_SUGGESTIONS = [
  { label: 'Tue 6:00 PM', score: 92, tooltip: 'Highest engagement for Instagram last 30 days' },
  { label: 'Wed 9:00 AM', score: 87, tooltip: 'Best for LinkedIn Mon–Fri mornings' },
  { label: 'Thu 12:00 PM', score: 83, tooltip: 'Lunchtime peak for Facebook' },
];

export const AI_CAPTION_DEMO = {
  captions: [
    "Big things are coming 👀 We've been listening to your feedback and building something that's going to change how you schedule content forever. Stay tuned — and drop a 🔥 if you're excited!\n\n#SocialMedia #ContentCreator #Scheduling #ProductLaunch",
    "Scheduling posts just got a whole lot smarter. ✨ Introducing our new AI-powered queue — it finds the best time to post so you don't have to.\n\nLink in bio to try it free.\n\n#SocialMediaManagement #AITools #Marketing",
    "Stop guessing when to post. Start knowing. 📊\n\nOur new Best Time to Post feature analyzes your audience's behavior and tells you exactly when to hit publish for maximum reach.\n\nWho needs this? Tag them below 👇\n\n#ContentStrategy #SocialMediaTips #GrowYourAudience",
  ],
};

export const QUEUE_SETTINGS_DEMO = {
  instagram: ['09:00', '13:00', '18:00'],
  twitter: ['08:00', '12:00', '17:00', '21:00'],
  linkedin: ['09:00', '12:00'],
  facebook: ['10:00', '15:00', '19:00'],
};
