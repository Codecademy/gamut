import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { Image } from '..';

const image = 'test_url';

const renderView = setupRtl(Image, { image });

describe('CurriculumCard Image', () => {
  it('displays an image when image exists', () => {
    const { view } = renderView();
    expect(view.getByRole('img')).toHaveAttribute('src', image);
  });

  it('should not have alt text', () => {
    const { view } = renderView();

    expect(view.getByRole('img')).toHaveAttribute('alt', '');
  });

  it('sets a placeholder image src if an error occurs loading the real image', () => {
    const { view } = renderView();

    fireEvent.error(view.getByRole('img'), new Event('error'));

    expect(view.getByRole('img').getAttribute('src')).toMatch('.svg');
  });
});
