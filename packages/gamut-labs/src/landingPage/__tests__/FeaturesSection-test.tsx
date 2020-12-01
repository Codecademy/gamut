import { mount } from 'enzyme';
import React from 'react';

import {
  PageFeature,
  PageFeaturesSection,
  PageFeaturesSectionProps,
  PageSectionCTA,
  PageSectionDescription,
  PageSectionTitle,
} from '..';

const renderComponent = (overrides: Partial<PageFeaturesSectionProps> = {}) => {
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

  return mount(<PageFeaturesSection {...props} />);
};

describe('PageFeaturesSection', () => {
  it('renders a title when title prop is provided', () => {
    const wrapper = renderComponent({ title: 'Test Title' });
    expect(wrapper.find(PageSectionTitle).text()).toEqual('Test Title');
  });

  it('does not render a title when title prop is not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find(PageSectionTitle)).toHaveLength(0);
  });

  it('renders a description when desc prop is provided', () => {
    const wrapper = renderComponent({ desc: 'Test Description' });
    expect(wrapper.find(PageSectionDescription).prop('text')).toEqual(
      'Test Description'
    );
  });

  it('does not render a description when desc prop is not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find(PageSectionDescription)).toHaveLength(0);
  });

  it('renders a cta button when cta prop is provided', () => {
    const wrapper = renderComponent({
      cta: {
        text: 'Click Me',
        href: '#',
      },
    });
    expect(wrapper.find(PageSectionCTA).text()).toEqual('Click Me');
  });

  it('does not render a cta button when cta prop is not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find(PageSectionCTA)).toHaveLength(0);
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
    expect(wrapper.find(PageFeature)).toHaveLength(2);
  });
});
