import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div style={{ padding: 48, textAlign: 'center' }}>
      <h1 style={{ fontSize: 48, margin: 0 }}>404</h1>
      <p style={{ color: 'var(--ink-mute)' }}>Page not found</p>
      <Link to="/inbox" style={{ color: 'var(--teal-brand)' }}>Back to Inbox</Link>
    </div>
  );
}
