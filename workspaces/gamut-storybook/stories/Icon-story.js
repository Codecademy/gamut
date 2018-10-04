import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, number } from '@storybook/addon-knobs';
import Icon from '@codecademy/gamut/Icon';
import iconMap from '@codecademy/gamut/Icon/iconMap';
import { selectableGamutColors } from './helpers';
import { addonInfoOptions as options } from './options';
import s from './Icon-story.scss';

const iconNames = Object.keys(iconMap);

storiesOf('Component/Icon', module)
  .add(
    'All Icons',
    withInfo({
      ...options,
      source: false,
    })(() => (
      <div className={s.grid}>
        {iconNames.map(iconName => (
          <span className={s.iconWrapper}>
            <Icon key={iconName} name={iconName} width={64} height={64} />
            <span>{iconName}</span>
          </span>
        ))}
      </div>
    ))
  )
  .add(
    'Editable Icon',
    withInfo({
      ...options,
      inline: true,
      propTables: false,
    })(() => (
      <div>
        <span className={s.iconWrapper}>
          {select('name', iconNames, iconNames[0])}
          <Icon
            name={select('name', iconNames, iconNames[0])}
            width={number('width', 128)}
            height={number('height', 128)}
            style={{
              color: select('color', selectableGamutColors, '#000'),
              backgroundColor: select(
                'backgroundColor',
                selectableGamutColors,
                '#fff'
              ),
            }}
          />
        </span>
        <p className={s.note}>
          <em>
            Note: Both color and backgroundColor should be adjusted with CSS
            classes rather than inline styles.
          </em>
        </p>
      </div>
    ))
  );
