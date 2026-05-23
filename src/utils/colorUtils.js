export function hexToRgba(hex, alpha = 0.2) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function heatmapColor(score) {
  if (score >= 75) return '#0e3030';
  if (score >= 50) return '#14a89e';
  if (score >= 25) return '#7dd3ca';
  if (score > 0) return '#d4f0ee';
  return '#eceae6';
}
