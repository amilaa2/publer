import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChannelChip } from '../shared/ChannelChip';
import { AICaptionModal } from './AICaptionModal';
import { usePostsStore } from '../../stores/usePostsStore';
import { useUIStore } from '../../stores/useUIStore';
import { PLATFORM_LIMITS } from '../../utils/platformUtils';
import { BEST_TIME_SUGGESTIONS } from '../../demo/postsDemoData';

export function ComposerForm({
  initialPost,
  accounts,
  selectedAccountIds,
  onSelectedAccountIdsChange,
  caption,
  onCaptionChange,
  media,
  onMediaChange,
  selectedPlatforms,
}) {
  const navigate = useNavigate();
  const createPost = usePostsStore((s) => s.createPost);
  const updatePost = usePostsStore((s) => s.updatePost);
  const addToast = useUIStore((s) => s.addToast);

  const [scheduleMode, setScheduleMode] = useState(initialPost?.scheduledAt ? 'schedule' : 'now');
  const [scheduledAt, setScheduledAt] = useState(
    initialPost?.scheduledAt ? initialPost.scheduledAt.slice(0, 16) : ''
  );
  const [aiOpen, setAiOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkPreview, setShowLinkPreview] = useState(false);

  const toggleAccount = (id) => {
    const next = selectedAccountIds.includes(id)
      ? selectedAccountIds.length > 1
        ? selectedAccountIds.filter((x) => x !== id)
        : selectedAccountIds
      : [...selectedAccountIds, id];
    onSelectedAccountIdsChange(next);
  };

  const addDemoMedia = () => {
    const item = {
      id: `m${Date.now()}`,
      url: `https://picsum.photos/seed/${Date.now()}/800/800`,
      thumbnailUrl: `https://picsum.photos/seed/${Date.now()}/200/200`,
      type: 'image',
    };
    onMediaChange([...media, item].slice(0, 10));
    addToast({ type: 'info', message: 'Sample image added (demo upload)' });
  };

  const removeMedia = (id) => {
    const next = media.filter((m) => m.id !== id);
    onMediaChange(next.length ? next : []);
  };

  const savePost = (asDraft = false) => {
    if (!selectedAccountIds.length) {
      addToast({ type: 'error', message: 'Select at least one account' });
      return;
    }
    const payload = {
      caption,
      accounts: selectedAccountIds,
      platforms: selectedPlatforms,
      scheduledAt:
        scheduleMode === 'schedule' && scheduledAt
          ? new Date(scheduledAt).toISOString()
          : scheduleMode === 'now'
            ? new Date().toISOString()
            : null,
      media,
      status: asDraft ? 'draft' : scheduleMode === 'now' ? 'published' : 'scheduled',
    };

    if (initialPost) {
      updatePost(initialPost.id, payload);
      addToast({ type: 'success', message: 'Post updated' });
    } else {
      createPost(payload);
      addToast({ type: 'success', message: asDraft ? 'Draft saved' : 'Post scheduled successfully' });
    }
    if (!asDraft) navigate('/schedule');
  };

  return (
    <div
      style={{
        flex: '1 1 55%',
        minWidth: 360,
        overflowY: 'auto',
        padding: 32,
        background: 'var(--canvas)',
        borderRight: '1px solid var(--hairline)',
      }}
    >
      <h1 style={{ margin: '0 0 24px', fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>
        {initialPost ? 'Edit Post' : 'New Post'}
      </h1>

      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--ink)' }}>Post to</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {accounts.map((acc) => (
            <ChannelChip
              key={acc.id}
              platform={acc.platform}
              handle={acc.handle}
              selected={selectedAccountIds.includes(acc.id)}
              onClick={() => toggleAccount(acc.id)}
            />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--ink)' }}>Caption</h3>
        <textarea
          value={caption}
          onChange={(e) => onCaptionChange(e.target.value)}
          rows={6}
          placeholder="Write your caption…"
          style={{
            width: '100%',
            padding: 14,
            borderRadius: 8,
            border: '1px solid var(--hairline)',
            fontSize: 14,
            fontFamily: 'inherit',
            color: 'var(--ink)',
            background: 'var(--canvas)',
          }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {selectedPlatforms.map((p) => {
            const over = caption.length > (PLATFORM_LIMITS[p] || 9999);
            return (
              <span key={p} className={`chip-counter ${over ? 'over' : 'ok'}`}>
                {p}: {caption.length}/{PLATFORM_LIMITS[p]}
              </span>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setAiOpen(true)}
          style={{
            marginTop: 12,
            background: 'var(--teal-light)',
            border: '2px solid var(--teal-brand)',
            color: 'var(--teal-deep)',
            padding: '8px 16px',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          Generate with AI
        </button>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--ink)' }}>Media</h3>
        <button
          type="button"
          onClick={addDemoMedia}
          style={{
            width: '100%',
            border: '2px dashed var(--hairline)',
            borderRadius: 12,
            padding: 24,
            textAlign: 'center',
            color: 'var(--ink-mute)',
            background: 'var(--canvas-soft)',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          + Add image (demo) — click to add up to 10
        </button>
        {media.length > 0 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {media.map((m) => (
              <div key={m.id} style={{ position: 'relative' }}>
                <img src={m.thumbnailUrl || m.url} alt="" style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--hairline)' }} />
                <button
                  type="button"
                  onClick={() => removeMedia(m.id)}
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: 'none',
                    background: 'var(--error)',
                    color: '#fff',
                    fontSize: 12,
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--ink)' }}>Link</h3>
        <input
          type="url"
          value={linkUrl}
          onChange={(e) => {
            setLinkUrl(e.target.value);
            setShowLinkPreview(!!e.target.value);
          }}
          placeholder="https://example.com/article"
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 8,
            border: '1px solid var(--hairline)',
            color: 'var(--ink)',
          }}
        />
        {showLinkPreview && linkUrl && (
          <div style={{ marginTop: 12, border: '1px solid var(--hairline)', borderRadius: 8, overflow: 'hidden', display: 'flex', background: 'var(--canvas-soft)' }}>
            <img src="https://picsum.photos/seed/link/120/80" alt="" style={{ width: 120, height: 80, objectFit: 'cover' }} />
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>10 Social Media Trends for 2025</div>
              <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>Our deep dive into what is working on each platform.</div>
            </div>
          </div>
        )}
      </section>

      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--ink)' }}>When to post</h3>
        {[
          { id: 'now', label: 'Post Now' },
          { id: 'schedule', label: 'Schedule for later' },
          { id: 'queue', label: 'Add to Queue' },
        ].map((opt) => (
          <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, color: 'var(--ink)', cursor: 'pointer' }}>
            <input type="radio" name="schedule" checked={scheduleMode === opt.id} onChange={() => setScheduleMode(opt.id)} />
            {opt.label}
          </label>
        ))}
        {scheduleMode === 'schedule' && (
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            style={{ marginTop: 4, padding: 10, borderRadius: 8, border: '1px solid var(--hairline)', color: 'var(--ink)' }}
          />
        )}
        <div style={{ marginTop: 16 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-mute)' }}>Best time suggestions</span>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {BEST_TIME_SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                type="button"
                title={s.tooltip}
                onClick={() => {
                  setScheduleMode('schedule');
                  setScheduledAt('2026-05-27T18:00');
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: '1px solid var(--teal-brand)',
                  background: 'var(--teal-light)',
                  color: 'var(--teal-deep)',
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button type="button" className="btn-primary" onClick={() => savePost(false)}>
          {scheduleMode === 'now' ? 'Publish Now' : 'Schedule Post'}
        </button>
        <button type="button" className="btn-ghost" onClick={() => savePost(true)}>
          Save as Draft
        </button>
      </div>

      <AICaptionModal
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        onSelect={onCaptionChange}
        platforms={selectedPlatforms}
      />
    </div>
  );
}
