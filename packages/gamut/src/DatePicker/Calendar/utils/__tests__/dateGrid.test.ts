import {
  getDatesWithRow,
  getMonthGrid,
  getWeekdayOffsetInGrid,
  isDateDisabled,
  isDateInRange,
  isSameDay,
} from '../dateGrid';

describe('getWeekdayOffsetInGrid', () => {
  it('returns 0 when the 1st matches the grid first weekday (Monday)', () => {
    const first = new Date(2024, 0, 1);
    expect(getWeekdayOffsetInGrid(first, 1)).toBe(0);
  });

  it('returns a positive offset when the 1st is later in the week than firstWeekday', () => {
    const first = new Date(2024, 0, 1);
    expect(getWeekdayOffsetInGrid(first, 7)).toBeGreaterThan(0);
  });
});

describe('getMonthGrid', () => {
  it('includes exactly the number of days in the month', () => {
    const weeks = getMonthGrid(2024, 2, 1);
    const days = weeks.flat().filter((d): d is Date => d !== null);
    expect(days).toHaveLength(31);
  });

  it('pads leading and trailing cells with null so each row has 7 cells', () => {
    const weeks = getMonthGrid(2024, 2, 1);
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
    expect(isSameDay(new Date(2024, 5, 15), new Date(2024, 5, 16))).toBe(
      false
    );
    expect(isSameDay(new Date(), null)).toBe(false);
  });
});

describe('isDateInRange', () => {
  const start = new Date(2024, 2, 10);
  const end = new Date(2024, 2, 20);

  it('returns true strictly between start and end', () => {
    expect(isDateInRange(new Date(2024, 2, 15), start, end)).toBe(true);
  });

  it('returns false on start, end, or outside', () => {
    expect(isDateInRange(start, start, end)).toBe(false);
    expect(isDateInRange(end, start, end)).toBe(false);
    expect(isDateInRange(new Date(2024, 2, 5), start, end)).toBe(false);
  });

  it('returns false when start is null', () => {
    expect(isDateInRange(new Date(2024, 2, 15), null, end)).toBe(false);
  });
});

describe('isDateDisabled', () => {
  it('returns true when any disabled date matches the day', () => {
    const target = new Date(2024, 4, 10);
    const disabled = [new Date(2024, 4, 10, 15, 30)];
    expect(isDateDisabled(target, disabled)).toBe(true);
  });

  it('returns false when the list is empty or no match', () => {
    expect(isDateDisabled(new Date(2024, 4, 10), [])).toBe(false);
    expect(
      isDateDisabled(new Date(2024, 4, 10), [new Date(2024, 4, 11)])
    ).toBe(false);
  });
});

describe('getDatesWithRow', () => {
  it('lists only non-null dates with row indices', () => {
    const weeks = getMonthGrid(2024, 0, 1);
    const withRow = getDatesWithRow(weeks);
    expect(withRow.length).toBe(31);
    expect(withRow[0].rowIndex).toBe(0);
    withRow.forEach(({ date }) => {
      expect(date.getMonth()).toBe(0);
      expect(date.getFullYear()).toBe(2024);
    });
  });
});
