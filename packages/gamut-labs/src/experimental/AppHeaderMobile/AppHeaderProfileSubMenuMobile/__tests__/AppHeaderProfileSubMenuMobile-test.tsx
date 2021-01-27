import { GearIcon, PersonIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import {
  AppHeaderProfileSubMenuMobile,
  AppHeaderProfileSubMenuMobileProps,
} from '../index';

const onClick = jest.fn();
const handleClose = jest.fn();

const testDropdownTexts = [
  'Test SubLink 1 Text',
  'Test Sublink 2 Text',
  'Test Sublink 3 Text',
];
const testDropdownUrls = [
  'test-sublink-url-1',
  'test-sublink-url-2',
  'test-sublink-url-3',
];

const props: AppHeaderProfileSubMenuMobileProps = {
  baseZIndex: 1,
  item: {
    avatar: '',
    displayName: 'Codey',
    id: 'profile',
    text: 'Profile',
    popover: [
      {
        id: 'sublink-1',
        icon: PersonIcon,
        text: testDropdownTexts[0],
        href: testDropdownUrls[0],
        trackingTarget: '',
        type: 'link',
      },
      {
        id: 'sublink-2',
        icon: GearIcon,
        text: testDropdownTexts[1],
        href: testDropdownUrls[1],
        trackingTarget: '',
        type: 'link',
      },
      {
        id: 'sublink-3',
        text: testDropdownTexts[2],
        href: testDropdownUrls[2],
        topSeparator: true,
        trackingTarget: '',
        type: 'link',
      },
    ],
    trackingTarget: '',
    type: 'profile-dropdown',
  },
  handleClose: handleClose,
  onClick,
};

const renderAppHeaderProfileSubMenuMobile = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderProfileSubMenuMobile {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderProfileSubMenuMobile', () => {
  it('creates sublinks with the provided hrefs', () => {
    renderAppHeaderProfileSubMenuMobile();
    const linkArray = screen
      .getAllByRole('link')
      .map((node) => node.getAttribute('href'));
    expect(linkArray).toStrictEqual(testDropdownUrls);
  });

  it('calls handleClose when the menu link is clicked', () => {
    renderAppHeaderProfileSubMenuMobile();
    screen.getByText('Full Menu').click();
    expect(handleClose).toHaveBeenCalled();
  });
});
