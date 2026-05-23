import { NavLink } from 'react-router-dom';
import { Badge } from '../shared/Badge';
import { Avatar } from '../shared/Avatar';
import { NavIcon } from '../shared/NavIcon';
import { INBOX_COUNTS } from '../../demo/inboxDemoData';
import { useAccountsStore } from '../../stores/useAccountsStore';
import { getChannelColor } from '../../utils/platformUtils';

const NAV_ITEMS = [
  { id: 'inbox', label: 'Inbox', route: '/inbox', badgeKey: 'totalUnread' },
  { id: 'schedule', label: 'Schedule', route: '/schedule' },
  { id: 'compose', label: 'New Post', route: '/compose', isCompose: true },
  { id: 'posts', label: 'Posts', route: '/posts' },
  { id: 'competitors', label: 'Competitors', route: '/analytics/competitors' },
  { id: 'campaigns', label: 'AI Campaigns', route: '/campaigns' },
  { id: 'analytics', label: 'Best Times', route: '/analytics/best-times' },
  { id: 'settings', label: 'Settings', route: '/settings' },
];

export function LeftSidebar() {
  const accounts = useAccountsStore((s) => s.accounts);
  const filterByAccount = useAccountsStore((s) => s.filterByAccount);
  const selectedAccountIds = useAccountsStore((s) => s.selectedAccountIds);

  return (
    <aside
      style={{
        width: 220,
        background: 'var(--primary)',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--hairline-dark)',
        overflowY: 'auto',
      }}
    >
      <nav style={{ padding: '12px 10px', flex: 1 }}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.route}
            className={({ isActive }) =>
              [
                'sidebar-nav-link',
                isActive && !item.isCompose ? 'active' : '',
                item.isCompose ? 'compose-cta' : '',
                item.isCompose && isActive ? 'active' : '',
              ]
                .filter(Boolean)
                .join(' ')
            }
          >
            <NavIcon id={item.id} />
            <span className="sidebar-nav-label">{item.label}</span>
            {item.badgeKey && <Badge count={INBOX_COUNTS[item.badgeKey]} />}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '12px', borderTop: '1px solid var(--hairline-dark)' }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.8px',
            color: 'var(--on-dark-faint)',
            margin: '0 0 8px 8px',
          }}
        >
          ACCOUNTS
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {accounts.filter((a) => a.connected).map((acc) => {
            const selected = selectedAccountIds.includes(acc.id);
            return (
              <button
                key={acc.id}
                type="button"
                onClick={() => filterByAccount(selected ? null : acc.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 8px',
                  borderRadius: 8,
                  border: 'none',
                  background: selected ? 'rgba(20,168,158,0.25)' : 'transparent',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <Avatar initials={acc.avatar} size={28} bg="var(--teal-mid)" />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: getChannelColor(acc.platform),
                      border: '2px solid var(--primary)',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: selected ? 'var(--on-dark)' : 'var(--on-dark-mute)',
                    fontWeight: selected ? 600 : 400,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {acc.handle}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
