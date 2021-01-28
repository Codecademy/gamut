import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { PageVideoGallery } from '..';

jest.mock('@codecademy/gamut', () => ({
  ...jest.requireActual<object>('@codecademy/gamut'),
  Video: () => null,
}));

describe('PageVideoGallery', () => {
  const videos = [
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
  ];

  it('should render a title when one is provided', () => {
    const wrapper = render(<PageVideoGallery videos={videos} title="title" />);
    wrapper.getByText('title');
  });

  it('should render a description when one is provided', () => {
    const wrapper = render(<PageVideoGallery videos={videos} desc="desc" />);
    wrapper.getByText('desc');
  });

  it('can pass a callback for when anchor tags in the description are clicked', () => {
    const testOnClick = jest.fn();

    const wrapper = render(
      <PageVideoGallery
        videos={videos}
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
      <PageVideoGallery
        videos={videos}
        cta={{ text: 'cta', href: 'https://codecademy.com' }}
      />
    );
    wrapper.getByText('cta');
  });
});
