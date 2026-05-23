import { NavLink } from 'react-router-dom';
import { useUIStore } from '../../stores/useUIStore';
import { INBOX_COUNTS } from '../../demo/inboxDemoData';

const PRIMARY = [
  { id: 'inbox', label: 'Inbox', route: '/inbox', badgeKey: 'totalUnread' },
  { id: 'schedule', label: 'Schedule', route: '/schedule' },
  { id: 'compose', label: 'Post', route: '/compose', isCompose: true },
  { id: 'posts', label: 'Posts', route: '/posts' },
];

export function MobileBottomNav() {
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);

  return (
    <nav className="mobile-bottom-nav" aria-label="Main navigation">
      {PRIMARY.map((item) => (
        <NavLink
          key={item.id}
          to={item.route}
          className={({ isActive }) =>
            ['mobile-nav-item', item.isCompose ? 'mobile-nav-compose' : '', isActive ? 'active' : '']
              .filter(Boolean)
              .join(' ')
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="mobile-nav-icon">{item.label.charAt(0)}</span>
          <span className="mobile-nav-label">{item.label}</span>
          {item.badgeKey && INBOX_COUNTS[item.badgeKey] > 0 && (
            <span className="mobile-nav-badge">{INBOX_COUNTS[item.badgeKey]}</span>
          )}
        </NavLink>
      ))}
      <button
        type="button"
        className="mobile-nav-item mobile-nav-more"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="More navigation"
      >
        <span className="mobile-nav-icon">···</span>
        <span className="mobile-nav-label">More</span>
      </button>
    </nav>
  );
}
