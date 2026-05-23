import { PLATFORM_SHORT, getChannelColor, PLATFORM_LABELS } from '../../utils/platformUtils';

export function ChannelChip({ platform, handle, selected, onClick }) {
  const color = getChannelColor(platform);
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 14px',
        borderRadius: 8,
        border: selected ? `2px solid ${color}` : '1px solid var(--hairline)',
        background: selected ? `${color}18` : 'var(--canvas)',
        cursor: 'pointer',
        fontSize: 13,
        color: 'var(--ink)',
        fontWeight: selected ? 600 : 400,
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: 5,
          background: color,
          color: '#fff',
          fontSize: 10,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {PLATFORM_SHORT[platform]}
      </span>
      <span>{handle}</span>
      <span style={{ fontSize: 10, color: 'var(--ink-faint)' }}>{PLATFORM_LABELS[platform]}</span>
    </button>
  );
}
