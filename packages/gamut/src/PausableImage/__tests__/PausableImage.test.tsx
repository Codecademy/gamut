import { setupRtl } from '@codecademy/gamut-tests';
import { waitFor } from '@testing-library/react';

import { PausableImage } from '..';

const renderView = setupRtl(PausableImage);

jest.mock('../BaseImage', () => ({ src }: { src: string }) => (
  <>
    <img alt="" src={`frozen-${src}`} />
    <span>Pause animated image</span>
  </>
));

describe('PausableImage', () => {
  it('renders a pausable image when the URL ends with .gif', async () => {
    const { view } = renderView({
      src: 'image.gif',
    });

    // wait to find static image while loading pause ui
    view.getByRole('img');
    // wait to find pause button
    await waitFor(() => view.getByText('Pause animated image'));
  });

  it('renders a static image when the URL does not end with .gif', () => {
    const { view } = renderView({
      src: 'image.svg',
    });

    expect(view.getByRole('img')).toHaveAttribute('src', 'image.svg');
  });
});
