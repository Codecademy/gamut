import { Container } from '@codecademy/gamut/src';
import React from 'react';

import {
  decoratedStories,
  StoryStatus,
  StoryTemplate,
  decoratedStory,
  StoryDescription,
} from '../../../Templating';

export default decoratedStories(
  'Foundations',
  'Layouts',
  'Utilities',
  Container
);

export const Default = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>A powerful and flexible flex container.</StoryDescription>
    <Container>You're never too old to flex</Container>
  </StoryTemplate>
));
