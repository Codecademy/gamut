import { mount } from 'enzyme';
import React from 'react';

import ProgressBar from '..';

describe('ProgressBar', () => {
  it('includes a hidden label when one is provided', () => {
    const hiddenLabel = 'Quiz progress percentage';
    const wrapped = mount(
      <ProgressBar hiddenLabel={hiddenLabel} percent={0.5} />
    );

    expect(wrapped.text()).toContain(hiddenLabel);
  });

  it('does not include percentage visually when displayPercent is false', () => {
    const wrapped = mount(<ProgressBar percent={0.5} />);

    expect(wrapped.text()).toEqual('');
  });

  it('includes percentage visually when displayPercent is true', () => {
    const wrapped = mount(<ProgressBar displayPercent percent={0.5} />);

    expect(wrapped.text()).toEqual('50%');
  });
});
