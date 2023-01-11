import { setupRtl } from '@codecademy/gamut-tests';

import { PausableImage } from '..';

const renderView = setupRtl(PausableImage);

const createImg = (url: string) => ({
  alt: '',
  src: url,
});

describe('PausableImage', () => {
  it('renders a pausable image when the URL ends with .gif', async () => {
    const { view } = renderView({
      ...createImg('image.gif'),
    });
    // wait to find static image while loading pause ui
    await view.findByRole('img');
    // wait to find pause button
    await view.findByText('Pause animated image');
    view.getByText('Pause animated image');
  });

  it('renders a static image when the URL does not end with .gif', () => {
    const { view } = renderView({
      ...createImg('image.svg'),
    });

    expect(view.getByRole('img')).toHaveAttribute('src', 'image.svg');
  });
});
