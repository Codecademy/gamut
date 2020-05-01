import { LayoutGrid, Column } from '@codecademy/gamut/src';
import * as icons from '@codecademy/gamut-icons';
import { number, select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { selectableColors } from '../../helpers';
import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../../Templating';

import styles from './styles.module.scss';

export default {
  title: 'Gamut|Atoms/Icons',
  decorators: [withKnobs],
};

const iconKeys = Object.keys(icons) as (keyof typeof icons)[];
const iconEntries = Object.entries(icons);

export const allIcons = decoratedStory(() => {
  const color = select('Color', selectableColors, selectableColors.black);
  const size = number('Size', 64);

  return (
    <StoryTemplate status={StoryStatus.Ready} wide>
      <StoryDescription>
        Icons as defined in the <code>@codecademy/gamut-icons</code> package.
      </StoryDescription>
      <LayoutGrid columnGap="sm" rowGap="sm">
        {iconEntries.map(([iconName, Icon]) => (
          <Column size={2} className={styles.iconWrapper} key={iconName}>
            <Icon key={iconName} size={size} color={color} />
            <span className={styles.iconLabel}>{iconName}</span>
          </Column>
        ))}
      </LayoutGrid>
    </StoryTemplate>
  );
});

export const iconPlayground = decoratedStory(() => {
  const iconName = select('Icon Name', iconKeys, iconKeys[0]);
  const IconComponent = icons[iconName];

  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <IconComponent
        size={number('size', 40)}
        style={{
          color: select('color', selectableColors, 'black'),
          backgroundColor: select('backgroundColor', selectableColors, 'white'),
        }}
      />
    </StoryTemplate>
  );
});
