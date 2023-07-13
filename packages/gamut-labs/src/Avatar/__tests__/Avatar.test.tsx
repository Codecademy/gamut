import { setupRtl } from '@codecademy/gamut-tests';

import { Avatar } from '..';

const renderView = setupRtl(Avatar, {
  src: '',
  alt: '',
});

describe('Avatar', () => {
  it('when an "alt" prop is passed, an "alt" attribute is added to the <img/>', () => {
    const { view } = renderView({ alt: 'alt' });

    view.getByAltText('alt');
  });

  it('when an "aria-labelledby" prop is passed, an "aria-labelledby" attribute is added to the <img/>', () => {
    const { view } = renderView({ 'aria-labelledby': 'label', alt: undefined });

    const img = view.getByRole('img');
    expect(img).toHaveAttribute('aria-labelledby', 'label');
  });

  it('when a "size" prop is passed, the <img/> height and width attributes are set accordingly', () => {
    const { view } = renderView({ size: 32 });

    const img = view.getByRole('img');
    expect(img).toHaveStyle('width: 32px');
    expect(img).toHaveStyle('height: 32px');
  });

  it('when a "size" prop is not passed, the <img/> height and width attributes are set to the default value', () => {
    const { view } = renderView();

    const img = view.getByRole('img');
    expect(img).toHaveStyle('width: 118px');
    expect(img).toHaveStyle('height: 118px');
  });
});
