import { DEFAULT_DATE_PICKER_TRANSLATIONS } from '../../../utils/translations';
import type { SegmentValues } from '../../Segment/utils';
import {
  generateErrorMessage,
  validateDateRange,
  validateSegments,
} from '../validation';

const translations = DEFAULT_DATE_PICKER_TRANSLATIONS;

const segments = (month: string, day: string, year: string): SegmentValues => ({
  month,
  day,
  year,
});

describe('validateSegments', () => {
  it('reports an incomplete entry (with no message) when the year is not four digits', () => {
    const result = validateSegments(segments('03', '15', '204'), translations);

    expect(result).toEqual({
      isValid: false,
      errorMessage: '',
      reason: 'incomplete',
    });
  });

  it('reports an incomplete entry when the month is empty', () => {
    const result = validateSegments(segments('', '15', '2024'), translations);

    expect(result).toMatchObject({ isValid: false, reason: 'incomplete' });
  });

  it('reports an incomplete entry when the day is empty', () => {
    const result = validateSegments(segments('03', '', '2024'), translations);

    expect(result).toMatchObject({ isValid: false, reason: 'incomplete' });
  });

  it('returns the parsed date for a complete, valid entry', () => {
    const result = validateSegments(segments('03', '15', '2024'), translations);

    expect(result.isValid).toBe(true);
    if (result.isValid) {
      expect(result.date).toEqual(new Date(2024, 2, 15));
    }
  });

  it('flags a disabled date as invalid without rejecting it as malformed', () => {
    const disableDate = (date: Date) => date.getDate() === 15;

    const result = validateSegments(
      segments('03', '15', '2024'),
      translations,
      disableDate
    );

    expect(result).toEqual({
      isValid: false,
      errorMessage: translations.invalidDateNotAvailable,
      reason: 'disabled-date',
    });
  });

  it('does not consult disableDate for a malformed date', () => {
    const disableDate = jest.fn(() => true);

    validateSegments(segments('13', '15', '2024'), translations, disableDate);

    expect(disableDate).not.toHaveBeenCalled();
  });

  it('flags a month above 12 as invalid-month', () => {
    const result = validateSegments(segments('13', '15', '2024'), translations);

    expect(result).toEqual({
      isValid: false,
      errorMessage: translations.invalidDateInvalidMonth,
      reason: 'invalid-month',
    });
  });

  it('flags a month of 00 as invalid-month', () => {
    const result = validateSegments(segments('00', '15', '2024'), translations);

    expect(result).toMatchObject({ isValid: false, reason: 'invalid-month' });
  });

  it('flags a day that overflows the month as a date-rollover', () => {
    const result = validateSegments(segments('02', '30', '2024'), translations);

    expect(result).toMatchObject({
      isValid: false,
      reason: 'date-rollover',
      errorMessage: 'February does not have 30 days',
    });
  });
});

describe('generateErrorMessage', () => {
  const empty = segments('', '', '');

  it('maps incomplete to the incomplete translation', () => {
    expect(generateErrorMessage('incomplete', empty, translations)).toBe(
      translations.invalidDateIncomplete
    );
  });

  it('maps invalid-month to the invalid-month translation', () => {
    expect(generateErrorMessage('invalid-month', empty, translations)).toBe(
      translations.invalidDateInvalidMonth
    );
  });

  it('interpolates month name and day for invalid-day', () => {
    expect(
      generateErrorMessage(
        'invalid-day',
        segments('02', '30', '2024'),
        translations
      )
    ).toBe('February does not have 30 days');
  });

  it('interpolates month name and day for date-rollover', () => {
    expect(
      generateErrorMessage(
        'date-rollover',
        segments('04', '31', '2024'),
        translations
      )
    ).toBe('April does not have 31 days');
  });

  it('maps disabled-date to the unavailable translation', () => {
    expect(generateErrorMessage('disabled-date', empty, translations)).toBe(
      translations.invalidDateNotAvailable
    );
  });

  it('maps range-contains-disabled-date to its translation', () => {
    expect(
      generateErrorMessage('range-contains-disabled-date', empty, translations)
    ).toBe(translations.invalidDateRangeContainsDisabledDate);
  });

  it('falls back to the generic invalid-date translation', () => {
    expect(generateErrorMessage('invalid-date', empty, translations)).toBe(
      translations.invalidDate
    );
  });
});

describe('validateDateRange', () => {
  const disableDate = (date: Date) =>
    date.getFullYear() === 2024 &&
    date.getMonth() === 2 &&
    date.getDate() === 20;

  it('returns null when the start date is missing', () => {
    expect(
      validateDateRange(null, new Date(2024, 2, 25), translations, disableDate)
    ).toBeNull();
  });

  it('returns null when the end date is missing', () => {
    expect(
      validateDateRange(new Date(2024, 2, 15), null, translations, disableDate)
    ).toBeNull();
  });

  it('returns null when no disableDate predicate is provided', () => {
    expect(
      validateDateRange(
        new Date(2024, 2, 15),
        new Date(2024, 2, 25),
        translations
      )
    ).toBeNull();
  });

  it('returns null when the range contains no disabled dates', () => {
    expect(
      validateDateRange(
        new Date(2024, 2, 15),
        new Date(2024, 2, 18),
        translations,
        disableDate
      )
    ).toBeNull();
  });

  it('returns a range error when a disabled date falls inside the range', () => {
    expect(
      validateDateRange(
        new Date(2024, 2, 15),
        new Date(2024, 2, 25),
        translations,
        disableDate
      )
    ).toEqual({
      isValid: false,
      errorMessage: translations.invalidDateRangeContainsDisabledDate,
      reason: 'range-contains-disabled-date',
    });
  });

  it('detects a disabled date on a range endpoint', () => {
    expect(
      validateDateRange(
        new Date(2024, 2, 20),
        new Date(2024, 2, 25),
        translations,
        disableDate
      )
    ).toMatchObject({ reason: 'range-contains-disabled-date' });
  });
});
