import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';

import { PageSingleFeature } from '..';

const renderView = setupRtl(PageSingleFeature);

describe('PageSingleFeature', () => {
  it('should render a title when one is provided', () => {
    const { view } = renderView({ title: 'title' });

    view.getByText('title');
  });

  it('should render a description when one is provided', () => {
    const { view } = renderView({ desc: 'desc' });

    view.getByText('desc');
  });

  it('should render an eyebrow when one is provided with a title', () => {
    const { view } = renderView({
      eyebrow: { text: 'eyebrow' },
      title: 'title',
    });

    view.getByText('eyebrow');
  });

  it('should not render an eyebrow when title is not present', () => {
    const { view } = renderView({
      eyebrow: { text: 'eyebrow' },
    });

    expect(view.queryByText('eyebrow')).toBeNull();
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

  it('should render an img when media prop with type="image" is provided', () => {
    const { view } = renderView({
      media: { type: 'image', src: 'test', alt: 'alt' },
    });

    view.getByAltText('alt');
  });

  it('should render a clickable img when media prop with linkUrl is provided', () => {
    const { view } = renderView({
      media: { type: 'image', src: 'test', alt: 'alt', linkUrl: '/test' },
    });

    view.getByRole('link');
  });

  it('should not render an image when media prop is not provided', () => {
    const { view } = renderView();

    expect(view.queryByAltText('alt')).toBeNull();
  });

  it('should render a video media prop with type="video" is provided', () => {
    const { view } = renderView({
      media: {
        type: 'video',
        videoUrl: 'video-url',
        videoTitle: 'video-title',
      },
    });

    view.getByTitle('video-title');
  });

  it('should not render a video when media prop is not provided', () => {
    const { view } = renderView({ title: 'title' });

    expect(view.queryByTitle('video-title')).toBeNull();
  });

  it('should not render anything when no props are provided', () => {
    const { view } = renderView();

    expect(view.queryByText(/.+/)).not.toBeInTheDocument();
  });

  it('should render an h1 when passed isPageHeading', () => {
    const { view } = renderView({
      title: 'title',
      isPageHeading: true,
    });

    view.getByRole('heading', { level: 1 });
  });

  it('should render an h2 when isPageHeading is false', () => {
    const { view } = renderView({
      title: 'title',
      isPageHeading: false,
    });

    view.getByRole('heading', { level: 2 });
  });
});
