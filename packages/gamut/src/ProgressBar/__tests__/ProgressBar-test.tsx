import { mount } from 'enzyme';
import React from 'react';

import { ProgressBar, ProgressBarProps } from '..';

const renderComponent = (overrides: Partial<ProgressBarProps> = {}) => {
  return mount(<ProgressBar percent={50} theme="blue" {...overrides} />);
};

describe('ProgressBar', () => {
  it('uses percentage as width when no minimumPercent is provided', () => {
    const wrapped = renderComponent({ percent: 50 });

    expect(
      wrapped.find('[data-testid="progress-bar-bar"]').prop('style')
    ).toHaveProperty('width', '50%');
  });

  it('uses percentage as width when it is greater than minimumPercent', () => {
    const wrapped = renderComponent({ minimumPercent: 25, percent: 50 });

    expect(
      wrapped.find('[data-testid="progress-bar-bar"]').prop('style')
    ).toHaveProperty('width', '50%');
  });

  it('uses minimumPercentage as width when it is greater than percent', () => {
    const wrapped = renderComponent({ minimumPercent: 75, percent: 50 });

    expect(
      wrapped.find('[data-testid="progress-bar-bar"]').prop('style')
    ).toHaveProperty('width', '75%');
  });

  it('does not include percentage visually when large is false', () => {
    const wrapped = renderComponent({ large: false });

    expect(wrapped.text()).toEqual('');
  });

  it('includes percentage visually when large is true', () => {
    const wrapped = renderComponent({ large: true });

    expect(wrapped.text()).toEqual('50%');
  });
});
