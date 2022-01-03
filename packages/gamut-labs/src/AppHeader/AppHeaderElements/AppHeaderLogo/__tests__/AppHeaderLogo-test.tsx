import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { AppHeaderLogoItem } from '../../types';
import { AppHeaderLogo } from '..';

const testUrl = 'https://codecademy.com';
const action = jest.fn();

const createItem = (
  overrides?: Partial<AppHeaderLogoItem>
): AppHeaderLogoItem => ({
  id: '1dfa',
  href: testUrl,
  type: 'logo',
  pro: false,
  trackingTarget: 'tracking target',
  ...overrides,
});

const renderView = setupRtl(AppHeaderLogo, {
  action,
});

describe('AppHeaderLogo', () => {
  it('renders a logo', () => {
    const { view } = renderView({
      item: createItem({ pro: false }),
    });
    view.getByTitle('Codecademy Logo');
  });

  it('shows the pro logo when user has pro subscription', () => {
    const { view } = renderView({
      item: createItem({ pro: true }),
    });
    view.getByTitle('Codecademy Pro Logo');
  });

  it('links to the provided href', () => {
    const { view } = renderView({
      item: createItem({ pro: false }),
    });

    expect(view.getByRole('link')).toHaveAttribute('href', testUrl);
  });

  it('calls action() when clicked', () => {
    const { view } = renderView({
      item: createItem({ pro: false }),
    });

    userEvent.click(view.getByRole('link'));

    expect(action).toHaveBeenCalled();
  });
});
