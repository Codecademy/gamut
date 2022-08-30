import { IconButton } from '@codecademy/gamut';
import { FaviconIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { mockBookmarkParts } from '../../Bookmarks/fixtures';
import { AppHeader, AppHeaderProps } from '..';

const action = jest.fn();

const defaultProps = {
  action,
  search: {
    onEnable: jest.fn(),
    onSearch: jest.fn(),
    onTrackingClick: jest.fn(),
  },
  isAnon: true,
  openCrossDeviceItemId: '',
  setOpenCrossDeviceItemId: jest.fn(),
  items: {
    left: [],
    right: [],
  },
};

const logoProps: AppHeaderProps = {
  ...defaultProps,
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
};

const linkProps: AppHeaderProps = {
  ...defaultProps,
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
};

const dropdownProps: AppHeaderProps = {
  ...defaultProps,
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
};

const renderElementProps: AppHeaderProps = {
  ...defaultProps,
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
};

const textButtonProps: AppHeaderProps = {
  ...defaultProps,
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
};

const fillButtonProps: AppHeaderProps = {
  ...defaultProps,
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
};

const appHeaderPropsWithBookmarkParts: AppHeaderProps = {
  ...defaultProps,
  crossDeviceBookmarkParts: mockBookmarkParts,
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
    fireEvent.click(screen.getByTitle('Codecademy Logo'));
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('renders an AppHeaderLink when the item type is link', () => {
    renderAppHeader(linkProps);
    fireEvent.click(screen.getByText('AppHeaderLink'));
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('renders an AppHeaderDropdown when the item type is dropdown', () => {
    renderAppHeader(dropdownProps);
    fireEvent.click(screen.getByText('AppHeaderDropdown'));
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('renders a custom component when the item type is render-element', () => {
    renderAppHeader(renderElementProps);
    fireEvent.click(screen.getByTitle('Favicon Icon'));
    expect(action).not.toHaveBeenCalled();
  });

  it('calls action() when a TextButton is clicked', () => {
    renderAppHeader(textButtonProps);
    fireEvent.click(screen.getByText('TextButton'));
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('calls action() when a FillButton clicked', () => {
    renderAppHeader(fillButtonProps);
    fireEvent.click(screen.getByText('FillButton'));
    expect(action).toHaveBeenCalledTimes(1);
  });

  describe('bookmarks', () => {
    describe('NO crossDeviceBookmarkParts prop provided', () => {
      it('does NOT render a bookmarks button or content', () => {
        renderAppHeader({
          ...appHeaderPropsWithBookmarkParts,
          crossDeviceBookmarkParts: undefined,
        });
        expect(screen.queryByText('IMA BOOKMARKS BUTTON')).toBeNull();
        expect(screen.queryByText('DESKTOP BOOKMARKS CONTENT')).toBeNull();
      });
    });

    describe('crossDeviceBookmarkParts prop IS provided', () => {
      it('renders the button but does NOT render bookmarks content if openCrossDeviceItemId is NOT set to bookmarks', () => {
        renderAppHeader(appHeaderPropsWithBookmarkParts);

        screen.getByText('IMA BOOKMARKS BUTTON');
        expect(screen.queryByText('DESKTOP BOOKMARKS CONTENT')).toBeNull();
      });

      it('renders both the button and bookmarks content if openCrossDeviceItemId is set to bookmarks', () => {
        renderAppHeader({
          ...appHeaderPropsWithBookmarkParts,
          openCrossDeviceItemId: 'bookmarks',
        });

        screen.getByText('IMA BOOKMARKS BUTTON');
        screen.getByText('DESKTOP BOOKMARKS CONTENT');
      });
    });
  });
});
