import { setupRtl } from '@codecademy/gamut-tests';

import { GlobalPage } from '..';

const renderView = setupRtl(GlobalPage, {
  footer: {
    onClick: jest.fn(),
    userGeo: 'US',
  },
  header: {
    action: jest.fn(),
    search: {
      onEnable: jest.fn(),
      onSearch: jest.fn(),
      onTrackingClick: jest.fn(),
    },
    type: 'anon',
  },
});

describe('GlobalPage', () => {
  it('renders', () => {
    renderView();
  });
});
