import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FC, FormEvent, FormEventHandler } from 'react';

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

type SingleInFormProps = {
  onFormSubmit: FormEventHandler<HTMLFormElement>;
} & SingleHarnessProps;

const SingleInForm: FC<SingleInFormProps> = ({
  onFormSubmit,
  ...harnessProps
}) => (
  <form data-testid="datepicker-form" onSubmit={onFormSubmit}>
    <SingleHarness {...harnessProps} />
  </form>
);

const renderSingleInForm = setupRtl(SingleInForm, {
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  },
  selectedDate: new Date(2024, 2, 1),
  onSelected: jest.fn(),
});

type RangeInFormProps = {
  onFormSubmit: FormEventHandler<HTMLFormElement>;
} & RangeHarnessProps;

const RangeInForm: FC<RangeInFormProps> = ({ onFormSubmit, ...rest }) => (
  <form data-testid="datepicker-form" onSubmit={onFormSubmit}>
    <RangeHarness {...rest} />
  </form>
);

const renderRangeInForm = setupRtl(RangeInForm, {
  onFormSubmit: (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  },
  startDate: null,
  endDate: null,
  onStartSelected: jest.fn(),
  onEndSelected: jest.fn(),
});

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

  it('associates the field label with the segment shell via aria-labelledby (DatePickerInput)', () => {
    const { view } = renderSingle();
    const shell = view.getByRole('group');
    const labelledBy = shell.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(view.container.querySelector(`#${labelledBy}`)).toBeInTheDocument();
  });

  it('renders only children when the children prop is provided', () => {
    const { view } = renderComposedOnly();

    expect(view.getByTestId('composed')).toHaveTextContent('composed');
    expect(view.queryByText('Date')).not.toBeInTheDocument();
    expect(view.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the calendar on Escape from the input when the popover is open', async () => {
    const user = userEvent.setup();
    const { view } = renderSingle();

    await user.click(view.getByRole('group'));
    expect(view.getByRole('dialog')).toBeVisible();

    const spinbutton = view.getByRole('spinbutton', { name: 'month' });
    spinbutton.focus();
    await user.keyboard('{Escape}');

    expect(view.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the calendar on Escape from a month nav chevron (not only the day grid)', async () => {
    const user = userEvent.setup();
    const { view } = renderSingle();

    await user.click(view.getByRole('group'));
    expect(view.getByRole('dialog')).toBeVisible();

    view.getByRole('button', { name: 'Last month' }).focus();
    await user.keyboard('{Escape}');

    expect(view.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('DatePicker inside a form', () => {
  it('renders the field inside the form and can open the dialog', async () => {
    const user = userEvent.setup();
    const { view } = renderSingleInForm();

    const form = view.getByTestId('datepicker-form');
    expect(form).toBeInstanceOf(HTMLFormElement);
    expect(form.querySelector('[role="group"]')).toBeInTheDocument();

    await user.click(view.getByRole('group'));
    expect(view.getByRole('dialog')).toBeVisible();
  });

  it('does not submit the form when Escape closes the calendar from the field', async () => {
    const user = userEvent.setup();
    const onFormSubmit = jest.fn((e) => e.preventDefault());
    const { view } = renderSingleInForm({ onFormSubmit });

    await user.click(view.getByRole('group'));
    view.getByRole('spinbutton', { name: 'month' }).focus();
    await user.keyboard('{Escape}');

    expect(view.queryByRole('dialog')).not.toBeInTheDocument();
    expect(onFormSubmit).not.toHaveBeenCalled();
  });

  it('does not submit the form when Escape closes the calendar from a month chevron', async () => {
    const user = userEvent.setup();
    const onFormSubmit = jest.fn((e) => e.preventDefault());
    const { view } = renderSingleInForm({ onFormSubmit });

    await user.click(view.getByRole('group'));
    view.getByRole('button', { name: 'Last month' }).focus();
    await user.keyboard('{Escape}');

    expect(onFormSubmit).not.toHaveBeenCalled();
  });

  it('does not submit the form when selecting a day in the grid', async () => {
    const user = userEvent.setup();
    const onFormSubmit = jest.fn((e) => e.preventDefault());
    const { view } = renderSingleInForm({ onFormSubmit });

    await user.click(view.getByRole('group'));
    await user.click(view.getByRole('gridcell', { name: /March 20, 2024/i }));

    expect(view.queryByRole('dialog')).not.toBeInTheDocument();
    expect(onFormSubmit).not.toHaveBeenCalled();
  });

  it('still submits the form when a real submit control is used', async () => {
    const user = userEvent.setup();
    const onFormSubmit = jest.fn((e) => e.preventDefault());

    const SingleInFormWithSubmit: FC<SingleInFormProps> = ({
      onFormSubmit: onSubmit,
      ...harness
    }) => (
      <form data-testid="datepicker-form" onSubmit={onSubmit}>
        <SingleHarness {...harness} />
        <button type="submit">Save</button>
      </form>
    );

    const renderWithButton = setupRtl(SingleInFormWithSubmit, {
      selectedDate: new Date(2024, 2, 1),
      onSelected: jest.fn(),
    });

    renderWithButton({
      onFormSubmit: (e) => {
        e.preventDefault();
        onFormSubmit(e);
      },
    });
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onFormSubmit).toHaveBeenCalledTimes(1);
  });

  it('exposes a hidden field whose name and value match FormData on submit (default DatePicker passes `name` through)', () => {
    const onFormSubmit = jest.fn((e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const hidden = form.querySelector<HTMLInputElement>(
        'input[type="hidden"]'
      )!;
      expect(hidden.name).toBeTruthy();
      expect(hidden).toHaveValue('2024-03-01');
      expect(new FormData(form).get(hidden.name)).toBe(hidden.value);
    });

    const { view } = renderSingleInForm({ onFormSubmit });
    fireEvent.submit(view.getByTestId('datepicker-form') as HTMLFormElement);
    expect(onFormSubmit).toHaveBeenCalledTimes(1);
  });

  it('sends the selected date as the ISO 8601 value in FormData on submit', () => {
    const selected = new Date(2024, 5, 15);
    const onFormSubmit = jest.fn((e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const hidden = form.querySelector<HTMLInputElement>(
        'input[type="hidden"]'
      )!;
      const key = hidden.name;
      const fromFormData = new FormData(form).get(key);
      expect(fromFormData).toBe('2024-06-15');
      expect(fromFormData).toBe(hidden.value);
    });

    const { view } = renderSingleInForm({
      onFormSubmit,
      selectedDate: selected,
    });
    fireEvent.submit(view.getByTestId('datepicker-form') as HTMLFormElement);
    expect(onFormSubmit).toHaveBeenCalledTimes(1);
  });

  it('in range mode, has two named hidden fields for start and end', () => {
    const { view } = renderRangeInForm();
    const hiddens = view.container.querySelectorAll('input[type="hidden"]');
    expect(hiddens).toHaveLength(2);
    const start = hiddens[0] as HTMLInputElement;
    const end = hiddens[1] as HTMLInputElement;
    expect(start.name).toBeTruthy();
    expect(end.name).toBeTruthy();
    expect(start.name).not.toBe(end.name);
  });

  it('in range mode, does not submit the form when opening and closing the calendar on the start field', async () => {
    const user = userEvent.setup();
    const onFormSubmit = jest.fn((e) => e.preventDefault());
    const { view } = renderRangeInForm({ onFormSubmit });

    const groups = view.getAllByRole('group');
    expect(groups).toHaveLength(2);
    await user.click(groups[0]);
    expect(view.getByRole('dialog')).toBeVisible();

    view.getByRole('button', { name: 'Next month' }).focus();
    await user.keyboard('{Escape}');

    expect(view.queryByRole('dialog')).not.toBeInTheDocument();
    expect(onFormSubmit).not.toHaveBeenCalled();
  });
});
