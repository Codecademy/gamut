import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { PageHero } from '..';

describe('PageHero', () => {
  it('should render a title when one is provided', () => {
    const wrapper = render(<PageHero title="title" />);
    wrapper.getByText('title');
  });

  it('should render a description when one is provided', () => {
    const wrapper = render(<PageHero desc="desc" />);
    wrapper.getByText('desc');
  });

  it('can pass a callback for when anchor tags in the description are clicked', () => {
    const testOnClick = jest.fn();

    const wrapper = render(
      <PageHero
        desc="[Rob Thomas of Matchbox Twenty](https://en.wikipedia.org/wiki/Rob_Thomas_(musician))"
        onAnchorClick={testOnClick}
      />
    );

    const link = wrapper.getByText('Rob Thomas of Matchbox Twenty');

    fireEvent.click(link);

    expect(testOnClick).toHaveBeenCalledTimes(1);
  });

  it('should render a button when cta prop is provided', () => {
    const wrapper = render(
      <PageHero cta={{ text: 'cta', href: 'https://codecademy.com' }} />
    );
    wrapper.getByText('cta');
  });

  it('should render an img when media prop with type="image" is provided', () => {
    const wrapper = render(
      <PageHero media={{ type: 'image', src: 'test', alt: 'alt' }} />
    );
    wrapper.getByAltText('alt');
  });

  it('should not render an image when media prop is not provided', () => {
    const wrapper = render(<PageHero />);
    expect(wrapper.queryByAltText('alt')).not.toBeInTheDocument();
  });

  it('should render a video media prop with type="video" is provided', () => {
    const wrapper = render(
      <PageHero
        media={{
          type: 'video',
          videoUrl: 'video-url',
          videoTitle: 'video-title',
        }}
      />
    );
    wrapper.getByTitle('video-title');
  });
  it('should not render a video when media prop is not provided', () => {
    const wrapper = render(<PageHero title="title" />);
    expect(wrapper.queryByTitle('video-title')).not.toBeInTheDocument();
  });

  it('should not render anything when no props are provided', () => {
    const wrapper = render(<PageHero />);
    expect(wrapper.queryByText(/.+/)).not.toBeInTheDocument();
  });
});
