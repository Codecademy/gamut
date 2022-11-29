import { setupRtl } from '@codecademy/gamut-tests';

import { ProLogoAlt } from '..';

const renderView = setupRtl(ProLogoAlt);

describe('LogoProAlt', () => {
  it('renders the Pro Alt logo', () => {
    const { view } = renderView();

    view.getByLabelText('Codecademy Pro Logo');
  });
});
