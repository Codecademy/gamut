import { setupRtl } from '@codecademy/gamut-tests';

import { createMockAppHeaderLinkItem } from '../../../AppHeader/mockAppHeaderItems';
import { AppHeaderSubMenuTarget } from '../index';

const openSubMenu = jest.fn();

const renderView = setupRtl(AppHeaderSubMenuTarget, {
  item: {
    dataTestId: 'test-target',
    id: 'test-target',
    text: 'submenu target',
    trackingTarget: 'tracking data',
    type: 'dropdown',
    popover: [
      createMockAppHeaderLinkItem('sublink-1', 'https://google.com', 'forum'),
    ],
  },
  openSubMenu,
});

describe('AppHeaderSubMenuTarget', () => {
  it('calls openSubMenu when the submenu target link is clicked', () => {
    renderView().view.getByText('submenu target').click();
    expect(openSubMenu).toHaveBeenCalled();
  });
});
