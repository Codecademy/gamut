import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { createMockAppHeaderLinkItem } from '../../../AppHeader/mockAppHeaderItems';
import {
  AppHeaderSubMenuMobile,
  AppHeaderSubMenuMobileProps,
} from './../index';

const sublink1Href = 'https://google.com';
const sublink2Href = 'https://medium.com';
const onClick = jest.fn();
const handleClose = jest.fn();

const props: AppHeaderSubMenuMobileProps = {
  baseZIndex: 1,
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
  handleClose: handleClose,
  onClick,
};

const renderAppHeaderSubMenuMobile = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderSubMenuMobile {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderSubMenuMobile', () => {
  it('creates sublinks with the provided hrefs', () => {
    renderAppHeaderSubMenuMobile();
    const linkArray = screen
      .getAllByRole('link')
      .map((node) => node.getAttribute('href'));
    expect(linkArray).toStrictEqual([sublink1Href, sublink2Href]);
  });

  it('calls handleClose when the menu link is clicked', () => {
    renderAppHeaderSubMenuMobile();
    screen.getByText('Full Menu').click();
    expect(handleClose).toHaveBeenCalled();
  });
});
