import { IconButton } from '@codecademy/gamut';
import { BellIcon, SearchIcon } from '@codecademy/gamut-icons';
import { setupRtl } from '@codecademy/gamut-tests';
import { screen } from '@testing-library/react';
import React from 'react';

import { GlobalHeader, GlobalHeaderProps } from '..';
import {
  communityDropdown,
  courseCatalog,
  forBusiness,
  login,
  myHome,
  pricingDropdown,
  resourcesDropdown,
  signUp,
  tryProForFree,
  unpausePro,
  upgradeToPro,
} from '../GlobalHeaderItems';
import { User } from '../types';

const action = jest.fn();
const user: User = {
  avatar:
    'https://www.gravatar.com/avatar/1c959a9a1e2f9f9f1ac06b05cccc1d60?s=150&d=retro',
  displayName: 'Codey',
};

const anonHeaderProps: GlobalHeaderProps = {
  action,
  type: 'anon',
};

const anonLandingHeaderProps: GlobalHeaderProps = {
  action,
  type: 'anon',
  variant: 'landing',
};

const anonLoginHeaderProps: GlobalHeaderProps = {
  action,
  renderSearch: {
    desktop: () => <IconButton icon={SearchIcon} />,
    mobile: () => <IconButton icon={SearchIcon} />,
  },
  type: 'anon',
  variant: 'login',
};

const anonSignUpHeaderProps: GlobalHeaderProps = {
  action,
  renderSearch: {
    desktop: () => <IconButton icon={SearchIcon} />,
    mobile: () => <IconButton icon={SearchIcon} />,
  },
  type: 'anon',
  variant: 'signup',
};

const freeHeaderProps: GlobalHeaderProps = {
  action,
  type: 'free',
  user,
};

const freeCustomCheckoutUrlHeaderProps: GlobalHeaderProps = {
  action,
  type: 'free',
  user: {
    proTrialCheckoutUrl: 'test-url',
    ...user,
  },
};

const freeCompletedTrialHeaderProps: GlobalHeaderProps = {
  action,
  type: 'free',
  user: {
    showProUpgrade: true,
    ...user,
  },
};

const proHeaderProps: GlobalHeaderProps = {
  action,
  type: 'pro',
  user,
};

const proPausedHeaderProps: GlobalHeaderProps = {
  action,
  type: 'pro',
  user: {
    isPaused: true,
    ...user,
  },
};

const loadingHeaderProps: GlobalHeaderProps = {
  action,
  type: 'loading',
};

const renderElementProps: GlobalHeaderProps = {
  action,
  renderSearch: {
    desktop: () => <IconButton icon={SearchIcon} />,
    mobile: () => <IconButton icon={SearchIcon} />,
  },
  renderNotifications: {
    desktop: () => <IconButton icon={BellIcon} />,
    mobile: () => <IconButton icon={BellIcon} />,
  },
  type: 'pro',
  user,
};

const renderView = setupRtl(GlobalHeader);

describe('GlobalHeader', () => {
  describe('anonymous users', () => {
    beforeEach(() => {
      renderView(anonHeaderProps);
    });

    /* since we're using css to toggle the display of the header between desktop & mobile, these tests check for visibility of elements
     & use 'getAllByTestId' b/c there will be duplicate elements in the DOM (since mobile & desktop render some of the same app header items) */
    test('logo', () => {
      const logoElements = screen.getAllByTestId('header-logo');
      expect(logoElements[0]).not.toBeVisible();
      expect(logoElements[1]).toBeVisible();
    });

    test('courseCatalog', () => {
      screen.getAllByText(courseCatalog.text);
    });

    test('resourcesDropdown', () => {
      screen.getAllByText(resourcesDropdown.text);
    });

    test('communityDropdown', () => {
      screen.getAllByText(communityDropdown.text);
    });

    test('plansPricingDropdown', () => {
      screen.getAllByText(pricingDropdown.text);
    });

    test('forEnterprise', () => {
      screen.getAllByText(forBusiness.text);
    });

    test('login', () => {
      screen.getAllByText(login.text);
    });

    test('signup', () => {
      screen.getAllByText(signUp.text);
    });
  });

  describe('anonymous users (variants)', () => {
    describe('landing page', () => {
      beforeEach(() => {
        renderView(anonLandingHeaderProps);
      });

      test('does not show search', () => {
        expect(screen.queryByTitle('Search Icon')).toBeFalsy();
      });

      test('shows login', () => {
        screen.getAllByText(login.text);
      });

      test('does not show signup', () => {
        expect(screen.queryByText(signUp.text)).toBeFalsy();
      });
    });

    describe('login page', () => {
      beforeEach(() => {
        renderView(anonLoginHeaderProps);
      });

      test('shows search', () => {
        screen.getByTitle('Search Icon');
      });

      test('does not show login', () => {
        expect(screen.queryByText(login.text)).toBeFalsy();
      });

      test('shows signup', () => {
        screen.getAllByText(signUp.text);
      });
    });

    describe('sign up page', () => {
      beforeEach(() => {
        renderView(anonSignUpHeaderProps);
      });

      test('shows search', () => {
        screen.getAllByTitle('Search Icon');
      });

      test('shows login', () => {
        screen.getAllByText(login.text);
      });

      test('does not show sign up', () => {
        expect(screen.queryByText(signUp.text)).toBeFalsy();
      });
    });
  });

  describe('free users', () => {
    describe('default', () => {
      beforeEach(() => {
        renderView(freeHeaderProps);
      });

      test('logo', () => {
        screen.getAllByTestId('header-logo');
      });

      test('myHome', () => {
        screen.getByText(myHome.text);
      });

      test('courseCatalog', () => {
        screen.getByText(courseCatalog.text);
      });

      test('resourcesDropdown', () => {
        screen.getByText(resourcesDropdown.text);
      });

      test('communityDropdown', () => {
        screen.getByText(communityDropdown.text);
      });

      test('plansPricingDropdown', () => {
        screen.getByText(pricingDropdown.text);
      });

      test('forEnterprise', () => {
        screen.getByText(forBusiness.text);
      });

      test('profileDropdown', () => {
        screen.getByTestId('avatar');
      });

      test('tryProForFree', () => {
        screen.getByText(tryProForFree().text);
      });
    });

    describe('custom checkout url', () => {
      test('tryProForFree', () => {
        renderView(freeCustomCheckoutUrlHeaderProps);
        screen.getByText(tryProForFree().text);
      });
    });

    describe('has completed trial', () => {
      test('upgradeToPro', () => {
        renderView(freeCompletedTrialHeaderProps);
        screen.getByText(upgradeToPro.text);
      });
    });
  });

  describe('pro users', () => {
    describe('default', () => {
      beforeEach(() => {
        renderView(proHeaderProps);
      });

      test('proLogo', () => {
        screen.getAllByTestId('header-pro-logo');
      });

      test('myHome', () => {
        screen.getByText(myHome.text);
      });

      test('courseCatalog', () => {
        screen.getByText(courseCatalog.text);
      });

      test('resourcesDropdown', () => {
        screen.getByText(resourcesDropdown.text);
      });

      test('communityDropdown', () => {
        screen.getByText(communityDropdown.text);
      });

      test('profileDropdown', () => {
        screen.getByTestId('avatar');
      });
    });

    describe('is paused', () => {
      test('unpause', () => {
        renderView(proPausedHeaderProps);
        screen.getByText(unpausePro.text);
      });
    });
  });

  describe('loading', () => {
    beforeEach(() => {
      renderView(loadingHeaderProps);
    });

    test('logo', () => {
      screen.getAllByTestId('header-logo');
    });
  });

  describe('renders a custom element when provided one', () => {
    beforeEach(() => {
      renderView(renderElementProps);
    });

    test('search', () => {
      screen.getByTitle('Search Icon');
    });

    test('notifications', () => {
      screen.getAllByTitle('Bell Icon');
    });
  });

  test('fires action() upon clicking an element', () => {
    renderView(renderElementProps);
    screen.getAllByRole('link')[0].click();
    expect(action).toHaveBeenCalled();
  });
});
