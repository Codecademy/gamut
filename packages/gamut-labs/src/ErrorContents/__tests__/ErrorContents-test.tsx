import { setupRtl } from '@codecademy/gamut-tests';

import { ErrorContents } from '..';

const renderView = setupRtl(ErrorContents);

describe('ErrorContents', () => {
  it('does not show support information when none is provided', () => {
    const { view } = renderView();

    expect(view.queryByRole('group')).toBeNull();
  });

  it('shows support information when provided', () => {
    const { view } = renderView({
      supportInformation: [['User ID', 'abc123']],
    });

    view.getByRole('group');
  });
});
