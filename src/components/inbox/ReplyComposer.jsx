import { useState } from 'react';
import { useInboxStore } from '../../stores/useInboxStore';
import { useUIStore } from '../../stores/useUIStore';

export function ReplyComposer({ messageId, channel }) {
  const [replyText, setReplyText] = useState('');
  const sendReply = useInboxStore((s) => s.sendReply);
  const addToast = useUIStore((s) => s.addToast);

  const handleSend = async () => {
    if (!replyText.trim()) return;
    // POST /api/inbox/reply — demo mode
    await sendReply(messageId, replyText);
    addToast({ type: 'success', message: 'Reply sent' });
    setReplyText('');
  };

  return (
    <div style={{ padding: '16px 24px', borderTop: '1px solid var(--hairline)', background: 'var(--canvas)', flexShrink: 0 }}>
      <div style={{ border: '1px solid var(--hairline)', borderRadius: 10, overflow: 'hidden' }}>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Reply…"
          rows={3}
          style={{
            width: '100%',
            border: 'none',
            outline: 'none',
            padding: '12px 14px',
            fontSize: 14,
            resize: 'none',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderTop: '1px solid var(--hairline)',
            background: 'var(--canvas-soft)',
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            {['😊', '📎', '🖼️'].map((e) => (
              <button key={e} type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15 }}>
                {e}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={!replyText.trim()}
            onClick={handleSend}
            style={{
              background: replyText.trim() ? 'var(--teal-brand)' : 'var(--hairline)',
              color: replyText.trim() ? '#fff' : 'var(--ink-faint)',
              border: 'none',
              borderRadius: 7,
              padding: '8px 18px',
              fontWeight: 700,
              fontSize: 13,
              cursor: replyText.trim() ? 'pointer' : 'default',
            }}
          >
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}
