import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, number } from '@storybook/addon-knobs';
import Icon from '../../gamut/src/Icon';
import iconMap from '../../gamut/src/Icon/iconMap';
import { selectableColors } from './helpers';
import { addonInfoOptions as options } from './options';
import s from './Icon-story.scss';

const iconNames = Object.keys(iconMap);

storiesOf('Component/Icon', module)
  .addDecorator(withKnobs)
  .add(
    'All Icons',
    withInfo({
      ...options,
      source: false,
    })(() => (
      <div className={s.grid}>
        {iconNames.map(iconName => (
          <span className={s.iconWrapper} key={iconName}>
            <Icon key={iconName} name={iconName} />
            <span>{iconName}</span>
          </span>
        ))}
      </div>
    ))
  )
  .add(
    'Editable Icon',
    () => (
      <Icon
        name={select('name', iconNames, iconNames[0])}
        width={number('width', 128)}
        height={number('height', 128)}
        style={{
          color: select('color', selectableColors, 'black'),
          backgroundColor: select('backgroundColor', selectableColors, 'white'),
        }}
      />
    ),
    {
      info: {
        text: `Note: Both color and backgroundColor should be adjusted with CSS
    classes rather than inline styles.`,
      },
    }
  );
