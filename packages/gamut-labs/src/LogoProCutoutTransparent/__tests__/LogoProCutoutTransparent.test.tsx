import { setupRtl } from '@codecademy/gamut-tests';

import { LogoProCutoutTransparent } from '..';

const renderView = setupRtl(LogoProCutoutTransparent);

describe('LogoProCutoutTransparent', () => {
  it('renders the PRO logo', () => {
    const { view } = renderView();

    view.getByLabelText('Pro');
  });
});
