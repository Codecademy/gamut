import { IconButton } from '@codecademy/gamut';
import { FaviconIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { AppHeader, AppHeaderProps } from '..';

const onClick = jest.fn();

const props: AppHeaderProps = {
  items: {
    left: [
      {
        id: 'logo-1',
        href: 'http://codecademy.com',
        pro: false,
        trackingTarget: 'tracking-target',
        type: 'logo',
      },
      {
        id: 'link',
        href: 'http://codecademy.com',
        trackingTarget: 'tracking-target',
        text: 'AppHeaderLink',
        type: 'link',
      },
      {
        id: 'dropdown',
        text: 'AppHeaderDropdown',
        popover: [
          {
            id: 'sublink-1',
            href: 'http://codecademy.com',
            trackingTarget: 'tracking-target',
            text: 'AppHeaderLink',
            type: 'link',
          },
          {
            id: 'sublink-2',
            href: 'http://codecademy.com',
            trackingTarget: 'tracking-target',
            text: 'AppHeaderLink',
            type: 'link',
          },
        ],
        trackingTarget: 'tracking-target',
        type: 'dropdown',
      },
    ],
    right: [
      {
        id: 'render-element',
        renderElement: () => <IconButton icon={FaviconIcon} />,
        type: 'render-element',
      },
      {
        id: 'text-button',
        text: 'TextButton',
        href: 'http://codecademy.com',
        trackingTarget: 'tracking-target',
        type: 'text-button',
      },
      {
        id: 'fill-button',
        text: 'FillButton',
        href: 'http://codecademy.com',
        trackingTarget: 'tracking-target',
        type: 'fill-button',
      },
    ],
  },
  onClick: onClick,
};

const renderAppHeader = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeader {...props} />
    </ThemeProvider>
  );
};

describe('AppHeader', () => {
  it('renders AppHeaderLogo', () => {
    renderAppHeader();
    expect(screen.getByRole('svg').getAttribute('title')).toEqual(
      'Codecademy Logo'
    );
  });

  it('renders AppHeaderLink', () => {
    renderAppHeader();
    screen.getByText('TextButton');
  });

  it('TextButton calls onClick() when clicked', () => {
    renderAppHeader();
    screen.getByText('TextButton').click();
    expect(onClick).toHaveBeenCalled();
  });

  it('FillButton calls onClick() when clicked', () => {
    renderAppHeader();
    screen.getByText('FillButton').click();
    expect(onClick).toHaveBeenCalled();
  });
});
