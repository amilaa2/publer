import { create } from 'zustand';

let toastId = 0;

export const useUIStore = create((set) => ({
  toasts: [],
  activeModal: null,
  modalProps: {},
  isSidebarCollapsed: false,
  mobileMenuOpen: false,
  inboxMobileView: 'list',
  composeMobileTab: 'edit',

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setInboxMobileView: (view) => set({ inboxMobileView: view }),
  setComposeMobileTab: (tab) => set({ composeMobileTab: tab }),

  addToast: (toast) => {
    const id = ++toastId;
    set((s) => ({ toasts: [...s.toasts.slice(-2), { id, ...toast }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 4000);
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  openModal: (modalId, props = {}) => set({ activeModal: modalId, modalProps: props }),
  closeModal: () => set({ activeModal: null, modalProps: {} }),
  toggleSidebar: () => set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),
}));
