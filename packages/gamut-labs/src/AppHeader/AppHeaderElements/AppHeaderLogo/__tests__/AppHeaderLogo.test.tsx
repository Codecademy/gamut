import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';

import { AppHeaderLogoItem } from '../../types';
import { AppHeaderLogo, AppHeaderLogoProps } from '..';

const testUrl = 'https://codecademy.com';
const action = jest.fn();

const renderAppHeaderLogo = (overrideProps?: Partial<AppHeaderLogoItem>) => {
  const props: AppHeaderLogoProps = {
    action,
    item: {
      id: '1dfa',
      href: testUrl,
      type: 'logo',
      pro: false,
      trackingTarget: 'tracking target',
      ...overrideProps,
    },
  };
  return mount(
    <ThemeProvider theme={theme}>
      <AppHeaderLogo {...props} />
    </ThemeProvider>
  );
};

describe('AppHeaderLogo', () => {
  it('renders a logo', () => {
    const wrapper = renderAppHeaderLogo();
    const icon = wrapper.find('svg');
    expect(icon.find('title').text()).toContain('Codecademy Logo');
  });

  describe('when item.checkMini is set to true', () => {
    it('shows mini logo when window width is within 1200-1260 range', () => {
      global.innerWidth = 1200;

      const wrapper = renderAppHeaderLogo({ pro: true, checkMini: true });
      const icon = wrapper.find('svg');
      expect(icon.find('title').text()).toEqual('Codecademy Logo Mini');

      global.innerWidth = 1260;

      const secondWrapper = renderAppHeaderLogo({ pro: true, checkMini: true });
      const secondIcon = secondWrapper.find('svg');
      expect(secondIcon.find('title').text()).toEqual('Codecademy Logo Mini');
    });

    it('does NOT show the mini logo when window width is outside the 1200-1260 range', () => {
      global.innerWidth = 1199;

      const wrapper = renderAppHeaderLogo({ pro: false, checkMini: true });
      const icon = wrapper.find('svg');
      expect(icon.find('title').text()).toEqual('Codecademy Logo');

      global.innerWidth = 1261;

      const secondWrapper = renderAppHeaderLogo({ pro: true, checkMini: true });
      const secondIcon = secondWrapper.find('svg');
      expect(secondIcon.find('title').text()).toEqual('Codecademy Pro Logo');
    });
  });

  describe('when item.checkMini is not set / false', () => {
    it('does NOT show the mini logo even if in the 1200-1260 range', () => {
      global.innerWidth = 1230;

      const wrapper = renderAppHeaderLogo({ pro: false });
      const icon = wrapper.find('svg');
      expect(icon.find('title').text()).toEqual('Codecademy Logo');

      const secondWrapper = renderAppHeaderLogo({
        pro: true,
        checkMini: false,
      });
      const secondIcon = secondWrapper.find('svg');
      expect(secondIcon.find('title').text()).toEqual('Codecademy Pro Logo');
    });
  });

  it('shows the pro logo when user has pro subscription', () => {
    const wrapper = renderAppHeaderLogo({ pro: true });
    const icon = wrapper.find('svg');
    expect(icon.find('title').text()).toEqual('Codecademy Pro Logo');
  });

  it('links to the provided href', () => {
    const wrapper = renderAppHeaderLogo();
    const href = wrapper.find('a').prop('href');
    expect(href).toEqual(testUrl);
  });

  it('calls action() when clicked', () => {
    const wrapper = renderAppHeaderLogo();
    wrapper.find('a').simulate('click');
    expect(action).toHaveBeenCalled();
  });
});
