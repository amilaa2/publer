import { create } from 'zustand';
import { DEMO_ACCOUNTS } from '../demo/accountsDemoData';
import { withDemoDelay } from '../hooks/useDemoMode';

export const useAccountsStore = create((set, get) => ({
  accounts: DEMO_ACCOUNTS,
  selectedAccountIds: [],

  fetchAccounts: async () => {
    const data = await withDemoDelay(DEMO_ACCOUNTS);
    set({ accounts: data });
  },

  toggleAccount: (id) => {
    const { selectedAccountIds } = get();
    const next = selectedAccountIds.includes(id)
      ? selectedAccountIds.filter((x) => x !== id)
      : [...selectedAccountIds, id];
    set({ selectedAccountIds: next });
  },

  setSelectedAccounts: (ids) => set({ selectedAccountIds: ids }),

  filterByAccount: (id) => {
    if (!id) set({ selectedAccountIds: [] });
    else set({ selectedAccountIds: [id] });
  },
}));
