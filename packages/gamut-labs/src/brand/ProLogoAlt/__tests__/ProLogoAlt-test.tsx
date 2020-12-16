import { mount } from 'enzyme';
import React from 'react';

import { ProLogoAlt } from '..';

describe('LogoProAlt', () => {
  it('renders the Pro Alt logo', () => {
    const wrapper = mount(<ProLogoAlt />);
    expect(wrapper.exists()).toBe(true);
  });
});
