import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';

import { PageHero } from '..';

const renderView = setupRtl(PageHero);

describe('PageHero', () => {
  it('should render a title when one is provided', () => {
    const { view: wrapper } = renderView({ title: 'title' });
    wrapper.getByText('title');
  });

  it('should render a description when one is provided', () => {
    const { view: wrapper } = renderView({ desc: 'desc' });
    wrapper.getByText('desc');
  });

  it('can pass a callback for when anchor tags in the description are clicked', () => {
    const testOnClick = jest.fn();

    const { view: wrapper } = renderView({
      desc:
        '[Rob Thomas of Matchbox Twenty](https://en.wikipedia.org/wiki/Rob_Thomas_(musician))',
      onAnchorClick: testOnClick,
    });

    const link = wrapper.getByText('Rob Thomas of Matchbox Twenty');

    fireEvent.click(link);

    expect(testOnClick).toHaveBeenCalledTimes(1);
  });

  it('should render a button when cta prop is provided', () => {
    const { view: wrapper } = renderView({
      cta: { text: 'cta', href: 'https://codecademy.com' },
    });
    wrapper.getByText('cta');
  });

  it('should render an img when media prop with type="image" is provided', () => {
    const { view: wrapper } = renderView({
      media: { type: 'image', src: 'test', alt: 'alt' },
    });
    wrapper.getByAltText('alt');
  });

  it('should not render an image when media prop is not provided', () => {
    const { view: wrapper } = renderView();
    expect(wrapper.queryByAltText('alt')).not.toBeInTheDocument();
  });

  it('should render a video media prop with type="video" is provided', () => {
    const { view: wrapper } = renderView({
      media: {
        type: 'video',
        videoUrl: 'video-url',
        videoTitle: 'video-title',
      },
    });
    wrapper.getByTitle('video-title');
  });
  it('should not render a video when media prop is not provided', () => {
    const { view: wrapper } = renderView({ title: 'title' });
    expect(wrapper.queryByTitle('video-title')).not.toBeInTheDocument();
  });

  it('should not render anything when no props are provided', () => {
    const { view: wrapper } = renderView();
    expect(wrapper.queryByText(/.+/)).not.toBeInTheDocument();
  });
});
