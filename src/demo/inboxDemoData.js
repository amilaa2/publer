export const INBOX_COUNTS = {
  totalUnread: 24,
  emailUnread: 9,
  instagramUnread: 5,
  facebookUnread: 4,
  twitterUnread: 3,
  linkedinUnread: 2,
  whatsappUnread: 1,
};

export const INBOX_LABELS = [
  { id: 'urgent', label: 'Urgent', color: '#e55' },
  { id: 'leads', label: 'Leads', color: '#14a89e' },
  { id: 'support', label: 'Support', color: '#f5a623' },
  { id: 'partner', label: 'Partner', color: '#c9b4fa' },
];

export const DEMO_MESSAGES = [
  {
    id: 1, channel: 'email', from: 'Sarah Chen', handle: 'sarah@acme.com',
    avatar: 'SC', subject: 'Partnership proposal — Q3 co-marketing',
    preview: 'Hi, I wanted to follow up on our call last Tuesday about the co-marketing initiative for Q3.',
    time: '9:42 AM', unread: true, starred: false, archived: false,
    labels: ['leads'], threadCount: 3,
    body: `Hi there,\n\nI wanted to follow up on our call last Tuesday about the co-marketing initiative for Q3. We've put together a brief deck outlining three campaign concepts.\n\nWould you have 30 minutes this week to walk through the deck together?\n\nBest,\nSarah Chen`,
  },
  {
    id: 2, channel: 'instagram', from: 'Jordan Mills', handle: '@jordanmills',
    avatar: 'JM', subject: 'Comment on your reel',
    preview: 'This is exactly what I needed to see today 🔥 Do you offer any consulting services for small brands?',
    time: '8:51 AM', unread: true, starred: false, archived: false,
    labels: ['leads'], threadCount: 1,
    body: `Comment on your reel:\n\n@jordanmills: This is exactly what I needed to see today 🔥 Do you offer any consulting services for small brands?`,
  },
  {
    id: 3, channel: 'facebook', from: 'Publer Community', handle: 'Publer Group',
    avatar: 'PC', subject: 'New mention in group',
    preview: "Alex Rivera mentioned you: 'Has anyone used @YourBrand for scheduling?'",
    time: 'Yesterday', unread: true, starred: false, archived: false,
    labels: ['support'], threadCount: 6,
    body: `New mention in Publer Community Group\n\nAlex Rivera: Has anyone used @YourBrand for scheduling? Looking for alternatives to Buffer.`,
  },
  {
    id: 4, channel: 'twitter', from: 'TechInsider', handle: '@techinsider',
    avatar: 'TI', subject: 'You were mentioned in a thread',
    preview: '@YourBrand just dropped a new feature that makes scheduling way easier.',
    time: 'Yesterday', unread: false, starred: true, archived: false,
    labels: [], threadCount: 1,
    body: `@techinsider mentioned you:\n\n"@YourBrand just dropped a new feature that makes scheduling way easier."`,
  },
  {
    id: 5, channel: 'linkedin', from: 'Marcus Webb', handle: 'VP Marketing at Orbit',
    avatar: 'MW', subject: 'Re: Your article on AI content',
    preview: "Really insightful piece. I'm curious — how does your team handle the brand voice consistency issue?",
    time: 'Mon', unread: false, starred: false, archived: false,
    labels: ['partner'], threadCount: 2,
    body: `Hi,\n\nReally insightful piece on AI content workflows. Would love to compare notes if you're open to a quick call.\n\nBest,\nMarcus Webb`,
  },
  {
    id: 6, channel: 'email', from: 'Notion', handle: 'notify@notion.so',
    avatar: 'N', subject: "New comment on 'Content Calendar Q3'",
    preview: "Priya commented: 'I updated the Instagram slots — can you double-check the captions?'",
    time: 'Mon', unread: false, starred: false, archived: false,
    labels: ['support'], threadCount: 1,
    body: `Priya Sharma commented on "Content Calendar Q3":\n\n"I updated the Instagram slots — can you double-check the captions?"`,
  },
  {
    id: 7, channel: 'whatsapp', from: 'Elena Rossi', handle: '+39 02 ···',
    avatar: 'ER', subject: 'WhatsApp · Client check-in',
    preview: 'Ciao! Quick question about the reports we discussed — can we schedule a call this week?',
    time: 'Sun', unread: true, starred: false, archived: false,
    labels: ['leads'], threadCount: 1,
    body: `WhatsApp message:\n\nCiao! Quick question about the reports we discussed — can we schedule a call this week?`,
  },
  {
    id: 8, channel: 'instagram', from: 'Camille Dupont', handle: '@camillecreates',
    avatar: 'CD', subject: 'DM: Collab request',
    preview: "Hey! I'm a lifestyle creator with 48k followers. I'd love to discuss a potential collaboration 🌿",
    time: 'Sun', unread: false, starred: false, archived: false,
    labels: ['partner'], threadCount: 1,
    body: `Direct message from @camillecreates:\n\nHey! I'd love to discuss a potential collaboration 🌿`,
  },
];
