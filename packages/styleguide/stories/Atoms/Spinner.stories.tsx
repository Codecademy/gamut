import React from 'react';
import { Spinner } from '@codecademy/gamut/src';
import { text } from '@storybook/addon-knobs';
import {
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../Templating';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Core|Atoms/Spinner',
  component: Spinner,
  decorators: [withKnobs],
};

export const spinner = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Perpetually spinning circle, such as for a loading indicator. Similar to a{' '}
      <code>ProgressBar</code>.
    </StoryDescription>
    <Spinner size={text('size', '5em')} />
  </StoryTemplate>
));
