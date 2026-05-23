import { CHANNEL_COLORS } from '../../utils/platformUtils';

export function ChannelDot({ channel, size = 7 }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: CHANNEL_COLORS[channel] || 'var(--teal-brand)',
        display: 'inline-block',
        flexShrink: 0,
      }}
    />
  );
}
