import { mount } from 'enzyme';
import React from 'react';

import { Pattern, PatternProps } from '..';

const renderComponent = (overrides: Partial<PatternProps> = {}) => {
  return mount(<Pattern name="diagonalStripesRegular" {...overrides} />);
};

describe('Pattern', () => {
  it('uses the pattern corresponding to the name given', () => {
    const wrapped = renderComponent();

    expect(wrapped.find('#clipDiagonalStripesRegular')).toBeTruthy();
  });

  it('uses the pattern corresponding to another name given', () => {
    const wrapped = renderComponent({ name: 'diagonalStripesDense' });

    expect(wrapped.find('#clipDiagonalStripesDense')).toBeTruthy();
  });
});
