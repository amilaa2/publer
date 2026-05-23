import { LeftSidebar } from './LeftSidebar';
import { useUIStore } from '../../stores/useUIStore';

export function MobileMenuDrawer() {
  const open = useUIStore((s) => s.mobileMenuOpen);
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);

  if (!open) return null;

  return (
    <div className="mobile-drawer-root" role="presentation">
      <button
        type="button"
        className="mobile-drawer-backdrop"
        aria-label="Close menu"
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className="mobile-drawer-panel">
        <div className="mobile-drawer-header">
          <span>Menu</span>
          <button type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Close">
            ×
          </button>
        </div>
        <LeftSidebar variant="drawer" />
      </div>
    </div>
  );
}
