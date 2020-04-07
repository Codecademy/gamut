import { ContentContainer } from '@codecademy/gamut/src';
import React from 'react';

import { decoratedStory, StoryStatus, StoryTemplate } from '../../Templating';

export default decoratedStory('Foundations', 'Layouts', ContentContainer);

export const contentContainer = () => (
  <StoryTemplate status={StoryStatus.Ready}>
    <ContentContainer>
      <p>
        ContentContainer can used when creating page layouts to contain content
        within a maximum width, as well as centering that content and providing
        responsive padding at our different breakpoints.
      </p>
    </ContentContainer>
  </StoryTemplate>
);
