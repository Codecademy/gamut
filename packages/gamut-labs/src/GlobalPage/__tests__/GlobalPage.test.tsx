import { setupRtl } from '@codecademy/gamut-tests';

import { GlobalPage } from '..';

const renderView = setupRtl(GlobalPage, {
  footer: {
    onClick: jest.fn(),
    userGeo: 'US',
  },
  header: {
    action: jest.fn(),
    notifications: {
      actions: {
        clear: jest.fn(),
        click: jest.fn(),
        dismiss: jest.fn(),
        read: jest.fn(),
        track: jest.fn(),
      },
      notifications: [],
      onEnable: jest.fn(),
    },
    search: {
      onEnable: jest.fn(),
      onSearch: jest.fn(),
      onTrackingClick: jest.fn(),
    },
    type: 'pro',
    user: {
      avatar: '',
      displayName: '',
    },
  },
});

describe('GlobalPage', () => {
  it('renders', () => {
    renderView();
  });

  it('renders a banner when provided', () => {
    const { view } = renderView({
      banner: { children: 'banner text', onClose: () => null },
    });

    view.getByText('banner text');
  });
});
