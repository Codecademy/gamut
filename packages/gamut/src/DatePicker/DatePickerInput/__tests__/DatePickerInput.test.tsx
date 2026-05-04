import { MockGamutProvider, setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps, FC } from 'react';

import { DatePickerProvider } from '../../DatePickerContext';
import {
  createMockRangeContext,
  createMockSingleContext,
} from '../../DatePickerContext/__tests__/mockContexts';
import type { DatePickerContextValue } from '../../DatePickerContext/types';
import { DatePickerInput } from '../index';

type HarnessProps = { context: DatePickerContextValue } & ComponentProps<
  typeof DatePickerInput
>;

const DatePickerInputHarness: FC<HarnessProps> = ({
  context,
  ...inputProps
}) => (
  <DatePickerProvider value={context}>
    <DatePickerInput {...inputProps} />
  </DatePickerProvider>
);

const renderInput = setupRtl(DatePickerInputHarness, {
  context: createMockSingleContext(),
});

type RangeLabelsHarnessProps = {
  startLabel?: string;
  endLabel?: string;
};

const RangeLabelsHarness: FC<RangeLabelsHarnessProps> = ({
  startLabel,
  endLabel,
}) => {
  const context = createMockRangeContext();
  return (
    <DatePickerProvider value={context}>
      <DatePickerInput label={startLabel} rangePart="start" />
      <DatePickerInput label={endLabel} rangePart="end" />
    </DatePickerProvider>
  );
};

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
    const user = userEvent.setup();
    const openCalendar = jest.fn();
    const { view } = renderInput({
      context: createMockSingleContext({ openCalendar, isCalendarOpen: false }),
    });

    await user.click(view.getByRole('group'));

    expect(openCalendar).toHaveBeenCalledTimes(1);
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
    const { view } = renderInput();

    const hidden = view.container.querySelector('input[type="hidden"]')!;
    expect(hidden).toHaveValue('2024-03-15');
  });

  it('moves focus between segments with ArrowLeft and ArrowRight', async () => {
    const user = userEvent.setup();
    const { view } = renderInput({
      context: createMockSingleContext({ selectedDate: null }),
    });

    const month = view.getByRole('spinbutton', { name: 'month' });
    const day = view.getByRole('spinbutton', { name: 'day' });
    const year = view.getByRole('spinbutton', { name: 'year' });

    month.focus();
    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(day);

    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(year);

    await user.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(day);
  });

  it('updates the hidden input when a full date is typed (auto-advance between segments)', async () => {
    const user = userEvent.setup();
    const { view } = renderInput({
      context: createMockSingleContext({ selectedDate: null }),
    });

    const month = view.getByRole('spinbutton', { name: 'month' });
    const day = view.getByRole('spinbutton', { name: 'day' });
    const year = view.getByRole('spinbutton', { name: 'year' });

    month.focus();
    await user.keyboard('03');
    expect(document.activeElement).toBe(day);
    await user.keyboard('15');
    expect(document.activeElement).toBe(year);
    await user.keyboard('2024');

    const hidden = view.container.querySelector('input[type="hidden"]')!;
    expect(hidden).toHaveValue('2024-03-15');
  });

  it('normalizes and keeps a valid date after blur', async () => {
    const user = userEvent.setup();
    const { view } = renderInput({
      context: createMockSingleContext({ selectedDate: null }),
    });

    const month = view.getByRole('spinbutton', { name: 'month' });
    const year = view.getByRole('spinbutton', { name: 'year' });

    month.focus();
    await user.keyboard('03');
    await user.keyboard('15');
    await user.keyboard('2024');

    fireEvent.blur(year, { relatedTarget: document.body });

    const hidden = view.container.querySelector('input[type="hidden"]')!;
    expect(hidden).toHaveValue('2024-03-15');
  });
});
