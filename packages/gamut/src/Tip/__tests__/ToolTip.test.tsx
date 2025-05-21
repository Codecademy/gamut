import { setupRtl } from '@codecademy/gamut-tests';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ToolTipMock } from './mocks';

const info = 'I am information';
const onClick = jest.fn();

const renderView = setupRtl(ToolTipMock, {
  info,
  id: 'info-id',
  onClick,
});

describe('ToolTip', () => {
  describe('inline placement', () => {
    it('has an accessible tooltip', () => {
      const { view } = renderView({});

      expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(
        info
      );
    });

    it('calls onClick when clicked', async () => {
      const { view } = renderView({});

      await userEvent.click(view.getByRole('button'));

      expect(onClick).toHaveBeenCalled();
    });
  });
  describe('floating placement', () => {
    it('has an accessible tooltip', () => {
      const { view } = renderView({ placement: 'floating' });

      expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(
        info
      );
    });

    it('shows the tip when it is hovered over', async () => {
      const { view } = renderView({ placement: 'floating' });

      expect(view.queryAllByText(info).length).toBe(1);

      await userEvent.hover(view.getByRole('button'));

      await waitFor(() => expect(view.queryAllByText(info).length).toBe(2));
    });
    it('calls onClick when clicked', async () => {
      const { view } = renderView({});

      await userEvent.click(view.getByRole('button'));

      expect(onClick).toHaveBeenCalled();
    });
  });
});
