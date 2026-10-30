import { rangeContainsDisabled } from '../../DatePickerCalendar/utils/dateSelect';
import type { DatePickerTranslations } from '../../utils/translations';
import type { SegmentValues } from '../Segment/utils';
import { parseSegmentsToDate } from '../Segment/utils';

export type ErrorReason =
  | 'incomplete'
  | 'invalid-month'
  | 'invalid-day'
  | 'date-rollover'
  | 'disabled-date'
  | 'range-contains-disabled-date'
  | 'invalid-date';

export type ValidationResult =
  | { isValid: true; date: Date }
  | { isValid: false; errorMessage: string; reason: ErrorReason };

const detectValidationIssue = (segments: SegmentValues): ErrorReason | null => {
  const { month, day, year } = segments;

  const monthNumber = parseInt(month, 10);
  const dayNumber = parseInt(day, 10);
  const yearNumber = parseInt(year, 10);

  if (monthNumber < 1 || monthNumber > 12) return 'invalid-month';

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
};

export const generateErrorMessage = (
  reason: ErrorReason,
  segments: SegmentValues,
  translations: Required<DatePickerTranslations>
) => {
  const { month, day } = segments;
  const monthNumber = parseInt(month, 10);

  switch (reason) {
    case 'incomplete':
      return translations.invalidDateIncomplete;

    case 'invalid-month':
      return translations.invalidDateInvalidMonth;

    case 'invalid-day':
    case 'date-rollover': {
      const monthName = new Date(2024, monthNumber - 1, 1).toLocaleString(
        'en-US',
        { month: 'long' }
      );
      const message =
        reason === 'invalid-day'
          ? translations.invalidDateInvalidDay
          : translations.invalidDateRollover;
      return message.replace('{{month}}', monthName).replace('{{day}}', day);
    }

    case 'disabled-date':
      return translations.invalidDateNotAvailable;

    case 'range-contains-disabled-date':
      return translations.invalidDateRangeContainsDisabledDate;

    case 'invalid-date':
    default:
      return translations.invalidDate;
  }
};

export const validateSegments = (
  segments: SegmentValues,
  translations: Required<DatePickerTranslations>,
  disableDate?: (date: Date) => boolean
): ValidationResult => {
  const { month, day, year } = segments;

  const hasCompleteYear = year.length === 4;
  const hasMonthAndDay = month.length > 0 && day.length > 0;

  if (!hasCompleteYear || !hasMonthAndDay) {
    return {
      isValid: false,
      errorMessage: '',
      reason: 'incomplete',
    };
  }

  const parsed = parseSegmentsToDate(segments);

  if (parsed) {
    if (disableDate?.(parsed)) {
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

    return { isValid: true, date: parsed };
  }

  const reason = detectValidationIssue(segments) ?? 'invalid-date';

  const errorMessage = generateErrorMessage(reason, segments, translations);
  return {
    isValid: false,
    errorMessage,
    reason,
  };
};

export const validateDateRange = (
  startDate: Date | null,
  endDate: Date | null,
  translations: Required<DatePickerTranslations>,
  disableDate?: (date: Date) => boolean
): ValidationResult | null => {
  if (!startDate || !endDate || !disableDate) return null;

  if (rangeContainsDisabled({ startDate, endDate, disableDate })) {
    return {
      isValid: false,
      errorMessage: generateErrorMessage(
        'range-contains-disabled-date',
        { month: '', day: '', year: '' },
        translations
      ),
      reason: 'range-contains-disabled-date',
    };
  }

  return null;
};
