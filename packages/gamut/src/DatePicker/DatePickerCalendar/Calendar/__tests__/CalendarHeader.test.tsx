import { setupRtl } from '@codecademy/gamut-tests';

import { CalendarHeader } from '../CalendarHeader';

const displayDate = new Date(2024, 2, 1);
const mockOnDisplayDateChange = jest.fn();
const mockOnLastMonthClick = jest.fn();
const mockOnNextMonthClick = jest.fn();

const renderView = setupRtl(CalendarHeader, {
  displayDate,
  headingId: 'cal-heading',
  locale: 'en-US',
  onDisplayDateChange: mockOnDisplayDateChange,
  onLastMonthClick: mockOnLastMonthClick,
  onNextMonthClick: mockOnNextMonthClick,
});

describe('CalendarHeader', () => {
  it('renders the month/year title with the given id', () => {
    const { view } = renderView();

    const title = view.container.querySelector('#cal-heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('March 2024');
  });

  it('renders last month and next month nav buttons when hideLastNav and hideNextNav are false', () => {
    const { view } = renderView();

    view.getByRole('button', { name: 'Last month' });
    view.getByRole('button', { name: 'Next month' });
  });

  it('hides last nav when hideLastNav is true', () => {
    const { view } = renderView({ hideLastNav: true });

    expect(view.queryByRole('button', { name: 'Last month' })).toBeNull();
    view.getByRole('button', { name: 'Next month' });
  });

  it('hides next nav when hideNextNav is true', () => {
    const { view } = renderView({ hideNextNav: true });

    expect(view.queryByRole('button', { name: 'Next month' })).toBeNull();
    view.queryByRole('button', { name: 'Last month' });
  });
});
