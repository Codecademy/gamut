import { mount } from 'enzyme';
import React from 'react';

import ProgressBar from '..';

describe('ProgressBar', () => {
  it('does not include percentage visually when large is false', () => {
    const wrapped = mount(<ProgressBar percent={50} theme="blue" />);

    expect(wrapped.text()).toEqual('');
  });

  it('includes percentage visually when large is true', () => {
    const wrapped = mount(<ProgressBar large percent={50} theme="blue" />);

    expect(wrapped.text()).toEqual('50%');
  });
});
