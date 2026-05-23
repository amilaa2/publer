import { useState, useMemo } from 'react';
import { PostCard } from '../components/posts/PostCard';
import { EmptyState } from '../components/shared/EmptyState';
import { StatusBadge } from '../components/shared/StatusBadge';
import { usePostsStore } from '../stores/usePostsStore';
import { useUIStore } from '../stores/useUIStore';
import { PLATFORM_SHORT, getChannelColor } from '../utils/platformUtils';
import { formatPostDate } from '../utils/dateUtils';

export function PostsPage() {
  const posts = usePostsStore((s) => s.posts);
  const filters = usePostsStore((s) => s.filters);
  const setFilters = usePostsStore((s) => s.setFilters);
  const selectedPostIds = usePostsStore((s) => s.selectedPostIds);
  const toggleSelectPost = usePostsStore((s) => s.toggleSelectPost);
  const clearSelection = usePostsStore((s) => s.clearSelection);
  const deletePost = usePostsStore((s) => s.deletePost);
  const duplicatePost = usePostsStore((s) => s.duplicatePost);
  const addToast = useUIStore((s) => s.addToast);
  const [viewMode, setViewMode] = useState('Grid');

  const filtered = useMemo(
    () =>
      posts.filter((p) => {
        if (filters.status?.length && !filters.status.includes(p.status)) return false;
        if (filters.platforms?.length && !p.platforms.some((pl) => filters.platforms.includes(pl))) return false;
        if (filters.search && !p.caption.toLowerCase().includes(filters.search.toLowerCase())) return false;
        return true;
      }),
    [posts, filters]
  );

  const handleBulkDelete = () => {
    selectedPostIds.forEach((id) => deletePost(id));
    addToast({ type: 'success', message: `${selectedPostIds.length} post(s) deleted` });
    clearSelection();
  };

  const handleBulkDuplicate = () => {
    selectedPostIds.forEach((id) => duplicatePost(id));
    addToast({ type: 'success', message: `${selectedPostIds.length} post(s) duplicated` });
    clearSelection();
  };

  return (
    <div className="page-content" style={{ overflow: 'auto' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'var(--canvas)',
          borderBottom: '1px solid var(--hairline)',
          padding: '16px 24px',
        }}
      >
        <h1 style={{ margin: '0 0 16px', fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>Posts</h1>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            value={filters.status[0] || ''}
            onChange={(e) => setFilters({ status: e.target.value ? [e.target.value] : [] })}
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid var(--hairline)', color: 'var(--ink)', background: 'var(--canvas)' }}
          >
            <option value="">All statuses</option>
            {['published', 'scheduled', 'draft', 'failed'].map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <input
            placeholder="Search caption…"
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid var(--hairline)',
              minWidth: 220,
              color: 'var(--ink)',
            }}
          />
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            {['Grid', 'List'].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setViewMode(v)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 6,
                  border: viewMode === v ? '2px solid var(--teal-brand)' : '1px solid var(--hairline)',
                  background: viewMode === v ? 'var(--teal-light)' : 'var(--canvas)',
                  color: viewMode === v ? 'var(--teal-deep)' : 'var(--ink)',
                  cursor: 'pointer',
                  fontWeight: viewMode === v ? 700 : 500,
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        {selectedPostIds.length > 0 && (
          <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{selectedPostIds.length} selected</span>
            <button type="button" className="btn-ghost" onClick={handleBulkDuplicate}>Duplicate</button>
            <button
              type="button"
              onClick={handleBulkDelete}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid var(--error)',
                background: 'var(--error-bg)',
                color: 'var(--error)',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
            <button type="button" className="btn-ghost" onClick={clearSelection}>Clear</button>
          </div>
        )}
      </div>

      <div style={{ padding: 24 }}>
        {filtered.length === 0 ? (
          <EmptyState variant="posts" />
        ) : viewMode === 'Grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {filtered.map((p) => (
              <PostCard key={p.id} post={p} selected={selectedPostIds.includes(p.id)} onToggleSelect={toggleSelectPost} />
            ))}
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--canvas)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--hairline)' }}>
            <thead>
              <tr style={{ background: 'var(--canvas-soft)', textAlign: 'left', fontSize: 12, color: 'var(--ink-mute)' }}>
                <th style={{ padding: 12, width: 40 }} />
                <th style={{ padding: 12 }}>Caption</th>
                <th style={{ padding: 12 }}>Platforms</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} style={{ borderTop: '1px solid var(--hairline)' }}>
                  <td style={{ padding: 12 }}>
                    <input type="checkbox" checked={selectedPostIds.includes(p.id)} onChange={() => toggleSelectPost(p.id)} />
                  </td>
                  <td style={{ padding: 12, fontSize: 13, color: 'var(--ink)', maxWidth: 360, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.caption}
                  </td>
                  <td style={{ padding: 12 }}>
                    {p.platforms.map((pl) => (
                      <span key={pl} style={{ marginRight: 6, fontWeight: 700, fontSize: 11, color: getChannelColor(pl) }}>{PLATFORM_SHORT[pl]}</span>
                    ))}
                  </td>
                  <td style={{ padding: 12 }}><StatusBadge status={p.status} /></td>
                  <td style={{ padding: 12, fontSize: 12, color: 'var(--ink-mute)' }}>{formatPostDate(p.scheduledAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
