import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

import { AppHeaderLogoItem } from '../../types';
import { AppHeaderLogo, AppHeaderLogoProps } from '..';

const testUrl = 'https://codecademy.com';
const onClick = jest.fn();

const renderAppHeaderLogo = (overrideProps?: Partial<AppHeaderLogoItem>) => {
  const props: AppHeaderLogoProps = {
    item: {
      id: '1dfa',
      href: testUrl,
      type: 'logo',
      pro: false,
      trackingTarget: 'tracking target',
      ...overrideProps,
    },
    onClick,
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

  it('calls onClick() when clicked', () => {
    const wrapper = renderAppHeaderLogo();
    wrapper.find('a').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
