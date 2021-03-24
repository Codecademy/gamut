import { setupRtl } from '@codecademy/gamut-tests';

import { Konamimojisplosion } from '..';

const renderView = setupRtl(Konamimojisplosion);

describe('Konamimojisplosion', () => {
  it('renders', () => {
    renderView();
  });
});
