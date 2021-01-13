import { mount } from 'enzyme';
import React from 'react';

import { AppHeaderLogo, AppHeaderLogoProps } from '..';

const renderAppHeaderLogo = (overrideProps: Partial<AppHeaderLogoProps>) => {
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
  it('shows the pro logo when user has pro subscription', () => {
    const wrapper = renderAppHeaderLogo({ pro: true });
    const icon = wrapper.find('svg');
    expect(icon.find('title').text()).toContain('Arrow Chevron Up Icon');
  });
});
