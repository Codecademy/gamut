import { IconButton } from '@codecademy/gamut';
import { FaviconIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { AppHeader, AppHeaderProps } from '..';

const onClick = jest.fn();

const logoProps: AppHeaderProps = {
  items: {
    left: [
      {
        id: 'logo-1',
        href: 'http://codecademy.com',
        pro: false,
        trackingTarget: 'tracking-target',
        type: 'logo',
      },
    ],
    right: [],
  },
  onClick: onClick,
};

const linkProps: AppHeaderProps = {
  items: {
    left: [
      {
        id: 'link',
        href: 'http://codecademy.com',
        trackingTarget: 'tracking-target',
        text: 'AppHeaderLink',
        type: 'link',
      },
    ],
    right: [],
  },
  onClick: onClick,
};

const dropdownProps: AppHeaderProps = {
  items: {
    left: [
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
    right: [],
  },
  onClick: onClick,
};

const renderElementProps: AppHeaderProps = {
  items: {
    left: [],
    right: [
      {
        id: 'render-element',
        renderElement: () => <IconButton icon={FaviconIcon} />,
        type: 'render-element',
      },
    ],
  },
  onClick: onClick,
};

const textButtonProps: AppHeaderProps = {
  items: {
    left: [],
    right: [
      {
        id: 'text-button',
        text: 'TextButton',
        href: 'http://codecademy.com',
        trackingTarget: 'tracking-target',
        type: 'text-button',
      },
    ],
  },
  onClick: onClick,
};

const fillButtonProps: AppHeaderProps = {
  items: {
    left: [],
    right: [
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

const renderAppHeader = (props: AppHeaderProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeader {...props} />
    </ThemeProvider>
  );
};

describe('AppHeader', () => {
  it('renders an AppHeaderLogo when the item type is logo', () => {
    renderAppHeader(logoProps);
    screen.getByTitle('Codecademy Logo');
  });

  it('renders an AppHeaderLink when the item type is link', () => {
    renderAppHeader(linkProps);
    screen.getByText('AppHeaderLink');
  });

  it('renders an AppHeaderDropdown when the item type is dropdown', () => {
    renderAppHeader(dropdownProps);
    screen.getByText('AppHeaderDropdown');
  });

  it('renders a custom component when the item type is render-element', () => {
    renderAppHeader(renderElementProps);
    screen.getByTitle('Favicon Icon');
  });

  it('calls onClick() when a TextButton is clicked', () => {
    renderAppHeader(textButtonProps);
    screen.getByText('TextButton').click();
    expect(onClick).toHaveBeenCalled();
  });

  it('calls onClick() when a FillButton clicked', () => {
    renderAppHeader(fillButtonProps);
    screen.getByText('FillButton').click();
    expect(onClick).toHaveBeenCalled();
  });
});
