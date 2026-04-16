import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';
import type { FC } from 'react';

import { DatePicker } from '../DatePicker';
import type { DatePickerTranslations } from '../utils/translations';

jest.mock('react-use', () => {
  const actual = jest.requireActual<typeof import('react-use')>('react-use');
  return {
    ...actual,
    useMedia: jest.fn(() => false),
  };
});

type SingleHarnessProps = {
  selectedDate: Date | null;
  onSelected: (date: Date | null) => void;
  translations?: DatePickerTranslations;
};

const SingleHarness: FC<SingleHarnessProps> = ({
  selectedDate,
  onSelected,
  translations,
}) => (
  <DatePicker
    locale="en-US"
    mode="single"
    selectedDate={selectedDate}
    translations={translations}
    onSelected={onSelected}
  />
);

const renderSingle = setupRtl(SingleHarness, {
  selectedDate: new Date(2024, 2, 1),
  onSelected: jest.fn(),
});

type RangeHarnessProps = {
  startDate: Date | null;
  endDate: Date | null;
  onStartSelected: (date: Date | null) => void;
  onEndSelected: (date: Date | null) => void;
};

const RangeHarness: FC<RangeHarnessProps> = ({
  startDate,
  endDate,
  onStartSelected,
  onEndSelected,
}) => (
  <DatePicker
    endDate={endDate}
    locale="en-US"
    mode="range"
    startDate={startDate}
    onEndSelected={onEndSelected}
    onStartSelected={onStartSelected}
  />
);

const renderRange = setupRtl(RangeHarness, {
  startDate: null,
  endDate: null,
  onStartSelected: jest.fn(),
  onEndSelected: jest.fn(),
});

const composedSetSelected = jest.fn();

const ComposedOnlyHarness: FC = () => (
  <DatePicker
    locale="en-US"
    mode="single"
    selectedDate={null}
    onSelected={composedSetSelected}
  >
    <div data-testid="composed">composed</div>
  </DatePicker>
);

const renderComposedOnly = setupRtl(ComposedOnlyHarness, {});

describe('DatePicker', () => {
  it('does not show the calendar dialog until the input group opens it', async () => {
    const user = userEvent.setup();
    const { view } = renderSingle();

    expect(view.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(view.getByRole('group'));

    expect(view.getByRole('dialog')).toBeVisible();
  });

  it('renders a custom date label when translations override dateLabel', () => {
    const { view } = renderSingle({
      translations: { dateLabel: 'Ship date' },
    });

    view.getByText('Ship date');
  });

  it('renders two input groups in range mode', () => {
    const { view } = renderRange();

    expect(view.getAllByRole('group')).toHaveLength(2);
  });

  it('renders only children when the children prop is provided', () => {
    const { view } = renderComposedOnly();

    expect(view.getByTestId('composed')).toHaveTextContent('composed');
    expect(view.queryByText('Date')).not.toBeInTheDocument();
    expect(view.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
