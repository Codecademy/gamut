import React from 'react';
import { mount } from 'enzyme';

import {
  PageFeatures,
  PageFeaturesProps,
  CTA,
  Description,
  Title,
  Feature,
} from '..';

const renderComponent = (overrides: Partial<PageFeaturesProps> = {}) => {
  const props = {
    features: [
      {
        imgSrc: 'https://content.codecademy.com/courses/free/boba.svg',
        imgAlt: 'Codey boba tea',
        title: 'Software Engineer',
        desc: '**Software Engineer**. Example link [here](#).',
      },
    ],
    ...overrides,
  };

  return mount(<PageFeatures {...props} />);
};

describe('PageFeatures', () => {
  it('renders a title when title prop is provided', () => {
    const wrapper = renderComponent({ title: 'Test Title' });
    expect(wrapper.find(Title).text()).toEqual('Test Title');
  });

  it('does not render a title when title prop is not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find(Title)).toHaveLength(0);
  });

  it('renders a description when desc prop is provided', () => {
    const wrapper = renderComponent({ desc: 'Test Description' });
    expect(wrapper.find(Description).prop('text')).toEqual('Test Description');
  });

  it('does not render a description when desc prop is not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find(Description)).toHaveLength(0);
  });

  it('renders a cta button when cta prop is provided', () => {
    const wrapper = renderComponent({
      cta: {
        text: 'Click Me',
        href: '#',
      },
    });
    expect(wrapper.find(CTA).text()).toEqual('Click Me');
  });

  it('does not render a cta button when cta prop is not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find(CTA)).toHaveLength(0);
  });

  it('renders a PageFeature component for each element in the features array prop', () => {
    const wrapper = renderComponent({
      features: [
        {
          imgSrc: 'https://content.codecademy.com/courses/free/boba.svg',
          imgAlt: 'Codey boba tea',
          title: 'Software Engineer',
          desc: '**Software Engineer**. Example link [here](#).',
        },
        {
          imgSrc: 'https://content.codecademy.com/courses/free/boba.svg',
          imgAlt: 'Codey boba tea',
          title: 'Data Scientist',
          desc: '**Data Scientist**. Example link [here](#).',
        },
      ],
    });
    expect(wrapper.find(Feature)).toHaveLength(2);
  });
});
