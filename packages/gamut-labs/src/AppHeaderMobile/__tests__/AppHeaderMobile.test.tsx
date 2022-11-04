import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { mockBookmarkParts } from '../../Bookmarks/fixtures';
import { CrossDeviceItemId } from '../../GlobalHeader/types';
import { AppHeaderMobile, AppHeaderMobileProps } from '..';

const action = jest.fn();

const defaultProps = {
  action,
  onSearch: jest.fn(),
  isAnon: true,
  openCrossDeviceItemId: CrossDeviceItemId.UNSET,
  setOpenCrossDeviceItemId: jest.fn(),
  items: {
    left: [],
    right: [],
  },
};

const logoProps: AppHeaderMobileProps = {
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
    mainMenu: [],
  },
};

const linkProps: AppHeaderMobileProps = {
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
    mainMenu: [],
  },
};

const mainMenuProps: AppHeaderMobileProps = {
  ...defaultProps,
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
        id: 'link2',
        href: 'http://codecademy.com',
        trackingTarget: 'tracking-target',
        text: 'App Header Button',
        type: 'fill-button',
      },
    ],
  },
};

const appHeaderMobilePropsWithBookmarkParts: AppHeaderMobileProps = {
  ...mainMenuProps,
  crossDeviceBookmarkParts: mockBookmarkParts,
};

const renderView = setupRtl(AppHeaderMobile);

describe('AppHeaderMobile', () => {
  it('renders an AppHeaderLogo when the item type is logo', () => {
    const { view } = renderView(logoProps);
    view.getByTitle('Codecademy Logo');
  });

  it('renders an AppHeaderLink when the item type is link', () => {
    const { view } = renderView(linkProps);
    view.getByText('AppHeaderLink');
  });

  it('renders a button to open the mobile menu', () => {
    const { view } = renderView(linkProps);
    view.getByText('AppHeaderLink');
  });

  describe('Mobile Menu Open', () => {
    it('renders the mobile menu content', () => {
      const { view } = renderView(mainMenuProps);
      fireEvent.click(view.getByTestId('header-mobile-menu'));
      expect(view.getByText('App Header Link'));
      expect(view.getByText('App Header Button'));
    });

    it('hides the mobile app header', () => {
      const { view } = renderView(mainMenuProps);
      fireEvent.click(view.getByTestId('header-mobile-menu'));
      expect(view.queryByTestId('header-mobile-menu')).not.toBeInTheDocument();
    });

    it('renders a button to close the mobile menu', () => {
      const { view } = renderView(mainMenuProps);
      fireEvent.click(view.getByTestId('header-mobile-menu'));
      fireEvent.click(view.getByLabelText('close menu'));
      expect(view.queryByTestId('header-mobile-menu')).toBeInTheDocument();
    });
  });

  describe('bookmarks', () => {
    describe('NO crossDeviceBookmarkParts prop provided', () => {
      it('does NOT render a bookmarks button or content', () => {
        const { view } = renderView({
          ...appHeaderMobilePropsWithBookmarkParts,
          crossDeviceBookmarkParts: undefined,
        });
        expect(view.queryByText('IMA BOOKMARKS BUTTON')).toBeNull();
        expect(view.queryByText('MOBILE BOOKMARKS CONTENT')).toBeNull();
      });
    });

    describe('crossDeviceBookmarkParts prop IS provided', () => {
      it('renders the button but does NOT render bookmarks content if openCrossDeviceItemId is NOT set to bookmarks', () => {
        const { view } = renderView(appHeaderMobilePropsWithBookmarkParts);

        view.getByText('IMA BOOKMARKS BUTTON');
        expect(view.queryByText('MOBILE BOOKMARKS CONTENT')).toBeNull();
      });

      it('renders both the button and bookmarks content if openCrossDeviceItemId is set to bookmarks', () => {
        const { view } = renderView({
          ...appHeaderMobilePropsWithBookmarkParts,
          openCrossDeviceItemId: CrossDeviceItemId.BOOKMARKS,
        });

        view.getByText('IMA BOOKMARKS BUTTON');
        view.getByText('MOBILE BOOKMARKS CONTENT');
      });
    });
  });
});
