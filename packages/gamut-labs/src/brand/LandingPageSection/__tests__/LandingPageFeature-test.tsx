import React from 'react';
import { mount } from 'enzyme';

import { LandingPageFeature, LandingPageFeatureProps } from '..';

const renderComponent = (overrides: Partial<LandingPageFeatureProps> = {}) => {
  const props = {
    imgSrc: 'https://content.codecademy.com/courses/free/boba.svg',
    imgAlt: 'Codey Boba Tea',
    ...overrides,
  };

  return mount(<LandingPageFeature {...props} />);
};

describe('LandingPageFeature', () => {
  it('renders a title when title prop is provided', () => {
    const wrapper = renderComponent({ title: 'Test Title' });
    expect(wrapper.find('h4').text()).toEqual('Test Title');
  });

  it('does not render a title when title prop is not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find('h4')).toHaveLength(0);
  });

  it('renders a description when desc prop is provided', () => {
    const wrapper = renderComponent({ desc: 'Test Description' });
    expect(wrapper.find('p').text()).toEqual('Test Description');
  });

  it('does not render a description when desc prop is not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find('p')).toHaveLength(0);
  });

  it('renders an icon when isIcon prop is true', () => {
    const wrapper = renderComponent({ isIcon: true });
    expect(wrapper.find('img[data-testid="feature-icon"]')).toHaveLength(1);
    expect(wrapper.find('img[data-testid="feature-image"]')).toHaveLength(0);
  });

  it('renders an image when isIcon prop is not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find('img[data-testid="feature-image"]')).toHaveLength(1);
    expect(wrapper.find('img[data-testid="feature-icon"]')).toHaveLength(0);
  });
});
