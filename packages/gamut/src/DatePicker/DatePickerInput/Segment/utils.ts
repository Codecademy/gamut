import type { DateFormatLayoutItem, DatePartKind } from '../utils';

export type SegmentValues = {
  month: string;
  day: string;
  year: string;
};

export const getDateSegmentsFromDate = (date: Date | null): SegmentValues => {
  if (date === null) return { month: '', day: '', year: '' };
  return {
    month: String(date.getMonth() + 1).padStart(2, '0'),
    day: String(date.getDate()).padStart(2, '0'),
    year: String(date.getFullYear()),
  };
};

/**
 * Build a calendar date from segment strings. Requires a 4-digit year and non-empty month/day.
 */
export const parseSegmentsToDate = (segments: SegmentValues) => {
  const { month, day, year } = segments;
  if (year.length !== 4) return null;
  if (month.length === 0 || day.length === 0) return null;
  const monthNumber = parseInt(month, 10);
  const dayNumber = parseInt(day, 10);
  const yearNumber = parseInt(year, 10);
  if (
    !Number.isFinite(monthNumber) ||
    !Number.isFinite(dayNumber) ||
    !Number.isFinite(yearNumber)
  )
    return null;
  if (monthNumber < 1 || monthNumber > 12) return null;
  const parsed = new Date(yearNumber, monthNumber - 1, dayNumber);
  if (
    parsed.getFullYear() !== yearNumber ||
    parsed.getMonth() !== monthNumber - 1 ||
    parsed.getDate() !== dayNumber
  ) {
    return null;
  }
  return parsed;
};

/** Digits-only slices used when checking for a fully typed date (2 / 2 / 4). */
export const getStrictSegmentDigits = (segments: SegmentValues) => ({
  month: segments.month.replace(/\D/g, '').slice(0, 2),
  day: segments.day.replace(/\D/g, '').slice(0, 2),
  year: segments.year.replace(/\D/g, '').slice(0, 4),
});

/** User finished all three fields (2-digit month, 2-digit day, 4-digit year). */
export const isStrictlyCompleteDateEntry = (strictSegments: SegmentValues) => {
  const { month, day, year } = strictSegments;
  return year.length === 4 && month.length === 2 && day.length === 2;
};

/**
 * Normalize segment strings after blur (digits only).
 * When the user has fully typed 2 / 2 / 4 digits, validates the calendar date without
 * clamping invalid days/months — if invalid, returns empty segments (caller clears selection).
 * Otherwise pads/clamps partial input as before.
 */
export const normalizeSegmentValues = (
  segments: SegmentValues
): SegmentValues => {
  const strictSegments = getStrictSegmentDigits(segments);
  if (isStrictlyCompleteDateEntry(strictSegments)) {
    const parsed = parseSegmentsToDate(strictSegments);
    if (parsed) {
      return getDateSegmentsFromDate(parsed);
    }
    return { month: '', day: '', year: '' };
  }

  const year = segments.year.replace(/\D/g, '').slice(0, 4);
  let month = segments.month.replace(/\D/g, '').slice(0, 2);
  let day = segments.day.replace(/\D/g, '').slice(0, 2);

  if (month.length > 0) {
    const m = Math.min(12, Math.max(1, parseInt(month, 10)));
    month = Number.isFinite(m) ? String(m).padStart(2, '0') : '';
  }
  if (year.length === 4 && month.length === 2 && day.length > 0) {
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    const dmax = new Date(y, m, 0).getDate();
    const d = Math.min(dmax, Math.max(1, parseInt(day, 10)));
    day = Number.isFinite(d) ? String(d).padStart(2, '0') : '';
  } else if (day.length > 0) {
    const d = Math.min(31, Math.max(1, parseInt(day, 10)));
    day = Number.isFinite(d) ? String(d).padStart(2, '0') : '';
  }
  return { month, day, year };
};

export const getSegmentPlaceholder = (field: DatePartKind) =>
  field === 'year' ? 'YYYY' : field === 'month' ? 'MM' : 'DD';

/** Digit capacity per field (typing / spinbutton editing). */
export const segmentMaxLength = (field: DatePartKind): number =>
  field === 'year' ? 4 : 2;

/**
 * Min/max for spinbutton `aria-*` and ArrowUp/ArrowDown stepping (month/day/year).
 * Day max uses month/year when available so February etc. behave correctly.
 */
export const getSegmentSpinBounds = ({
  field,
  segments,
}: {
  field: DatePartKind;
  segments: SegmentValues;
}): { min: number; max: number } => {
  switch (field) {
    case 'month':
      return { min: 1, max: 12 };
    case 'day': {
      const year =
        segments.year.length === 4 ? parseInt(segments.year, 10) : 2024;
      const month =
        segments.month.length >= 1
          ? Math.min(12, Math.max(1, parseInt(segments.month, 10) || 1))
          : 1;
      const maxDay = new Date(year, month, 0).getDate();
      return { min: 1, max: Number.isFinite(maxDay) ? maxDay : 31 };
    }
    case 'year':
      return { min: 1, max: 9999 };
    default:
      return { min: 1, max: 9999 };
  }
};

/** Numeric value of a segment string (digits only), or null if empty. */
export const parseSegmentNumericString = (str: string) => {
  const digits = str.replace(/\D/g, '');
  if (digits.length === 0) return null;
  const numericValue = parseInt(digits, 10);
  return Number.isFinite(numericValue) ? numericValue : null;
};

export const padSegmentNumber = ({
  field,
  numericValue,
}: {
  field: DatePartKind;
  numericValue: number;
}) => {
  if (field === 'year') {
    const clamped = Math.min(9999, Math.max(1, numericValue));
    return String(clamped).padStart(4, '0');
  }
  const clamped = Math.min(99, Math.max(0, numericValue));
  return String(clamped).padStart(2, '0').slice(-2);
};

/** Append one digit to a segment string (max length enforced). */
export const appendSegmentDigit = ({
  field,
  prev,
  digit,
}: {
  field: DatePartKind;
  prev: string;
  digit: string;
}) => {
  // if the digit is not a single digit, return the previous value
  if (!/^\d$/.test(digit)) return prev;
  const maxLen = segmentMaxLength(field);
  const digitsOnly = prev.replace(/\D/g, '');
  // When the segment is already full, another digit would only be appended then
  // truncated back to the same string — so typing could not change the value.
  // Treat the new digit as the start of a replacement (same as clearing then typing).
  if (digitsOnly.length >= maxLen) {
    return digit.slice(0, maxLen);
  }
  return (digitsOnly + digit).slice(0, maxLen);
};

/**
 * Step a segment up/down (ArrowUp / ArrowDown). Empty year steps from the current calendar year.
 */
export const spinSegment = ({
  field,
  segments,
  delta,
}: {
  field: DatePartKind;
  segments: SegmentValues;
  delta: 1 | -1;
}) => {
  const { min, max } = getSegmentSpinBounds({ field, segments });
  let currentSegementValue = parseSegmentNumericString(segments[field]);

  if (currentSegementValue === null) {
    currentSegementValue =
      field === 'year'
        ? delta > 0
          ? new Date().getFullYear()
          : max
        : delta > 0
        ? min
        : max;
  } else {
    currentSegementValue += delta;
  }

  currentSegementValue = Math.min(max, Math.max(min, currentSegementValue));
  return padSegmentNumber({ field, numericValue: currentSegementValue });
};

/** Build the visible date string from segment state in locale layout order (includes literal separators). */
export const buildCombinedFromSegments = ({
  segments,
  layout,
}: {
  segments: SegmentValues;
  layout: DateFormatLayoutItem[];
}) =>
  layout
    .map((item) => (item.kind === 'literal' ? item.text : segments[item.field]))
    .join('');

/** Map a digit-only string into segment fields following locale field order (2 / 2 / 4). */
export const digitsToSegments = ({
  digits,
  fieldOrder,
}: {
  digits: string;
  fieldOrder: DatePartKind[];
}): SegmentValues => {
  let rest = digits;
  const segments: SegmentValues = { month: '', day: '', year: '' };
  for (const field of fieldOrder) {
    const maxLen = field === 'year' ? 4 : 2;
    segments[field] = rest.slice(0, maxLen);
    rest = rest.slice(maxLen);
  }
  return segments;
};
