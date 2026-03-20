import { setupRtl } from '@codecademy/gamut-tests';

import { Rotation } from '..';

const renderView = setupRtl(Rotation, { children: 'content' });

describe('Rotation', () => {
  it('renders children', () => {
    const { view } = renderView();

    view.getByText('content');
  });

  it('applies aria-hidden when specified', () => {
    const { view } = renderView({ 'aria-hidden': true });

    expect(view.getByText('content')).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not apply aria-hidden by default', () => {
    const { view } = renderView();

    expect(view.getByText('content')).not.toHaveAttribute('aria-hidden');
  });
});
