import { setupRtl } from '@codecademy/gamut-tests';

import { GlobalPage } from '..';

const renderView = setupRtl(GlobalPage, {
  footer: {
    onClick: jest.fn(),
    userGeo: 'US',
  },
  header: {
    action: jest.fn(),
    type: 'anon',
  },
});

describe('GlobalPage', () => {
  it('renders', () => {
    renderView();
  });
});
