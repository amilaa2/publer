import { Link } from 'react-router-dom';

const VARIANTS = {
  inbox: { icon: '📬', title: 'All caught up!', body: 'No messages in this channel.' },
  schedule: { icon: '📅', title: 'Nothing scheduled', body: 'Create your first post to get started.', cta: 'Create Post', to: '/compose' },
  posts: { icon: '📋', title: 'No posts yet', body: 'Posts you create will appear here.', cta: 'Create Post', to: '/compose' },
};

export function EmptyState({ variant = 'inbox' }) {
  const v = VARIANTS[variant] || VARIANTS.inbox;
  return (
    <div style={{ padding: 48, textAlign: 'center', color: 'var(--ink-faint)' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>{v.icon}</div>
      <h3 style={{ margin: '0 0 8px', color: 'var(--ink)', fontSize: 18, fontWeight: 600 }}>{v.title}</h3>
      <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--ink-mute)' }}>{v.body}</p>
      {v.cta && (
        <Link to={v.to} className="btn-teal" style={{ textDecoration: 'none', display: 'inline-block' }}>
          {v.cta}
        </Link>
      )}
    </div>
  );
}
