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

  const selected = messages.find((m) => m.id === selectedMessageId);

  if (!selected) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-faint)', background: 'var(--canvas)' }}>
        Select a conversation
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--canvas)', minWidth: 0, overflow: 'hidden' }}>
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--hairline)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
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
        <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 16 }}>
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
