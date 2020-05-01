import { IkonaIcon, LayoutGrid, Column } from '@codecademy/gamut/src';
import iconStyles from '@codecademy/gamut/src/IkonaIcon/styles/index.module.scss';
import React from 'react';

import {
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../Templating';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Gamut|Atoms/IkonaIcon (Deprecated)',
  component: IkonaIcon,
  decorators: [withKnobs],
};

const iconNames = Object.keys(iconStyles)
  .filter(cn => cn.match('ikona-'))
  .map(cn => cn.replace('ikona-', ''));

export const ikonaIcons = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Deprecated} wide>
    <StoryDescription>
      Very old legacy icons as defined in the <code>@codecademy/gamut</code>{' '}
      package&apos;s <code>IkonaIcon</code> export.
      <br />
      Please use non-deprecated <code>Icon</code>s from the{' '}
      <code>@codecademy/gamut-icons</code> package instead.
    </StoryDescription>
    <LayoutGrid columnGap="sm" rowGap="sm">
      {iconNames.map(iconName => (
        <Column size={1} key={iconName}>
          <IkonaIcon key={iconName} name={iconName} size={2} />
          <span>{iconName}</span>
        </Column>
      ))}
    </LayoutGrid>
  </StoryTemplate>
));
