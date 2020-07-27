import { mount } from 'enzyme';
import React from 'react';

import Badge from '..';

describe('Badge', () => {
  it('renders badge text', () => {
    const badgeText = 'I am a badge';
    const wrapped = mount(<Badge>{badgeText}</Badge>);

    expect(wrapped.text()).toEqual(badgeText);
  });
});
