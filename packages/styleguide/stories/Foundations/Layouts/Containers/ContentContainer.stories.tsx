import { ContentContainer } from '@codecademy/gamut/src';
import React from 'react';

import {
  decoratedStories,
  StoryStatus,
  StoryTemplate,
  decoratedStory,
} from '../../../Templating';

export default decoratedStories(
  'Foundations',
  'Layouts',
  'Containers',
  ContentContainer
);

export const Default = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <ContentContainer>
      <p>
        ContentContainer can used when creating page layouts to contain content
        within a maximum width, as well as centering that content and providing
        responsive padding at our different breakpoints.
      </p>
    </ContentContainer>
  </StoryTemplate>
));
