import { Badge } from '@codecademy/gamut/src';
import React from 'react';

import {
  StoryDescription,
  StoryTemplate,
  StoryStatus,
  decoratedStory,
} from '../Templating';

export default decoratedStory('Atoms', Badge);

export const badge = () => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Small blue indicator of some unusual text.
    </StoryDescription>
    <p>
      Use it inline with the text to be decorated. <Badge>New</Badge>
    </p>
  </StoryTemplate>
);
