import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { NewToolTipMock } from './mocks';

const info = 'I am information';
const onClick = jest.fn();

const renderView = setupRtl(NewToolTipMock, {
  info,
  id: 'info-id',
  onClick,
});

describe('ToolTip', () => {
  describe('inline placement', () => {
    it('calls onClick when clicked', () => {
      const { view } = renderView({});

      userEvent.click(view.getByRole('button'));

      expect(onClick).toHaveBeenCalled();
    });
  });
  describe('floating placement', () => {
    it('shows the tip when it is hovered over', () => {
      const { view } = renderView({
        placement: 'floating',
      });

      expect(view.queryByRole('tooltip')).toBeNull();

      userEvent.hover(view.getByRole('button'));

      view.getByRole('tooltip');
    });
    it('calls onClick when clicked', () => {
      const { view } = renderView({});

      userEvent.click(view.getByRole('button'));

      expect(onClick).toHaveBeenCalled();
    });
  });
});
