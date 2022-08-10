import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

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

  it('shows mini logo when window width is within 1200-1260 range', () => {
    global.innerWidth = 1200;

    const wrapper = renderAppHeaderLogo({ pro: true });
    const icon = wrapper.find('svg');
    expect(icon.find('title').text()).toEqual('Codecademy Logo Mini');

    global.innerWidth = 1260;

    const secondwrapper = renderAppHeaderLogo({ pro: true });
    const secondicon = secondwrapper.find('svg');
    expect(secondicon.find('title').text()).toEqual('Codecademy Logo Mini');
  });

  it('shows the pro logo when user has pro subscription', () => {
    global.innerWidth = 1261;

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
