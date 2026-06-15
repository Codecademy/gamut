import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { DEFAULT_DATE_PICKER_TRANSLATIONS } from '../../../utils/translations';
import { CalendarFooter } from '../CalendarFooter';

const mockOnClearDate = jest.fn();
const mockOnQuickActionClick = jest.fn();

const renderView = setupRtl(CalendarFooter, {
  clearButton: {
    onClick: mockOnClearDate,
  },
  quickActions: [
    {
      num: 0,
      timePeriod: 'day',
      displayText: 'Today',
      onClick: mockOnQuickActionClick,
    },
  ],
});

describe('CalendarFooter', () => {
  it('renders null when there are no quick actions and no clear button', () => {
    const { view } = renderView({
      clearButton: undefined,
      quickActions: undefined,
    });

    expect(view.queryByRole('button')).toBeNull();
  });

  describe('clear button', () => {
    it('renders clear button when clearButton object is passed and calls onClick when clicked', async () => {
      const { view } = renderView();

      view.getByRole('button', {
        name: DEFAULT_DATE_PICKER_TRANSLATIONS.clearButtonText,
      });
    });

    it('renders clear button with custom text when text is passed', () => {
      const { view } = renderView({
        clearButton: { onClick: mockOnClearDate, text: 'Custom text' },
      });

      view.getByRole('button', { name: 'Custom text' });
    });

    it('calls onClick when clear button is clicked', async () => {
      const { view } = renderView();

      await userEvent.click(
        view.getByRole('button', {
          name: DEFAULT_DATE_PICKER_TRANSLATIONS.clearButtonText,
        })
      );

      expect(mockOnClearDate).toHaveBeenCalledTimes(1);
    });

    it('does not render clear button when clearButton object is not passed', () => {
      const { view } = renderView({ clearButton: undefined });

      expect(
        view.queryByRole('button', {
          name: DEFAULT_DATE_PICKER_TRANSLATIONS.clearButtonText,
        })
      ).toBeNull();
    });
  });

  describe('quick actions', () => {
    it('renders quick actions when quickActions array is passed', () => {
      const { view } = renderView();

      view.getByRole('button', { name: 'Today' });
    });

    it('does not render quick actions when quickActions array is not passed', () => {
      const { view } = renderView({ quickActions: undefined });

      expect(view.queryByRole('button', { name: 'Today' })).toBeNull();
    });

    it('calls onClick when a quick action is clicked', async () => {
      const { view } = renderView();

      await userEvent.click(view.getByRole('button', { name: 'Today' }));

      expect(mockOnQuickActionClick).toHaveBeenCalledTimes(1);
    });
  });
});
