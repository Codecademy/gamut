import { setupRtl } from '@codecademy/gamut-tests';

import { RatingsBar } from '..';

const renderView = setupRtl(RatingsBar, {
  percent: 50,
});

describe('RatingsBar', () => {
  it('uses percentage as width when no minimumPercent is provided', () => {
    const { view } = renderView({ percent: 50 });

    expect(view.getAllByTestId('ratings-bar-bar')[0]).toHaveStyle('width: 50%');
  });

  it('uses percentage as width when it is greater than minimumPercent', () => {
    const { view } = renderView({ minimumPercent: 25, percent: 50 });

    expect(view.getAllByTestId('ratings-bar-bar')[0]).toHaveStyle('width: 50%');
  });

  it('uses minimumPercentage as width when it is greater than percent', () => {
    const { view } = renderView({ minimumPercent: 75, percent: 50 });

    expect(view.getAllByTestId('ratings-bar-bar')[0]).toHaveStyle('width: 75%');
  });
});
