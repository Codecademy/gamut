import type { DatePickerTranslations } from '../../utils/translations';
import type { SegmentValues } from '../Segment/utils';
import { parseSegmentsToDate } from '../Segment/utils';

export type ErrorReason =
  | 'incomplete'
  | 'invalid-month'
  | 'invalid-day'
  | 'date-rollover'
  | 'disabled-date'
  | 'range-contains-disabled-date';

export type ValidationResult =
  | { isValid: true; date: Date }
  | { isValid: false; errorMessage: string; reason: ErrorReason };

/**
 * Detects the specific reason why a date is invalid.
 * Assumes segments are "complete enough" (all three fields have at least some input).
 */
function detectValidationIssue(segments: SegmentValues): ErrorReason | null {
  const { month, day, year } = segments;

  // Parse to numbers for validation
  const monthNumber = parseInt(month, 10);
  const dayNumber = parseInt(day, 10);
  const yearNumber = parseInt(year, 10);

  // Check month validity
  if (monthNumber < 1 || monthNumber > 12) return 'invalid-month';

  // Try to create the date - if it fails, it's either invalid day or date rollover
  const parsed = new Date(yearNumber, monthNumber - 1, dayNumber);
  if (
    parsed.getFullYear() !== yearNumber ||
    parsed.getMonth() !== monthNumber - 1
  ) {
    return 'date-rollover';
  }
  if (parsed.getDate() !== dayNumber) {
    return 'invalid-day';
  }

  return null;
}

/**
 * Generates a human-readable error message based on the validation issue.
 */
export function generateErrorMessage(
  reason: ErrorReason,
  segments: SegmentValues,
  translations: Required<DatePickerTranslations>
): string {
  const { month, day } = segments;
  const monthNumber = parseInt(month, 10);

  switch (reason) {
    case 'incomplete':
      return translations.invalidDateIncomplete || 'Incomplete date';

    case 'invalid-month':
      return (
        translations.invalidDateInvalidMonth || 'Month must be between 1 and 12'
      );

    case 'invalid-day': {
      const monthName = new Date(2024, monthNumber - 1, 1).toLocaleString(
        'en-US',
        { month: 'long' }
      );
      const message =
        translations.invalidDateInvalidDay ||
        '{{month}} does not have {{day}} days';
      return message.replace('{{month}}', monthName).replace('{{day}}', day);
    }

    case 'date-rollover': {
      const monthName = new Date(2024, monthNumber - 1, 1).toLocaleString(
        'en-US',
        { month: 'long' }
      );
      const message =
        translations.invalidDateRollover ||
        '{{month}} does not have {{day}} days';
      return message.replace('{{month}}', monthName).replace('{{day}}', day);
    }

    case 'disabled-date':
      return (
        translations.invalidDateNotAvailable || 'This date is not available'
      );

    case 'range-contains-disabled-date':
      return (
        translations.invalidDateRangeContainsDisabledDate ||
        'This date range contains unavailable dates'
      );

    default:
      return 'Invalid date';
  }
}

/**
 * Validates a set of date segments and returns either a valid date or an error message.
 * Requires: year to be exactly 4 digits, month and day to have digits and parse to valid numbers.
 * Checks for structural validity (date exists), disabled dates, and generates specific error messages.
 */
export function validateSegments(
  segments: SegmentValues,
  translations: Required<DatePickerTranslations>,
  disableDate?: (date: Date) => boolean
): ValidationResult {
  const { month, day, year } = segments;

  // Require complete year (4 digits), month, and day to have input
  const hasCompleteYear = year.length === 4;
  const hasMonthAndDay = month.length > 0 && day.length > 0;

  if (!hasCompleteYear || !hasMonthAndDay) {
    // Incomplete entry - return as valid (no error), but with no date
    return {
      isValid: false,
      errorMessage: '',
      reason: 'incomplete',
    };
  }

  // Entry is complete (year has 4 digits, month and day have input) - validate it
  const parsed = parseSegmentsToDate(segments);

  if (parsed) {
    // Date is structurally valid, now check if it's disabled
    if (disableDate && disableDate(parsed)) {
      return {
        isValid: false,
        errorMessage: generateErrorMessage(
          'disabled-date',
          segments,
          translations
        ),
        reason: 'disabled-date',
      };
    }
    // Date is valid and not disabled
    return { isValid: true, date: parsed };
  }

  // Date is not valid - detect specific reason (must be one since entry is complete)
  const reason = detectValidationIssue(segments) || 'date-rollover';

  const errorMessage = generateErrorMessage(reason, segments, translations);
  return {
    isValid: false,
    errorMessage,
    reason,
  };
}

/**
 * Validates a date range to ensure no dates in the range are disabled.
 */
export function validateDateRange(
  startDate: Date | null,
  endDate: Date | null,
  translations: Required<DatePickerTranslations>,
  disableDate?: (date: Date) => boolean
): ValidationResult | null {
  if (!startDate || !endDate || !disableDate) return null;

  // Check if any date in the range is disabled
  const current = new Date(startDate);
  while (current <= endDate) {
    if (disableDate(current)) {
      return {
        isValid: false,
        errorMessage: generateErrorMessage(
          'range-contains-disabled-date',
          {
            month: '',
            day: '',
            year: '',
          },
          translations
        ),
        reason: 'range-contains-disabled-date',
      };
    }
    current.setDate(current.getDate() + 1);
  }

  return null;
}
