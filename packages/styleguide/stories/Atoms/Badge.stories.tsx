import { Badge } from '@codecademy/gamut/src';
import React from 'react';

import {
  decoratedStories,
  decoratedStory,
  StoryDescription,
  StoryTemplate,
  StoryStatus,
} from '../Templating';

export default decoratedStories('Atoms', Badge);

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
