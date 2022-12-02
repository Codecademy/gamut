import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { createMockAppHeaderLinkItem } from '../../../AppHeader/mockAppHeaderItems';
import { AppHeaderSubMenuMobile } from '../index';

const sublink1Href = 'https://google.com';
const sublink2Href = 'https://medium.com';
const action = jest.fn();
const handleCloseSubMenu = jest.fn();
const handleCloseMainMenu = jest.fn();

const renderView = setupRtl(AppHeaderSubMenuMobile, {
  action,
  item: {
    dataTestId: '',
    id: 'test-link',
    text: 'menu heading',
    trackingTarget: '',
    type: 'dropdown',
    popover: [
      createMockAppHeaderLinkItem('sublink-1', sublink1Href, 'forum'),
      createMockAppHeaderLinkItem('sublink-2', sublink2Href, 'blog'),
    ],
  },
  handleCloseSubMenu,
  handleCloseMainMenu,
});

describe('AppHeaderSubMenuMobile', () => {
  it('creates sublinks with the provided hrefs', () => {
    const { view } = renderView();
    const linkArray = view
      .getAllByRole('menuitem')
      .map((node) => node.getAttribute('href'));
    expect(linkArray).toStrictEqual([sublink1Href, sublink2Href]);
  });

  it('calls handleClose when the menu link is clicked', () => {
    const { view } = renderView();
    fireEvent.click(view.getByText('Menu'));
    expect(handleCloseSubMenu).toHaveBeenCalled();
  });
});
