import { setupRtl } from '@codecademy/gamut-tests';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { ToolTipMock } from './mocks';

const ariaLabel = 'Click';
const info = 'I am information';
const onClick = jest.fn();

const renderView = setupRtl(ToolTipMock, {
  info,
  id: 'info-id',
  onClick,
  hasRepetitiveLabel: false,
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
        hasRepetitiveLabel: true,
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
        hasRepetitiveLabel: true,
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
        hideAriaToolTip: true,
        info: `${ariaLabel}`,
      });

      view.getByRole('button', { name: 'Click' });
      expect(view.queryByRole('tooltip')).toBeNull();
    });
  });
});
describe('floating placement', () => {
  it('has an accessible tooltip', () => {
    const { view } = renderView({ placement: 'floating' });

    expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(info);
  });
  it('removes the label text when hasRepetitiveLabel is true', () => {
    const { view } = renderView({
      'aria-label': ariaLabel,
      placement: 'floating',
      hasRepetitiveLabel: true,
      info: `${ariaLabel}, ${info}`,
    });

    view.getByRole('button', { name: 'Click' });
    expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(info);
  });
  it('shows the tip when it is hovered over', async () => {
    const { view } = renderView({
      placement: 'floating',
    });

    expect(view.queryAllByText(info).length).toBe(1);

    await userEvent.hover(view.getByRole('button'));

    view.getByRole('tooltip', { hidden: true });
    await waitFor(() => expect(view.queryAllByText(info).length).toBe(2));
  });
  it('calls onClick when clicked', async () => {
    const { view } = renderView({});

    await userEvent.click(view.getByRole('button'));

    expect(onClick).toHaveBeenCalled();
  });
});
