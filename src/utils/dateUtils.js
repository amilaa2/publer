import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  addDays,
  subDays,
  isSameDay,
  isToday,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

export {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  addDays,
  subDays,
  isSameDay,
  isToday,
  startOfWeek,
  endOfWeek,
};

export function formatPostTime(iso) {
  if (!iso) return '—';
  return format(parseISO(iso), 'h:mm a');
}

export function formatPostDate(iso) {
  if (!iso) return 'Draft';
  return format(parseISO(iso), 'MMM d, yyyy · h:mm a');
}
