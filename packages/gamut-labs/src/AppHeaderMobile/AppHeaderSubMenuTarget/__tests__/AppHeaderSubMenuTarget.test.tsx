import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { AppHeaderSimpleDropdownItem } from '../../../AppHeader/AppHeaderElements/types';
import { createMockAppHeaderLinkItem } from '../../../AppHeader/mockAppHeaderItems';
import { AppHeaderSubMenuTarget } from '../index';

const sublink1Href = 'https://google.com';
const openSubMenu = jest.fn();

const mockItem: AppHeaderSimpleDropdownItem = {
  dataTestId: 'test-target',
  id: 'test-target',
  text: 'submenu target',
  trackingTarget: 'tracking data',
  type: 'dropdown',
  popover: [createMockAppHeaderLinkItem('sublink-1', sublink1Href, 'forum')],
};

const renderView = setupRtl(AppHeaderSubMenuTarget, {
  item: mockItem,
  openSubMenu,
});

describe('AppHeaderSubMenuTarget', () => {
  it('calls openSubMenu when the submenu target link is clicked', () => {
    const { view } = renderView();
    fireEvent.click(view.getByText('submenu target'));
    expect(openSubMenu).toHaveBeenCalled();
  });
});
