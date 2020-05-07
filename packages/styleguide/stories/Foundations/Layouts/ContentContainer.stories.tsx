import { ContentContainer } from '@codecademy/gamut/src';
import React from 'react';

import { StoryStatus, StoryTemplate, decoratedStory } from '../../Templating';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Core|Foundations/Layouts/ContentContainer',
  component: ContentContainer,
  decorators: [withKnobs],
};

export const contentContainer = decoratedStory(() => (
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
