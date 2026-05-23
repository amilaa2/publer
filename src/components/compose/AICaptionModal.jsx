import { useState } from 'react';
import { AI_CAPTION_DEMO } from '../../demo/postsDemoData';
import { withDemoDelay } from '../../hooks/useDemoMode';

const TONES = ['Professional', 'Casual', 'Funny', 'Inspirational', 'Educational', 'Promotional'];
const CTAS = ['None', 'Visit link in bio', 'Comment below', 'Share this', 'Tag a friend', 'DM us', 'Shop now'];

export function AICaptionModal({ open, onClose, onSelect }) {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Casual');
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeEmoji, setIncludeEmoji] = useState(true);
  const [cta, setCta] = useState('None');
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState([]);

  if (!open) return null;

  const generate = async () => {
    setLoading(true);
    setStep(2);
    const res = await withDemoDelay(AI_CAPTION_DEMO, 1500);
    setCaptions(res.captions);
    setLoading(false);
  };

  const labelStyle = { fontSize: 14, fontWeight: 600, color: 'var(--ink)', display: 'block', marginBottom: 6 };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        style={{
          position: 'relative',
          background: 'var(--canvas)',
          borderRadius: 16,
          maxWidth: 640,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: 32,
          color: 'var(--ink)',
          boxShadow: 'var(--shadow-3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'var(--canvas-soft)',
            border: '1px solid var(--hairline)',
            borderRadius: 6,
            width: 32,
            height: 32,
            fontSize: 18,
            cursor: 'pointer',
            color: 'var(--ink)',
          }}
          aria-label="Close"
        >
          ×
        </button>

        {step === 1 && (
          <>
            <h2 style={{ margin: '0 0 20px', color: 'var(--ink)' }}>Describe your post</h2>
            <label style={{ display: 'block', marginBottom: 16 }}>
              <span style={labelStyle}>What is this post about?</span>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={4}
                placeholder="e.g., Announcing our new scheduling feature…"
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid var(--hairline)',
                  color: 'var(--ink)',
                  fontFamily: 'inherit',
                }}
              />
            </label>
            <div style={{ marginBottom: 16 }}>
              <span style={labelStyle}>Tone</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {TONES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 8,
                      border: tone === t ? '2px solid var(--teal-brand)' : '1px solid var(--hairline)',
                      background: tone === t ? 'var(--teal-light)' : 'var(--canvas)',
                      color: tone === t ? 'var(--teal-deep)' : 'var(--ink)',
                      cursor: 'pointer',
                      fontWeight: tone === t ? 700 : 500,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16, display: 'flex', gap: 16, color: 'var(--ink)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input type="checkbox" checked={includeHashtags} onChange={(e) => setIncludeHashtags(e.target.checked)} />
                Include hashtags
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <input type="checkbox" checked={includeEmoji} onChange={(e) => setIncludeEmoji(e.target.checked)} />
                Include emoji
              </label>
            </div>
            <label style={{ display: 'block', marginBottom: 20 }}>
              <span style={labelStyle}>Call to action</span>
              <select
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                style={{
                  display: 'block',
                  width: '100%',
                  marginTop: 4,
                  padding: 10,
                  borderRadius: 8,
                  border: '1px solid var(--hairline)',
                  color: 'var(--ink)',
                }}
              >
                {CTAS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <button type="button" className="btn-teal" onClick={generate} disabled={!topic.trim()}>
              Generate captions
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 style={{ margin: '0 0 20px', color: 'var(--ink)' }}>Choose a caption</h2>
            {loading ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--ink-mute)' }}>
                <p style={{ fontWeight: 600, color: 'var(--teal-deep)' }}>Crafting your captions…</p>
              </div>
            ) : (
              <>
                {captions.map((cap, i) => (
                  <div
                    key={i}
                    style={{
                      border: '1px solid var(--hairline)',
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 12,
                      background: 'var(--canvas-soft)',
                    }}
                  >
                    <p style={{ margin: '0 0 12px', fontSize: 14, whiteSpace: 'pre-line', color: 'var(--ink)' }}>{cap}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: 'var(--ink-mute)', fontWeight: 600 }}>{cap.length} characters</span>
                      <button
                        type="button"
                        className="btn-teal"
                        style={{ padding: '6px 14px', fontSize: 13 }}
                        onClick={() => {
                          onSelect(cap);
                          onClose();
                        }}
                      >
                        Use this
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => { setStep(1); setLoading(false); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--teal-deep)',
                    cursor: 'pointer',
                    marginTop: 8,
                    fontWeight: 700,
                  }}
                >
                  ← Try different settings
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
