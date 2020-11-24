import React from 'react';
import { render } from '@testing-library/react';
import { PagePrefooter } from '..';

describe('PagePrefooter', () => {
  it('should render a title when one is provided', () => {
    const wrapper = render(<PagePrefooter title="title" />);
    wrapper.getByText('title');
  });

  it('should render a description when one is provided', () => {
    const wrapper = render(<PagePrefooter desc="desc" />);
    wrapper.getByText('desc');
  });

  it('should render a button when cta prop is provided', () => {
    const wrapper = render(
      <PagePrefooter cta={{ text: 'cta', href: 'https://codecademy.com' }} />
    );
    wrapper.getByText('cta');
  });

  it('should not render anything when no props are provided', () => {
    const wrapper = render(<PagePrefooter />);
    expect(wrapper.queryByText(/.+/)).not.toBeInTheDocument();
  });
});
