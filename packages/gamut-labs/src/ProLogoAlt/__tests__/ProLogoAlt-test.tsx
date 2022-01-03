import { setupRtl } from '@codecademy/gamut-tests';

import { ProLogoAlt } from '..';

const renderView = setupRtl(ProLogoAlt);

describe(ProLogoAlt, () => {
  it('renders', () => {
    renderView();
  });
});
