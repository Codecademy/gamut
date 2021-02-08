import { IconButton } from '@codecademy/gamut';
import { BellIcon, SearchIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
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

const proHeaderProps: GlobalHeaderProps = {
  action,
  type: 'pro',
  user,
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

const renderGlobalHeader = (props: GlobalHeaderProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <GlobalHeader {...props} />
    </ThemeProvider>
  );
};

describe('GlobalHeader', () => {
  describe('anonymous users', () => {
    beforeEach(() => {
      renderGlobalHeader(anonHeaderProps);
    });

    test('logo', () => {
      screen.getByTestId('header-logo');
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

    test('login', () => {
      screen.getByText(login.text);
    });

    test('signup', () => {
      screen.getByText(signUp.text);
    });
  });

  describe('anonymous users (variants)', () => {
    describe('landing page', () => {
      beforeEach(() => {
        renderGlobalHeader(anonLandingHeaderProps);
      });

      test('does not show search', () => {
        expect(screen.queryByTitle('Search Icon')).toBeFalsy();
      });

      test('shows login', () => {
        screen.getByText(login.text);
      });

      test('does not show signup', () => {
        expect(screen.queryByText(signUp.text)).toBeFalsy();
      });
    });

    describe('login page', () => {
      beforeEach(() => {
        renderGlobalHeader(anonLoginHeaderProps);
      });

      test('shows search', () => {
        screen.getByTitle('Search Icon');
      });

      test('does not show login', () => {
        expect(screen.queryByText(login.text)).toBeFalsy();
      });

      test('shows signup', () => {
        screen.getByText(signUp.text);
      });
    });

    describe('sign up page', () => {
      beforeEach(() => {
        renderGlobalHeader(anonSignUpHeaderProps);
      });

      test('shows search', () => {
        screen.getByTitle('Search Icon');
      });

      test('shows login', () => {
        screen.getByText(login.text);
      });

      test('does not show sign up', () => {
        expect(screen.queryByText(signUp.text)).toBeFalsy();
      });
    });
  });

  describe('free users', () => {
    beforeEach(() => {
      renderGlobalHeader(freeHeaderProps);
    });

    test('logo', () => {
      screen.getByTestId('header-logo');
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

    test('upgradeToPro', () => {
      screen.getByText(upgradeToPro.text);
    });
  });

  describe('pro users', () => {
    beforeEach(() => {
      renderGlobalHeader(proHeaderProps);
    });

    test('proLogo', () => {
      screen.getByTestId('header-pro-logo');
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

  describe('renders a custom element when provided one', () => {
    beforeEach(() => {
      renderGlobalHeader(renderElementProps);
    });

    test('search', () => {
      screen.getByTitle('Search Icon');
    });

    test('notifications', () => {
      screen.getByTitle('Bell Icon');
    });
  });

  test('fires action() upon clicking an element', () => {
    renderGlobalHeader(renderElementProps);
    screen.getAllByRole('button')[0].click();
    expect(action).toHaveBeenCalled();
  });
});
