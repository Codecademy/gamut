import { mount } from 'enzyme';
import React from 'react';

import { Tag } from '..';

describe('Tag', () => {
  it('renders tah text', () => {
    const badgeText = 'I am a badge';
    const wrapped = mount(<Tag>{badgeText}</Tag>);

    expect(wrapped.text()).toEqual(badgeText);
  });
});
