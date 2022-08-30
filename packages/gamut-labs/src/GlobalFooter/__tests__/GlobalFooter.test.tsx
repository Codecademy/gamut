import { setupRtl } from '@codecademy/gamut-tests';

import { GlobalFooter } from '..';

const renderView = setupRtl(GlobalFooter, {
  onClick: jest.fn(),
});

describe('GlobalFooter', () => {
  it('does not explode', () => {
    const { view } = renderView();

    view.getByRole('contentinfo');
  });
});
