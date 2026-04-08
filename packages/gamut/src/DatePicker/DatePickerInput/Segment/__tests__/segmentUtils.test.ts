import type { DateFormatLayoutItem } from '../../utils';
import {
  appendSegmentDigit,
  buildCombinedFromSegments,
  digitsToSegments,
  getDateSegmentsFromDate,
  getSegmentSpinBounds,
  getStrictSegmentDigits,
  isStrictlyCompleteDateEntry,
  normalizeSegmentValues,
  padSegmentNumber,
  parseSegmentNumericString,
  parseSegmentsToDate,
  spinSegment,
} from '../segmentUtils';

describe('getDateSegmentsFromDate', () => {
  it('returns empty strings for null', () => {
    expect(getDateSegmentsFromDate(null)).toEqual({
      month: '',
      day: '',
      year: '',
    });
  });

  it('pads month and day to two digits', () => {
    expect(getDateSegmentsFromDate(new Date(2024, 2, 5))).toEqual({
      month: '03',
      day: '05',
      year: '2024',
    });
  });
});

describe('parseSegmentsToDate', () => {
  it('returns date when all segments are valid', () => {
    expect(
      parseSegmentsToDate({ month: '03', day: '15', year: '2024' })
    ).toEqual(new Date(2024, 2, 15));
  });

  it('returns null unless year has four digits', () => {
    expect(
      parseSegmentsToDate({ month: '03', day: '15', year: '24' })
    ).toBeNull();
  });

  it('returns null when month or day is empty', () => {
    expect(
      parseSegmentsToDate({ month: '', day: '15', year: '2024' })
    ).toBeNull();
    expect(
      parseSegmentsToDate({ month: '03', day: '', year: '2024' })
    ).toBeNull();
  });

  it('returns null for invalid month', () => {
    expect(
      parseSegmentsToDate({ month: '13', day: '01', year: '2024' })
    ).toBeNull();
  });

  it('returns null for invalid calendar day (rollover)', () => {
    expect(
      parseSegmentsToDate({ month: '02', day: '30', year: '2023' })
    ).toBeNull();
  });

  it('accepts Feb 29 in a leap year', () => {
    expect(
      parseSegmentsToDate({ month: '02', day: '29', year: '2024' })
    ).toEqual(new Date(2024, 1, 29));
  });
});

describe('getStrictSegmentDigits', () => {
  it('strips non-digits and truncates to field widths', () => {
    expect(
      getStrictSegmentDigits({ month: '1a2', day: '3-4', year: '20xx24' })
    ).toEqual({ month: '12', day: '34', year: '2024' });
  });
});

describe('isStrictlyCompleteDateEntry', () => {
  it('is true for 2+2+4 digit strings', () => {
    expect(
      isStrictlyCompleteDateEntry({ month: '03', day: '15', year: '2024' })
    ).toBe(true);
  });

  it('is false for incomplete strings', () => {
    expect(
      isStrictlyCompleteDateEntry({ month: '3', day: '15', year: '2024' })
    ).toBe(false);
    expect(
      isStrictlyCompleteDateEntry({ month: '03', day: '15', year: '24' })
    ).toBe(false);
  });
});

describe('normalizeSegmentValues', () => {
  describe('when entry is strictly complete', () => {
    it('returns canonical segments when strict entry is a valid date', () => {
      expect(
        normalizeSegmentValues({ month: '03', day: '15', year: '2024' })
      ).toEqual({
        month: '03',
        day: '15',
        year: '2024',
      });
    });

    it('returns empty segments when strict entry is an invalid calendar date', () => {
      expect(
        normalizeSegmentValues({ month: '02', day: '30', year: '2023' })
      ).toEqual({ month: '', day: '', year: '' });
    });
  });

  describe('when entry is not strictly complete', () => {
    it('pads a partial month', () => {
      expect(
        normalizeSegmentValues({ month: '3', day: '19', year: '2024' })
      ).toEqual({
        month: '03',
        day: '19',
        year: '2024',
      });
    });

    it('pads a partial day when year and month are complete', () => {
      expect(
        normalizeSegmentValues({ month: '03', day: '9', year: '2024' })
      ).toEqual({
        month: '03',
        day: '09',
        year: '2024',
      });
    });

    it('pads a partial day when year and month are not complete', () => {
      expect(
        normalizeSegmentValues({ month: '03', day: '9', year: '20' })
      ).toEqual({
        month: '03',
        day: '09',
        year: '20',
      });
    });

    it('clamps partial month to 1-12', () => {
      expect(
        normalizeSegmentValues({ month: '99', day: '', year: '' })
      ).toEqual(expect.objectContaining({ month: '12' }));
      expect(
        normalizeSegmentValues({ month: '00', day: '', year: '' })
      ).toEqual(expect.objectContaining({ month: '01' }));
    });

    it('clamps day to the last day of the month', () => {
      // Single-digit month avoids strict 2/2/4 path; Feb 31 → 29 in 2024.
      expect(
        normalizeSegmentValues({ month: '2', day: '31', year: '2024' })
      ).toEqual({
        month: '02',
        day: '29',
        year: '2024',
      });
    });

    it('clamps partial day to 1-31 when year/month not both complete', () => {
      expect(
        normalizeSegmentValues({ month: '06', day: '99', year: '20' })
      ).toEqual(expect.objectContaining({ day: '31' }));
    });

    it('strips non-digit characters from partial input', () => {
      expect(
        normalizeSegmentValues({ month: '1a', day: '2b', year: '20c24' })
      ).toEqual({
        month: '01',
        day: '02',
        year: '2024',
      });
    });
  });
});

describe('getSegmentSpinBounds', () => {
  it('bounds month to 1-12', () => {
    expect(
      getSegmentSpinBounds('month', { month: '', day: '', year: '' })
    ).toEqual({ min: 1, max: 12 });
  });

  it('bounds year to 1-9999', () => {
    expect(
      getSegmentSpinBounds('year', { month: '', day: '', year: '' })
    ).toEqual({ min: 1, max: 9999 });
  });

  it('bounds day using parsed month and four-digit year', () => {
    expect(
      getSegmentSpinBounds('day', { month: '02', year: '2024', day: '' })
    ).toEqual({ min: 1, max: 29 });
    expect(
      getSegmentSpinBounds('day', { month: '02', year: '2023', day: '' })
    ).toEqual({ min: 1, max: 28 });
  });

  it('uses default year 2024 when year segment is incomplete', () => {
    expect(
      getSegmentSpinBounds('day', { month: '02', year: '20', day: '' })
    ).toEqual({ min: 1, max: 29 });
  });
});

describe('parseSegmentNumericString', () => {
  it('returns null for empty or non-numeric', () => {
    expect(parseSegmentNumericString('')).toBeNull();
    expect(parseSegmentNumericString('abc')).toBeNull();
  });

  it('parses first digit run', () => {
    expect(parseSegmentNumericString('12')).toBe(12);
    expect(parseSegmentNumericString('3x4')).toBe(34);
  });
});

describe('padSegmentNumber', () => {
  it('pads year to four digits', () => {
    expect(padSegmentNumber('year', 123)).toBe('0123');
  });
  it('pads month to two digits', () => {
    expect(padSegmentNumber('month', 3)).toBe('03');
  });

  it('pads day to two digits', () => {
    expect(padSegmentNumber('day', 1)).toBe('01');
  });
});

describe('appendSegmentDigit', () => {
  it('ignores non-digit characters', () => {
    expect(appendSegmentDigit('month', '01', 'x')).toBe('01');
  });

  it('appends until max length', () => {
    expect(appendSegmentDigit('month', '', '1')).toBe('1');
    expect(appendSegmentDigit('month', '1', '2')).toBe('12');
  });

  it('replaces when segment is already full', () => {
    expect(appendSegmentDigit('month', '12', '5')).toBe('5');
    expect(appendSegmentDigit('year', '2024', '9')).toBe('9');
  });

  it('strips non-digits from previous value before appending', () => {
    expect(appendSegmentDigit('day', '1a', '2')).toBe('12');
  });
});

describe('spinSegment', () => {
  const empty = { month: '', day: '', year: '' };

  beforeEach(() => {
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2024);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('uses current calendar year when stepping up', () => {
    expect(spinSegment('year', empty, 1)).toBe('2024');
  });

  it('uses max year when stepping down', () => {
    expect(spinSegment('year', empty, -1)).toBe('9999');
  });

  it('steps month up from empty to min', () => {
    expect(spinSegment('month', { month: '', day: '', year: '' }, 1)).toBe(
      '01'
    );
  });

  it('steps month down from empty to max', () => {
    expect(spinSegment('month', { month: '', day: '', year: '' }, -1)).toBe(
      '12'
    );
  });

  it('steps day up from empty to min', () => {
    expect(spinSegment('day', { month: '', day: '', year: '' }, 1)).toBe('01');
  });

  it('steps day down from empty to max', () => {
    expect(spinSegment('day', { month: '', day: '', year: '' }, -1)).toBe('31');
  });

  it('increments within bounds', () => {
    expect(spinSegment('month', { month: '06', day: '', year: '' }, 1)).toBe(
      '07'
    );
    expect(spinSegment('month', { month: '12', day: '', year: '' }, 1)).toBe(
      '12'
    );
  });

  it('decrements within bounds', () => {
    expect(spinSegment('month', { month: '06', day: '', year: '' }, -1)).toBe(
      '05'
    );
    expect(spinSegment('month', { month: '01', day: '', year: '' }, -1)).toBe(
      '01'
    );
  });
});

describe('buildCombinedFromSegments', () => {
  it('joins fields and literals in layout order (US)', () => {
    const usLayout: DateFormatLayoutItem[] = [
      { kind: 'field', field: 'month' },
      { kind: 'literal', text: '/' },
      { kind: 'field', field: 'day' },
      { kind: 'literal', text: '/' },
      { kind: 'field', field: 'year' },
    ];

    expect(
      buildCombinedFromSegments(
        { month: '03', day: '15', year: '2024' },
        usLayout
      )
    ).toBe('03/15/2024');
  });

  it('joins fields and literals in layout order (UK)', () => {
    const ukLayout: DateFormatLayoutItem[] = [
      { kind: 'field', field: 'day' },
      { kind: 'literal', text: '/' },
      { kind: 'field', field: 'month' },
      { kind: 'literal', text: '/' },
      { kind: 'field', field: 'year' },
    ];

    expect(
      buildCombinedFromSegments(
        { month: '03', day: '15', year: '2024' },
        ukLayout
      )
    ).toBe('15/03/2024');
  });
});

describe('digitsToSegments', () => {
  it('splits digit string by field order (MDY)', () => {
    expect(digitsToSegments('03152024', ['month', 'day', 'year'])).toEqual({
      month: '03',
      day: '15',
      year: '2024',
    });
  });

  it('splits digit string by field order (DMY)', () => {
    expect(digitsToSegments('15032024', ['day', 'month', 'year'])).toEqual({
      month: '03',
      day: '15',
      year: '2024',
    });
  });
});
