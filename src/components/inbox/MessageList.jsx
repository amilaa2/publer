import { Avatar } from '../shared/Avatar';
import { ChannelDot } from '../shared/ChannelDot';
import { LabelPill } from '../shared/LabelPill';
import { EmptyState } from '../shared/EmptyState';
import { useInboxStore } from '../../stores/useInboxStore';
import { useUIStore } from '../../stores/useUIStore';
import { PLATFORM_LABELS } from '../../utils/platformUtils';

const AVATAR_COLORS = ['var(--primary)', 'var(--teal-deep)', '#7c4daf', '#c0392b', '#e67e22', '#16a085'];
const avatarColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

const SORT_FNS = {
  Newest: (a, b) => b.id - a.id,
  Oldest: (a, b) => a.id - b.id,
  'Unread First': (a, b) => (b.unread ? 1 : 0) - (a.unread ? 1 : 0) || b.id - a.id,
};

export function MessageList() {
  const messages = useInboxStore((s) => s.messages);
  const activeChannel = useInboxStore((s) => s.activeChannel);
  const selectedMessageId = useInboxStore((s) => s.selectedMessageId);
  const listFilter = useInboxStore((s) => s.listFilter);
  const sortBy = useInboxStore((s) => s.sortBy);
  const setListFilter = useInboxStore((s) => s.setListFilter);
  const setSortBy = useInboxStore((s) => s.setSortBy);
  const selectMessage = useInboxStore((s) => s.selectMessage);
  const setInboxMobileView = useUIStore((s) => s.setInboxMobileView);

  const handleSelect = (id) => {
    selectMessage(id);
    if (window.matchMedia('(max-width: 768px)').matches) {
      setInboxMobileView('detail');
    }
  };

  let filtered = messages.filter((m) => {
    if (m.archived && listFilter !== 'Archived') return false;
    if (activeChannel !== 'all' && m.channel !== activeChannel) return false;
    if (listFilter === 'Unread' && !m.unread) return false;
    if (listFilter === 'Starred' && !m.starred) return false;
    if (listFilter === 'Archived' && !m.archived) return false;
    return true;
  });

  const sortFn = SORT_FNS[sortBy];
  if (sortFn) filtered = [...filtered].sort(sortFn);

  const channelLabel = activeChannel === 'all' ? 'All Channels' : PLATFORM_LABELS[activeChannel] || activeChannel;

  return (
    <div className="inbox-list">
      <div className="inbox-list-header">
        <div className="inbox-list-header-row">
          <button
            type="button"
            className="inbox-mobile-filter-btn"
            onClick={() => setInboxMobileView('filters')}
            aria-label="Filter channels"
          >
            ☰
          </button>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, letterSpacing: '-0.4px', color: 'var(--ink)', flex: 1 }}>
            {channelLabel}
          </h2>
        </div>
        <p style={{ margin: '0 0 10px', fontSize: 12, color: 'var(--ink-mute)' }}>{filtered.length} conversations</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <select
            value={listFilter}
            onChange={(e) => setListFilter(e.target.value)}
            style={{ fontSize: 11, padding: '5px 8px', borderRadius: 6, border: '1px solid var(--hairline)' }}
          >
            {['All', 'Unread', 'Starred', 'Archived'].map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ fontSize: 11, padding: '5px 8px', borderRadius: 6, border: '1px solid var(--hairline)' }}
          >
            {['Newest', 'Oldest', 'Unread First'].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <EmptyState variant="inbox" />
        ) : (
          filtered.map((msg) => {
            const isSelected = msg.id === selectedMessageId;
            return (
              <div
                key={msg.id}
                role="button"
                tabIndex={0}
                onClick={() => handleSelect(msg.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleSelect(msg.id)}
                style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--hairline)',
                  cursor: 'pointer',
                  background: isSelected ? 'var(--teal-light)' : msg.unread ? '#fff' : 'var(--canvas-soft)',
                  borderLeft: isSelected ? '3px solid var(--teal-brand)' : '3px solid transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <Avatar initials={msg.avatar} size={36} bg={avatarColor(msg.id)} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <ChannelDot channel={msg.channel} />
                      <span style={{ fontWeight: msg.unread ? 700 : 500, fontSize: 13, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {msg.from}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--ink-faint)', whiteSpace: 'nowrap' }}>{msg.time}</span>
                      {msg.unread && (
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--teal-brand)', flexShrink: 0 }} />
                      )}
                    </div>
                    <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: msg.unread ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {msg.subject}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 11,
                        color: 'var(--ink-mute)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {msg.preview}
                    </p>
                    {msg.labels?.length > 0 && (
                      <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                        {msg.labels.map((l) => (
                          <LabelPill key={l} labelId={l} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
