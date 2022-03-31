import { setupRtl } from '@codecademy/gamut-tests';

import { GlobalFooter } from '..';

const renderView = setupRtl(GlobalFooter, {
  onClick: jest.fn(),
  showNewFooter: false,
  userGeo: 'US',
});

describe('GlobalFooter', () => {
  it('does not explode', () => {
    const { view } = renderView();

    view.getByRole('contentinfo');
  });

  it('shows new footer when showNewFooter is true', () => {
    const { view } = renderView({ showNewFooter: true });

    view.getByText('this is a test');
  });
});
