import { mount } from 'enzyme';
import React from 'react';

import { HighlightedText } from '..';

describe('HighlightedText', () => {
  it('preserves text children with whitespace', () => {
    const text = 'abc    def \t ghi\njkl';

    const wrapped = mount(<HighlightedText>{text}</HighlightedText>);

    expect(wrapped.text()).toEqual(text);
  });
});
