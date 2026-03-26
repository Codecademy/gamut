/**
 * Date formatting for the calendar using Intl.DateTimeFormat.
 */

import { isValidDate } from './validation';

/**
 * Capitalize the first character of a string using the locale; rest unchanged (e.g. "next month" → "Next month").
 */
export const capitalizeFirst = (str: string, locale?: string) =>
  str.length === 0 ? str : str[0].toLocaleUpperCase(locale) + str.slice(1);

/**
 * Format month and year for the calendar header (e.g. "February 2026").
 */
export const formatMonthYear = (date: Date, locale?: string) => {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(date);
};

/**
 * Get weekday names for column headers or abbr attributes.
 * Order depends on weekStartsOn: 0 = Sunday first, 1 = Monday first.
 * @param format - 'short' for abbreviated (e.g. "Su", "Mo"), 'long' for full (e.g. "Sunday", "Monday")
 */
export const getWeekdayNames = (
  format: 'short' | 'long',
  locale?: string,
  weekStartsOn: 0 | 1 = 0
) => {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: format,
  });
  // Jan 7, 2024 is a Sunday; add 0..6 days to get Sun..Sat
  const sunday = new Date(2024, 0, 7);
  const names = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);
    return formatter.format(date);
  });
  if (weekStartsOn === 1) {
    return [...names.slice(1), names[0]];
  }
  return names;
};

/**
 * Get localized "next month" and "previous month" labels for calendar nav.
 * Uses Intl.RelativeTimeFormat with numeric: "auto" (e.g. "next month", "last month").
 */
export const getRelativeMonthLabels = (locale?: string) => {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  return {
    nextMonth: capitalizeFirst(rtf.format(1, 'month'), locale),
    lastMonth: capitalizeFirst(rtf.format(-1, 'month'), locale),
  };
};

/**
 * Get localized "today" label (e.g. "today").
 */
export const getRelativeTodayLabel = (locale?: string) => {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  return capitalizeFirst(rtf.format(0, 'day'), locale);
};

/**
 * Get the locale's short date format pattern (e.g. "MM/DD/YYYY" for en-US,
 * "DD/MM/YYYY" for en-GB). Uses Intl.DateTimeFormat formatToParts to infer
 * order and separators. Useful for parsing or building locale-aware inputs.
 */
export const getDateFormatPattern = (locale?: string) => {
  const parts = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(2025, 0, 15));

  return parts
    .map((part) => {
      switch (part.type) {
        case 'day':
          return 'DD';
        case 'month':
          return 'MM';
        case 'year':
          return 'YYYY';
        default:
          return part.value;
      }
    })
    .join('');
};

/**
 * Format a date for display in the date picker input (e.g. "2/15/2026").
 */
export const formatDateForInput = (date: Date, locale?: string) => {
  return new Intl.DateTimeFormat(locale, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Parse a string from the date input into a Date, or null if invalid.
 * Only returns a date when the input is a complete valid date (e.g. "2/15/2026").
 * Partial input like "1" or "2/15" returns null even though Date("1") would parse.
 */

// this logic needs some work
export const parseDateFromInput = (value: string, locale?: string) => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = new Date(trimmed);
  if (!isValidDate(parsed)) return null;
  const formatted = formatDateForInput(parsed, locale);
  if (formatted === trimmed) return parsed;
  const parts = trimmed.split(/[/-]/);
  if (parts.length >= 3) return parsed;
  return null;
};

export const formatDateForAriaLabel = (date: Date, locale?: string) => {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};
