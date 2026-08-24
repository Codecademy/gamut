import { MockGamutProvider, setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FC } from 'react';

import { DatePickerProvider } from '../../DatePickerContext';
import {
  createMockRangeContext,
  createMockSingleContext,
} from '../../DatePickerContext/__tests__/mockContexts';
import type {
  DatePickerRangeContextValue,
  DatePickerSingleContextValue,
} from '../../DatePickerContext/types';
import { DEFAULT_DATE_PICKER_TRANSLATIONS } from '../../utils/translations';
import { DatePickerInput, type DatePickerInputProps } from '../index';

const mockOpenCalendar = jest.fn();
const mockOnSelection = jest.fn();
const mockOnRangeSelection = jest.fn();
const mockSetHasError = jest.fn();

/* Single-date harness: pass context overrides (selectedDate, disableDate,
   translations, …) and the input `label` flat, e.g. renderInput({ selectedDate: null }). */
type SingleInputHarnessProps = Partial<DatePickerSingleContextValue> &
  Pick<DatePickerInputProps, 'label'>;

const SingleInputHarness: FC<SingleInputHarnessProps> = ({
  label,
  ...contextOverrides
}) => (
  <DatePickerProvider value={createMockSingleContext(contextOverrides)}>
    <DatePickerInput label={label} />
  </DatePickerProvider>
);

const renderInput = setupRtl(SingleInputHarness, {
  selectedDate: null,
  onSelection: mockOnSelection,
  openCalendar: mockOpenCalendar,
  setHasError: mockSetHasError,
});

/* Single range-input harness: one input tied to a range context, e.g.
   renderRangeInput({ startDate, endDate, disableDate }). Defaults to the end part. */
type RangeInputHarnessProps = Partial<DatePickerRangeContextValue> &
  Pick<DatePickerInputProps, 'label' | 'rangePart'>;

const RangeInputHarness: FC<RangeInputHarnessProps> = ({
  label,
  rangePart,
  ...contextOverrides
}) => (
  <DatePickerProvider value={createMockRangeContext(contextOverrides)}>
    <DatePickerInput label={label} rangePart={rangePart} />
  </DatePickerProvider>
);

// Disables March 20, 2024 - a date that sits inside the range typed below.
const disableDate = (date: Date) =>
  date.getFullYear() === 2024 && date.getMonth() === 2 && date.getDate() === 20;

const renderRangeInput = setupRtl(RangeInputHarness, {
  startDate: new Date(2024, 2, 15),
  endDate: null,
  activeRangePart: 'end',
  disableDate,
  rangePart: 'end',
  onRangeSelection: mockOnRangeSelection,
});

/* Range-labels harness: both start and end inputs, for the label tests only. */
type RangeLabelsHarnessProps = {
  startLabel?: string;
  endLabel?: string;
};

const RangeLabelsHarness: FC<RangeLabelsHarnessProps> = ({
  startLabel,
  endLabel,
}) => (
  <DatePickerProvider value={createMockRangeContext()}>
    <DatePickerInput label={startLabel} rangePart="start" />
    <DatePickerInput label={endLabel} rangePart="end" />
  </DatePickerProvider>
);

const renderRange = setupRtl(RangeLabelsHarness, {});

describe('DatePickerInput', () => {
  it('throws when rendered without DatePickerProvider', () => {
    expect(() =>
      render(
        <MockGamutProvider>
          <DatePickerInput />
        </MockGamutProvider>
      )
    ).toThrow(/useDatePickerContext must be used within a DatePicker/);
  });

  it('calls openCalendar when the shell is clicked', async () => {
    const { view } = renderInput();

    await userEvent.click(view.getByRole('group'));

    expect(mockOpenCalendar).toHaveBeenCalledTimes(1);
  });

  it('exposes an accessible name from the openCalendarLabel translation', () => {
    const { view } = renderInput();

    view.getByRole('button', { name: 'Open calendar' });
  });

  it('uses a custom openCalendarLabel translation when provided', () => {
    const { view } = renderInput({
      translations: {
        ...DEFAULT_DATE_PICKER_TRANSLATIONS,
        openCalendarLabel: 'Pick a date',
      },
    });

    view.getByRole('button', { name: 'Pick a date' });
  });

  it('calls openCalendar when the calendar trigger button is clicked', async () => {
    const { view } = renderInput();

    await userEvent.click(view.getByRole('button', { name: 'Open calendar' }));

    expect(mockOpenCalendar).toHaveBeenCalledTimes(1);
  });

  it('renders default Date label in single date mode', () => {
    const { view } = renderInput();

    view.getByText('Date');
  });

  it('renders default Start date and End date labels in range mode', () => {
    const { view } = renderRange();

    view.getByText('Start date');
    view.getByText('End date');
  });

  it('renders a custom label when provided in single date mode', () => {
    const { view } = renderInput({ label: 'Ship date' });

    view.getByText('Ship date');
  });

  it('renders a custom label when provided in range mode', () => {
    const { view } = renderRange({
      startLabel: 'The Beginning',
      endLabel: 'The End',
    });

    view.getByText('The Beginning');
    view.getByText('The End');
  });

  it('syncs hidden input to the context selected date (ISO date-only)', () => {
    const { view } = renderInput({ selectedDate: new Date(2024, 2, 15) });

    const hidden = view.container.querySelector('input[type="hidden"]')!;
    expect(hidden).toHaveValue('2024-03-15');
  });

  it('moves focus between segments with ArrowLeft and ArrowRight', async () => {
    const { view } = renderInput();

    const month = view.getByRole('spinbutton', { name: 'month' });
    const day = view.getByRole('spinbutton', { name: 'day' });
    const year = view.getByRole('spinbutton', { name: 'year' });

    month.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(day);

    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(year);

    await userEvent.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(day);
  });

  it('updates the hidden input when a full date is typed (auto-advance between segments)', async () => {
    const { view } = renderInput();

    const month = view.getByRole('spinbutton', { name: 'month' });
    const day = view.getByRole('spinbutton', { name: 'day' });
    const year = view.getByRole('spinbutton', { name: 'year' });

    month.focus();
    await userEvent.keyboard('03');
    expect(document.activeElement).toBe(day);
    await userEvent.keyboard('15');
    expect(document.activeElement).toBe(year);
    await userEvent.keyboard('2024');

    const hidden = view.container.querySelector('input[type="hidden"]')!;
    expect(hidden).toHaveValue('2024-03-15');
  });

  it('normalizes and keeps a valid date after blur', async () => {
    const { view } = renderInput();

    const month = view.getByRole('spinbutton', { name: 'month' });
    const year = view.getByRole('spinbutton', { name: 'year' });

    month.focus();
    await userEvent.keyboard('03');
    await userEvent.keyboard('15');
    await userEvent.keyboard('2024');

    fireEvent.blur(year, { relatedTarget: document.body });

    const hidden = view.container.querySelector('input[type="hidden"]')!;
    expect(hidden).toHaveValue('2024-03-15');
  });

  describe('single-date validation', () => {
    const typeDate = async (
      view: ReturnType<typeof renderInput>['view'],
      { month, day, year }: { month: string; day: string; year: string }
    ) => {
      view.getByRole('spinbutton', { name: 'month' }).focus();
      await userEvent.keyboard(month);
      await userEvent.keyboard(day);
      await userEvent.keyboard(year);
    };

    it('shows an invalid-month error and does not commit when the month is out of range', async () => {
      const { view } = renderInput();

      await typeDate(view, { month: '13', day: '15', year: '2024' });

      view.getByText('Month must be between 1 and 12');
      expect(mockOnSelection).not.toHaveBeenCalled();
    });

    it('shows a rollover error when the day overflows the month', async () => {
      const { view } = renderInput();

      await typeDate(view, { month: '02', day: '30', year: '2024' });

      view.getByText('February does not have 30 days');
      expect(mockOnSelection).not.toHaveBeenCalled();
    });

    it('shows the unavailable error and does not commit when a disabled date is typed', async () => {
      const disableDate = (date: Date) =>
        date.getFullYear() === 2024 &&
        date.getMonth() === 2 &&
        date.getDate() === 20;
      const { view } = renderInput({ disableDate });

      await typeDate(view, { month: '03', day: '20', year: '2024' });

      view.getByText('This date is not available');
      expect(mockOnSelection).not.toHaveBeenCalled();
    });

    it('surfaces the validation message through an alert region', async () => {
      const { view } = renderInput();

      await typeDate(view, { month: '13', day: '15', year: '2024' });

      expect(view.getByRole('alert')).toHaveTextContent(
        'Month must be between 1 and 12'
      );
    });

    it('marks the segments as invalid while an error is showing', async () => {
      const { view } = renderInput();

      await typeDate(view, { month: '13', day: '15', year: '2024' });

      expect(view.getByRole('spinbutton', { name: 'month' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    });

    it('commits a valid date and shows no error', async () => {
      const { view } = renderInput();

      await typeDate(view, { month: '03', day: '15', year: '2024' });

      expect(view.queryByRole('alert')).toBeNull();
      expect(mockOnSelection).toHaveBeenCalledWith(new Date(2024, 2, 15));
    });

    it('clears a prior error once the entry is corrected', async () => {
      const { view } = renderInput();

      const month = view.getByRole('spinbutton', { name: 'month' });
      month.focus();
      await userEvent.keyboard('13');
      await userEvent.keyboard('15');
      await userEvent.keyboard('2024');
      view.getByText('Month must be between 1 and 12');

      // Correct the month back to a valid value.
      month.focus();
      await userEvent.keyboard('03');

      expect(view.queryByText('Month must be between 1 and 12')).toBeNull();
    });

    it('shows an incomplete-date error on blur when the entry is partial', async () => {
      const { view } = renderInput();

      const month = view.getByRole('spinbutton', { name: 'month' });
      month.focus();
      await userEvent.keyboard('03');

      fireEvent.blur(month, { relatedTarget: document.body });

      view.getByText('Incomplete date');
    });

    it('reports the error state to the context via setHasError', async () => {
      const { view } = renderInput();

      await typeDate(view, { month: '13', day: '15', year: '2024' });

      expect(mockSetHasError).toHaveBeenLastCalledWith(true);
    });
  });

  describe('range disabled-date validation', () => {
    it('shows the range error and does not commit when a typed range spans a disabled date', async () => {
      const { view } = renderRangeInput();

      view.getByRole('spinbutton', { name: 'month' }).focus();
      await userEvent.keyboard('03');
      await userEvent.keyboard('25');
      await userEvent.keyboard('2024');

      view.getByText('This date range contains unavailable dates');
      expect(mockOnRangeSelection).not.toHaveBeenCalled();
    });

    it('commits and clears the error when the typed range avoids disabled dates', async () => {
      const { view } = renderRangeInput();

      view.getByRole('spinbutton', { name: 'month' }).focus();
      await userEvent.keyboard('03');
      await userEvent.keyboard('18');
      await userEvent.keyboard('2024');

      expect(
        view.queryByText('This date range contains unavailable dates')
      ).toBeNull();
      expect(mockOnRangeSelection).toHaveBeenCalledWith(
        new Date(2024, 2, 15),
        new Date(2024, 2, 18)
      );
    });
  });
});
