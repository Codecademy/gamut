import { GearIcon, PersonIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { AppHeaderProfileDropdown, AppHeaderProfileDropdownProps } from '..';

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

const props: AppHeaderProfileDropdownProps = {
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
  onClick: jest.fn(),
};

const renderAppHeaderProfileDropdown = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderProfileDropdown {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderProfileDropdown', () => {
  it('displays sublinks text upon expanding the dropdown', () => {
    renderAppHeaderProfileDropdown();
    screen.getByRole('button').click();
    expect(screen.getByText(testDropdownTexts[0]));
    expect(screen.getByText(testDropdownTexts[1]));
    expect(screen.getByText(testDropdownTexts[2]));
  });

  it('sublinks link to the provided hrefs', () => {
    renderAppHeaderProfileDropdown();
    screen.getByRole('button').click();
    expect(screen.getAllByRole('link')[0].getAttribute('href')).toEqual(
      testDropdownUrls[0]
    );
    expect(screen.getAllByRole('link')[1].getAttribute('href')).toEqual(
      testDropdownUrls[1]
    );
    expect(screen.getAllByRole('link')[2].getAttribute('href')).toEqual(
      testDropdownUrls[2]
    );
  });
});
