import { Link } from 'react-router-dom';
import { formatPostDate } from '../../utils/dateUtils';
import { StatusBadge } from '../shared/StatusBadge';
import { PLATFORM_SHORT, PLATFORM_LABELS, getChannelColor } from '../../utils/platformUtils';

export function PostDetailModal({ post, onClose, onDelete }) {
  if (!post) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 8000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--canvas)',
          borderRadius: 12,
          padding: 24,
          maxWidth: 480,
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
          color: 'var(--ink)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <StatusBadge status={post.status} />
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--ink-mute)' }} aria-label="Close">
            ×
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          {post.platforms.map((p) => (
            <span
              key={p}
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: getChannelColor(p),
                background: `${getChannelColor(p)}18`,
                padding: '4px 10px',
                borderRadius: 6,
              }}
            >
              {PLATFORM_SHORT[p]} {PLATFORM_LABELS[p]}
            </span>
          ))}
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-line', color: 'var(--ink)' }}>{post.caption}</p>
        <p style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 12 }}>{formatPostDate(post.scheduledAt)}</p>
        {post.media?.[0] && <img src={post.media[0].thumbnailUrl} alt="" style={{ width: '100%', borderRadius: 8, marginTop: 16 }} />}
        <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
          <Link to={`/compose/${post.id}`} className="btn-primary" style={{ textDecoration: 'none', padding: '8px 16px', fontSize: 13 }}>
            Edit Post
          </Link>
          <button
            type="button"
            onClick={() => onDelete?.(post.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid var(--error)',
              color: 'var(--error)',
              background: 'var(--error-bg)',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
