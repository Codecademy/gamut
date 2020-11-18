import { mount } from 'enzyme';
import React from 'react';

import { SquareLogo } from '@codecademy/gamut-labs/src/brand/SquareLogo';

describe('SquareLogo', () => {
  it('renders the Small CC logo', () => {
    const wrapper = mount(<SquareLogo />);
    expect(wrapper.exists()).toBe(true);
  });
});
