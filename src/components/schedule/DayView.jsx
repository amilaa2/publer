import { format, parseISO, isSameDay } from '../../utils/dateUtils';
import { PLATFORM_SHORT, getChannelColor, getChannelBg } from '../../utils/platformUtils';

export function DayView({ currentDate, posts, onPostClick }) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const postsForHour = (hour) =>
    posts
      .filter((p) => {
        if (!p.scheduledAt) return false;
        const d = parseISO(p.scheduledAt);
        return isSameDay(d, currentDate) && d.getHours() === hour;
      })
      .sort((a, b) => parseISO(a.scheduledAt) - parseISO(b.scheduledAt));

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>
        {format(currentDate, 'EEEE, MMMM d, yyyy')}
      </h3>
      {hours.map((hour) => {
        const hourPosts = postsForHour(hour);
        return (
          <div
            key={hour}
            style={{
              display: 'flex',
              gap: 16,
              padding: '12px 0',
              borderBottom: '1px solid var(--hairline)',
              minHeight: 56,
            }}
          >
            <div style={{ width: 56, fontSize: 12, fontWeight: 700, color: 'var(--ink-mute)', flexShrink: 0 }}>
              {String(hour).padStart(2, '0')}:00
            </div>
            <div style={{ flex: 1 }}>
              {hourPosts.length === 0 ? (
                <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>—</span>
              ) : (
                hourPosts.map((p) => {
                  const plat = p.platforms[0];
                  const color = getChannelColor(plat);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onPostClick?.(p)}
                      style={{
                        display: 'flex',
                        gap: 12,
                        width: '100%',
                        textAlign: 'left',
                        padding: 12,
                        marginBottom: 8,
                        borderRadius: 8,
                        border: `1px solid ${color}`,
                        borderLeft: `4px solid ${color}`,
                        background: getChannelBg(plat, 0.15),
                        cursor: 'pointer',
                      }}
                    >
                      {p.media?.[0] && (
                        <img
                          src={p.media[0].thumbnailUrl}
                          alt=""
                          style={{ width: 48, height: 48, borderRadius: 6, objectFit: 'cover' }}
                        />
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color }}>
                          {PLATFORM_SHORT[plat]} · {format(parseISO(p.scheduledAt), 'h:mm a')}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--ink)', marginTop: 4, lineHeight: 1.4 }}>
                          {p.caption.split('\n')[0]}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
