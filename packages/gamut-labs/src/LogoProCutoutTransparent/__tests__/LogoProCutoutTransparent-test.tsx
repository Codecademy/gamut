import { setupRtl } from '@codecademy/gamut-tests';

import { LogoProCutoutTransparent } from '..';

const renderView = setupRtl(LogoProCutoutTransparent);

describe('LogoProCutoutTransparent', () => {
  it('renders', () => {
    renderView();
  });
});
