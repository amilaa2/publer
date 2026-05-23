import { useState } from 'react';
import { Avatar } from '../shared/Avatar';
import { INBOX_COUNTS } from '../../demo/inboxDemoData';
import { useUIStore } from '../../stores/useUIStore';

const DEMO_NOTIFICATIONS = [
  { id: 1, text: 'Post scheduled for Instagram at 3 PM', time: '2m ago', read: false },
  { id: 2, text: 'New DM from @jordanmills', time: '9m ago', read: false },
  { id: 3, text: 'AI caption generated successfully', time: '1h ago', read: true },
];

export function TopNav() {
  const [search, setSearch] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);
  const unread = INBOX_COUNTS.totalUnread;

  return (
    <header className="top-nav">
      <button
        type="button"
        className="top-nav-menu-btn"
        aria-label="Open menu"
        onClick={() => setMobileMenuOpen(true)}
      >
        ☰
      </button>

      <div className="top-nav-brand">
        <div className="top-nav-logo">P</div>
        <span className="top-nav-title">Publer</span>
      </div>

      <div className="top-nav-search">
        <span className="top-nav-search-label">Search</span>
        <input
          className="input-on-dark"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Conversations, posts…"
        />
      </div>

      <div className="top-nav-actions">
        <div className="top-nav-unread">
          {unread > 0 && <span className="top-nav-unread-dot" />}
          <span>{unread} unread</span>
        </div>

        <div className="top-nav-dropdown-wrap">
          <button
            type="button"
            className="top-nav-alerts-btn"
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            aria-label="Notifications"
          >
            Alerts
          </button>
          {notifOpen && (
            <div className="top-nav-dropdown">
              {DEMO_NOTIFICATIONS.map((n) => (
                <div
                  key={n.id}
                  className="top-nav-dropdown-item"
                  style={{ background: n.read ? 'var(--canvas)' : 'var(--teal-light)' }}
                >
                  <div style={{ fontWeight: n.read ? 400 : 600 }}>{n.text}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 4 }}>{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="top-nav-dropdown-wrap">
          <button
            type="button"
            className="top-nav-profile-btn"
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            aria-label="Profile menu"
          >
            <Avatar initials="YB" size={30} bg="var(--teal-brand)" />
          </button>
          {profileOpen && (
            <div className="top-nav-dropdown">
              {['Profile Settings', 'Billing', 'Connected Accounts', 'Log Out'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="top-nav-dropdown-action"
                  onClick={() => setProfileOpen(false)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
