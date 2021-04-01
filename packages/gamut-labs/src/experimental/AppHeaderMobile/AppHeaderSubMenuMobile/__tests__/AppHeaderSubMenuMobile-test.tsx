import { setupRtl } from '@codecademy/gamut-tests';
import { screen } from '@testing-library/react';

import { createMockAppHeaderLinkItem } from '../../../AppHeader/mockAppHeaderItems';
import { AppHeaderSubMenuMobile } from '../index';

const sublink1Href = 'https://google.com';
const sublink2Href = 'https://medium.com';
const action = jest.fn();
const handleClose = jest.fn();

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
  handleClose,
});

describe('AppHeaderSubMenuMobile', () => {
  it('creates sublinks with the provided hrefs', () => {
    renderView();
    const linkArray = screen
      .getAllByRole('link')
      .map((node) => node.getAttribute('href'));
    expect(linkArray).toStrictEqual([sublink1Href, sublink2Href]);
  });

  it('calls handleClose when the menu link is clicked', () => {
    renderView();
    screen.getByText('Full Menu').click();
    expect(handleClose).toHaveBeenCalled();
  });
});
