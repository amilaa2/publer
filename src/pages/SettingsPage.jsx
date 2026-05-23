import { DEMO_ACCOUNTS } from '../demo/accountsDemoData';
import { Avatar } from '../components/shared/Avatar';
import { getChannelColor, PLATFORM_LABELS, PLATFORM_SHORT } from '../utils/platformUtils';

export function SettingsPage() {
  return (
    <div className="page-scroll">
      <h1 style={{ margin: '0 0 8px', fontSize: 22, color: 'var(--ink)' }}>Settings</h1>
      <p style={{ color: 'var(--ink-mute)', marginBottom: 32 }}>Connected accounts, team, and billing</p>

      <section style={{ marginBottom: 32, maxWidth: 640 }}>
        <h2 style={{ fontSize: 16, marginBottom: 16, color: 'var(--ink)' }}>Connected Accounts</h2>
        {DEMO_ACCOUNTS.map((acc) => (
          <div
            key={acc.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 16,
              background: 'var(--canvas)',
              border: '1px solid var(--hairline)',
              borderRadius: 8,
              marginBottom: 8,
            }}
          >
            <Avatar initials={acc.avatar} size={40} bg="var(--teal-mid)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{acc.handle}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{PLATFORM_LABELS[acc.platform]}</div>
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#fff',
                background: getChannelColor(acc.platform),
                padding: '4px 8px',
                borderRadius: 4,
              }}
            >
              {PLATFORM_SHORT[acc.platform]}
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: acc.connected ? 'var(--success)' : 'var(--ink-faint)',
              }}
            >
              {acc.connected ? 'Connected' : 'Not connected'}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
