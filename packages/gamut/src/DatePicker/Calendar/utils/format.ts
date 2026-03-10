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

//this logic needs some work
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
