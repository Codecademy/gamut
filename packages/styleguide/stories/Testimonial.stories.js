import React from 'react';
import { Testimonial } from '../../brand-components/src/Testimonial/';
import { VisualTheme } from '@codecademy/gamut';
import { withKnobs, select } from '@storybook/addon-knobs';

export default {
  component: Testimonial,
  title: 'Brand/Testimonial',
  decorators: [withKnobs],
};

const testimonial = {
  name: 'Angela Davis',
  occupation: 'Activist, Scholar, Writer',
  imageUrl: 'https://content.codecademy.com/courses/free/boba.svg',
  quote:
    'I am no longer accepting the things I cannot change. I am changing the things I cannot accept.',
};

export const testimonialSmall = () => (
  <Testimonial
    testimonial={testimonial}
    size={select('size', ['small'], 'small')}
    theme={select(
      'theme',
      [VisualTheme.DarkMode, VisualTheme.LightMode],
      VisualTheme.DarkMode
    )}
  />
);

testimonialSmall.story = {
  name: 'Testimonial',
};
