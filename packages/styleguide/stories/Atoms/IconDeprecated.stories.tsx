import { Icon, IconPropsDeprecated, LayoutGrid } from '@codecademy/gamut/src';
import iconMap from '@codecademy/gamut/src/Icon/iconMap';
import React from 'react';

import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../Templating';

const iconNames = Object.keys(iconMap) as IconPropsDeprecated['name'][];

export default decoratedStory('Atoms', 'Icons (Deprecated)');

export const iconsDeprecated = () => (
  <StoryTemplate
    heading="Icons (Deprecated)"
    status={StoryStatus.Deprecated}
    wide
  >
    <StoryDescription>
      Legacy icons as defined in the <code>@codecademy/gamut</code> package's{' '}
      <code>Icon</code> export.
      <br />
      Please use non-deprecated <code>Icon</code>s from the{' '}
      <code>@codecademy/gamut-icons</code> package instead.
    </StoryDescription>
    <LayoutGrid columnGap="sm" rowGap="sm">
      {iconNames.map(iconName => (
        <span key={iconName}>
          <Icon key={iconName} name={iconName} />
          <span>{iconName}</span>
        </span>
      ))}
    </LayoutGrid>
  </StoryTemplate>
);

iconsDeprecated.story = {
  name: 'Icons (Deprecated)',
};
