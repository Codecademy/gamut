import { setupEnzyme } from '@codecademy/gamut-tests';

import {
  CTA,
  Description,
  Feature,
  FeaturedDescription,
  FeaturedIcon,
  FeaturedImage,
  FeaturedStat,
  FeaturedTitle,
  PageFeatures,
  PageFeaturesProps,
  Title,
} from '..';

const renderWrapper = setupEnzyme(PageFeatures, {
  features: [
    {
      imgSrc: 'https://content.codecademy.com/courses/free/boba.svg',
      imgAlt: 'Codey boba tea',
      title: 'Software Engineer',
      desc: '**Software Engineer**. Example link [here](#).',
    },
  ],
});

describe('PageFeatures', () => {
  it('renders a title when title prop is provided', () => {
    const { wrapper } = renderWrapper({ title: 'Test Title' });
    expect(wrapper.find(Title).text()).toEqual('Test Title');
  });

  it('does not render a title when title prop is not provided', () => {
    const { wrapper } = renderWrapper();
    expect(wrapper.find(Title)).toHaveLength(0);
  });

  it('renders a description when desc prop is provided', () => {
    const { wrapper } = renderWrapper({ desc: 'Test Description' });
    expect(wrapper.find(Description).prop('text')).toEqual('Test Description');
  });

  it('does not render a description when desc prop is not provided', () => {
    const { wrapper } = renderWrapper();
    expect(wrapper.find(Description)).toHaveLength(0);
  });

  it('renders a cta button when cta prop is provided', () => {
    const { wrapper } = renderWrapper({
      cta: {
        text: 'Click Me',
        href: '#',
      },
    });
    expect(wrapper.find(CTA).text()).toEqual('Click Me');
  });

  it('does not render a cta button when cta prop is not provided', () => {
    const { wrapper } = renderWrapper();
    expect(wrapper.find(CTA)).toHaveLength(0);
  });

  it('renders a PageFeature component for each element in the features array prop', () => {
    const { wrapper } = renderWrapper({
      features: [
        {
          title: 'Software Engineer',
          desc: '**Software Engineer**. Example link [here](#).',
        },
        {
          title: 'Data Scientist',
          desc: '**Data Scientist**. Example link [here](#).',
        },
      ],
    });
    expect(wrapper.find(Feature)).toHaveLength(2);
  });

  const features_tt = [
    ['image', ['imgSrc', 'imgAlt', 'title', 'desc'], [1, 0, 0, 1, 1]],
    ['icon', ['imgSrc', 'imgAlt', 'title', 'desc'], [0, 1, 0, 1, 1]],
    ['stat', ['statText', 'title', 'desc'], [0, 0, 1, 1, 1]],
    ['text', ['title', 'desc'], [0, 0, 0, 1, 1]],
  ];

  it.each(features_tt)(
    'it renders %s feature',
    (featuresMedia, fields, components) => {
      const m = (featuresMedia === 'text'
        ? undefined
        : featuresMedia) as PageFeaturesProps['featuresMedia'];
      const f = fields as string[];
      const c = components as number[];
      const { wrapper } = renderWrapper({
        featuresMedia: m,
        features: [
          {
            imgSrc: f.includes('imgSrc')
              ? 'https://placekitten.com/50/50'
              : undefined,
            imgAlt: f.includes('imgAlt') ? 'Alternate image text' : undefined,
            statText: f.includes('statText') ? '100%' : undefined,
            title: f.includes('title') ? 'Software Engineer' : undefined,
            desc: f.includes('desc')
              ? '**Software Engineer**. Example link [here](#).'
              : undefined,
          },
        ],
      });

      expect(wrapper.find(Feature)).toHaveLength(1);

      expect(wrapper.find(FeaturedImage)).toHaveLength(c[0]);
      expect(wrapper.find(FeaturedIcon)).toHaveLength(c[1]);
      expect(wrapper.find(FeaturedStat)).toHaveLength(c[2]);
      expect(wrapper.find(FeaturedTitle)).toHaveLength(c[3]);
      expect(wrapper.find(FeaturedDescription)).toHaveLength(c[4]);
    }
  );
});
