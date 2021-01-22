import { mount } from 'enzyme';
import React from 'react';

import { Feature, FeatureProps } from '..';

const renderComponent = (overrides: Partial<FeatureProps> = {}) => {
  const props: FeatureProps = {
    featuresMedia: 'image',
    imgSrc: 'https://content.codecademy.com/courses/free/boba.svg',
    imgAlt: 'Codey Boba Tea',
    ...overrides,
  };

  return mount(<Feature {...props} />);
};

describe('Feature', () => {
  it('renders a title when title prop is provided', () => {
    const wrapper = renderComponent({ title: 'Test Title' });
    expect(wrapper.find('h3').text()).toEqual('Test Title');
  });

  it('does not render a title when title prop is not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find('h3')).toHaveLength(0);
  });

  it('renders a description when desc prop is provided', () => {
    const wrapper = renderComponent({ desc: 'Test Description' });
    expect(wrapper.find('p').text()).toEqual('Test Description');
  });

  it('does not render a description when desc prop is not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find('p')).toHaveLength(0);
  });

  it('renders a no-media feature', () => {
    const wrapper = renderComponent({ featuresMedia: 'none' });
    expect(wrapper.find('img[data-testid="feature-image"]')).toHaveLength(0);
    expect(wrapper.find('img[data-testid="feature-icon"]')).toHaveLength(0);
    expect(wrapper.find('div[data-testid="feature-stat"]')).toHaveLength(0);
  });

  it('renders an image', () => {
    const wrapper = renderComponent();
    expect(wrapper.find('img[data-testid="feature-image"]')).toHaveLength(1);
    expect(wrapper.find('img[data-testid="feature-icon"]')).toHaveLength(0);
    expect(wrapper.find('div[data-testid="feature-stat"]')).toHaveLength(0);
  });

  it('renders an icon', () => {
    const wrapper = renderComponent({ featuresMedia: 'icon' });
    expect(wrapper.find('img[data-testid="feature-image"]')).toHaveLength(0);
    expect(wrapper.find('img[data-testid="feature-icon"]')).toHaveLength(1);
    expect(wrapper.find('div[data-testid="feature-stat"]')).toHaveLength(0);
  });

  it('renders a stat', () => {
    const wrapper = renderComponent({
      featuresMedia: 'stat',
      statText: '99.9999%',
    });
    expect(wrapper.find('img[data-testid="feature-image"]')).toHaveLength(0);
    expect(wrapper.find('img[data-testid="feature-icon"]')).toHaveLength(0);
    expect(wrapper.find('div[data-testid="feature-stat"]')).toHaveLength(1);
  });
});
