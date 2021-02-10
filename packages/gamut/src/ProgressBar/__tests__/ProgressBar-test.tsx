import { setupEnzyme } from '@codecademy/gamut-tests';

import { ProgressBar } from '..';

const renderWrapper = setupEnzyme(ProgressBar, {
  percent: 50,
  variant: 'blue',
});

describe('ProgressBar', () => {
  it('uses percentage as width when no minimumPercent is provided', () => {
    const { wrapper } = renderWrapper({ percent: 50 });

    expect(
      wrapper.find('[data-testid="progress-bar-bar"]').first().prop('style')
    ).toHaveProperty('width', '50%');
  });

  it('uses percentage as width when it is greater than minimumPercent', () => {
    const { wrapper } = renderWrapper({ minimumPercent: 25, percent: 50 });

    expect(
      wrapper.find('[data-testid="progress-bar-bar"]').first().prop('style')
    ).toHaveProperty('width', '50%');
  });

  it('uses minimumPercentage as width when it is greater than percent', () => {
    const { wrapper } = renderWrapper({ minimumPercent: 75, percent: 50 });

    expect(
      wrapper.find('[data-testid="progress-bar-bar"]').first().prop('style')
    ).toHaveProperty('width', '75%');
  });

  it('does not include percentage visually when large is false', () => {
    const { wrapper } = renderWrapper({ large: false });

    expect(wrapper.text()).toEqual('');
  });

  it('includes percentage visually when large is true', () => {
    const { wrapper } = renderWrapper({ large: true });

    expect(wrapper.text()).toEqual('50%');
  });

  it('uses an svg when given a pattern', () => {
    const { wrapper } = renderWrapper({ pattern: 'diagonalStripesRegular' });

    expect(wrapper.find('svg').length).toBe(1);
  });

  it('does not use an svg when not given a pattern', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find('svg').length).toBe(0);
  });
});
