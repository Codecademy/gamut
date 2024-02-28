import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { NewToolTipMock } from './mocks';

const info = 'I am information';

const renderView = setupRtl(NewToolTipMock, {
  info,
  id: 'info-id',
});

describe('ToolTip', () => {
  describe('inline placement', () => {
    it('shows the tip when moused over', async () => {
      const { view } = renderView({});

      const tip = view.getByText(info);
      // userEvent.unhover(two);
      userEvent.hover(view.getByRole('button'));
      await waitFor(() => {
        expect(tip).toBeVisible();
      });

      userEvent.unhover(view.getByRole('button'));
      await waitFor(() => {
        expect(tip).not.toBeVisible();
      });
    });
  });

  describe('floating placement', () => {
    it('shows the tip when it is clicked on', () => {
      const { view } = renderView({
        placement: 'floating',
      });

      expect(view.queryByText(info)).toBeNull();

      userEvent.hover(view.getByRole('button'));

      view.getByText(info);
    });
  });
});
