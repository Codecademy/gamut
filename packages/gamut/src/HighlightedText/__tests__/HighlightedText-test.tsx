import { mount } from 'enzyme';
import React from 'react';

import HighlightedText from '..';

describe('HighlightedText', () => {
  it('preserves text children with whitespace', () => {
    const text = 'abc    def \t ghi\njkl';

    const wrapped = mount(<HighlightedText>{text}</HighlightedText>);

    expect(wrapped.text()).toEqual(text);
  });

  it('defaults text color to yellow', () => {
    const text = 'highlighted';
    const wrapped = mount(<HighlightedText>{text}</HighlightedText>);
    expect(wrapped.find('.yellow')).toHaveLength(1);
  });

  it('allows selecting a specific other color', () => {
    const text = 'highlighted';
    const wrapped = mount(
      <HighlightedText color="blue">{text}</HighlightedText>
    );
    expect(wrapped.find('.blue')).toHaveLength(1);
    expect(wrapped.find('.yellow')).toHaveLength(0);
  });
});
