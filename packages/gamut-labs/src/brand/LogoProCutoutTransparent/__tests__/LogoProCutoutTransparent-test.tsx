import { mount } from 'enzyme';
import React from 'react';

import { LogoProCutoutTransparent } from '..';

describe('LogoProCutout', () => {
  it('renders the PRO logo', () => {
    const wrapper = mount(<LogoProCutoutTransparent />);

    expect(wrapper.exists()).toBe(true);
  });
});
