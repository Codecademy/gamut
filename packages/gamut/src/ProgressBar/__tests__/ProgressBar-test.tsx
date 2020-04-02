import { mount } from 'enzyme';
import React from 'react';

import ProgressBar from '..';

const stubStyle = {
  backgroundColor: 'black',
  barColor: 'darkgrey',
  fontColor: 'pink',
};

describe('ProgressBar', () => {
  it('does not include percentage visually when displayLabel is false', () => {
    const wrapped = mount(<ProgressBar percent={50} style={stubStyle} />);

    expect(wrapped.text()).toEqual('');
  });

  it('includes percentage visually when displayLabel is true', () => {
    const wrapped = mount(
      <ProgressBar displayLabel percent={50} style={stubStyle} />
    );

    expect(wrapped.text()).toEqual('50%');
  });
});
