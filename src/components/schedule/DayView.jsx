import { useEffect, useRef } from 'react';
import { format, parseISO, isSameDay, isToday } from '../../utils/dateUtils';
import { PLATFORM_SHORT, getChannelColor, getChannelBg } from '../../utils/platformUtils';

export function DayView({ currentDate, posts, onPostClick }) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const now = new Date();
  const currentHour = isToday(currentDate) ? now.getHours() : -1;
  const viewRef = useRef(null);

  useEffect(() => {
    if (currentHour < 0 || !viewRef.current) return;
    const row = viewRef.current.querySelector('.day-hour-row.current-hour');
    row?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [currentDate, currentHour]);

  const postsForHour = (hour) =>
    posts
      .filter((p) => {
        if (!p.scheduledAt) return false;
        const d = parseISO(p.scheduledAt);
        return isSameDay(d, currentDate) && d.getHours() === hour;
      })
      .sort((a, b) => parseISO(a.scheduledAt) - parseISO(b.scheduledAt));

  return (
    <div className="day-view" ref={viewRef}>
      {hours.map((hour, rowIdx) => {
        const hourPosts = postsForHour(hour);
        const isCurrent = hour === currentHour;
        return (
          <div
            key={hour}
            className={`day-hour-row${isCurrent ? ' current-hour' : ''}`}
            style={{ animationDelay: `${rowIdx * 25}ms` }}
          >
            <div className="day-hour-label">{String(hour).padStart(2, '0')}:00</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {hourPosts.length === 0 ? (
                <span className="day-empty-slot">—</span>
              ) : (
                hourPosts.map((p, i) => {
                  const plat = p.platforms[0];
                  const color = getChannelColor(plat);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      className="day-post-card"
                      style={{
                        animationDelay: `${rowIdx * 25 + i * 50}ms`,
                        border: `1px solid ${color}`,
                        borderLeft: `4px solid ${color}`,
                        background: getChannelBg(plat, 0.15),
                      }}
                      onClick={() => onPostClick?.(p)}
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
                        <div
                          style={{
                            fontSize: 13,
                            color: 'var(--ink)',
                            marginTop: 4,
                            lineHeight: 1.4,
                          }}
                        >
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
