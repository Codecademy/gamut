import { setupRtl } from '@codecademy/gamut-tests';

import { Shimmer } from '../Shimmer';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  const renderView = setupRtl(Spinner, {});

  it('renders with an accessible title', () => {
    const { view } = renderView();

    view.getByTitle('Spinner');
  });

  it('renders with a default size of 24', () => {
    const { view } = renderView();

    const svg = view.getByTitle('Spinner').closest('svg');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('renders with a custom size', () => {
    const { view } = renderView({ size: 48 });

    const svg = view.getByTitle('Spinner').closest('svg');
    expect(svg).toHaveAttribute('width', '48');
    expect(svg).toHaveAttribute('height', '48');
  });
});

describe('Shimmer', () => {
  const renderView = setupRtl(Shimmer, {});

  it('renders', () => {
    const { view } = renderView();

    expect(view.container.firstChild).toBeTruthy();
  });
});
