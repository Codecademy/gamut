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
  onClick: onClick,
  variant: {
    type: 'anon',
  },
};

const freeHeaderProps: GlobalHeaderProps = {
  onClick: onClick,
  variant: {
    type: 'free',
  },
};

const proHeaderProps: GlobalHeaderProps = {
  onClick: onClick,
  variant: {
    type: 'pro',
  },
};

const renderElementProps: GlobalHeaderProps = {
  onClick: onClick,
  variant: {
    renderSearch: () => <IconButton icon={SearchIcon} />,
    renderNotifications: () => <IconButton icon={BellIcon} />,
    renderProfile: () => <IconButton icon={PersonIcon} />,
    type: 'pro',
  },
};

const renderGlobalHeader = (props: GlobalHeaderProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <GlobalHeader {...props} />
    </ThemeProvider>
  );
};

describe('GlobalHeader', () => {
  describe('renders the correct components for an anonymous user: ', () => {
    beforeEach(() => {
      renderGlobalHeader(anonHeaderProps);
    });

    it('logo', () => {
      screen.getByTestId('header-logo');
    });

    it('courseCatalog', () => {
      screen.getByText(courseCatalog.text);
    });

    it('resourcesDropdown', () => {
      screen.getByText(resourcesDropdown.text);
    });

    it('communityDropdown', () => {
      screen.getByText(communityDropdown.text);
    });

    it('plansPricingDropdown', () => {
      screen.getByText(plansPricingDropdown.text);
    });

    it('forEnterprise', () => {
      screen.getByText(forEnterprise.text);
    });

    it('login', () => {
      screen.getByText(login.text);
    });

    it('signup', () => {
      screen.getByText(signUp.text);
    });
  });

  describe('renders the correct components for a free user: ', () => {
    beforeEach(() => {
      renderGlobalHeader(freeHeaderProps);
    });

    it('logo', () => {
      screen.getByTestId('header-logo');
    });

    it('myHome', () => {
      screen.getByText(myHome.text);
    });

    it('courseCatalog', () => {
      screen.getByText(courseCatalog.text);
    });

    it('resourcesDropdown', () => {
      screen.getByText(resourcesDropdown.text);
    });

    it('communityDropdown', () => {
      screen.getByText(communityDropdown.text);
    });

    it('plansPricingDropdown', () => {
      screen.getByText(plansPricingDropdown.text);
    });

    it('forEnterprise', () => {
      screen.getByText(forEnterprise.text);
    });

    it('upgradeToPro', () => {
      screen.getByText(upgradeToPro.text);
    });
  });

  describe('renders the correct components for a pro user', () => {
    beforeEach(() => {
      renderGlobalHeader(proHeaderProps);
    });

    it('proLogo', () => {
      screen.getByTestId('header-pro-logo');
    });

    it('myHome', () => {
      screen.getByText(myHome.text);
    });

    it('courseCatalog', () => {
      screen.getByText(courseCatalog.text);
    });

    it('resourcesDropdown', () => {
      screen.getByText(resourcesDropdown.text);
    });

    it('communityDropdown', () => {
      screen.getByText(communityDropdown.text);
    });

    it('forEnterprise', () => {
      screen.getByText(forEnterprise.text);
    });
  });

  describe('renders a custom element when provided one: ', () => {
    beforeEach(() => {
      renderGlobalHeader(renderElementProps);
    });

    it('search', () => {
      screen.getByTitle('Search Icon');
    });

    it('notifications', () => {
      screen.getByTitle('Bell Icon');
    });

    it('profile', () => {
      screen.getByTitle('Person Icon');
    });
  });

  it('fires onClick upon clicking an element', () => {
    renderGlobalHeader(renderElementProps);
    screen.getAllByRole('button')[0].click();
    expect(onClick).toHaveBeenCalled();
  });
});
