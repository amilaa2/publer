import { format, parseISO, isSameDay, isToday, startOfMonth, endOfMonth, eachDayOfInterval } from '../../utils/dateUtils';
import { PLATFORM_SHORT, truncate, getChannelColor, getChannelBg } from '../../utils/platformUtils';

export function MonthView({ currentDate, posts, onDayClick, onPostClick }) {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });
  const startPad = start.getDay() === 0 ? 6 : start.getDay() - 1;

  const postsForDay = (day) =>
    posts.filter((p) => p.scheduledAt && isSameDay(parseISO(p.scheduledAt), day));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: 'var(--hairline)', flex: 1 }}>
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
        <div
          key={d}
          style={{
            padding: 8,
            fontSize: 11,
            fontWeight: 700,
            background: 'var(--canvas-soft)',
            textAlign: 'center',
            color: 'var(--ink-mute)',
          }}
        >
          {d}
        </div>
      ))}
      {Array.from({ length: startPad }).map((_, i) => (
        <div key={`pad-${i}`} style={{ minHeight: 100, background: 'var(--canvas-soft)' }} />
      ))}
      {days.map((day) => {
        const dayPosts = postsForDay(day);
        const today = isToday(day);
        return (
          <div
            key={day.toISOString()}
            role="button"
            tabIndex={0}
            onClick={() => onDayClick?.(day)}
            onKeyDown={(e) => e.key === 'Enter' && onDayClick?.(day)}
            style={{
              minHeight: 100,
              background: today ? 'var(--teal-light)' : 'var(--canvas)',
              padding: 8,
              cursor: 'pointer',
              border: today ? '2px solid var(--teal-brand)' : 'none',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: today ? 700 : 500,
                color: today ? 'var(--teal-deep)' : 'var(--ink)',
              }}
            >
              {format(day, 'd')}
              {dayPosts.length > 0 && (
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 10,
                    background: 'var(--teal-brand)',
                    color: '#fff',
                    borderRadius: 9999,
                    padding: '1px 7px',
                    fontWeight: 700,
                  }}
                >
                  {dayPosts.length}
                </span>
              )}
            </div>
            {dayPosts.slice(0, 3).map((p) => {
              const plat = p.platforms[0];
              const color = getChannelColor(plat);
              return (
                <div
                  key={p.id}
                  onClick={(e) => { e.stopPropagation(); onPostClick?.(p); }}
                  style={{
                    marginTop: 4,
                    height: 22,
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '2px 6px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    background: getChannelBg(plat, 0.2),
                    border: `1.5px solid ${color}`,
                    color: 'var(--ink)',
                  }}
                >
                  {p.scheduledAt && format(parseISO(p.scheduledAt), 'HH:mm')}{' '}
                  <span style={{ color, fontWeight: 700 }}>{PLATFORM_SHORT[plat]}</span>{' '}
                  {truncate(p.caption, 16)}
                </div>
              );
            })}
            {dayPosts.length > 3 && (
              <div style={{ fontSize: 10, color: 'var(--ink-mute)', marginTop: 2, fontWeight: 600 }}>
                +{dayPosts.length - 3} more
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
