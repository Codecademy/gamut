import { setupRtl } from '@codecademy/gamut-tests';

import { TabNavLink } from '../TabNavLink';

const renderView = setupRtl(TabNavLink, {
  href: '/',
  children: 'Tab Link',
});

describe('TabNavLink', () => {
  it('renders with role button by default', () => {
    const { view } = renderView();

    view.getByRole('button', { name: 'Tab Link' });
  });
});
