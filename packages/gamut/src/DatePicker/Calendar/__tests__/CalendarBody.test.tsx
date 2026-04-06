import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { CalendarBody } from '../CalendarBody';
import { formatDateForAriaLabel } from '../utils/format';
import * as keyHandlerModule from '../utils/keyHandler';

const displayDate = new Date(2024, 2, 1);
const focusedDate = new Date(2024, 2, 15);
const mockOnDateSelect = jest.fn();
const mockOnFocusedDateChange = jest.fn();
const mockOnDisplayDateChange = jest.fn();
const mockOnGridFocusRequestHandled = jest.fn();

const renderView = setupRtl(CalendarBody, {
  displayDate,
  selectedDate: null,
  focusedDate,
  labelledById: 'cal-heading',
  locale: 'en-US',
  onDateSelect: mockOnDateSelect,
  onFocusedDateChange: mockOnFocusedDateChange,
  onDisplayDateChange: mockOnDisplayDateChange,
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

  it('calls keyHandler when a key is pressed on a focused day cell', async () => {
    const keyHandlerSpy = jest.spyOn(keyHandlerModule, 'keyHandler');

    const { view } = renderView();
    const day20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
    day20.focus();
    await userEvent.keyboard('{ArrowLeft}');

    expect(keyHandlerSpy).toHaveBeenCalledTimes(1);
    keyHandlerSpy.mockRestore();
  });

  it('renders a DateCell with isToday true when the date is today', () => {
    const today = new Date();
    const { view } = renderView({
      selectedDate: today,
      displayDate: today,
      focusedDate: today,
    });

    const todayCell = view.getByLabelText(
      formatDateForAriaLabel(today, new Intl.Locale('en-US'))
    );
    expect(todayCell).toHaveAttribute('aria-current', 'date');
  });

  it('renders a DateCell with isDisabled true when the date is disabled', () => {
    const { view } = renderView({ disabledDates: [new Date(2024, 2, 1)] });

    const disabled = view.getByRole('gridcell', { name: /March 1, 2024/i });
    expect(disabled).toHaveAttribute('aria-disabled', 'true');
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

  it('calls onGridFocusRequestHandled when grid focus is requested', () => {
    renderView({
      focusGridSync: {
        gridFocusRequested: true,
        signal: false,
        onGridFocusRequestHandled: mockOnGridFocusRequestHandled,
      },
    });

    expect(mockOnGridFocusRequestHandled).toHaveBeenCalled();
  });
});
