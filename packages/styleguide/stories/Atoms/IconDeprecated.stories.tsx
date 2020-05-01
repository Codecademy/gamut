import React from 'react';
import {
  Column,
  Icon,
  IconPropsDeprecated,
  LayoutGrid,
} from '@codecademy/gamut/src';
import iconMap from '@codecademy/gamut/src/Icon/iconMap';

import {
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../Templating';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Gamut|Atoms/Icon (Deprecated)',
  component: Icon,
  decorators: [withKnobs],
};

const iconNames = Object.keys(iconMap) as IconPropsDeprecated['name'][];

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
      {iconNames.map(iconName => (
        <Column key={iconName} size={2}>
          <Icon key={iconName} name={iconName} />
          <span>{iconName}</span>
        </Column>
      ))}
    </LayoutGrid>
  </StoryTemplate>
));
