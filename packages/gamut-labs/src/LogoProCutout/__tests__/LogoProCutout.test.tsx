import { setupRtl } from '@codecademy/gamut-tests';

import { LogoProCutout } from '..';

const renderView = setupRtl(LogoProCutout);

describe('LogoProCutout', () => {
  it('renders the PRO logo', () => {
    const { view } = renderView();

    view.getByLabelText('Pro');
  });
});
