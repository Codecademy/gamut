import React from 'react';
import { Toggle } from '@codecademy/gamut/src';
import { boolean } from '@storybook/addon-knobs';
import {
  decoratedStories,
  decoratedStory,
  StoryTemplate,
  StoryStatus,
  StoryDescription,
} from '../Templating';

export default decoratedStories('Atoms', Toggle);

export const toggle = decoratedStory(() => {
  const checked = boolean('Checked', false);

  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <StoryDescription>
        Controlled atom component indicating a user-selectable boolean value.
        Receives its <code>checked</code> prop from its parent.
      </StoryDescription>
      <Toggle checked={checked} label="Toggle" onChange={() => {}} />
    </StoryTemplate>
  );
});
