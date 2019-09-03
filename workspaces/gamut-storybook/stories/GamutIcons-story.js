import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, number } from '@storybook/addon-knobs';
import * as icons from '@codecademy/gamut-icons';
import * as learnIcons from '@codecademy/gamut-icons/icons/learn';
import { selectableColors } from './helpers';
import { addonInfoOptions as options } from './options';
import s from './Icon-story.scss';

storiesOf('Visuals/Icons', module)
  .addDecorator(withKnobs)
  .add(
    'All Icons',
    withInfo({
      ...options,
      source: false,
    })(() => (
      <div className={s.grid}>
        {Object.entries(icons).map(([iconName, Icon]) => (
          <span className={s.iconWrapper}>
            <Icon
              key={iconName}
              size={number('size', 64)}
              color={select('color', selectableColors, selectableColors.black)}
            />
            <span className={s.iconLabel}>{iconName}</span>
          </span>
        ))}
      </div>
    ))
  )
  .add(
    'Learn Icons',
    withInfo({
      ...options,
      source: false,
    })(() => (
      <div className={s.grid}>
        {Object.entries(learnIcons).map(([iconName, Icon]) => (
          <span className={s.iconWrapper}>
            <Icon
              key={iconName}
              size={number('size', 64)}
              color={select('color', selectableColors, selectableColors.black)}
            />
            <span className={s.iconLabel}>{iconName}</span>
          </span>
        ))}
      </div>
    ))
  );
