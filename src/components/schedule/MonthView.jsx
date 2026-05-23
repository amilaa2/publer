import {
  format,
  parseISO,
  isSameDay,
  isToday,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from '../../utils/dateUtils';
import { PLATFORM_SHORT, truncate, getChannelColor, getChannelBg } from '../../utils/platformUtils';

export function MonthView({ currentDate, posts, onDayClick, onPostClick }) {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });
  const startPad = start.getDay() === 0 ? 6 : start.getDay() - 1;
  const totalCells = startPad + days.length;
  const endPad = (7 - (totalCells % 7)) % 7;

  const postsForDay = (day) =>
    posts.filter((p) => p.scheduledAt && isSameDay(parseISO(p.scheduledAt), day));

  return (
    <div className="month-view">
      <div className="month-view-header">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <div key={d} className="month-weekday">
            {d}
          </div>
        ))}
      </div>
      <div className="month-view-grid">
        {Array.from({ length: startPad }).map((_, i) => (
          <div key={`pad-start-${i}`} className="month-cell pad" aria-hidden />
        ))}
        {days.map((day) => {
          const dayPosts = postsForDay(day);
          const today = isToday(day);
          return (
            <div
              key={day.toISOString()}
              role="button"
              tabIndex={0}
              className={`month-cell${today ? ' today' : ''}`}
              onClick={() => onDayClick?.(day)}
              onKeyDown={(e) => e.key === 'Enter' && onDayClick?.(day)}
            >
              <div className="month-cell-daynum">
                {format(day, 'd')}
                {dayPosts.length > 0 && (
                  <span className="month-cell-count">{dayPosts.length}</span>
                )}
              </div>
              {dayPosts.slice(0, 3).map((p, i) => {
                const plat = p.platforms[0];
                const color = getChannelColor(plat);
                return (
                  <div
                    key={p.id}
                    className="month-post-chip"
                    style={{
                      animationDelay: `${i * 40}ms`,
                      background: getChannelBg(plat, 0.2),
                      border: `1.5px solid ${color}`,
                      color: 'var(--ink)',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPostClick?.(p);
                    }}
                  >
                    {p.scheduledAt && format(parseISO(p.scheduledAt), 'HH:mm')}{' '}
                    <span style={{ color, fontWeight: 700 }}>{PLATFORM_SHORT[plat]}</span>{' '}
                    {truncate(p.caption, 16)}
                  </div>
                );
              })}
              {dayPosts.length > 3 && (
                <div className="month-more">+{dayPosts.length - 3} more</div>
              )}
            </div>
          );
        })}
        {Array.from({ length: endPad }).map((_, i) => (
          <div key={`pad-end-${i}`} className="month-cell pad" aria-hidden />
        ))}
      </div>
    </div>
  );
}
