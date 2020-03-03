import React from 'react';
import { Testimonial } from '../../brand-components/src/Testimonial/';
import { VisualTheme } from '@codecademy/gamut';
import { withKnobs, select } from '@storybook/addon-knobs';

export default {
  component: Testimonial,
  title: 'Brand/Testimonial',
  decorators: [withKnobs],
};

const laceyTestimonialProps = {
  name: 'Lacey Bathala',
  occupation: 'Data Analyst',
  short_quote: "Coding isn't rocket science, it’s just falsely intimidating.",
  long_quote:
    'If it weren’t for Codecademy, I’d probably be in my old job. Codecademy enabled me to learn quick lessons between calls, on my lunch break, while multitasking. It was fun and easy and I went from 0 coding skills to a promotion within 6 months.',
  imageUrl: 'https://content.codecademy.com/courses/free/boba.svg',
};

const josephineTestimonialProps = {
  name: 'Josephine Anderson-Weber',
  occupation: 'Junior Back-End Developer',
  short_quote:
    'Codecademy’s small lessons really help a person who has trouble focusing on long lessons.',
  long_quote:
    'The Codecademy quizzes and projects were so helpful. The quizzes test your knowledge and the projects reinforce what you learned by making you apply that knowledge to real world situations.',
  imageUrl: 'https://content.codecademy.com/courses/free/boba.svg',
};

export const testimonialSmallWithAvatar = () => (
  <Testimonial
    name={laceyTestimonialProps.name}
    occupation={laceyTestimonialProps.occupation}
    quote={laceyTestimonialProps.short_quote}
    imageUrl={laceyTestimonialProps.imageUrl}
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
    name={laceyTestimonialProps.name}
    occupation={laceyTestimonialProps.occupation}
    quote={laceyTestimonialProps.short_quote}
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
    name={laceyTestimonialProps.name}
    occupation={laceyTestimonialProps.occupation}
    quote={laceyTestimonialProps.long_quote}
    imageUrl={laceyTestimonialProps.imageUrl}
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
    name={laceyTestimonialProps.name}
    occupation={laceyTestimonialProps.occupation}
    quote={laceyTestimonialProps.long_quote}
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
    name={josephineTestimonialProps.name}
    occupation={josephineTestimonialProps.occupation}
    quote={josephineTestimonialProps.long_quote}
    imageUrl={josephineTestimonialProps.imageUrl}
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
    name={josephineTestimonialProps.name}
    occupation={josephineTestimonialProps.occupation}
    quote={josephineTestimonialProps.long_quote}
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
