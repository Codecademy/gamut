import React from 'react';
import { Spinner } from '@codecademy/gamut/src';
import { text } from '@storybook/addon-knobs';
import {
  decoratedStories,
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../Templating';

export default decoratedStories('Atoms', Spinner);

export const spinner = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Perpetually spinning circle, such as for a loading indicator. Similar to a{' '}
      <code>ProgressBar</code>.
    </StoryDescription>
    <Spinner size={text('size', '5em')} />
  </StoryTemplate>
));
