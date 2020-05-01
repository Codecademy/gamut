import { Testimonial } from '@codecademy/brand-components/src';
import { VisualTheme } from '@codecademy/gamut/src';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { decoratedStory } from '../Templating';

export default {
  title: 'Brand|Testimonial',
  component: Testimonial,
  decorators: [withKnobs],
};

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

export const testimonialSmallWithAvatar = decoratedStory(
  'Testimonial in size small (with Avatar)',
  () => (
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
  )
);

export const testimonialSmallWithoutAvatar = decoratedStory(
  'Testimonial in size small (without Avatar)',
  () => (
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
  )
);

export const testimonialMediumWithAvatar = decoratedStory(
  'Testimonial in size medium (with Avatar)',
  () => (
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
  )
);

export const testimonialMediumWithoutAvatar = decoratedStory(
  'Testimonial in size medium (without Avatar)',
  () => (
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
  )
);

export const testimonialLargeWithAvatar = decoratedStory(
  'Testimonial in size large (with Avatar)',
  () => (
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
  )
);

export const testimonialLargeWithoutAvatar = decoratedStory(
  'Testimonial in size large (without Avatar)',
  () => (
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
  )
);
