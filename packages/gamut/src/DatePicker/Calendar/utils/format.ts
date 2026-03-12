/**
 * Date formatting for the calendar using Intl.DateTimeFormat.
 */

/**
 * Format month and year for the calendar header (e.g. "February 2026").
 */
export function formatMonthYear(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale ?? 'en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Get short weekday labels for column headers (e.g. ["Su", "Mo", ...]).
 * Order depends on weekStartsOn: 0 = Sunday first, 1 = Monday first.
 */
export function getWeekdayLabels(
  locale?: string,
  weekStartsOn: 0 | 1 = 0
): string[] {
  const formatter = new Intl.DateTimeFormat(locale ?? 'en-US', {
    weekday: 'short',
  });
  // Jan 7, 2024 is a Sunday; add 0..6 days to get Sun..Sat
  const sunday = new Date(2024, 0, 7);
  const labels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return formatter.format(d);
  });
  if (weekStartsOn === 1) {
    return [...labels.slice(1), labels[0]];
  }
  return labels;
}

/**
 * Get full weekday names for abbr attributes (e.g. "Sunday", "Monday").
 * Same order as getWeekdayLabels.
 */
export function getWeekdayFullNames(
  locale?: string,
  weekStartsOn: 0 | 1 = 0
): string[] {
  const formatter = new Intl.DateTimeFormat(locale ?? 'en-US', {
    weekday: 'long',
  });
  const sunday = new Date(2024, 0, 7);
  const names = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return formatter.format(d);
  });
  if (weekStartsOn === 1) {
    return [...names.slice(1), names[0]];
  }
  return names;
}

/**
 * Format a date for display in the date picker input (e.g. "2/15/2026").
 */
export function formatDateForInput(date: Date, locale?: string): string {
  return new Intl.DateTimeFormat(locale ?? 'en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Parse a string from the date input into a Date, or null if invalid.
 * Only returns a date when the input is a complete valid date (e.g. "2/15/2026").
 * Partial input like "1" or "2/15" returns null even though Date("1") would parse.
 */

// this logic needs some work
export function parseDateFromInput(
  value: string,
  locale?: string
): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) return null;
  const formatted = formatDateForInput(parsed, locale);
  if (formatted === trimmed) return parsed;
  const parts = trimmed.split(/[/-]/);
  if (parts.length >= 3) return parsed;
  return null;
}

const RANGE_SEPARATOR = ' – ';

/**
 * Format a date range for the input (e.g. "2/15/2026 – 2/20/2026").
 */
export function formatDateRangeForInput(
  startDate: Date | null,
  endDate: Date | null,
  locale?: string
): string {
  if (!startDate && !endDate) return '';
  if (!startDate) return formatDateForInput(endDate!, locale);
  if (!endDate) return formatDateForInput(startDate, locale);
  return `${formatDateForInput(
    startDate,
    locale
  )}${RANGE_SEPARATOR}${formatDateForInput(endDate, locale)}`;
}

/**
 * Parse a range string (e.g. "2/15/2026 – 2/20/2026") into { startDate, endDate }.
 * Returns null if invalid. Single date is allowed and yields startDate = endDate.
 */
export function parseDateRangeFromInput(
  value: string,
  locale?: string
): { startDate: Date; endDate: Date } | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(RANGE_SEPARATOR).map((s) => s.trim());
  if (parts.length === 1) {
    const d = parseDateFromInput(parts[0], locale);
    if (!d) return null;
    return { startDate: d, endDate: new Date(d) };
  }
  if (parts.length === 2) {
    const start = parseDateFromInput(parts[0], locale);
    const end = parseDateFromInput(parts[1], locale);
    if (!start || !end) return null;
    return start.getTime() <= end.getTime()
      ? { startDate: start, endDate: end }
      : { startDate: end, endDate: start };
  }
  return null;
}
