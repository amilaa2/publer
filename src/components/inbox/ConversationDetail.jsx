import { Avatar } from '../shared/Avatar';
import { ChannelDot } from '../shared/ChannelDot';
import { LabelPill } from '../shared/LabelPill';
import { ReplyComposer } from './ReplyComposer';
import { useInboxStore } from '../../stores/useInboxStore';
import { useUIStore } from '../../stores/useUIStore';

const AVATAR_COLORS = ['var(--primary)', 'var(--teal-deep)', '#7c4daf', '#c0392b'];
const avatarColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

export function ConversationDetail() {
  const messages = useInboxStore((s) => s.messages);
  const selectedMessageId = useInboxStore((s) => s.selectedMessageId);
  const toggleStar = useInboxStore((s) => s.toggleStar);
  const archiveMessage = useInboxStore((s) => s.archiveMessage);
  const addToast = useUIStore((s) => s.addToast);
  const setInboxMobileView = useUIStore((s) => s.setInboxMobileView);

  const selected = messages.find((m) => m.id === selectedMessageId);

  if (!selected) {
    return (
      <div className="inbox-detail inbox-detail-empty">
        Select a conversation
      </div>
    );
  }

  return (
    <div className="inbox-detail">
      <div className="inbox-detail-header">
        <button
          type="button"
          className="inbox-back-btn"
          onClick={() => setInboxMobileView('list')}
          aria-label="Back to conversations"
        >
          ←
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 600, letterSpacing: '-0.4px' }}>{selected.subject}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <ChannelDot channel={selected.channel} />
            <span style={{ fontSize: 13, color: 'var(--ink-mute)' }}>{selected.from}</span>
            <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>· {selected.handle} · {selected.time}</span>
            {selected.labels?.map((l) => (
              <LabelPill key={l} labelId={l} />
            ))}
          </div>
        </div>
        <div className="inbox-detail-actions">
          <button type="button" onClick={() => toggleStar(selected.id)} style={{ background: 'none', border: '1px solid var(--hairline)', borderRadius: 6, padding: '6px 10px', cursor: 'pointer' }}>
            {selected.starred ? '⭐' : '☆'}
          </button>
          <button
            type="button"
            onClick={() => { archiveMessage(selected.id); addToast({ type: 'success', message: 'Conversation archived' }); }}
            style={{ background: 'none', border: '1px solid var(--hairline)', borderRadius: 6, padding: '6px 10px', cursor: 'pointer', fontSize: 13, color: 'var(--ink-mute)' }}
          >
            Archive
          </button>
          <button
            type="button"
            onClick={() => addToast({ type: 'success', message: 'Marked as done' })}
            style={{
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '6px 12px',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Mark Done
          </button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <div
          style={{
            background: 'var(--canvas-soft)',
            borderRadius: 12,
            border: '1px solid var(--hairline)',
            padding: 32,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Avatar initials={selected.avatar} size={40} bg={avatarColor(selected.id)} />
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{selected.from}</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--ink-mute)' }}>{selected.handle} · {selected.time}</p>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{selected.body}</p>
        </div>
      </div>

      <ReplyComposer messageId={selected.id} channel={selected.channel} />
    </div>
  );
}
