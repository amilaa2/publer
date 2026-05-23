import { useEffect, useRef } from 'react';
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isToday,
} from '../../utils/dateUtils';
import { PLATFORM_SHORT, truncate, getChannelColor, getChannelBg } from '../../utils/platformUtils';

export function WeekView({ currentDate, posts, onPostClick }) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const now = new Date();
  const currentHour = now.getHours();
  const weekHasToday = days.some((d) => isToday(d));
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!weekHasToday || !scrollRef.current) return;
    const row = scrollRef.current.querySelector('.week-hour-row.current-hour');
    row?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [currentDate, weekHasToday]);

  const postsForSlot = (day, hour) =>
    posts.filter((p) => {
      if (!p.scheduledAt) return false;
      const d = parseISO(p.scheduledAt);
      return isSameDay(d, day) && d.getHours() === hour;
    });

  return (
    <div className="week-view">
      <div className="week-view-scroll" ref={scrollRef}>
        <div className="week-view-header">
          <div />
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={`week-day-head${isToday(day) ? ' today' : ''}`}
            >
              <div className="week-day-name">{format(day, 'EEE')}</div>
              <div className="week-day-num">{format(day, 'd')}</div>
            </div>
          ))}
        </div>
        {hours.map((hour) => {
          const isCurrentHour = weekHasToday && hour === currentHour;
          return (
            <div
              key={hour}
              className={`week-hour-row${isCurrentHour ? ' current-hour' : ''}`}
            >
              <div className="week-hour-label">{String(hour).padStart(2, '0')}:00</div>
              {days.map((day, dayIdx) => {
                const slotPosts = postsForSlot(day, hour);
                return (
                  <div key={`${day}-${hour}`} className="week-slot">
                    {slotPosts.map((p, i) => {
                      const plat = p.platforms[0];
                      const color = getChannelColor(plat);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          className="week-post-chip"
                          style={{
                            animationDelay: `${dayIdx * 20 + i * 30}ms`,
                            borderLeft: `3px solid ${color}`,
                            background: getChannelBg(plat, 0.25),
                          }}
                          onClick={() => onPostClick?.(p)}
                        >
                          <span style={{ color }}>{PLATFORM_SHORT[plat]}</span>{' '}
                          {truncate(p.caption, 14)}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
