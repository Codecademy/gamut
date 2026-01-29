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
    const progressBar = view.getByTestId('progress-bar-bar');

    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  it('uses percentage as width when it is greater than minimumPercent', () => {
    const { view } = renderView({ minimumPercent: 25, percent: 50 });
    const progressBar = view.getByTestId('progress-bar-bar');

    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  it('uses minimumPercentage as width when it is greater than percent', () => {
    const { view } = renderView({ minimumPercent: 75, percent: 50 });
    const progressBar = view.getByTestId('progress-bar-bar');

    expect(progressBar).toHaveStyle({ width: '75%' });
  });

  it('does not include percentage visually when size is small', () => {
    const { view } = renderView({ size: 'small' });
    /** RTL doesn't differentiate between visible and invisible
         test so this tests that only the screen reader text renders */
    view.getByText('Progress: 50%');
  });

  it('includes percentage visually when size is large', () => {
    const { view } = renderView({ size: 'large' });
    /** RTL doesn't differentiate between visible and invisible
         test so this tests that only the screen reader text renders */
    view.getByText('Progress: 50%');

    expect(view.getByText('50%')).toHaveAttribute('aria-hidden', 'true');
  });

  it('uses an svg when given a pattern', () => {
    const { view } = renderView({ pattern: DiagonalADense });
    view.getByRole('img', { hidden: true });
    view.getByTitle('Diagonal A Dense');
  });

  it('does not use an svg when not given a pattern', () => {
    const { view } = renderView();

    expect(view.queryByRole('img', { hidden: true })).toBeNull();
  });
});
