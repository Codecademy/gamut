import { setupRtl } from '@codecademy/gamut-tests';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { PreviewTip } from '../PreviewTip';

const info = 'I am information';
const onClick = jest.fn();

const renderView = setupRtl(PreviewTip, {
  linkDescription: info,
  id: 'info-id',
  href: 'www.test.com/',
  onClick,
});

describe('PreviewTip', () => {
  describe('inline placement', () => {
    it('has an accessible tooltip', async () => {
      const { view } = renderView({});

      await waitFor(() => {
        expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(
          info
        );
      });
    });

    it('calls onClick when clicked', () => {
      const { view } = renderView({});

      userEvent.click(view.getByRole('link'));

      expect(onClick).toHaveBeenCalled();
    });
  });
});
describe('floating placement', () => {
  it('has an accessible tooltip', () => {
    const { view } = renderView({ placement: 'floating' });

    expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(info);
  });

  it('shows the tip when it is hovered over', async () => {
    const { view } = renderView({
      placement: 'floating',
    });

    expect(view.queryAllByText(info).length).toBe(1);

    userEvent.hover(view.getByRole('link'));

    view.getByRole('tooltip', { hidden: true });
    await waitFor(() => {
      expect(view.queryAllByText(info).length).toBe(2);
    });
  });

  it('calls onClick when clicked', () => {
    const { view } = renderView({});

    userEvent.click(view.getByRole('link'));

    expect(onClick).toHaveBeenCalled();
  });
});
