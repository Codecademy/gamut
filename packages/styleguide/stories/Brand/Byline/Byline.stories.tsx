import { Byline } from '@codecademy/brand-components/src';
import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import styles from './styles.module.scss';
import {
  StoryDescription,
  StoryStatus,
  StoryTemplate,
  decoratedStory,
} from '../../Templating';

export default {
  title: 'Brand|ByLine',
  component: Byline,
  decorators: [withKnobs],
};

export const byline = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Marketing display of a person's information, such as for a testimonial.
      Commonly paired with an <code>Avatar</code>.
    </StoryDescription>
    <Byline
      firstName={text('First Name', 'Bill')}
      lastName={text('Last Name', 'Murray')}
      occupation={text('Occupation', 'Ghostbuster @ Ghostcademy')}
      location={text('Location', 'New York, NY', '')}
    />
  </StoryTemplate>
));

export const bylineWithCustomClassNames = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      In a pinch, we can add custom class names to the byline contents.
    </StoryDescription>
    <Byline
      firstName={text('First Name', 'Murray')}
      occupation={text('Occupation', 'CEO of Umbrella Corporation')}
      classNames={{
        bylineContainer: styles.bylineContainer,
        author: styles.author,
        location: styles.location,
      }}
    />
  </StoryTemplate>
));
