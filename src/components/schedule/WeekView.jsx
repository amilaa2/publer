import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from '../../utils/dateUtils';
import { PLATFORM_SHORT, truncate, getChannelColor, getChannelBg } from '../../utils/platformUtils';

export function WeekView({ currentDate, posts, onPostClick }) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const postsForSlot = (day, hour) =>
    posts.filter((p) => {
      if (!p.scheduledAt) return false;
      const d = parseISO(p.scheduledAt);
      return isSameDay(d, day) && d.getHours() === hour;
    });

  return (
    <div className="week-view" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 600 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '50px repeat(7, 1fr)', borderBottom: '1px solid var(--hairline)', background: 'var(--canvas)' }}>
        <div />
        {days.map((day) => (
          <div key={day.toISOString()} style={{ padding: 10, textAlign: 'center', borderLeft: '1px solid var(--hairline)' }}>
            <div style={{ fontSize: 11, color: 'var(--ink-mute)', fontWeight: 600 }}>{format(day, 'EEE')}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{format(day, 'd')}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {hours.map((hour) => (
          <div
            key={hour}
            style={{
              display: 'grid',
              gridTemplateColumns: '50px repeat(7, 1fr)',
              minHeight: 48,
              borderBottom: '1px solid var(--hairline)',
            }}
          >
            <div style={{ fontSize: 10, color: 'var(--ink-mute)', padding: '4px 6px', textAlign: 'right', fontWeight: 600 }}>
              {String(hour).padStart(2, '0')}:00
            </div>
            {days.map((day) => {
              const slotPosts = postsForSlot(day, hour);
              return (
                <div
                  key={`${day}-${hour}`}
                  style={{
                    borderLeft: '1px solid var(--hairline)',
                    padding: 2,
                    background: hour % 2 === 0 ? 'var(--canvas)' : 'var(--canvas-soft)',
                    position: 'relative',
                  }}
                >
                  {slotPosts.map((p) => {
                    const plat = p.platforms[0];
                    const color = getChannelColor(plat);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => onPostClick?.(p)}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          marginBottom: 2,
                          padding: '4px 6px',
                          borderRadius: 4,
                          border: 'none',
                          borderLeft: `3px solid ${color}`,
                          background: getChannelBg(plat, 0.25),
                          cursor: 'pointer',
                          fontSize: 10,
                          fontWeight: 600,
                          color: 'var(--ink)',
                        }}
                      >
                        <span style={{ color }}>{PLATFORM_SHORT[plat]}</span> {truncate(p.caption, 14)}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
