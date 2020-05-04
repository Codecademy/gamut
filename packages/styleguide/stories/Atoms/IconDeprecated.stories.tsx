import {
  Column,
  Icon,
  IconPropsDeprecated,
  LayoutGrid,
} from '@codecademy/gamut/src';
import iconMap from '@codecademy/gamut/src/Icon/iconMap';
import React from 'react';

import {
  decoratedStories,
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../Templating';

const iconNames = Object.keys(iconMap) as IconPropsDeprecated['name'][];

export default decoratedStories('Atoms', 'Icons (Deprecated)');

export const iconsDeprecated = decoratedStory('Icons (Deprecated)', () => (
  <StoryTemplate status={StoryStatus.Deprecated} wide>
    <StoryDescription>
      Legacy icons as defined in the <code>@codecademy/gamut</code> package's{' '}
      <code>Icon</code> export.
      <br />
      Please use non-deprecated <code>Icon</code>s from the{' '}
      <code>@codecademy/gamut-icons</code> package instead.
    </StoryDescription>
    <LayoutGrid columnGap="sm" rowGap="lg">
      {iconNames.map((iconName) => (
        <Column key={iconName} size={2}>
          <Icon key={iconName} name={iconName} />
          <span>{iconName}</span>
        </Column>
      ))}
    </LayoutGrid>
  </StoryTemplate>
));
