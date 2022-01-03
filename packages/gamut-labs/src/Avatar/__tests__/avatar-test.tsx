import { setupRtl } from '@codecademy/gamut-tests';

import { Avatar } from '..';

const renderView = setupRtl(Avatar, {
  src: '',
});

describe('Avatar', () => {
  it('when an "alt" prop is passed, an "alt" attribute is added to the img', () => {
    const { view } = renderView({ alt: 'alt' });

    view.getByAltText('alt');
  });

  it('when an "aria-labelledby" prop is passed, an "aria-labelledby" attribute is added to the img', () => {
    const { view } = renderView({ 'aria-labelledby': 'alt' });

    expect(view.getByRole('img')).toHaveAttribute('aria-labelledby', 'alt');
  });
});
