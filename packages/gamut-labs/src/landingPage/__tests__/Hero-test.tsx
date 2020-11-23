import React from 'react';
import { render } from '@testing-library/react';
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

  it('should render a button when both ctaHref and cta are provided', () => {
    const wrapper = render(
      <PageHero cta="cta" ctaHref="https://codecademy.com" />
    );
    wrapper.getByText('cta');
  });

  it('should not render a button when only cta is provided', () => {
    const wrapper = render(<PageHero cta="cta" />);
    expect(wrapper.queryByText('cta')).not.toBeInTheDocument();
  });

  it('should not render a button when only ctaHref is provided', () => {
    const wrapper = render(<PageHero ctaHref="https://codecademy.com" />);
    expect(
      wrapper.queryByText('https://codecademy.com')
    ).not.toBeInTheDocument();
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
