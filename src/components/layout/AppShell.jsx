import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { LeftSidebar } from './LeftSidebar';
import { ToastContainer } from '../shared/Toast';
import { ConfirmModal } from '../shared/ConfirmModal';

export function AppShell() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopNav />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
        <LeftSidebar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
      <ConfirmModal />
    </div>
  );
}
