import { setupRtl } from '@codecademy/gamut-tests';
import { waitFor } from '@testing-library/react';

import { PauseableImage } from '..';

const renderView = setupRtl(PauseableImage);

const createImg = (url: string) => ({
  alt: '',
  src: url,
});

describe('PauseableImage', () => {
  it('renders a pauseable image when the URL ends with .gif', async () => {
    const { view } = renderView({
      ...createImg('image.gif'),
    });

    // wait to find static image while loading pause ui
    view.getByRole('img');
    // wait to find pause button
    await waitFor(() => view.findByText('Pause animated image'));
  });

  it('renders a static image when the URL does not end with .gif', () => {
    const { view } = renderView({
      ...createImg('image.svg'),
    });

    expect(view.getByRole('img')).toHaveAttribute('src', 'image.svg');
  });
});
