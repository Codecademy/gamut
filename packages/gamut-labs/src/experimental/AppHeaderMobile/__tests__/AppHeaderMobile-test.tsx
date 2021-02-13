import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { AppHeaderMobile, AppHeaderMobileProps } from '..';

const action = jest.fn();

const logoProps: AppHeaderMobileProps = {
  action,
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
    mainMenu: [],
  },
};

const linkProps: AppHeaderMobileProps = {
  action,
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
    mainMenu: [],
  },
};

const mainMenuProps: AppHeaderMobileProps = {
  action,
  items: {
    left: [],
    right: [],
    mainMenu: [
      {
        id: 'link',
        href: 'http://codecademy.com',
        trackingTarget: 'tracking-target',
        text: 'App Header Link',
        type: 'link',
      },
      {
        id: 'link',
        href: 'http://codecademy.com',
        trackingTarget: 'tracking-target',
        text: 'App Header Button',
        type: 'fill-button',
      },
    ],
  },
};

const renderAppHeader = (props: AppHeaderMobileProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <AppHeaderMobile {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderMobile', () => {
  it('renders an AppHeaderLogo when the item type is logo', () => {
    renderAppHeader(logoProps);
    screen.getByTitle('Codecademy Logo');
  });

  it('renders an AppHeaderLink when the item type is link', () => {
    renderAppHeader(linkProps);
    screen.getByText('AppHeaderLink');
  });

  it('renders a button to open the mobile menu', () => {
    renderAppHeader(linkProps);
    screen.getByText('AppHeaderLink');
  });

  describe('Mobile Menu Open', () => {
    beforeEach(() => {
      renderAppHeader(mainMenuProps);
      screen.getByTestId('header-mobile-menu').click();
    });

    it('renders the  mobile menu content', () => {
      expect(screen.getByText('App Header Link'));
      expect(screen.getByText('App Header Button'));
    });

    it('hides the mobile app header', () => {
      expect(screen.queryByTestId('header-mobile-menu')).not.toBeInTheDocument;
    });

    it('renders a button to close the mobile menu', () => {
      const closeButton = screen.getByLabelText('close menu');
      closeButton.click();
      expect(screen.queryByTestId('header-mobile-menu')).toBeInTheDocument;
    });
  });
});
