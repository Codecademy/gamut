import { setupRtl } from '@codecademy/gamut-tests';

import { LogoProCutout } from '..';

const renderView = setupRtl(LogoProCutout);

describe('LogoProCutout', () => {
  it('renders', () => {
    renderView();
  });
});
