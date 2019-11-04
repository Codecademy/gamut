import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, number } from '@storybook/addon-knobs';
import IkonaIcon from 'gamut/IkonaIcon';
import classNames from 'gamut/IkonaIcon/styles';

import { selectableColors } from './helpers';
import { addonInfoOptions as options } from './options';
import s from './Icon-story.scss';

const iconNames = Object.keys(classNames)
  .filter(cn => cn.match('ikona-'))
  .map(cn => cn.replace('ikona-', ''));

storiesOf('Component/IkonaIcon (deprecated)', module)
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
            <IkonaIcon key={iconName} name={iconName} size={2} />
            <span>{iconName}</span>
          </span>
        ))}
      </div>
    ))
  )
  .add(
    'Editable Icon',
    () => (
      <IkonaIcon
        name={select('name', iconNames, iconNames[0])}
        size={number('size', 4)}
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
