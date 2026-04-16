import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getIsoFirstDayFromLocale } from '../../../utils/locale';
import { CalendarBody } from '../CalendarBody';
import { getMonthGrid } from '../utils/dateGrid';
import { formatDateForAriaLabel } from '../utils/format';

const displayDate = new Date(2024, 2, 1);
const focusedDate = new Date(2024, 2, 15);
const mockOnDateSelect = jest.fn();
const mockOnFocusedDateChange = jest.fn();
const mockOnDisplayDateChange = jest.fn();
const mockOnGridFocusRequestHandled = jest.fn();
const mockOnEscapeKeyPress = jest.fn();

const renderView = setupRtl(CalendarBody, {
  displayDate,
  selectedDate: null,
  focusedDate,
  labelledById: 'cal-heading',
  locale: 'en-US',
  onDateSelect: mockOnDateSelect,
  onFocusedDateChange: mockOnFocusedDateChange,
  onDisplayDateChange: mockOnDisplayDateChange,
  onEscapeKeyPress: mockOnEscapeKeyPress,
  focusGridSync: {
    gridFocusRequested: false,
    signal: false,
    onGridFocusRequestHandled: mockOnGridFocusRequestHandled,
  },
});

describe('CalendarBody', () => {
  it('renders a grid labelled by the heading id', () => {
    const { view } = renderView();

    const grid = view.getByRole('grid');
    expect(grid).toHaveAttribute('aria-labelledby', 'cal-heading');
  });

  it('selects a day when a gridcell is clicked', async () => {
    const { view } = renderView();

    const day15 = view.getByRole('gridcell', { name: /March 15, 2024/i });
    await userEvent.click(day15);

    expect(mockOnDateSelect).toHaveBeenCalledTimes(1);
    expect(mockOnDateSelect).toHaveBeenCalledWith(new Date(2024, 2, 15));
  });

  it('fires onFocusedDateChange when a day receives focus', () => {
    const { view } = renderView();

    const day20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
    day20.focus();

    expect(mockOnFocusedDateChange).toHaveBeenCalledTimes(1);
    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(new Date(2024, 2, 20));
  });

  it('renders a DateCell with isToday true when the date is today', () => {
    const today = new Date();
    const { view } = renderView({
      selectedDate: today,
      displayDate: today,
      focusedDate: today,
    });

    const todayCell = view.getByLabelText(
      formatDateForAriaLabel({
        date: today,
        locale: new Intl.Locale('en-US'),
      })
    );
    expect(todayCell).toHaveAttribute('aria-current', 'date');
  });

  it('renders a DateCell with isDisabled true when the date is disabled', () => {
    const { view } = renderView({
      shouldDisableDate: (date) =>
        date.getFullYear() === 2024 &&
        date.getMonth() === 2 &&
        date.getDate() === 1,
    });

    const disabledCell = view.getByRole('gridcell', { name: /March 1, 2024/i });
    expect(disabledCell).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not select a day when a disabled gridcell is clicked', async () => {
    const { view } = renderView({
      shouldDisableDate: (date) =>
        date.getFullYear() === 2024 &&
        date.getMonth() === 2 &&
        date.getDate() === 1,
    });

    const disabledCell = view.getByRole('gridcell', { name: /March 1, 2024/i });
    await userEvent.click(disabledCell);

    expect(mockOnDateSelect).not.toHaveBeenCalled();
  });

  it('calls onFocusedDateChange when a disabled day cell receives focus', async () => {
    const { view } = renderView({
      shouldDisableDate: (date) =>
        date.getFullYear() === 2024 &&
        date.getMonth() === 2 &&
        date.getDate() === 1,
    });

    const day1 = view.getByRole('gridcell', { name: /March 1, 2024/i });
    day1.focus();

    expect(mockOnFocusedDateChange).toHaveBeenCalledWith(new Date(2024, 2, 1));
  });

  it('renders a DateCell with isSelected true when the date is selected', () => {
    const { view } = renderView({ selectedDate: new Date(2024, 2, 15) });

    const selected = view.getByRole('gridcell', { name: /March 15, 2024/i });
    expect(selected).toHaveAttribute('aria-selected', 'true');
  });

  it('renders a DateCell with isInRange true when the date is in the range', () => {
    const { view } = renderView({
      selectedDate: new Date(2024, 2, 15),
      endDate: new Date(2024, 2, 20),
    });

    const inRange = view.getByRole('gridcell', { name: /March 17, 2024/i });
    expect(inRange).toHaveAttribute('aria-selected', 'true');
  });

  it('renders a DateCell with isRangeStart true when the date is the start of the range', () => {
    const { view } = renderView({
      selectedDate: new Date(2024, 2, 15),
      endDate: new Date(2024, 2, 20),
    });

    const rangeStart = view.getByRole('gridcell', { name: /March 15, 2024/i });
    expect(rangeStart).toHaveAttribute('aria-selected', 'true');
  });

  it('renders a DateCell with isRangeEnd true when the date is the end of the range', () => {
    const { view } = renderView({
      selectedDate: new Date(2024, 2, 15),
      endDate: new Date(2024, 2, 20),
    });

    const rangeEnd = view.getByRole('gridcell', { name: /March 20, 2024/i });
    expect(rangeEnd).toHaveAttribute('aria-selected', 'true');
  });

  it('moves DOM focus to the focus target and calls onGridFocusRequestHandled when grid focus is requested', async () => {
    const { view } = renderView({
      focusGridSync: {
        gridFocusRequested: true,
        signal: false,
        onGridFocusRequestHandled: mockOnGridFocusRequestHandled,
      },
    });

    const march15 = view.getByRole('gridcell', { name: /March 15, 2024/i });
    await waitFor(() => expect(march15).toHaveFocus());
    expect(mockOnGridFocusRequestHandled).toHaveBeenCalled();
  });

  it('sets tabIndex 0 on the focus target day and -1 on other day cells', () => {
    const { view } = renderView();

    const march15 = view.getByRole('gridcell', { name: /March 15, 2024/i });
    const march10 = view.getByRole('gridcell', { name: /March 10, 2024/i });
    expect(march15).toHaveAttribute('tabIndex', '0');
    expect(march10).toHaveAttribute('tabIndex', '-1');
  });

  it('uses selectedDate as the roving focus target when focusedDate is null', () => {
    const { view } = renderView({
      focusedDate: null,
      selectedDate: new Date(2024, 2, 22),
    });

    const march22 = view.getByRole('gridcell', { name: /March 22, 2024/i });
    const march15 = view.getByRole('gridcell', { name: /March 15, 2024/i });
    expect(march22).toHaveAttribute('tabIndex', '0');
    expect(march15).toHaveAttribute('tabIndex', '-1');
  });

  it('moves DOM focus to the focus target when focusGridSync is omitted (standalone)', async () => {
    const { view } = renderView({
      focusGridSync: undefined,
    });

    const march15 = view.getByRole('gridcell', { name: /March 15, 2024/i });
    await waitFor(() => expect(march15).toHaveFocus());
  });

  it('renders seven weekday column headers with scope and abbreviations', () => {
    const { view } = renderView();

    const headers = view.getAllByRole('columnheader');
    expect(headers).toHaveLength(7);
    headers.forEach((th) => {
      expect(th).toHaveAttribute('scope', 'col');
      expect(th).toHaveAttribute('abbr');
    });
  });

  it('renders one gridcell per calendar slot (days plus leading and trailing padding)', () => {
    const { view } = renderView();

    const firstWeekday = getIsoFirstDayFromLocale(new Intl.Locale('en-US'));
    const weeks = getMonthGrid({
      year: 2024,
      month: 2,
      firstWeekday,
    });
    const expectedCellCount = weeks.flat().length;

    expect(view.getAllByRole('gridcell')).toHaveLength(expectedCellCount);
  });

  describe('keyboard navigation (integration)', () => {
    it('moves focus via ArrowLeft through keyHandler', async () => {
      const { view } = renderView();

      const day20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
      day20.focus();
      await userEvent.keyboard('{ArrowLeft}');

      expect(mockOnFocusedDateChange).toHaveBeenCalledWith(
        new Date(2024, 2, 19)
      );
    });

    it('updates focus and the visible month via PageDown through keyHandler', async () => {
      const { view } = renderView();

      const day20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
      day20.focus();
      await userEvent.keyboard('{PageDown}');

      expect(mockOnFocusedDateChange).toHaveBeenLastCalledWith(
        new Date(2024, 3, 20)
      );
      expect(mockOnDisplayDateChange).toHaveBeenCalledWith(
        new Date(2024, 3, 1)
      );
    });

    it('selects the focused day on Enter', async () => {
      const { view } = renderView();

      const day20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
      day20.focus();
      await userEvent.keyboard('{Enter}');

      expect(mockOnDateSelect).toHaveBeenCalledWith(new Date(2024, 2, 20));
    });

    it('selects the focused day when key is Space', () => {
      const { view } = renderView();

      const day20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
      day20.focus();
      fireEvent.keyDown(day20, { key: ' ' });

      expect(mockOnDateSelect).toHaveBeenCalledWith(new Date(2024, 2, 20));
    });

    it('does not select a disabled day on Enter', async () => {
      const { view } = renderView({
        shouldDisableDate: (date) =>
          date.getFullYear() === 2024 &&
          date.getMonth() === 2 &&
          date.getDate() === 1,
      });

      const day1 = view.getByRole('gridcell', { name: /March 1, 2024/i });
      day1.focus();
      await userEvent.keyboard('{Enter}');

      expect(mockOnDateSelect).not.toHaveBeenCalled();
    });

    it('calls onEscapeKeyPress on Escape', async () => {
      const { view } = renderView();

      const day20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
      day20.focus();
      await userEvent.keyboard('{Escape}');

      expect(mockOnEscapeKeyPress).toHaveBeenCalled();
    });

    it('does not move focus after an unhandled key (beyond focus sync)', async () => {
      const { view } = renderView();

      const day20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
      day20.focus();
      expect(mockOnFocusedDateChange).toHaveBeenCalledWith(
        new Date(2024, 2, 20)
      );
      mockOnFocusedDateChange.mockClear();

      await userEvent.keyboard('{x}');

      expect(mockOnFocusedDateChange).not.toHaveBeenCalled();
    });
  });
});
