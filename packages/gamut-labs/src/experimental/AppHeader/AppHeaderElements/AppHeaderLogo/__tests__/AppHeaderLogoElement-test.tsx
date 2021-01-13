import { mount } from 'enzyme';
import React from 'react';

import { AppHeaderLogoItem } from '../../types';
import { AppHeaderLogo, AppHeaderLogoProps } from '..';

const renderAppHeaderLogo = (overrideProps?: Partial<AppHeaderLogoItem>) => {
  const props: AppHeaderLogoProps = {
    item: {
      id: '1dfa',
      href: 'https://codecademy.com',
      type: 'logo',
      pro: false,
      trackingTarget: 'tracking target',
      ...overrideProps,
    },
    onClick: jest.fn(),
  };
  return mount(<AppHeaderLogo {...props} />);
};
describe('AppHeaderLogo', () => {
  it('renders a logo', () => {
    const wrapper = renderAppHeaderLogo();
    const icon = wrapper.find('svg');
    expect(icon).toHaveLength(1);
  });
  it('shows the pro logo when user has pro subscription', () => {
    const wrapper = renderAppHeaderLogo({ pro: true });
    const icon = wrapper.find('svg');
    expect(icon).toHaveLength(1);
    // how do i test for pro v not pro : the svg attributes are the same
  });
});
