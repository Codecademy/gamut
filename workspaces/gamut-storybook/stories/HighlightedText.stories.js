import { HighlightedText } from 'gamut';
import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

export default {
  component: HighlightedText,
  title: 'Component/HighlightedText',
  decorators: [withKnobs],
};

export const highlightedText = () => (
  <HighlightedText
    textProps={{ style: { fontSize: text('font size', '2rem') } }}
  >
    {text('text', 'superpowers')}
  </HighlightedText>
);

highlightedText.story = {
  name: 'HighlightedText',
};
