import { hexToRgba } from './colorUtils';

export const PLATFORM_LIMITS = {
  instagram: 2200,
  twitter: 280,
  linkedin: 3000,
  facebook: 63206,
  tiktok: 2200,
};

export const PLATFORM_LABELS = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'X / Twitter',
  linkedin: 'LinkedIn',
  whatsapp: 'WhatsApp',
  tiktok: 'TikTok',
  email: 'Email',
};

/** Short label for compact UI */
export const PLATFORM_SHORT = {
  instagram: 'IG',
  facebook: 'FB',
  twitter: 'X',
  linkedin: 'IN',
  whatsapp: 'WA',
  tiktok: 'TT',
  email: 'EM',
};

export const CHANNEL_HEX = {
  instagram: '#e1306c',
  facebook: '#1877f2',
  twitter: '#1a8cd8',
  linkedin: '#0077b5',
  whatsapp: '#25d366',
  tiktok: '#121212',
  email: '#4a90e2',
};

export const CHANNEL_COLORS = {
  instagram: 'var(--ch-instagram)',
  facebook: 'var(--ch-facebook)',
  twitter: 'var(--ch-twitter)',
  linkedin: 'var(--ch-linkedin)',
  whatsapp: 'var(--ch-whatsapp)',
  tiktok: 'var(--ch-tiktok)',
  email: 'var(--ch-email)',
};

export function getChannelColor(platform) {
  return CHANNEL_HEX[platform] || '#14a89e';
}

export function getChannelBg(platform, alpha = 0.18) {
  return hexToRgba(getChannelColor(platform), alpha);
}

export function truncate(str, len = 20) {
  if (!str) return '';
  const flat = str.replace(/\n/g, ' ');
  return flat.length > len ? flat.slice(0, len) + '…' : flat;
}
