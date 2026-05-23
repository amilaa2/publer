import { create } from 'zustand';
import { DEMO_MESSAGES, INBOX_COUNTS } from '../demo/inboxDemoData';
import { withDemoDelay } from '../hooks/useDemoMode';

export const useInboxStore = create((set, get) => ({
  messages: DEMO_MESSAGES,
  selectedMessageId: 1,
  activeChannel: 'all',
  listFilter: 'All',
  sortBy: 'Newest',
  unreadCounts: INBOX_COUNTS,

  fetchMessages: async () => {
    const data = await withDemoDelay(DEMO_MESSAGES);
    set({ messages: data });
  },

  selectMessage: (id) => {
    set({ selectedMessageId: id });
    get().markAsRead(id);
  },

  setChannel: (channel) => set({ activeChannel: channel }),
  setListFilter: (f) => set({ listFilter: f }),
  setSortBy: (s) => set({ sortBy: s }),

  markAsRead: (id) =>
    set((s) => ({
      messages: s.messages.map((m) => (m.id === id ? { ...m, unread: false } : m)),
    })),

  archiveMessage: (id) =>
    set((s) => ({
      messages: s.messages.map((m) => (m.id === id ? { ...m, archived: true } : m)),
    })),

  toggleStar: (id) =>
    set((s) => ({
      messages: s.messages.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m)),
    })),

  sendReply: async (messageId, text) => {
    await withDemoDelay({ ok: true });
    set({ selectedMessageId: messageId });
    return { ok: true, body: text };
  },
}));
