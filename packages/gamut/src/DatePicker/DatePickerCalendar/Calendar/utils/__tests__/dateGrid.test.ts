import {
  getDatesWithRow,
  getMonthGrid,
  getWeekdayOffsetInGrid,
  isDateDisabled,
  isDateInRange,
  isDateWithinVisibleMonths,
  isSameDay,
  matchDisabledDates,
} from '../dateGrid';

describe('getWeekdayOffsetInGrid', () => {
  it('returns 0 when the 1st matches the grid first weekday (Monday)', () => {
    const first = new Date(2024, 0, 1);
    expect(getWeekdayOffsetInGrid({ date: first, firstWeekday: 1 })).toBe(0);
  });

  it('returns a positive offset when the 1st is later in the week than firstWeekday', () => {
    const first = new Date(2024, 0, 1);
    expect(
      getWeekdayOffsetInGrid({ date: first, firstWeekday: 7 })
    ).toBeGreaterThan(0);
  });
});

describe('getMonthGrid', () => {
  it('includes exactly the number of days in the month', () => {
    const weeks = getMonthGrid({ year: 2024, month: 2, firstWeekday: 1 });
    const days = weeks.flat().filter((d): d is Date => d !== null);
    expect(days).toHaveLength(31);
  });

  it('pads leading and trailing cells with null so each row has 7 cells', () => {
    const weeks = getMonthGrid({ year: 2024, month: 2, firstWeekday: 1 });
    weeks.forEach((row) => {
      expect(row).toHaveLength(7);
    });
  });
});

describe('isSameDay', () => {
  it('returns true for the same calendar day in local time', () => {
    const a = new Date(2024, 5, 15, 8, 0);
    const b = new Date(2024, 5, 15, 22, 0);
    expect(isSameDay(a, b)).toBe(true);
  });

  it('returns false for different days or null', () => {
    expect(isSameDay(new Date(2024, 5, 15), new Date(2024, 5, 16))).toBe(false);
    expect(isSameDay(new Date(), null)).toBe(false);
  });
});

describe('isDateInRange', () => {
  const startDate = new Date(2024, 2, 10);
  const endDate = new Date(2024, 2, 20);

  it('returns true strictly between startDate and endDate', () => {
    expect(
      isDateInRange({ date: new Date(2024, 2, 15), startDate, endDate })
    ).toBe(true);
  });

  it('returns false on startDate, endDate, or outside', () => {
    expect(isDateInRange({ date: startDate, startDate, endDate })).toBe(false);
    expect(isDateInRange({ date: endDate, startDate, endDate })).toBe(false);
    expect(
      isDateInRange({ date: new Date(2024, 2, 5), startDate, endDate })
    ).toBe(false);
  });

  it('returns false when startDate is null', () => {
    expect(
      isDateInRange({ date: new Date(2024, 2, 15), startDate: null, endDate })
    ).toBe(false);
  });
});

describe('matchDisabledDates', () => {
  it('returns true when any listed day matches the calendar day', () => {
    const target = new Date(2024, 4, 10);
    const shouldDisable = matchDisabledDates([new Date(2024, 4, 10, 15, 30)]);
    expect(shouldDisable(target)).toBe(true);
  });

  it('returns false when the list is empty or no day matches', () => {
    expect(matchDisabledDates([])(new Date(2024, 4, 10))).toBe(false);
    expect(
      matchDisabledDates([new Date(2024, 4, 11)])(new Date(2024, 4, 10))
    ).toBe(false);
  });
});

describe('isDateDisabled', () => {
  it('returns true when shouldDisableDate returns true', () => {
    expect(
      isDateDisabled({
        date: new Date(2024, 4, 10),
        shouldDisableDate: () => true,
      })
    ).toBe(true);
    expect(
      isDateDisabled({
        date: new Date(2024, 4, 10),
        shouldDisableDate: (d) => d.getDate() === 10,
      })
    ).toBe(true);
  });

  it('returns false when shouldDisableDate is omitted or returns false', () => {
    expect(isDateDisabled({ date: new Date(2024, 4, 10) })).toBe(false);
    expect(
      isDateDisabled({
        date: new Date(2024, 4, 10),
        shouldDisableDate: () => false,
      })
    ).toBe(false);
  });
});

describe('isDateWithinVisibleMonths', () => {
  const march2024 = new Date(2024, 2, 1);
  const april2024 = new Date(2024, 3, 15);

  it('returns true when the date is in the left visible month', () => {
    expect(
      isDateWithinVisibleMonths({
        date: new Date(2024, 2, 20),
        startOfLeftVisibleMonth: march2024,
        showSecondMonth: false,
      })
    ).toBe(true);
  });

  it('returns true when the date is in the second column month in a two-month layout', () => {
    expect(
      isDateWithinVisibleMonths({
        date: april2024,
        startOfLeftVisibleMonth: march2024,
        showSecondMonth: true,
      })
    ).toBe(true);
  });

  it('returns false when the date is outside the visible month(s)', () => {
    expect(
      isDateWithinVisibleMonths({
        date: new Date(2024, 4, 1),
        startOfLeftVisibleMonth: march2024,
        showSecondMonth: true,
      })
    ).toBe(false);
  });
});

describe('getDatesWithRow', () => {
  it('lists only non-null dates with row indices', () => {
    const weeks = getMonthGrid({ year: 2024, month: 0, firstWeekday: 1 });
    const withRow = getDatesWithRow(weeks);
    expect(withRow.length).toBe(31);
    expect(withRow[0].rowIndex).toBe(0);
    withRow.forEach(({ date }) => {
      expect(date.getMonth()).toBe(0);
      expect(date.getFullYear()).toBe(2024);
    });
  });
});
