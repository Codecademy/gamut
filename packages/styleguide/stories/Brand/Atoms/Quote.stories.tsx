import { Quote } from '@codecademy/brand-components/src';
import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../../Templating';

export default {
  title: 'Labs|Atoms/Quote',
  component: Quote,
  decorators: [withKnobs],
};

export const quote = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    {theme => (
      <>
        <StoryDescription>
          Emphasized text intended to be a direct quote, such as from a learner.
          Often with an <code>Avatar</code> or <code>Testimonial</code>.
        </StoryDescription>
        <Quote
          text={text(
            'Text',
            'Codecademy’s small lessons really help a person who has trouble focusing on long lessons.'
          )}
          theme={theme}
        />
      </>
    )}
  </StoryTemplate>
));
