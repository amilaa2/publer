import { useState } from 'react';
import { CAMPAIGN_OBJECTIVES } from '../../demo/campaignsDemoData';
import { PLATFORM_LABELS, PLATFORM_SHORT, getChannelColor } from '../../utils/platformUtils';

const CHANNELS = ['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok', 'email'];

export function CreateCampaignModal({ open, onClose, onCreate, onGenerateAi, aiGenerating }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [brief, setBrief] = useState('');
  const [objective, setObjective] = useState('Awareness');
  const [budget, setBudget] = useState('1500');
  const [channels, setChannels] = useState(['instagram', 'linkedin']);
  const [aiPlan, setAiPlan] = useState(null);

  if (!open) return null;

  const toggleChannel = (ch) => {
    setChannels((prev) =>
      prev.includes(ch) ? (prev.length > 1 ? prev.filter((x) => x !== ch) : prev) : [...prev, ch]
    );
  };

  const handleGenerate = async () => {
    const plan = await onGenerateAi(brief, objective, channels);
    setAiPlan(plan);
    setStep(2);
  };

  const handleCreate = (launch = false) => {
    onCreate({
      name: name || 'Untitled campaign',
      brief,
      objective,
      budget: Number(budget) || 0,
      channels,
      aiScore: aiPlan?.aiScore ?? null,
      postsScheduled: aiPlan?.suggestedPosts ?? 0,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
      status: launch ? 'active' : 'draft',
    });
    setStep(1);
    setName('');
    setBrief('');
    setAiPlan(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        style={{ position: 'relative', color: 'var(--ink)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'var(--canvas-soft)', border: '1px solid var(--hairline)', borderRadius: 6, width: 32, height: 32, cursor: 'pointer' }}>×</button>

        <h2 style={{ margin: '0 0 8px' }}>New AI marketing campaign</h2>
        <p style={{ margin: '0 0 20px', fontSize: 13, color: 'var(--ink-mute)' }}>POST /api/campaigns · POST /api/ai/generate-campaign</p>

        {step === 1 && (
          <>
            <label style={{ display: 'block', marginBottom: 14 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Campaign name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Summer launch" style={{ display: 'block', width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid var(--hairline)' }} />
            </label>
            <label style={{ display: 'block', marginBottom: 14 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Objective</span>
              <select value={objective} onChange={(e) => setObjective(e.target.value)} style={{ display: 'block', width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid var(--hairline)' }}>
                {CAMPAIGN_OBJECTIVES.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label style={{ display: 'block', marginBottom: 14 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Campaign brief</span>
              <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={4} placeholder="Describe goals, audience, and key messages…" style={{ display: 'block', width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid var(--hairline)', fontFamily: 'inherit' }} />
            </label>
            <label style={{ display: 'block', marginBottom: 14 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Budget ($)</span>
              <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} style={{ display: 'block', width: '100%', marginTop: 6, padding: 10, borderRadius: 8, border: '1px solid var(--hairline)' }} />
            </label>
            <div style={{ marginBottom: 20 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Channels</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                {CHANNELS.map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => toggleChannel(ch)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 8,
                      border: channels.includes(ch) ? `2px solid ${getChannelColor(ch)}` : '1px solid var(--hairline)',
                      background: channels.includes(ch) ? `${getChannelColor(ch)}18` : 'var(--canvas)',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 12,
                    }}
                  >
                    {PLATFORM_SHORT[ch]} {PLATFORM_LABELS[ch]}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" className="btn-teal" onClick={handleGenerate} disabled={!brief.trim() || aiGenerating} style={{ width: '100%', marginBottom: 10 }}>
              {aiGenerating ? 'Generating AI plan…' : 'Generate AI campaign plan'}
            </button>
            <button type="button" className="btn-ghost" onClick={() => handleCreate(false)} disabled={!name.trim()} style={{ width: '100%' }}>
              Save as draft (skip AI)
            </button>
          </>
        )}

        {step === 2 && aiPlan && (
          <>
            <div style={{ background: 'var(--teal-light)', border: '1px solid var(--teal-brand)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: 'var(--teal-deep)' }}>AI campaign score: {aiPlan.aiScore}/100</div>
              <div style={{ fontSize: 13, color: 'var(--ink-mute)', marginTop: 6 }}>
                Suggested {aiPlan.suggestedPosts} posts · Est. reach {aiPlan.estimatedReach?.toLocaleString()}
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Sample captions</div>
              {aiPlan.captions?.map((cap, i) => (
                <p key={i} style={{ fontSize: 13, background: 'var(--canvas-soft)', padding: 12, borderRadius: 8, margin: '0 0 8px', lineHeight: 1.45 }}>{cap}</p>
              ))}
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Target audiences</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {aiPlan.audiences?.map((a) => (
                  <span key={a} style={{ fontSize: 12, background: 'var(--canvas-soft)', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--hairline)' }}>{a}</span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Ad angles</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--ink-mute)' }}>
                {aiPlan.adAngles?.map((angle) => <li key={angle}>{angle}</li>)}
              </ul>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" className="btn-teal" style={{ flex: 1 }} onClick={() => handleCreate(true)}>Launch campaign</button>
              <button type="button" className="btn-ghost" style={{ flex: 1 }} onClick={() => handleCreate(false)}>Save draft</button>
            </div>
            <button type="button" onClick={() => setStep(1)} style={{ marginTop: 12, background: 'none', border: 'none', color: 'var(--teal-deep)', fontWeight: 700, cursor: 'pointer' }}>← Edit brief</button>
          </>
        )}
      </div>
    </div>
  );
}
