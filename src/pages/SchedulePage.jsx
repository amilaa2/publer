import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addMonths, subMonths, addDays, subDays } from '../utils/dateUtils';
import { MonthView } from '../components/schedule/MonthView';
import { WeekView } from '../components/schedule/WeekView';
import { DayView } from '../components/schedule/DayView';
import { PostDetailModal } from '../components/schedule/PostDetailModal';
import { QueueSettingsModal } from '../components/schedule/QueueSettingsModal';
import { usePostsStore } from '../stores/usePostsStore';
import { useUIStore } from '../stores/useUIStore';

export function SchedulePage() {
  const navigate = useNavigate();
  const posts = usePostsStore((s) => s.posts);
  const deletePost = usePostsStore((s) => s.deletePost);
  const addToast = useUIStore((s) => s.addToast);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 23));
  const [view, setView] = useState('Month');
  const [selectedPost, setSelectedPost] = useState(null);
  const [queueOpen, setQueueOpen] = useState(false);

  const scheduled = posts.filter(
    (p) => p.scheduledAt && (p.status === 'scheduled' || p.status === 'published')
  );

  const goPrev = () => {
    if (view === 'Month') setCurrentDate(subMonths(currentDate, 1));
    else if (view === 'Week') setCurrentDate(subDays(currentDate, 7));
    else setCurrentDate(subDays(currentDate, 1));
  };

  const goNext = () => {
    if (view === 'Month') setCurrentDate(addMonths(currentDate, 1));
    else if (view === 'Week') setCurrentDate(addDays(currentDate, 7));
    else setCurrentDate(addDays(currentDate, 1));
  };

  const periodLabel =
    view === 'Month'
      ? format(currentDate, 'MMMM yyyy')
      : view === 'Week'
        ? `Week of ${format(currentDate, 'MMM d, yyyy')}`
        : format(currentDate, 'EEEE, MMM d, yyyy');

  return (
    <div className="page-content" style={{ background: 'var(--canvas)' }}>
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--hairline)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          flexWrap: 'wrap',
          gap: 12,
          background: 'var(--canvas)',
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button type="button" className="btn-ghost" onClick={goPrev} style={{ padding: '6px 12px' }}>
            ← Prev
          </button>
          <button type="button" className="btn-ghost" onClick={() => setCurrentDate(new Date(2026, 4, 23))} style={{ padding: '6px 12px' }}>
            Today
          </button>
          <button type="button" className="btn-ghost" onClick={goNext} style={{ padding: '6px 12px' }}>
            Next →
          </button>
        </div>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>{periodLabel}</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Month', 'Week', 'Day'].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              style={{
                padding: '6px 14px',
                borderRadius: 6,
                border: view === v ? '2px solid var(--teal-brand)' : '1px solid var(--hairline)',
                background: view === v ? 'var(--teal-light)' : 'var(--canvas)',
                color: view === v ? 'var(--teal-deep)' : 'var(--ink)',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: view === v ? 700 : 500,
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: view === 'Month' ? 0 : 24 }}>
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

      <button
        type="button"
        onClick={() => setQueueOpen(true)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'var(--primary)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 20px',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: 'var(--shadow-2)',
          zIndex: 50,
        }}
      >
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
