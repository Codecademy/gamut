import { Testimonial } from '@codecademy/brand-components/src';
import { VisualTheme } from '@codecademy/gamut/src';
import { select, text } from '@storybook/addon-knobs';
import React from 'react';

import { decoratedStory } from '../Templating';

export default decoratedStory('Brand', Testimonial);

const knobs = {
  company: () => text('Company', 'Microsoft'),
  firstName: () => text('First Name', 'Lacey'),
  imageUrl: () =>
    text('Image URL', 'https://content.codecademy.com/courses/free/boba.svg'),
  lastName: () => text('Last Name', 'Bathala'),
  longQuote: () =>
    text(
      'Long Quote',
      'If it weren’t for Codecademy, I’d probably be in my old job. Codecademy enabled me to learn quick lessons between calls, on my lunch break, while multitasking. It was fun and easy and I went from 0 coding skills to a promotion within 6 months.'
    ),
  occupation: () => text('Occupation', 'Jr. Back-End Developer'),
  shortQuote: () =>
    text(
      'Short Quote',
      "Coding isn't rocket science, it’s just falsely intimidating."
    ),
};

const laceyTestimonial = () => ({
  company: knobs.company(),
  firstName: knobs.firstName(),
  lastName: knobs.lastName(),
  occupation: knobs.occupation(),
});

export const testimonialSmallWithAvatar = () => (
  <Testimonial
    testimonial={{
      ...laceyTestimonial(),
      quote: knobs.shortQuote(),
      imageUrl: knobs.imageUrl(),
    }}
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
    testimonial={{
      ...laceyTestimonial(),
      quote: knobs.shortQuote(),
    }}
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
    testimonial={{
      ...laceyTestimonial(),
      quote: knobs.longQuote(),
      imageUrl: knobs.imageUrl(),
    }}
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
    testimonial={{
      ...laceyTestimonial(),
      quote: knobs.shortQuote(),
    }}
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
    testimonial={{
      ...laceyTestimonial(),
      quote: knobs.longQuote(),
      imageUrl: knobs.imageUrl(),
    }}
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
    testimonial={{
      ...laceyTestimonial(),
      quote: knobs.longQuote(),
    }}
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
