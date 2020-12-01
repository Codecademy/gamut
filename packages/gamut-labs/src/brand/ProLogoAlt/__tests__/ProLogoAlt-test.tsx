import { ProLogoAlt } from '@codecademy/gamut-labs/src/brand/ProLogoAlt';
import { mount } from 'enzyme';
import React from 'react';

describe('LogoProAlt', () => {
  it('renders the Pro Alt logo', () => {
    const wrapper = mount(<ProLogoAlt />);
    expect(wrapper.exists()).toBe(true);
  });
});
