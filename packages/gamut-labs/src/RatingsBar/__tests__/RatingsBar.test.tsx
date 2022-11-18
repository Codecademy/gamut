import { setupEnzyme } from '@codecademy/gamut-tests';

import { RatingsBar } from '..';

const renderWrapper = setupEnzyme(RatingsBar, {
  percent: 50,
});

describe('RatingsBar', () => {
  it('uses percentage as width when no minimumPercent is provided', () => {
    const { wrapper } = renderWrapper({ percent: 50 });

    expect(
      wrapper.find('[data-testid="ratings-bar-bar"]').first().prop('style')
    ).toHaveProperty('width', '50%');
  });

  it('uses percentage as width when it is greater than minimumPercent', () => {
    const { wrapper } = renderWrapper({ minimumPercent: 25, percent: 50 });

    expect(
      wrapper.find('[data-testid="ratings-bar-bar"]').first().prop('style')
    ).toHaveProperty('width', '50%');
  });

  it('uses minimumPercentage as width when it is greater than percent', () => {
    const { wrapper } = renderWrapper({ minimumPercent: 75, percent: 50 });

    expect(
      wrapper.find('[data-testid="ratings-bar-bar"]').first().prop('style')
    ).toHaveProperty('width', '75%');
  });
});
