import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';

import { PageVideoGallery } from '..';

jest.mock('@codecademy/gamut', () => ({
  ...jest.requireActual<object>('@codecademy/gamut'),
  Video: () => null,
}));

const renderView = setupRtl(PageVideoGallery, {
  videos: [
    {
      url: 'url-1',
      title: 'title-1',
    },
    {
      url: 'url-2',
      title: 'url-2',
    },
    {
      url: 'url-3',
      title: 'url-3',
    },
  ],
});

describe('PageVideoGallery', () => {
  it('should render a title when one is provided', () => {
    const { view } = renderView({ title: 'title' });

    view.getByText('title');
  });

  it('should render a description when one is provided', () => {
    const { view } = renderView({ desc: 'desc' });

    view.getByText('desc');
  });

  it('can pass a callback for when anchor tags in the description are clicked', () => {
    const testOnClick = jest.fn();

    const { view } = renderView({
      desc:
        '[Rob Thomas of Matchbox Twenty](https://en.wikipedia.org/wiki/Rob_Thomas_(musician))',
      onAnchorClick: testOnClick,
    });

    const link = view.getByText('Rob Thomas of Matchbox Twenty');

    fireEvent.click(link);

    expect(testOnClick).toHaveBeenCalledTimes(1);
  });

  it('should render a button when cta prop is provided', () => {
    const { view } = renderView({
      cta: { text: 'cta', href: 'https://codecademy.com' },
    });

    view.getByRole('link', { name: 'cta' });
  });
});
