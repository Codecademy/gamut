import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Badge } from '@codecademy/gamut/src';

import {
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../Templating';

export default {
  title: 'Core|Atoms/Badge',
  component: Badge,
  decorators: [withKnobs],
};

export const badge = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Small blue indicator of some unusual text.
    </StoryDescription>
    <p>
      Use it inline with the text to be decorated. <Badge>New</Badge>
    </p>
  </StoryTemplate>
));
