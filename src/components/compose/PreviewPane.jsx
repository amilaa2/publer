import { PLATFORM_LABELS, PLATFORM_SHORT, getChannelColor } from '../../utils/platformUtils';

export function PreviewPane({ caption, media, selectedPlatforms, previewPlatform, setPreviewPlatform, accounts }) {
  const platform = previewPlatform || selectedPlatforms[0] || 'instagram';
  const account = accounts.find((a) => a.platform === platform);
  const color = getChannelColor(platform);

  return (
    <div
      style={{
        flex: '1 1 45%',
        minWidth: 320,
        background: 'var(--canvas-soft)',
        borderLeft: '1px solid var(--hairline)',
        padding: 24,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>Preview</h2>
      <p style={{ margin: '0 0 20px', fontSize: 12, color: 'var(--ink-mute)' }}>
        How your post will look on each platform
      </p>

      {selectedPlatforms.length === 0 ? (
        <p style={{ color: 'var(--ink-mute)', fontSize: 14 }}>Select at least one account to preview.</p>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {selectedPlatforms.map((p) => {
              const active = previewPlatform === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPreviewPlatform(p)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    border: active ? `2px solid ${getChannelColor(p)}` : '1px solid var(--hairline)',
                    background: active ? getChannelColor(p) + '18' : 'var(--canvas)',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    color: 'var(--ink)',
                  }}
                >
                  <span style={{ color: getChannelColor(p), fontWeight: 800, marginRight: 6 }}>{PLATFORM_SHORT[p]}</span>
                  {PLATFORM_LABELS[p]}
                </button>
              );
            })}
          </div>

          <div
            style={{
              maxWidth: 340,
              width: '100%',
              margin: '0 auto',
              background: 'var(--canvas)',
              borderRadius: 12,
              boxShadow: 'var(--shadow-2)',
              overflow: 'hidden',
              border: '1px solid var(--hairline)',
            }}
          >
            <div
              style={{
                padding: '4px 12px',
                background: color,
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              {PLATFORM_LABELS[platform]} preview
            </div>
            <div
              style={{
                padding: '12px 14px',
                borderBottom: '1px solid var(--hairline)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                YB
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>{account?.handle || '@yourbrand'}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-mute)' }}>Just now</div>
              </div>
            </div>
            {media?.[0] && (
              <img src={media[0].url || media[0].thumbnailUrl} alt="" style={{ width: '100%', display: 'block' }} />
            )}
            <div style={{ padding: 14 }}>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, whiteSpace: 'pre-line', color: 'var(--ink)' }}>
                {caption || 'Your caption will appear here as you type…'}
              </p>
              <div style={{ display: 'flex', gap: 20, marginTop: 14, fontSize: 12, color: 'var(--ink-mute)', fontWeight: 600 }}>
                <span>Like</span>
                <span>Comment</span>
                <span>Share</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
