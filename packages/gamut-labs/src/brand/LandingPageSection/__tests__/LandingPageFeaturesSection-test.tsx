import React from 'react';
import { mount } from 'enzyme';

import {
  LandingPageFeaturesSection,
  LandingPageFeaturesSectionProps,
  LandingPageSectionCTA,
  LandingPageSectionDescription,
  LandingPageSectionTitle,
  LandingPageFeature,
} from '..';
import { Column } from '@codecademy/gamut';

const renderComponent = (
  overrides: Partial<LandingPageFeaturesSectionProps> = {}
) => {
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

  return mount(<LandingPageFeaturesSection {...props} />);
};

describe('LandingPageFeaturesSection', () => {
  it('renders a title when title prop is provided', () => {
    const wrapper = renderComponent({ title: 'Test Title' });
    expect(wrapper.find(LandingPageSectionTitle).text()).toEqual('Test Title');
  });

  it('does not render a title when title prop is not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find(LandingPageSectionTitle)).toHaveLength(0);
  });

  it('renders a description when desc prop is provided', () => {
    const wrapper = renderComponent({ desc: 'Test Description' });
    expect(wrapper.find(LandingPageSectionDescription).prop('text')).toEqual(
      'Test Description'
    );
  });

  it('does not render a description when desc prop is not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find(LandingPageSectionDescription)).toHaveLength(0);
  });

  it('renders a cta button when cta and ctaHref props are provided', () => {
    const wrapper = renderComponent({ cta: 'Click Me', ctaHref: '#' });
    expect(wrapper.find(LandingPageSectionCTA).text()).toEqual('Click Me');
  });

  it('does not render a cta button when both cta and ctaHref props are not provided', () => {
    const wrapper = renderComponent();
    expect(wrapper.find(LandingPageSectionCTA)).toHaveLength(0);
  });

  it('does not render a cta button when ctaHref prop is not provided', () => {
    const wrapper = renderComponent({ cta: 'Click Me' });
    expect(wrapper.find(LandingPageSectionCTA)).toHaveLength(0);
  });

  it('renders a LandingPageFeature component for each element in the features array prop', () => {
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
    expect(wrapper.find(LandingPageFeature)).toHaveLength(2);
  });

  it('renders column size based on the number of features', () => {
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
    expect(wrapper.find(Column).first().prop('size')).toMatchObject({
      xs: 12,
      sm: 6,
    });
  });
});
