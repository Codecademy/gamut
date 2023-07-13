import { setupRtl } from '@codecademy/gamut-tests';

import { PageFeatures } from '..';

const renderView = setupRtl(PageFeatures, {
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
    const { view } = renderView({ title: 'Test Title' });

    view.getByText('Test Title');
  });

  it('renders a description when desc prop is provided', () => {
    const { view } = renderView({ desc: 'Test Description' });

    view.getByText('Test Description');
  });

  it('renders a cta button when cta prop is provided', () => {
    const { view } = renderView({
      cta: {
        text: 'Click Me',
        href: '#',
      },
    });

    view.getByRole('link', { name: 'Click Me' });
  });

  it('renders a feature for each element in the features array prop', () => {
    const { view } = renderView({
      features: [
        {
          title: 'Software Engineer',
          desc: '**Software Engineer**. Example link [here](#).',
          testId: 'feature',
        },
        {
          title: 'Data Scientist',
          desc: '**Data Scientist**. Example link [here](#).',
          testId: 'feature',
        },
      ],
    });

    expect(view.queryAllByTestId('feature')).toHaveLength(2);
  });

  it('renders a feature image when featuresMedia is image', () => {
    const { view } = renderView({
      featuresMedia: 'image',
      features: [
        {
          title: 'Software Engineer',
          desc: '**Software Engineer**. Example link [here](#).',
          imgSrc: 'https://content.codecademy.com/courses/free/boba.svg',
          imgAlt: 'Codey boba tea',
        },
      ],
    });

    view.getByTestId('feature-image');
  });

  it('renders a feature icon when featuresMedia is icon', () => {
    const { view } = renderView({
      featuresMedia: 'icon',
      features: [
        {
          title: 'Software Engineer',
          desc: '**Software Engineer**. Example link [here](#).',
          imgSrc: 'https://content.codecademy.com/courses/free/boba.svg',
          imgAlt: 'Codey boba tea',
        },
      ],
    });

    view.getByTestId('feature-icon');
  });

  it('renders a feature stat when featuresMedia is stat', () => {
    const { view } = renderView({
      featuresMedia: 'stat',
      features: [
        {
          title: 'Software Engineer',
          desc: '**Software Engineer**. Example link [here](#).',
          statText: '100%',
        },
      ],
    });

    view.getByTestId('feature-stat');
  });

  it('renders a feature text when featuresMedia is text', () => {
    const { view } = renderView({
      features: [
        {
          title: 'Software Engineer',
          desc: 'I am a description',
        },
      ],
    });

    view.getByText('Software Engineer');
    view.getByText('I am a description');
  });
});
