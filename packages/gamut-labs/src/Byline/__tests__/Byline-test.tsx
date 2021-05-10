import { mount } from 'enzyme';
import React from 'react';

import { Byline } from '..';

describe('Byline', () => {
  it('displays a location when present', () => {
    const wrapper = mount(
      <Byline
        firstName="César"
        lastName="Milan"
        occupation="Dog Whisperer"
        location="Los Angeles, CA"
      />
    );
    expect(wrapper.text()).toContain('Los Angeles, CA');
  });
});
