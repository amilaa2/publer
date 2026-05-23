import { Link } from 'react-router-dom';
import { StatusBadge } from '../shared/StatusBadge';
import { PLATFORM_SHORT, getChannelColor } from '../../utils/platformUtils';
import { formatPostDate } from '../../utils/dateUtils';

export function PostCard({ post, selected, onToggleSelect }) {
  return (
    <div
      style={{
        background: 'var(--canvas)',
        borderRadius: 12,
        border: selected ? '2px solid var(--teal-brand)' : '1px solid var(--hairline)',
        boxShadow: 'var(--shadow-1)',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative' }}>
        {post.media?.[0] ? (
          <img src={post.media[0].thumbnailUrl} alt="" style={{ width: '100%', height: 160, objectFit: 'cover' }} />
        ) : (
          <div
            style={{
              height: 120,
              background: 'var(--canvas-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {post.platforms.map((p) => (
              <span
                key={p}
                style={{
                  background: getChannelColor(p),
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 12,
                  padding: '6px 10px',
                  borderRadius: 6,
                }}
              >
                {PLATFORM_SHORT[p]}
              </span>
            ))}
          </div>
        )}
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect?.(post.id)}
          style={{ position: 'absolute', top: 12, left: 12, width: 18, height: 18 }}
        />
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <StatusBadge status={post.status} />
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          {post.platforms.map((p) => (
            <span
              key={p}
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: getChannelColor(p),
                background: `${getChannelColor(p)}18`,
                padding: '2px 6px',
                borderRadius: 4,
              }}
            >
              {PLATFORM_SHORT[p]}
            </span>
          ))}
        </div>
        <p
          style={{
            margin: '0 0 8px',
            fontSize: 13,
            lineHeight: 1.4,
            color: 'var(--ink)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.caption}
        </p>
        <p style={{ margin: 0, fontSize: 11, color: 'var(--ink-mute)' }}>{formatPostDate(post.scheduledAt)}</p>
        {post.stats && (
          <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 11, color: 'var(--ink-mute)', fontWeight: 600 }}>
            <span>{post.stats.views?.toLocaleString()} views</span>
            <span>{post.stats.likes} likes</span>
            <span>{post.stats.comments} comments</span>
          </div>
        )}
        {post.failureReason && (
          <p style={{ fontSize: 11, color: 'var(--error)', marginTop: 8, fontWeight: 600 }}>{post.failureReason}</p>
        )}
        <Link to={`/compose/${post.id}`} style={{ display: 'inline-block', marginTop: 12, fontSize: 13, color: 'var(--teal-deep)', fontWeight: 700 }}>
          Edit post
        </Link>
      </div>
    </div>
  );
}
