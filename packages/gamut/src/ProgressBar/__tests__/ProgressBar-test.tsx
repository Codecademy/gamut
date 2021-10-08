import { DiagonalADense } from '@codecademy/gamut-patterns';
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

  it('does not include percentage visually when size is small', () => {
    const { wrapper } = renderWrapper({ size: 'small' });
    // Enzyme doesn't differentiate between visible and invisible
    // test so this tests that only the screen reader text renders
    expect(wrapper.text()).toEqual('Progress: 50%');
  });

  it('includes percentage visually when size is large', () => {
    const { wrapper } = renderWrapper({ size: 'large' });
    // Enzyme doesn't differentiate between visible and invisible
    // test so this test accounts for both the visible '50%' and
    // the 'Progress: 50%' that is only visible to screenreaders
    expect(wrapper.text()).toEqual('Progress: 50%50%');
  });

  it('uses an svg when given a pattern', () => {
    const { wrapper } = renderWrapper({ pattern: DiagonalADense });

    expect(wrapper.find('svg').length).toBe(1);
  });

  it('does not use an svg when not given a pattern', () => {
    const { wrapper } = renderWrapper();

    expect(wrapper.find('svg').length).toBe(0);
  });
});
