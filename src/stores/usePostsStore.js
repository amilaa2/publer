import { create } from 'zustand';
import { DEMO_POSTS } from '../demo/postsDemoData';
import { withDemoDelay } from '../hooks/useDemoMode';

export const usePostsStore = create((set, get) => ({
  posts: DEMO_POSTS,
  filters: { status: [], platforms: [], search: '' },
  selectedPostIds: [],

  fetchPosts: async () => {
    const data = await withDemoDelay(DEMO_POSTS);
    set({ posts: data });
  },

  setFilters: (filters) => set((s) => ({ filters: { ...s.filters, ...filters } })),

  toggleSelectPost: (id) => {
    const { selectedPostIds } = get();
    set({
      selectedPostIds: selectedPostIds.includes(id)
        ? selectedPostIds.filter((x) => x !== id)
        : [...selectedPostIds, id],
    });
  },

  clearSelection: () => set({ selectedPostIds: [] }),

  updatePost: (id, patch) =>
    set((s) => ({
      posts: s.posts.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })),

  deletePost: (id) =>
    set((s) => ({ posts: s.posts.filter((p) => p.id !== id) })),

  duplicatePost: (id) => {
    const post = get().posts.find((p) => p.id === id);
    if (!post) return;
    const copy = { ...post, id: `p${Date.now()}`, status: 'draft', scheduledAt: null };
    set((s) => ({ posts: [copy, ...s.posts] }));
  },

  createPost: (data) => {
    const post = { id: `p${Date.now()}`, status: data.scheduledAt ? 'scheduled' : 'draft', ...data };
    set((s) => ({ posts: [post, ...s.posts] }));
    return post;
  },

  getFilteredPosts: () => {
    const { posts, filters } = get();
    return posts.filter((p) => {
      if (filters.status?.length && !filters.status.includes(p.status)) return false;
      if (filters.platforms?.length && !p.platforms.some((pl) => filters.platforms.includes(pl))) return false;
      if (filters.search && !p.caption.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  },
}));
