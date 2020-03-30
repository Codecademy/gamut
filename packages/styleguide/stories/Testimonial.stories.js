import React from 'react';
import { Testimonial } from '../../brand-components/src/Testimonial/';
import { VisualTheme } from '../../gamut/src';
import { withKnobs, select } from '@storybook/addon-knobs';

export default {
  component: Testimonial,
  title: 'Brand/Testimonial',
  decorators: [withKnobs],
};

const short_quote =
  "Coding isn't rocket science, it’s just falsely intimidating.";
const long_quote =
  'If it weren’t for Codecademy, I’d probably be in my old job. Codecademy enabled me to learn quick lessons between calls, on my lunch break, while multitasking. It was fun and easy and I went from 0 coding skills to a promotion within 6 months.';
const imageUrl = 'https://content.codecademy.com/courses/free/boba.svg';

const laceyTestimonial = {
  firstName: 'Lacey',
  lastName: 'Bathala',
  occupation: 'Jr. Back-End Developer',
  company: 'Microsoft',
};

const josephineTestimonial = {
  firstName: 'Josephine',
  lastName: 'Anderson-Weber',
  occupation: 'Junior Back-End Developer',
};

export const testimonialSmallWithAvatar = () => (
  <Testimonial
    testimonial={{ ...laceyTestimonial, quote: short_quote, imageUrl }}
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
    testimonial={{ ...laceyTestimonial, quote: short_quote }}
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
    testimonial={{ ...laceyTestimonial, quote: long_quote, imageUrl }}
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
    testimonial={{ ...laceyTestimonial, quote: long_quote }}
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
    testimonial={{ ...laceyTestimonial, quote: long_quote, imageUrl }}
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
    testimonial={{ ...laceyTestimonial, quote: long_quote }}
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
