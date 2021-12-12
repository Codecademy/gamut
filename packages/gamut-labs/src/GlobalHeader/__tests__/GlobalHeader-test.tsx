import { setupRtl } from '@codecademy/gamut-tests';

import { GlobalHeader, GlobalHeaderProps } from '..';
import {
  communityDropdown,
  courseCatalog,
  forBusiness,
  login,
  myHome,
  pricingDropdown,
  referrals,
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
  showReferrals: true,
};

const defaultProps = {
  action,
  notifications: {
    actions: {
      clear: jest.fn(),
      click: jest.fn(),
      dismiss: jest.fn(),
      read: jest.fn(),
      track: jest.fn(),
    },
    notifications: [],
    onEnable: jest.fn(),
  },
  search: {
    onEnable: jest.fn(),
    onSearch: jest.fn(),
    onTrackingClick: jest.fn(),
  },
};

const anonHeaderProps: GlobalHeaderProps = {
  ...defaultProps,
  type: 'anon',
};

const anonLandingHeaderProps: GlobalHeaderProps = {
  ...defaultProps,
  type: 'anon',
  variant: 'landing',
};

const anonLoginHeaderProps: GlobalHeaderProps = {
  ...defaultProps,
  type: 'anon',
  variant: 'login',
};

const anonSignUpHeaderProps: GlobalHeaderProps = {
  ...defaultProps,
  type: 'anon',
  variant: 'signup',
};

const freeHeaderProps: GlobalHeaderProps = {
  ...defaultProps,
  type: 'free',
  user,
};

const freeCustomCheckoutUrlHeaderProps: GlobalHeaderProps = {
  ...defaultProps,
  type: 'free',
  user: {
    proCheckoutUrl: 'test-url',
    ...user,
  },
};

const freeCompletedTrialHeaderProps: GlobalHeaderProps = {
  ...defaultProps,
  type: 'free',
  user: {
    showProUpgrade: true,
    ...user,
  },
};

const proHeaderProps: GlobalHeaderProps = {
  ...defaultProps,
  type: 'pro',
  user,
};

const proPausedHeaderProps: GlobalHeaderProps = {
  ...defaultProps,
  type: 'pro',
  user: {
    isPaused: true,
    ...user,
  },
};

const loadingHeaderProps: GlobalHeaderProps = {
  ...defaultProps,
  type: 'loading',
};

const renderView = setupRtl(GlobalHeader);

describe('GlobalHeader', () => {
  describe('anonymous users', () => {
    it('renders search', () => {
      const { view } = renderView(anonHeaderProps);
      view.getByTitle('Search Icon');
    });

    it('does not renders notifications', () => {
      const { view } = renderView(anonHeaderProps);
      expect(view.queryByTitle('Bell Icon')).toBeFalsy();
    });

    /* since we're using css to toggle the display of the header between desktop & mobile, these tests check for visibility of elements
     & use 'getAllByTestId' b/c there will be duplicate elements in the DOM (since mobile & desktop render some of the same app header items) */
    it('renders logo', () => {
      const { view } = renderView(anonHeaderProps);
      const logoElements = view.getAllByTestId('header-logo');
      expect(logoElements[0]).not.toBeVisible();
      expect(logoElements[1]).toBeVisible();
    });

    it('renders courseCatalog', () => {
      const { view } = renderView(anonHeaderProps);
      view.getAllByText(courseCatalog.text);
    });

    it('renders resourcesDropdown', () => {
      const { view } = renderView(anonHeaderProps);
      view.getAllByText(resourcesDropdown.text);
    });

    it('renders communityDropdown', () => {
      const { view } = renderView(anonHeaderProps);
      view.getAllByText(communityDropdown.text);
    });

    it('renders pricingDropdown when hidePricing is falsy', () => {
      const { view } = renderView(anonHeaderProps);
      view.getAllByText(pricingDropdown.text);
    });

    it('does not render pricingDropdown when hidePricing is true', () => {
      const { view } = renderView({ ...anonHeaderProps, hidePricing: true });
      expect(view.queryByText(pricingDropdown.text)).toBeFalsy();
    });

    it('renders forEnterprise', () => {
      const { view } = renderView(anonHeaderProps);
      view.getAllByText(forBusiness.text);
    });

    it('renders login', () => {
      const { view } = renderView(anonHeaderProps);
      view.getAllByText(login.text);
    });

    it('renders signup', () => {
      const { view } = renderView(anonHeaderProps);
      view.getAllByText(signUp.text);
    });
  });

  describe('anonymous users (variants)', () => {
    describe('landing page', () => {
      it('renders search', () => {
        const { view } = renderView(anonLandingHeaderProps);
        view.getByTitle('Search Icon');
      });

      it('renders login', () => {
        const { view } = renderView(anonLandingHeaderProps);
        view.getAllByText(login.text);
      });

      it('does not render signup', () => {
        const { view } = renderView(anonLandingHeaderProps);
        expect(view.queryByText(signUp.text)).toBeFalsy();
      });
    });

    describe('login page', () => {
      it('renders search', () => {
        const { view } = renderView(anonLoginHeaderProps);
        view.getByTitle('Search Icon');
      });

      it('does not render login', () => {
        const { view } = renderView(anonLoginHeaderProps);
        expect(view.queryByText(login.text)).toBeFalsy();
      });

      it('renders signup', () => {
        const { view } = renderView(anonLoginHeaderProps);
        view.getAllByText(signUp.text);
      });
    });

    describe('sign up page', () => {
      it('renders search', () => {
        const { view } = renderView(anonSignUpHeaderProps);
        view.getAllByTitle('Search Icon');
      });

      it('renders login', () => {
        const { view } = renderView(anonSignUpHeaderProps);
        view.getAllByText(login.text);
      });

      it('does not render sign up', () => {
        const { view } = renderView(anonSignUpHeaderProps);
        expect(view.queryByText(signUp.text)).toBeFalsy();
      });
    });
  });

  describe('free users', () => {
    it('renders search', () => {
      const { view } = renderView(freeHeaderProps);
      view.getByTitle('Search Icon');
    });

    it('renders notifications', () => {
      const { view } = renderView(freeHeaderProps);
      view.getAllByTitle('Bell Icon');
    });

    describe('default', () => {
      it('renders logo', () => {
        const { view } = renderView(freeHeaderProps);
        view.getAllByTestId('header-logo');
      });

      it('renders myHome', () => {
        const { view } = renderView(freeHeaderProps);
        view.getByText(myHome.text);
      });

      it('renders courseCatalog', () => {
        const { view } = renderView(freeHeaderProps);
        view.getByText(courseCatalog.text);
      });

      it('renders resourcesDropdown', () => {
        const { view } = renderView(freeHeaderProps);
        view.getByText(resourcesDropdown.text);
      });

      it('renders communityDropdown', () => {
        const { view } = renderView(freeHeaderProps);
        view.getByText(communityDropdown.text);
      });

      it('renders pricingDropdown when hidePricing is falsy', () => {
        const { view } = renderView(freeHeaderProps);
        view.getByText(pricingDropdown.text);
      });

      it('does not render pricingDropdown when hidePricing is true', () => {
        const { view } = renderView({ ...freeHeaderProps, hidePricing: true });
        expect(view.queryByText(pricingDropdown.text)).toBeFalsy();
      });

      it('renders forEnterprise', () => {
        const { view } = renderView(freeHeaderProps);
        view.getByText(forBusiness.text);
      });

      it('renders profileDropdown', () => {
        const { view } = renderView(freeHeaderProps);
        view.getByTestId('avatar-container');
      });

      it('renders tryProForFree', () => {
        const { view } = renderView(freeHeaderProps);
        view.getByText(tryProForFree().text);
      });
    });

    describe('custom checkout url', () => {
      it('renders tryProForFree', () => {
        const { view } = renderView(freeCustomCheckoutUrlHeaderProps);
        view.getByText(tryProForFree().text);
      });
    });

    describe('has completed trial', () => {
      it('renders upgradeToPro', () => {
        const { view } = renderView(freeCompletedTrialHeaderProps);
        view.getByText(upgradeToPro().text);
      });
    });
  });

  describe('pro users', () => {
    it('renders search', () => {
      const { view } = renderView(proHeaderProps);
      view.getByTitle('Search Icon');
    });

    it('renders notifications', () => {
      const { view } = renderView(proHeaderProps);
      view.getAllByTitle('Bell Icon');
    });

    describe('default', () => {
      it('renders proLogo', () => {
        const { view } = renderView(proHeaderProps);
        view.getAllByTestId('header-pro-logo');
      });

      it('renders myHome', () => {
        const { view } = renderView(proHeaderProps);
        view.getByText(myHome.text);
      });

      it('renders courseCatalog', () => {
        const { view } = renderView(proHeaderProps);
        view.getByText(courseCatalog.text);
      });

      it('renders resourcesDropdown', () => {
        const { view } = renderView(proHeaderProps);
        view.getByText(resourcesDropdown.text);
      });

      it('renders communityDropdown', () => {
        const { view } = renderView(proHeaderProps);
        view.getByText(communityDropdown.text);
      });

      it('renders profileDropdown', () => {
        const { view } = renderView(proHeaderProps);
        view.getByTestId('avatar-container');
      });

      it('renders referrals', () => {
        const { view } = renderView(proHeaderProps);
        view.getByTestId('avatar-container').click();
        view.getByText(referrals.text);
      });
    });

    describe('is paused', () => {
      it('renders unpause', () => {
        const { view } = renderView(proPausedHeaderProps);
        view.getByText(unpausePro.text);
      });
    });
  });

  describe('loading', () => {
    it('renders logo', () => {
      const { view } = renderView(loadingHeaderProps);
      view.getAllByTestId('header-logo');
    });
  });

  describe('onClick handlers', () => {
    const onLinkAction = jest.fn();

    it('renders fires only action upon clicking an element', () => {
      const { view } = renderView({ ...anonHeaderProps, onLinkAction });
      view.getByText(pricingDropdown.text).click();

      expect(action).toHaveBeenCalledTimes(1);
      expect(onLinkAction).not.toHaveBeenCalled();
    });

    it('renders fires action & onLinkAction upon clicking a link element', () => {
      const { view } = renderView({ ...anonHeaderProps, onLinkAction });
      view.getAllByRole('link')[0].click();

      expect(action).toHaveBeenCalledTimes(1);
      expect(onLinkAction).toHaveBeenCalledTimes(1);
    });
  });
});
