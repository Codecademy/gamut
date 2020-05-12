import { Loading } from '@codecademy/brand-components/src';
import React from 'react';

import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../../Templating';
import { withKnobs, boolean } from '@storybook/addon-knobs';

export default {
  title: 'Labs + Brand|Atoms/Loading',
  component: Loading,
  decorators: [withKnobs],
};

export const loading = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Our standard-use loading icon. Use this to indicate part of the page is
      still coming.
    </StoryDescription>
    <Loading inline={boolean('Inline', false)} />
  </StoryTemplate>
));
