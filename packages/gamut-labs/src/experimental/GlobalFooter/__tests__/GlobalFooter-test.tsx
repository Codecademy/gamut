import { setupRtl } from '@codecademy/gamut-tests';

import { GlobalFooter } from '..';

const renderView = setupRtl(GlobalFooter, {
  userGeo: 'US',
});

describe('GlobalFooter', () => {
  it('does not explode', () => {
    renderView();
  });
});
