import { setupRtl } from '@codecademy/gamut-tests';

import { GlobalFooter } from '..';

const renderView = setupRtl(GlobalFooter, {
  onClick: jest.fn(),
  showNewFooter: false,
  userGeo: 'US',
});

describe('GlobalFooter', () => {
  it('does not explode', () => {
    const { view } = renderView();

    view.getByRole('contentinfo');
  });

  it('shows new footer when showNewFooter is true', () => {
    const { view } = renderView({ showNewFooter: true });

    view.getByTitle('Codecademy from Skillsoft');
    expect(view.queryByText('Company')).toBeNull();
  });

  it('does not show new footer when showNewFooter is false', () => {
    const { view } = renderView();

    view.getByText('Company');
    expect(view.queryByTitle('Codecademy from Skillsoft')).toBeNull();
  });
});
