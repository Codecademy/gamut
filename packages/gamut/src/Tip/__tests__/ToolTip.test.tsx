import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { NewToolTipMock } from './mocks';

const info = 'I am information';

const renderView = setupRtl(NewToolTipMock, {
  info,
  id: 'info-id',
});

describe('ToolTip', () => {
  describe('floating placement', () => {
    it('shows the tip when it is hovered over', () => {
      const { view } = renderView({
        placement: 'floating',
      });

      expect(view.queryByText(info)).toBeNull();

      userEvent.hover(view.getByRole('button'));

      view.getByText(info);
    });
  });
});
