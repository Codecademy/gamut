import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { CalendarNavLastMonth } from '../CalendarNavLastMonth';
import { CalendarNavNextMonth } from '../CalendarNavNextMonth';

const onLastDisplayChange = jest.fn();
const mockOnLastMonthClick = jest.fn();
const renderLast = setupRtl(CalendarNavLastMonth, {
  displayDate: new Date(2024, 5, 15),
  locale: 'en-US',
  onDisplayDateChange: onLastDisplayChange,
  onLastMonthClick: mockOnLastMonthClick,
});

const onNextDisplayChange = jest.fn();
const mockOnNextMonthClick = jest.fn();
const renderNext = setupRtl(CalendarNavNextMonth, {
  displayDate: new Date(2024, 5, 15),
  locale: 'en-US',
  onDisplayDateChange: onNextDisplayChange,
  onNextMonthClick: mockOnNextMonthClick,
});

describe('CalendarNavLastMonth', () => {
  it('moves displayDate to the first day of the previous month', async () => {
    const { view } = renderLast();

    await userEvent.click(view.getByRole('button'));

    expect(onLastDisplayChange).toHaveBeenCalledTimes(1);
    expect(onLastDisplayChange).toHaveBeenCalledWith(new Date(2024, 4, 1));
    expect(mockOnLastMonthClick).toHaveBeenCalledTimes(1);
  });
});

describe('CalendarNavNextMonth', () => {
  it('moves displayDate to the first day of the next month', async () => {
    const { view } = renderNext();

    await userEvent.click(view.getByRole('button'));

    expect(onNextDisplayChange).toHaveBeenCalledTimes(1);
    expect(onNextDisplayChange).toHaveBeenCalledWith(new Date(2024, 6, 1));
    expect(mockOnNextMonthClick).toHaveBeenCalledTimes(1);
  });
});
