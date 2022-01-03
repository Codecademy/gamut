import { DiagonalADense } from '@codecademy/gamut-patterns';
import { setupRtl } from '@codecademy/gamut-tests';

import { ProgressBar } from '..';

const renderView = setupRtl(ProgressBar, {
  percent: 50,
  variant: 'blue',
});

describe('ProgressBar', () => {
  it('uses percentage as width when no minimumPercent is provided', () => {
    const { view } = renderView({ percent: 50 });

    expect(
      wrapper.find('[data-testid="progress-bar-bar"]').first().prop('style')
    ).toHaveProperty('width', '50%');
  });

  it('uses percentage as width when it is greater than minimumPercent', () => {
    const { view } = renderView({ minimumPercent: 25, percent: 50 });

    expect(
      wrapper.find('[data-testid="progress-bar-bar"]').first().prop('style')
    ).toHaveProperty('width', '50%');
  });

  it('uses minimumPercentage as width when it is greater than percent', () => {
    const { view } = renderView({ minimumPercent: 75, percent: 50 });

    expect(
      wrapper.find('[data-testid="progress-bar-bar"]').first().prop('style')
    ).toHaveProperty('width', '75%');
  });

  it('does not include percentage visually when size is small', () => {
    const { view } = renderView({ size: 'small' });
    // Enzyme doesn't differentiate between visible and invisible
    // test so this tests that only the screen reader text renders
    expect(wrapper.text()).toEqual('Progress: 50%');
  });

  it('includes percentage visually when size is large', () => {
    const { view } = renderView({ size: 'large' });
    // Enzyme doesn't differentiate between visible and invisible
    // test so this test accounts for both the visible '50%' and
    // the 'Progress: 50%' that is only visible to screenreaders
    expect(wrapper.text()).toEqual('Progress: 50%50%');
  });

  it('uses an svg when given a pattern', () => {
    const { view } = renderView({ pattern: DiagonalADense });

    expect(wrapper.find('svg').length).toBe(1);
  });

  it('does not use an svg when not given a pattern', () => {
    const { view } = renderView();

    expect(wrapper.find('svg').length).toBe(0);
  });
});
