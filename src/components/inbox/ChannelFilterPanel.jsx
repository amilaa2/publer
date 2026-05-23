import { Badge } from '../shared/Badge';
import { INBOX_COUNTS, INBOX_LABELS } from '../../demo/inboxDemoData';
import { useInboxStore } from '../../stores/useInboxStore';
import { getChannelColor, PLATFORM_SHORT } from '../../utils/platformUtils';

const CHANNELS = [
  { id: 'all', label: 'All Channels', countKey: 'totalUnread' },
  { id: 'email', label: 'Email', countKey: 'emailUnread' },
  { id: 'instagram', label: 'Instagram', countKey: 'instagramUnread' },
  { id: 'facebook', label: 'Facebook', countKey: 'facebookUnread' },
  { id: 'twitter', label: 'Twitter / X', countKey: 'twitterUnread' },
  { id: 'linkedin', label: 'LinkedIn', countKey: 'linkedinUnread' },
  { id: 'whatsapp', label: 'WhatsApp', countKey: 'whatsappUnread' },
];

export function ChannelFilterPanel() {
  const activeChannel = useInboxStore((s) => s.activeChannel);
  const setChannel = useInboxStore((s) => s.setChannel);

  return (
    <aside
      style={{
        width: 200,
        background: 'var(--primary)',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid var(--hairline-dark)',
        overflowY: 'auto',
      }}
    >
      <div style={{ padding: '16px 12px 8px' }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.8px',
            color: 'var(--on-dark-faint)',
            margin: '0 0 8px 8px',
          }}
        >
          CHANNELS
        </p>
        {CHANNELS.map((ch) => {
          const isActive = activeChannel === ch.id;
          const dotColor = ch.id === 'all' ? 'var(--teal-brand)' : getChannelColor(ch.id);
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => setChannel(ch.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                background: isActive ? 'rgba(20,168,158,0.28)' : 'transparent',
                color: isActive ? '#fff' : 'var(--on-dark-mute)',
                fontWeight: isActive ? 600 : 400,
                fontSize: 13,
                marginBottom: 2,
                textAlign: 'left',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: dotColor,
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {ch.label}
              </span>
              {ch.id !== 'all' && (
                <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--on-dark-faint)' }}>{PLATFORM_SHORT[ch.id]}</span>
              )}
              <Badge count={INBOX_COUNTS[ch.countKey]} />
            </button>
          );
        })}
      </div>

      <div style={{ padding: '8px 12px', borderTop: '1px solid var(--hairline-dark)', marginTop: 8 }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.8px',
            color: 'var(--on-dark-faint)',
            margin: '8px 0 8px 8px',
          }}
        >
          LABELS
        </p>
        {INBOX_LABELS.map((l) => (
          <div
            key={l.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 10px',
              borderRadius: 8,
              fontSize: 13,
              color: 'var(--on-dark-mute)',
              marginBottom: 2,
              cursor: 'pointer',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
            {l.label}
          </div>
        ))}
      </div>
    </aside>
  );
}
