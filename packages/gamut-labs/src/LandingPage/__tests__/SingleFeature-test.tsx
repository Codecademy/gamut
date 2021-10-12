import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';

import { PageSingleFeature } from '..';

const renderView = setupRtl(PageSingleFeature);

describe('PageSingleFeature', () => {
  it('should render a title when one is provided', () => {
    const { view: wrapper } = renderView({ title: 'title' });
    wrapper.getByText('title');
  });

  it('should render a description when one is provided', () => {
    const { view: wrapper } = renderView({ desc: 'desc' });
    wrapper.getByText('desc');
  });

  it('should render an eyebrow when one is provided with a title', () => {
    const { view: wrapper } = renderView({
      eyebrow: { text: 'eyebrow' },
      title: 'title',
    });
    wrapper.getByText('eyebrow');
  });

  it('should not render an eyebrow when title is not present', () => {
    const { view: wrapper } = renderView({
      eyebrow: { text: 'eyebrow' },
    });
    expect(wrapper.queryByText('eyebrow')).not.toBeInTheDocument();
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

  it('should render an h1 when passed isPageHeading', () => {
    const { view: wrapper } = renderView({
      title: 'title',
      isPageHeading: true,
    });
    wrapper.getByRole('heading', { level: 1 });
  });

  it('should render an h2 when isPageHeading is false', () => {
    const { view: wrapper } = renderView({
      title: 'title',
      isPageHeading: false,
    });
    wrapper.getByRole('heading', { level: 2 });
  });
});
