import { render, fireEvent } from '@testing-library/react';
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

  it('should render an img with alt="" when an imgSrc is provided', () => {
    const wrapper = render(<PageHero imgSrc="test" />);
    wrapper.getByAltText('');
  });

  it('should not render an image when imgSrc is not provided', () => {
    const wrapper = render(<PageHero imgAlt="alt" />);
    expect(wrapper.queryByAltText('alt')).not.toBeInTheDocument();
  });

  it('should not render anything when no props are provided', () => {
    const wrapper = render(<PageHero />);
    expect(wrapper.queryByText(/.+/)).not.toBeInTheDocument();
  });
});
