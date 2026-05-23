import { useState } from 'react';
import { Avatar } from '../shared/Avatar';
import { INBOX_COUNTS } from '../../demo/inboxDemoData';

const DEMO_NOTIFICATIONS = [
  { id: 1, text: 'Post scheduled for Instagram at 3 PM', time: '2m ago', read: false },
  { id: 2, text: 'New DM from @jordanmills', time: '9m ago', read: false },
  { id: 3, text: 'AI caption generated successfully', time: '1h ago', read: true },
];

export function TopNav() {
  const [search, setSearch] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unread = INBOX_COUNTS.totalUnread;

  return (
    <header
      style={{
        background: 'var(--primary)',
        color: 'var(--on-dark)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 24px',
        height: 52,
        flexShrink: 0,
        borderBottom: '1px solid var(--hairline-dark)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 8 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: 'var(--teal-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 11,
            fontWeight: 800,
            color: '#fff',
          }}
        >
          P
        </div>
        <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px', color: '#fff' }}>Publer</span>
      </div>

      <div style={{ flex: 1, maxWidth: 400, position: 'relative' }}>
        <span
          style={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 11,
            color: 'var(--on-dark-faint)',
            fontWeight: 600,
          }}
        >
          Search
        </span>
        <input
          className="input-on-dark"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Conversations, posts, analytics…"
          style={{
            width: '100%',
            borderRadius: 8,
            padding: '7px 12px 7px 58px',
            fontSize: 13,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--on-dark-mute)' }}>
          {unread > 0 && (
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f87171', flexShrink: 0 }} />
          )}
          <span style={{ color: 'var(--on-dark)' }}>{unread} unread</span>
        </div>

        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid var(--hairline-dark)',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 12,
              padding: '6px 10px',
              color: 'var(--on-dark)',
              fontWeight: 600,
            }}
            aria-label="Notifications"
          >
            Alerts
          </button>
          {notifOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                marginTop: 8,
                background: 'var(--canvas)',
                color: 'var(--ink)',
                borderRadius: 8,
                boxShadow: 'var(--shadow-2)',
                minWidth: 300,
                zIndex: 100,
                border: '1px solid var(--hairline)',
              }}
            >
              {DEMO_NOTIFICATIONS.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--hairline)',
                    background: n.read ? 'var(--canvas)' : 'var(--teal-light)',
                    fontSize: 13,
                    color: 'var(--ink)',
                  }}
                >
                  <div style={{ fontWeight: n.read ? 400 : 600 }}>{n.text}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 4 }}>{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <Avatar initials="YB" size={30} bg="var(--teal-brand)" />
          </button>
          {profileOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                marginTop: 8,
                background: 'var(--canvas)',
                color: 'var(--ink)',
                borderRadius: 8,
                boxShadow: 'var(--shadow-2)',
                minWidth: 200,
                zIndex: 100,
                border: '1px solid var(--hairline)',
                overflow: 'hidden',
              }}
            >
              {['Profile Settings', 'Billing', 'Connected Accounts', 'Log Out'].map((item) => (
                <button
                  key={item}
                  type="button"
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 16px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    color: 'var(--ink)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--canvas-soft)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
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
