import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { DEFAULT_DATE_PICKER_TRANSLATIONS } from '../../utils/translations';
import { CalendarFooter } from '../CalendarFooter';

const mockOnClearDate = jest.fn();
const mockOnTodayClick = jest.fn();

const renderView = setupRtl(CalendarFooter, {
  locale: 'en-US',
  onClearDate: mockOnClearDate,
  onTodayClick: mockOnTodayClick,
});

describe('CalendarFooter', () => {
  it('calls onTodayClick when the today button is clicked', async () => {
    const { view } = renderView();

    await userEvent.click(view.getByRole('button', { name: /today/i }));

    expect(mockOnTodayClick).toHaveBeenCalledTimes(1);
  });

  it('renders clear button when showClearButton is true and calls onClearDate when clicked', async () => {
    const { view } = renderView({
      showClearButton: true,
    });

    await userEvent.click(
      view.getByRole('button', {
        name: DEFAULT_DATE_PICKER_TRANSLATIONS.clearText,
      })
    );

    expect(mockOnClearDate).toHaveBeenCalledTimes(1);
  });

  it('does not render clear button when showClearButton is false', () => {
    const { view } = renderView({ showClearButton: false });

    expect(
      view.queryByRole('button', { name: /clear/i })
    ).not.toBeInTheDocument();
  });

  it('renders passed clearText when provided', () => {
    const { view } = renderView({
      showClearButton: true,
      clearText: 'Clear dates',
    });

    view.getByRole('button', { name: 'Clear dates' });
  });
});
