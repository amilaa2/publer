import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useUIStore } from '../../stores/useUIStore';
import { TopNav } from './TopNav';
import { LeftSidebar } from './LeftSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileMenuDrawer } from './MobileMenuDrawer';
import { ToastContainer } from '../shared/Toast';
import { ConfirmModal } from '../shared/ConfirmModal';

export function AppShell() {
  const location = useLocation();
  const setInboxMobileView = useUIStore((s) => s.setInboxMobileView);
  const setComposeMobileTab = useUIStore((s) => s.setComposeMobileTab);
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);

  useEffect(() => {
    if (!location.pathname.startsWith('/inbox')) {
      setInboxMobileView('list');
    }
    if (!location.pathname.startsWith('/compose')) {
      setComposeMobileTab('edit');
    }
    setMobileMenuOpen(false);
  }, [location.pathname, setInboxMobileView, setComposeMobileTab, setMobileMenuOpen]);

  return (
    <div className="app-shell">
      <TopNav />
      <div className="app-body">
        <LeftSidebar variant="desktop" />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <MobileBottomNav />
      <MobileMenuDrawer />
      <ToastContainer />
      <ConfirmModal />
    </div>
  );
}
