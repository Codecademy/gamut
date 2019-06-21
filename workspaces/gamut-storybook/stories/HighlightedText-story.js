import { HighlightedText } from '@codecademy/gamut';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Component/HighlightedText', module)
  .addDecorator(withKnobs)
  .add('HighlightedText', () => (
    <HighlightedText
      textProps={{ style: { fontSize: text('font size', '2rem') } }}
    >
      {text('text', 'superpowers')}
    </HighlightedText>
  ));
