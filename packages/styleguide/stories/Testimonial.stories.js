import React from 'react';
import { Testimonial } from '../../brand-components/src/Testimonial/';
import { VisualTheme } from '@codecademy/gamut';
import { withKnobs, select } from '@storybook/addon-knobs';

export default {
  component: Testimonial,
  title: 'Brand/Testimonial',
  decorators: [withKnobs],
};

const testimonialBaseProps = {
  name: 'Lacey Bathala',
  occupation: 'Data Analyst',
  quote: "Coding isn't rocket science, it’s just falsely intimidating.",
};

export const testimonialSmallWithAvatar = () => (
  <Testimonial
    {...testimonialBaseProps}
    imageUrl="https://content.codecademy.com/courses/free/boba.svg"
    size={select('size', ['small'], 'small')}
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
    {...testimonialBaseProps}
    size={select('size', ['small'], 'small')}
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
