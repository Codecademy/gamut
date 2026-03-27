import type { IsoWeekday } from '../../utils/locale';
import { stringifyLocale } from '../../utils/locale';
import { isValidDate } from './validation';

/**
 * Capitalize the first character of a string using the locale; rest unchanged (e.g. "next month" → "Next month").
 */
export const capitalizeFirst = (str: string, locale: Intl.Locale) =>
  str.length === 0
    ? str
    : str[0].toLocaleUpperCase(stringifyLocale(locale)) + str.slice(1);

/**
 * Format month and year for the calendar header (e.g. "February 2026").
 */
export const formatMonthYear = (date: Date, locale: Intl.Locale) => {
  return new Intl.DateTimeFormat(stringifyLocale(locale), {
    month: 'long',
    year: 'numeric',
  }).format(date);
};

/**
 * Get weekday names for column headers or abbr attributes.
 * Column order follows `firstWeekday` (ISO 1 = Monday … 7 = Sunday), matching `Intl.Locale#getWeekInfo().firstDay`.
 * @param format - 'short' for abbreviated (e.g. "Su", "Mo"), 'long' for full (e.g. "Sunday", "Monday")
 */
export const getWeekdayNames = (
  format: 'short' | 'long',
  locale: Intl.Locale,
  firstWeekday: IsoWeekday
) => {
  const formatter = new Intl.DateTimeFormat(stringifyLocale(locale), {
    weekday: format,
  });
  const monday = new Date(2024, 0, 8);
  const namesMonToSun = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return formatter.format(date);
  });
  return Array.from({ length: 7 }, (_, j) => {
    const iso = ((firstWeekday - 1 + j) % 7) + 1;
    return namesMonToSun[iso - 1];
  });
};

/**
 * Get localized "next month" and "previous month" labels for calendar nav.
 * Uses Intl.RelativeTimeFormat with numeric: "auto" (e.g. "next month", "last month").
 */
export const getRelativeMonthLabels = (locale: Intl.Locale) => {
  const rtf = new Intl.RelativeTimeFormat(stringifyLocale(locale), {
    numeric: 'auto',
  });
  return {
    nextMonth: capitalizeFirst(rtf.format(1, 'month'), locale),
    lastMonth: capitalizeFirst(rtf.format(-1, 'month'), locale),
  };
};

/**
 * Get localized "today" label (e.g. "today").
 */
export const getRelativeTodayLabel = (locale: Intl.Locale) => {
  const rtf = new Intl.RelativeTimeFormat(stringifyLocale(locale), {
    numeric: 'auto',
  });
  return capitalizeFirst(rtf.format(0, 'day'), locale);
};

/**
 * Get the locale's short date format pattern (e.g. "MM/DD/YYYY" for en-US,
 * "DD/MM/YYYY" for en-GB). Uses Intl.DateTimeFormat formatToParts to infer
 * order and separators. Useful for parsing or building locale-aware inputs.
 */
export const getDateFormatPattern = (locale: Intl.Locale) => {
  const parts = new Intl.DateTimeFormat(stringifyLocale(locale), {
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
export const formatDateForInput = (date: Date, locale: Intl.Locale) => {
  return new Intl.DateTimeFormat(stringifyLocale(locale), {
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
export const parseDateFromInput = (value: string, locale: Intl.Locale) => {
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

export const formatDateForAriaLabel = (date: Date, locale: Intl.Locale) => {
  return new Intl.DateTimeFormat(stringifyLocale(locale), {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};
