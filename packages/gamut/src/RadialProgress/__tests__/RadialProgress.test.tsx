import { setupRtl } from '@codecademy/gamut-tests';

import { RadialProgress } from '..';

const renderView = setupRtl(RadialProgress, { value: 50 });

describe('RadialProgress', () => {
  it('renders with an accessible progress label', () => {
    const { view } = renderView();

    view.getByText('50% progress');
  });

  it('uses the second value for the label when given an array', () => {
    const { view } = renderView({ value: [25, 75] });

    view.getByText('75% progress');
  });

  it('renders children', () => {
    const { view } = renderView({ children: <span>50%</span> });

    view.getByText('50%');
  });

  it('renders with a custom size', () => {
    const { view } = renderView({ size: 100 });

    const svg = view.container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '100');
    expect(svg).toHaveAttribute('height', '100');
  });
});
