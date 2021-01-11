import { mount } from 'enzyme';
import React from 'react';

import { Pattern, PatternProps } from '..';

const renderComponent = (overrides: Partial<PatternProps> = {}) => {
  return mount(
    <Pattern
      name="diagonalStripesRegular"
      width={200}
      height={200}
      {...overrides}
    />
  );
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

  it('uses the given width and height', () => {
    const wrapped = renderComponent();

    expect(wrapped.find('svg').prop('width')).toBe(200);
    expect(wrapped.find('svg').prop('height')).toBe(200);
  });
});
