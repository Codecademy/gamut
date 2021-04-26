import { setupRtl } from '@codecademy/gamut-tests';

import { GlobalFooter } from '..';

const renderView = setupRtl(GlobalFooter, {
  onClick: jest.fn(),
  userGeo: 'US',
});

describe('GlobalFooter', () => {
  it('does not explode', () => {
    const { view } = renderView();

    view.getByRole('contentinfo');
  });
});
