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
