import { MockGamutProvider } from '@codecademy/gamut-tests';
import { render } from '@testing-library/react';

import { DatePickerProvider, useDatePicker } from '..';
import {
  createMockRangeContext,
  createMockSingleContext,
} from './mockContexts';

const Consumer = () => {
  const ctx = useDatePicker();
  return <span data-testid="mode">{ctx.mode}</span>;
};

const RangeDatesConsumer = () => {
  const ctx = useDatePicker();
  if (ctx.mode !== 'range') return null;
  return (
    <span data-testid="range-dates">
      {ctx.startDate?.toDateString() ?? 'no-start'}|
      {ctx.endDate?.toDateString() ?? 'no-end'}
    </span>
  );
};

describe('DatePickerContext', () => {
  it('throws when useDatePicker is used outside DatePickerProvider', () => {
    expect(() =>
      render(
        <MockGamutProvider>
          <Consumer />
        </MockGamutProvider>
      )
    ).toThrow('useDatePickerContext must be used within a DatePicker.');
  });

  it('returns single-mode context from useDatePicker when wrapped in DatePickerProvider', () => {
    const { getByTestId } = render(
      <MockGamutProvider>
        <DatePickerProvider value={createMockSingleContext()}>
          <Consumer />
        </DatePickerProvider>
      </MockGamutProvider>
    );

    expect(getByTestId('mode')).toHaveTextContent('single');
  });

  it('exposes range fields when the provider value is range mode', () => {
    const { getByTestId } = render(
      <MockGamutProvider>
        <DatePickerProvider value={createMockRangeContext()}>
          <Consumer />
        </DatePickerProvider>
      </MockGamutProvider>
    );

    expect(getByTestId('mode')).toHaveTextContent('range');
  });

  it('passes startDate and endDate through to consumers in range mode', () => {
    const start = new Date(2026, 3, 10);
    const end = new Date(2026, 3, 20);
    const { getByTestId } = render(
      <MockGamutProvider>
        <DatePickerProvider
          value={createMockRangeContext({ startDate: start, endDate: end })}
        >
          <RangeDatesConsumer />
        </DatePickerProvider>
      </MockGamutProvider>
    );

    expect(getByTestId('range-dates')).toHaveTextContent(
      `${start.toDateString()}|${end.toDateString()}`
    );
  });
});
