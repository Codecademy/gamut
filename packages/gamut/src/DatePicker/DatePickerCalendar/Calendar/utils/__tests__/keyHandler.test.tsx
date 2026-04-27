import type { KeyboardEvent } from 'react';

import { getDatesWithRow, getMonthGrid, matchDisabledDates } from '../dateGrid';
import { keyHandler, KeyHandlerParams } from '../keyHandler';

const makeEvent = (
  key: string,
  opts: Partial<Pick<KeyboardEvent, 'shiftKey'>> = {}
) =>
  ({
    key,
    preventDefault: jest.fn(),
    shiftKey: opts.shiftKey ?? false,
  } as unknown as React.KeyboardEvent);

const mockOnFocusedDateChange = jest.fn();
const mockOnDateSelect = jest.fn();
const mockOnEscapeKeyPress = jest.fn();
const mockOnDisplayDateChange = jest.fn();

const year = 2024;
const month = 2;
const firstWeekday = 1 as const;
const weeks = getMonthGrid({ year, month, firstWeekday });
const datesWithRow = getDatesWithRow(weeks);
const midIdx = Math.floor(datesWithRow.length / 2);
const { date } = datesWithRow[midIdx];
const firstIdx = 0;
const lastIdx = datesWithRow.length - 1;

const baseParams: Omit<KeyHandlerParams, 'e'> = {
  date,
  datesWithRow,
  month,
  year,
  hasAdjacentMonthRight: false,
  hasAdjacentMonthLeft: false,
  onDisplayDateChange: mockOnDisplayDateChange,
  onFocusedDateChange: mockOnFocusedDateChange,
  onDateSelect: mockOnDateSelect,
  onEscapeKeyPress: mockOnEscapeKeyPress,
};

describe('keyHandler', () => {
  it('calls onFocusedDateChange for ArrowLeft to previous day in grid', () => {
    keyHandler({
      ...baseParams,
      e: makeEvent('ArrowLeft'),
    });
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(
      datesWithRow[midIdx - 1].date
    );
    expect(mockOnDisplayDateChange).not.toHaveBeenCalled();
  });

  it('calls onFocusedDateChange for ArrowRight to next day in grid', () => {
    keyHandler({
      ...baseParams,
      e: makeEvent('ArrowRight'),
    });
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(
      datesWithRow[midIdx + 1].date
    );
    expect(mockOnDisplayDateChange).not.toHaveBeenCalled();
  });

  it('calls onFocusedDateChange for ArrowUp to previous week in grid', () => {
    keyHandler({
      ...baseParams,
      e: makeEvent('ArrowUp'),
    });
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(
      datesWithRow[midIdx - 7].date
    );
    expect(mockOnDisplayDateChange).not.toHaveBeenCalled();
  });

  it('calls onFocusedDateChange for ArrowDown to next week in grid', () => {
    keyHandler({
      ...baseParams,
      e: makeEvent('ArrowDown'),
    });
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(
      datesWithRow[midIdx + 7].date
    );
    expect(mockOnDisplayDateChange).not.toHaveBeenCalled();
  });

  it('moves focus to the last day of the previous month when ArrowLeft is pressed on the first day of the month', () => {
    keyHandler({
      ...baseParams,
      date: datesWithRow[firstIdx].date,
      e: makeEvent('ArrowLeft'),
    });
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(
      new Date(year, month, 0)
    );
    expect(mockOnDisplayDateChange).toHaveBeenCalledWith(
      new Date(year, month - 1, 1)
    );
  });

  it('moves focus to the first day of the next month when ArrowRight is pressed on the last day of the month', () => {
    keyHandler({
      ...baseParams,
      date: datesWithRow[lastIdx].date,
      e: makeEvent('ArrowRight'),
    });
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(
      new Date(year, month + 1, 1)
    );
    expect(mockOnDisplayDateChange).toHaveBeenCalledWith(
      new Date(year, month + 1, 1)
    );
  });

  it('moves focus up a week and updates the month view when ArrowUp crosses into the previous month', () => {
    keyHandler({
      ...baseParams,
      date: datesWithRow[firstIdx].date,
      e: makeEvent('ArrowUp'),
    });
    const expected = new Date(datesWithRow[firstIdx].date);
    expected.setDate(expected.getDate() - 7);
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(expected);
    expect(mockOnDisplayDateChange).toHaveBeenCalledWith(
      new Date(expected.getFullYear(), expected.getMonth(), 1)
    );
  });

  it('moves focus down a week and updates the month view when ArrowDown crosses into the next month', () => {
    keyHandler({
      ...baseParams,
      date: datesWithRow[lastIdx].date,
      e: makeEvent('ArrowDown'),
    });
    const expected = new Date(datesWithRow[lastIdx].date);
    expected.setDate(expected.getDate() + 7);
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(expected);
    expect(mockOnDisplayDateChange).toHaveBeenCalledWith(
      new Date(expected.getFullYear(), expected.getMonth(), 1)
    );
  });

  it('calls onDateSelect on Enter when not disabled', () => {
    keyHandler({
      ...baseParams,
      e: makeEvent('Enter'),
    });
    expect(mockOnDateSelect).toHaveBeenCalledWith(date);
  });

  it('does not call onDateSelect on Enter when date is disabled', () => {
    keyHandler({
      ...baseParams,
      e: makeEvent('Enter'),
      disableDate: matchDisabledDates([date]),
    });
    expect(mockOnDateSelect).not.toHaveBeenCalled();
  });

  it('calls onEscapeKeyPress on Escape', () => {
    keyHandler({
      ...baseParams,
      e: makeEvent('Escape'),
    });
    expect(mockOnEscapeKeyPress).toHaveBeenCalled();
  });

  it('calls onFocusedDateChange and onDisplayDateChange on PageDown for next month', () => {
    keyHandler({
      ...baseParams,
      e: makeEvent('PageDown'),
    });
    const expectedFocus = new Date(year, month + 1, date.getDate());
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(expectedFocus);
    expect(mockOnDisplayDateChange).toHaveBeenCalledWith(
      new Date(year, month + 1, 1)
    );
  });

  it('calls onFocusedDateChange and onDisplayDateChange on Shift+PageDown for next year', () => {
    keyHandler({
      ...baseParams,
      e: makeEvent('PageDown', { shiftKey: true }),
    });
    const expectedFocus = new Date(year + 1, month, date.getDate());
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(expectedFocus);
    expect(mockOnDisplayDateChange).toHaveBeenCalledWith(
      new Date(year + 1, month, 1)
    );
  });

  it('calls onFocusedDateChange and onDisplayDateChange on PageUp for previous month', () => {
    keyHandler({
      ...baseParams,
      e: makeEvent('PageUp'),
    });
    const expectedFocus = new Date(year, month - 1, date.getDate());
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(expectedFocus);
    expect(mockOnDisplayDateChange).toHaveBeenCalledWith(
      new Date(year, month - 1, 1)
    );
  });

  it('calls onFocusedDateChange and onDisplayDateChange on Shift+PageUp for previous year', () => {
    keyHandler({
      ...baseParams,
      e: makeEvent('PageUp', { shiftKey: true }),
    });
    const expectedFocus = new Date(year - 1, month, date.getDate());
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(expectedFocus);
    expect(mockOnDisplayDateChange).toHaveBeenCalledWith(
      new Date(year - 1, month, 1)
    );
  });

  it('moves focus to the first day of the current week row when Home key is pressed', () => {
    const { rowIndex } = datesWithRow[midIdx];
    const firstInRow = datesWithRow.find((d) => d.rowIndex === rowIndex)!.date;

    keyHandler({
      ...baseParams,
      e: makeEvent('Home'),
    });
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(firstInRow);
    expect(mockOnDisplayDateChange).not.toHaveBeenCalled();
  });

  it('moves focus to the last day of the current week row when End key is pressed', () => {
    const { rowIndex } = datesWithRow[midIdx];
    const lastInRow = [...datesWithRow]
      .reverse()
      .find((d) => d.rowIndex === rowIndex)!.date;

    keyHandler({
      ...baseParams,
      e: makeEvent('End'),
    });
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(lastInRow);
    expect(mockOnDisplayDateChange).not.toHaveBeenCalled();
  });

  it('does nothing for unhandled keys', () => {
    keyHandler({
      ...baseParams,
      e: makeEvent('x'),
    });
    expect(mockOnFocusedDateChange).not.toHaveBeenCalled();
    expect(mockOnDisplayDateChange).not.toHaveBeenCalled();
  });

  describe('edge cases', () => {
    it('returns early when the active date is not in datesWithRow', () => {
      keyHandler({
        ...baseParams,
        date: new Date(2024, 2, 99),
        e: makeEvent('ArrowLeft'),
      });
      expect(mockOnFocusedDateChange).not.toHaveBeenCalled();
      expect(mockOnDisplayDateChange).not.toHaveBeenCalled();
    });

    it('does not call onDisplayDateChange when ArrowLeft leaves the month but a second month is visible on the left', () => {
      keyHandler({
        ...baseParams,
        date: datesWithRow[firstIdx].date,
        e: makeEvent('ArrowLeft'),
        hasAdjacentMonthLeft: true,
      });
      expect(mockOnFocusedDateChange).toHaveBeenCalledWith(
        new Date(year, month, 0)
      );
      expect(mockOnDisplayDateChange).not.toHaveBeenCalled();
    });

    it('does not call onDisplayDateChange when ArrowRight leaves the month but a second month is visible on the right', () => {
      keyHandler({
        ...baseParams,
        date: datesWithRow[lastIdx].date,
        e: makeEvent('ArrowRight'),
        hasAdjacentMonthRight: true,
      });
      expect(mockOnFocusedDateChange).toHaveBeenCalledWith(
        new Date(year, month + 1, 1)
      );
      expect(mockOnDisplayDateChange).not.toHaveBeenCalled();
    });

    it('does not call onDisplayDateChange when ArrowUp crosses months but a second month is visible on the left', () => {
      keyHandler({
        ...baseParams,
        date: datesWithRow[firstIdx].date,
        e: makeEvent('ArrowUp'),
        hasAdjacentMonthLeft: true,
      });
      const expected = new Date(datesWithRow[firstIdx].date);
      expected.setDate(expected.getDate() - 7);
      expect(mockOnFocusedDateChange).toHaveBeenCalledWith(expected);
      expect(mockOnDisplayDateChange).not.toHaveBeenCalled();
    });

    it('does not call onDisplayDateChange when ArrowDown crosses months but a second month is visible on the right', () => {
      keyHandler({
        ...baseParams,
        date: datesWithRow[lastIdx].date,
        e: makeEvent('ArrowDown'),
        hasAdjacentMonthRight: true,
      });
      const expected = new Date(datesWithRow[lastIdx].date);
      expected.setDate(expected.getDate() + 7);
      expect(mockOnFocusedDateChange).toHaveBeenCalledWith(expected);
      expect(mockOnDisplayDateChange).not.toHaveBeenCalled();
    });

    it('clamps PageDown from Jan 31 to Feb 29 in a leap year', () => {
      const janWeeks = getMonthGrid({ year: 2024, month: 0, firstWeekday });
      const janDates = getDatesWithRow(janWeeks);
      const jan31 = janDates.find((d) => d.date.getDate() === 31)!.date;

      keyHandler({
        ...baseParams,
        date: jan31,
        datesWithRow: janDates,
        month: 0,
        year: 2024,
        e: makeEvent('PageDown'),
      });

      expect(mockOnFocusedDateChange).toHaveBeenCalledWith(
        new Date(2024, 1, 29)
      );
      expect(mockOnDisplayDateChange).toHaveBeenCalledWith(
        new Date(2024, 1, 1)
      );
    });

    it('clamps PageUp from Mar 31 to Feb 29 in a leap year', () => {
      const marWeeks = getMonthGrid({ year: 2024, month: 2, firstWeekday });
      const marDates = getDatesWithRow(marWeeks);
      const mar31 = marDates.find((d) => d.date.getDate() === 31)!.date;

      keyHandler({
        ...baseParams,
        date: mar31,
        datesWithRow: marDates,
        month: 2,
        year: 2024,
        e: makeEvent('PageUp'),
      });

      expect(mockOnFocusedDateChange).toHaveBeenCalledWith(
        new Date(2024, 1, 29)
      );
      expect(mockOnDisplayDateChange).toHaveBeenCalledWith(
        new Date(2024, 1, 1)
      );
    });

    it('clamps Shift+PageUp from Feb 29 to Feb 28 when the previous year is not a leap year', () => {
      const febWeeksLeap = getMonthGrid({ year: 2024, month: 1, firstWeekday });
      const febDates = getDatesWithRow(febWeeksLeap);
      const feb29 = febDates.find((d) => d.date.getDate() === 29)!.date;

      keyHandler({
        ...baseParams,
        date: feb29,
        datesWithRow: febDates,
        month: 1,
        year: 2024,
        e: makeEvent('PageUp', { shiftKey: true }),
      });

      expect(mockOnFocusedDateChange).toHaveBeenCalledWith(
        new Date(2023, 1, 28)
      );
      expect(mockOnDisplayDateChange).toHaveBeenCalledWith(
        new Date(2023, 1, 1)
      );
    });

    it('calls onDateSelect on Space when not disabled', () => {
      keyHandler({
        ...baseParams,
        e: makeEvent(' '),
      });
      expect(mockOnDateSelect).toHaveBeenCalledWith(date);
      expect(mockOnFocusedDateChange).not.toHaveBeenCalled();
    });

    it('does not call onDateSelect on Space when the date is disabled', () => {
      keyHandler({
        ...baseParams,
        e: makeEvent(' '),
        disableDate: matchDisabledDates([date]),
      });
      expect(mockOnDateSelect).not.toHaveBeenCalled();
    });

    it('does not throw when Escape is pressed and onEscapeKeyPress is omitted', () => {
      expect(() =>
        keyHandler({
          ...baseParams,
          onEscapeKeyPress: undefined,
          e: makeEvent('Escape'),
        })
      ).not.toThrow();
    });
  });
});
