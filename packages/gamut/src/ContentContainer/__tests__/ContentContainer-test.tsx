import { mount } from 'enzyme';
import React from 'react';

import { ContentContainer } from '..';

describe('ContentContainer', () => {
  it('contains a wide container class when the "wide" prop is passed in as true', () => {
    const wrapper = mount(<ContentContainer wide />);

    const rootClassNames = wrapper.childAt(0).prop('className');

    expect(rootClassNames).toBe('contentContainerWide contentContainer');
  });
});
