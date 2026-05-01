import { MockGamutProvider, setupRtl } from '@codecademy/gamut-tests';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FC } from 'react';

import { actKeyboard } from '../../__tests__/actKeyboard';
import { DatePickerProvider } from '../../DatePickerContext';
import {
  createMockRangeContext,
  createMockSingleContext,
} from '../../DatePickerContext/__tests__/mockContexts';
import type { DatePickerContextValue } from '../../DatePickerContext/types';
import { DatePickerCalendar } from '..';

jest.mock('react-use', () => {
  const actual = jest.requireActual<typeof import('react-use')>('react-use');
  return {
    ...actual,
    /** One-month layout in tests (stable gridcell queries). */
    useMedia: jest.fn(() => false),
  };
});

type CalendarHarnessProps = { context: DatePickerContextValue };

const DatePickerCalendarHarness: FC<CalendarHarnessProps> = ({ context }) => (
  <DatePickerProvider value={context}>
    <DatePickerCalendar dialogId="test-cal-dialog" />
  </DatePickerProvider>
);

const renderCalendar = setupRtl(DatePickerCalendarHarness, {
  context: createMockSingleContext({
    isCalendarOpen: true,
    selectedDate: new Date(2024, 2, 1),
  }),
});

describe('DatePickerCalendar', () => {
  it('throws when rendered without DatePickerProvider', () => {
    expect(() =>
      render(
        <MockGamutProvider>
          <DatePickerCalendar dialogId="orphan" />
        </MockGamutProvider>
      )
    ).toThrow(/useDatePickerContext must be used within a DatePicker/);
  });

  it('renders a calendar grid when the picker context is open', () => {
    const { view } = renderCalendar();

    expect(view.getByRole('grid')).toBeInTheDocument();
  });

  it('calls setSelection when a day cell is activated in single mode', async () => {
    const onSelection = jest.fn();
    const { view } = renderCalendar({
      context: createMockSingleContext({
        isCalendarOpen: true,
        selectedDate: new Date(2024, 2, 1),
        onSelection,
      }),
    });

    const march20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
    await userEvent.click(march20);

    expect(onSelection).toHaveBeenCalledWith(new Date(2024, 2, 20));
  });

  it('calls onSelection(null) when the already-selected day is clicked again in single mode', async () => {
    const onSelection = jest.fn();
    const selected = new Date(2024, 2, 20);
    const { view } = renderCalendar({
      context: createMockSingleContext({
        isCalendarOpen: true,
        selectedDate: selected,
        onSelection,
      }),
    });

    const march20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
    await userEvent.click(march20);

    expect(onSelection).toHaveBeenCalledWith(null);
  });

  it('calls closeCalendar after selecting a date in single mode', async () => {
    const closeCalendar = jest.fn();
    const { view } = renderCalendar({
      context: createMockSingleContext({
        isCalendarOpen: true,
        selectedDate: new Date(2024, 2, 1),
        closeCalendar,
      }),
    });

    const march20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
    await userEvent.click(march20);

    expect(closeCalendar).toHaveBeenCalled();
  });

  it('invokes closeCalendar when Escape is pressed on the grid', async () => {
    const user = userEvent.setup();
    const closeCalendar = jest.fn();
    const { view } = renderCalendar({
      context: createMockSingleContext({
        isCalendarOpen: true,
        selectedDate: new Date(2024, 2, 1),
        closeCalendar,
      }),
    });

    const march15 = view.getByRole('gridcell', { name: /March 15, 2024/i });
    march15.focus();
    await actKeyboard(user, '{Escape}');

    expect(closeCalendar).toHaveBeenCalled();
  });

  it('calls onRangeSelection with a new start when the start field is active and a day is chosen', async () => {
    const onRangeSelection = jest.fn();
    const { view } = renderCalendar({
      context: createMockRangeContext({
        isCalendarOpen: true,
        startDate: new Date(2024, 2, 1),
        endDate: null,
        activeRangePart: 'start',
        onRangeSelection,
      }),
    });

    const march20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
    await userEvent.click(march20);

    expect(onRangeSelection).toHaveBeenCalledWith(new Date(2024, 2, 20), null);
  });

  it('calls setSelection in range mode when choosing an end date with the end field active', async () => {
    const onRangeSelection = jest.fn();
    const { view } = renderCalendar({
      context: createMockRangeContext({
        isCalendarOpen: true,
        startDate: new Date(2024, 2, 1),
        endDate: null,
        activeRangePart: 'end',
        onRangeSelection,
      }),
    });

    const march20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
    await userEvent.click(march20);

    expect(onRangeSelection).toHaveBeenCalledWith(
      new Date(2024, 2, 1),
      new Date(2024, 2, 20)
    );
  });

  it('calls closeCalendar in range mode when a full range is selected', async () => {
    const closeCalendar = jest.fn();
    const { view } = renderCalendar({
      context: createMockRangeContext({
        isCalendarOpen: true,
        startDate: new Date(2024, 2, 1),
        endDate: null,
        activeRangePart: 'end',
        closeCalendar,
      }),
    });

    const march20 = view.getByRole('gridcell', { name: /March 20, 2024/i });
    await userEvent.click(march20);

    expect(closeCalendar).toHaveBeenCalled();
  });
});
