import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ToolTipMock } from './mocks';

const ariaLabel = 'Click';
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
    it('removes the label text when hasLabel is true', () => {
      const { view } = renderView({
        'aria-label': ariaLabel,
        info: `${ariaLabel}, ${info}`,
      });

      view.getByRole('button', { name: 'Click' });
      expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(
        info
      );
    });
    it('hides ariaTooltip when there is no text other than the aria-label', () => {
      const { view } = renderView({
        'aria-label': ariaLabel,
        info: `${ariaLabel}`,
      });

      view.getByRole('button', { name: 'Click' });
      expect(view.queryByRole('tooltip')).toBeNull();
    });

    it('calls onClick when clicked', async () => {
      const { view } = renderView({});

      await userEvent.click(view.getByRole('button'));

      expect(onClick).toHaveBeenCalled();
    });

    it('hides ariaTooltip when there is hideAriaToolTip is true', () => {
      const { view } = renderView({
        'aria-label': ariaLabel,
        info: `${ariaLabel}`,
      });

      view.getByRole('button', { name: 'Click' });
      expect(view.queryByRole('tooltip')).toBeNull();
    });
  });
  describe('floating placement', () => {
    it('has an accessible tooltip', async () => {
      const { view } = renderView({ placement: 'floating' });
      view.getByRole('button');

      fireEvent.mouseOver(view.getByRole('button'));

      expect(await view.findByRole('tooltip')).toBeInTheDocument();
    });

    it('shows the tip when it is hovered over', async () => {
      const { view } = renderView({ placement: 'floating' });

      expect(view.queryByText(info)).toBeFalsy();

      view.getByRole('button');

      fireEvent.mouseOver(view.getByRole('button'));

      expect(await view.findByText(info)).toBeInTheDocument();
    });
    it('calls onClick when clicked', async () => {
      const { view } = renderView({});

      await userEvent.click(view.getByRole('button'));

      expect(onClick).toHaveBeenCalled();
    });
  });
});
