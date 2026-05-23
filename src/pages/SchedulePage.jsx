import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  format,
  addMonths,
  subMonths,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  startOfDay,
  endOfDay,
} from '../utils/dateUtils';
import { MonthView } from '../components/schedule/MonthView';
import { WeekView } from '../components/schedule/WeekView';
import { DayView } from '../components/schedule/DayView';
import { PostDetailModal } from '../components/schedule/PostDetailModal';
import { QueueSettingsModal } from '../components/schedule/QueueSettingsModal';
import { usePostsStore } from '../stores/usePostsStore';
import { useUIStore } from '../stores/useUIStore';

const VIEW_INDEX = { Month: 0, Week: 1, Day: 2 };

export function SchedulePage() {
  const navigate = useNavigate();
  const posts = usePostsStore((s) => s.posts);
  const deletePost = usePostsStore((s) => s.deletePost);
  const addToast = useUIStore((s) => s.addToast);
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 4, 23));
  const [view, setView] = useState('Month');
  const [selectedPost, setSelectedPost] = useState(null);
  const [queueOpen, setQueueOpen] = useState(false);
  const [enterDirection, setEnterDirection] = useState('none');

  const scheduled = useMemo(
    () => posts.filter((p) => p.scheduledAt && (p.status === 'scheduled' || p.status === 'published')),
    [posts]
  );

  const periodRange = useMemo(() => {
    if (view === 'Month') {
      return { start: startOfMonth(currentDate), end: endOfMonth(currentDate) };
    }
    if (view === 'Week') {
      return {
        start: startOfWeek(currentDate, { weekStartsOn: 1 }),
        end: endOfWeek(currentDate, { weekStartsOn: 1 }),
      };
    }
    return { start: startOfDay(currentDate), end: endOfDay(currentDate) };
  }, [view, currentDate]);

  const periodPostCount = useMemo(
    () =>
      scheduled.filter((p) => {
        const d = new Date(p.scheduledAt);
        return isWithinInterval(d, { start: periodRange.start, end: periodRange.end });
      }).length,
    [scheduled, periodRange]
  );

  const bumpAnimation = useCallback((direction) => {
    setEnterDirection(direction);
  }, []);

  const goPrev = () => {
    bumpAnimation('prev');
    if (view === 'Month') setCurrentDate(subMonths(currentDate, 1));
    else if (view === 'Week') setCurrentDate(subDays(currentDate, 7));
    else setCurrentDate(subDays(currentDate, 1));
  };

  const goNext = () => {
    bumpAnimation('next');
    if (view === 'Month') setCurrentDate(addMonths(currentDate, 1));
    else if (view === 'Week') setCurrentDate(addDays(currentDate, 7));
    else setCurrentDate(addDays(currentDate, 1));
  };

  const goToday = () => {
    bumpAnimation('none');
    setCurrentDate(new Date());
  };

  const changeView = (v) => {
    if (v !== view) {
      bumpAnimation('none');
      setView(v);
    }
  };

  const periodLabel =
    view === 'Month'
      ? format(currentDate, 'MMMM yyyy')
      : view === 'Week'
        ? `Week of ${format(currentDate, 'MMM d, yyyy')}`
        : format(currentDate, 'EEEE, MMM d, yyyy');

  const contentKey = `${view}-${currentDate.getTime()}`;

  return (
    <div className="schedule-page">
      <header className="schedule-toolbar">
        <div className="schedule-toolbar-nav">
          <button type="button" className="btn-ghost" onClick={goPrev} aria-label="Previous period">
            ← Prev
          </button>
          <button type="button" className="btn-ghost" onClick={goToday}>
            Today
          </button>
          <button type="button" className="btn-ghost" onClick={goNext} aria-label="Next period">
            Next →
          </button>
        </div>

        <h2 key={contentKey} className="schedule-period-label">
          {periodLabel}
        </h2>

        <div className="schedule-view-tabs" role="tablist" aria-label="Calendar view">
          <div
            className="schedule-view-indicator"
            style={{ transform: `translateX(${VIEW_INDEX[view] * 100}%)` }}
          />
          {['Month', 'Week', 'Day'].map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              className={`schedule-view-tab${view === v ? ' active' : ''}`}
              onClick={() => changeView(v)}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="schedule-stats">
          <span className="schedule-stat-pill">
            {periodPostCount} post{periodPostCount !== 1 ? 's' : ''} in this period
          </span>
        </div>
      </header>

      <div className="schedule-body">
        <div
          key={contentKey}
          className={`schedule-view-body view-${view.toLowerCase()} enter-${enterDirection}`}
        >
          {view === 'Month' && (
            <MonthView
              currentDate={currentDate}
              posts={scheduled}
              onDayClick={() => navigate('/compose')}
              onPostClick={setSelectedPost}
            />
          )}
          {view === 'Week' && (
            <WeekView currentDate={currentDate} posts={scheduled} onPostClick={setSelectedPost} />
          )}
          {view === 'Day' && (
            <DayView currentDate={currentDate} posts={scheduled} onPostClick={setSelectedPost} />
          )}
        </div>
      </div>

      <button type="button" className="schedule-queue-fab" onClick={() => setQueueOpen(true)}>
        Queue Settings
      </button>

      <PostDetailModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        onDelete={(id) => {
          deletePost(id);
          setSelectedPost(null);
          addToast({ type: 'success', message: 'Post deleted' });
        }}
      />
      <QueueSettingsModal open={queueOpen} onClose={() => setQueueOpen(false)} />
    </div>
  );
}
