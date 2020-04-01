import { mount } from 'enzyme';
import React from 'react';

import ProgressBar from '..';

const stubStyle = {
  backgroundColor: 'black',
  barColor: 'darkgrey',
  fontColor: 'pink',
};

describe('ProgressBar', () => {
  it('does not include percentage visually when displayPercent is false', () => {
    const wrapped = mount(<ProgressBar percent={0.5} style={stubStyle} />);

    expect(wrapped.text()).toEqual('');
  });

  it('includes percentage visually when displayPercent is true', () => {
    const wrapped = mount(
      <ProgressBar displayPercent percent={0.5} style={stubStyle} />
    );

    expect(wrapped.text()).toEqual('50%');
  });
});
