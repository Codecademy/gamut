import { setupRtl } from '@codecademy/gamut-tests';

import { PausableImage } from '..';

jest.mock('@loadable/component', () => () => () => 'pausable');

const renderView = setupRtl(PausableImage);

const createImg = (url: string) => ({
  alt: '',
  src: url,
});

describe('PausableImage', () => {
  it('renders a pausable image when the URL ends with .gif', () => {
    const { view } = renderView({
      ...createImg('image.gif'),
    });

    view.getByText('pausable');
  });

  it('renders a static image when the URL does not end with .gif', () => {
    const { view } = renderView({
      ...createImg('image.svg'),
    });

    expect(view.getByRole('img')).toHaveAttribute('src', 'image.svg');
  });
});
