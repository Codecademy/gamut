import React from 'react';
import { Testimonial } from '../../brand-components/src/Testimonial/';
import { VisualTheme } from '@codecademy/gamut';
import { withKnobs, select } from '@storybook/addon-knobs';

export default {
  component: Testimonial,
  title: 'Brand/Testimonial',
  decorators: [withKnobs],
};

const testimonialProps = {
  name: 'Lacey Bathala',
  occupation: 'Data Analyst',
  short_quote: "Coding isn't rocket science, it’s just falsely intimidating.",
  long_quote:
    'If it weren’t for Codecademy, I’d probably be in my old job. Codecademy enabled me to learn quick lessons between calls, on my lunch break, while multitasking. It was fun and easy and I went from 0 coding skills to a promotion within 6 months.',
  imageUrl: 'https://content.codecademy.com/courses/free/boba.svg',
};

export const testimonialSmallWithAvatar = () => (
  <Testimonial
    name={testimonialProps.name}
    occupation={testimonialProps.occupation}
    quote={testimonialProps.short_quote}
    imageUrl={testimonialProps.imageUrl}
    size="small"
    theme={select(
      'theme',
      [VisualTheme.DarkMode, VisualTheme.LightMode],
      VisualTheme.DarkMode
    )}
  />
);

testimonialSmallWithAvatar.story = {
  name: 'Testimonial in size small (with Avatar)',
};

export const testimonialSmallWithoutAvatar = () => (
  <Testimonial
    name={testimonialProps.name}
    occupation={testimonialProps.occupation}
    quote={testimonialProps.short_quote}
    size="small"
    theme={select(
      'theme',
      [VisualTheme.DarkMode, VisualTheme.LightMode],
      VisualTheme.DarkMode
    )}
  />
);

testimonialSmallWithoutAvatar.story = {
  name: 'Testimonial in size small (without Avatar)',
};

export const testimonialMediumWithAvatar = () => (
  <Testimonial
    name={testimonialProps.name}
    occupation={testimonialProps.occupation}
    quote={testimonialProps.long_quote}
    imageUrl={testimonialProps.imageUrl}
    size="medium"
    theme={select(
      'theme',
      [VisualTheme.DarkMode, VisualTheme.LightMode],
      VisualTheme.DarkMode
    )}
  />
);

testimonialMediumWithAvatar.story = {
  name: 'Testimonial in size medium (with Avatar)',
};

export const testimonialMediumWithoutAvatar = () => (
  <Testimonial
    name={testimonialProps.name}
    occupation={testimonialProps.occupation}
    quote={testimonialProps.long_quote}
    size="medium"
    theme={select(
      'theme',
      [VisualTheme.DarkMode, VisualTheme.LightMode],
      VisualTheme.DarkMode
    )}
  />
);

testimonialMediumWithoutAvatar.story = {
  name: 'Testimonial in size medium (without Avatar)',
};

export const testimonialLargeWithAvatar = () => (
  <Testimonial
    name={testimonialProps.name}
    occupation={testimonialProps.occupation}
    quote={testimonialProps.long_quote}
    imageUrl={testimonialProps.imageUrl}
    size="large"
    theme={select(
      'theme',
      [VisualTheme.DarkMode, VisualTheme.LightMode],
      VisualTheme.DarkMode
    )}
  />
);

testimonialLargeWithAvatar.story = {
  name: 'Testimonial in size large (with Avatar)',
};

export const testimonialLargeWithoutAvatar = () => (
  <Testimonial
    name={testimonialProps.name}
    occupation={testimonialProps.occupation}
    quote={testimonialProps.long_quote}
    size="large"
    theme={select(
      'theme',
      [VisualTheme.DarkMode, VisualTheme.LightMode],
      VisualTheme.DarkMode
    )}
  />
);

testimonialLargeWithoutAvatar.story = {
  name: 'Testimonial in size large (without Avatar)',
};
