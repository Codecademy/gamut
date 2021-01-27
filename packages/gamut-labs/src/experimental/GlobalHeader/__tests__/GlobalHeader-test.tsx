import { IconButton } from '@codecademy/gamut';
import { BellIcon, PersonIcon, SearchIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { GlobalHeader, GlobalHeaderProps } from '..';
import {
  communityDropdown,
  courseCatalog,
  forEnterprise,
  login,
  myHome,
  plansPricingDropdown,
  resourcesDropdown,
  signUp,
  upgradeToPro,
} from '../GlobalHeaderItems';

const onClick = jest.fn();

const anonHeaderProps: GlobalHeaderProps = {
  onClick,
  type: 'anon',
};

const anonLandingHeaderProps: GlobalHeaderProps = {
  onClick,
  type: 'anon',
  variant: 'landing',
};

const anonLoginHeaderProps: GlobalHeaderProps = {
  onClick,
  renderSearch: () => <IconButton icon={SearchIcon} />,
  type: 'anon',
  variant: 'login',
};

const anonSignUpHeaderProps: GlobalHeaderProps = {
  onClick,
  renderSearch: () => <IconButton icon={SearchIcon} />,
  type: 'anon',
  variant: 'signup',
};

const freeHeaderProps: GlobalHeaderProps = {
  onClick,
  type: 'free',
};

const proHeaderProps: GlobalHeaderProps = {
  onClick,
  type: 'pro',
};

const renderElementProps: GlobalHeaderProps = {
  onClick,
  renderSearch: () => <IconButton icon={SearchIcon} />,
  renderNotifications: () => <IconButton icon={BellIcon} />,
  renderProfile: () => <IconButton icon={PersonIcon} />,
  type: 'pro',
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
      screen.getByText(plansPricingDropdown.text);
    });

    test('forEnterprise', () => {
      screen.getByText(forEnterprise.text);
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
      screen.getByText(plansPricingDropdown.text);
    });

    test('forEnterprise', () => {
      screen.getByText(forEnterprise.text);
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

    test('profile', () => {
      screen.getByTitle('Person Icon');
    });
  });

  test('fires onClick upon clicking an element', () => {
    renderGlobalHeader(renderElementProps);
    screen.getAllByRole('button')[0].click();
    expect(onClick).toHaveBeenCalled();
  });
});
