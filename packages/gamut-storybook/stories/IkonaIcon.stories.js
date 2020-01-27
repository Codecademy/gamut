import React from 'react';
import { withKnobs, select, number } from '@storybook/addon-knobs';
import { IkonaIcon } from '../../gamut/src';
import classNames from '../../gamut/src/IkonaIcon/styles/index.module.scss';

import { selectableColors } from './helpers';
import s from './Icon-story.scss';

const iconNames = Object.keys(classNames)
  .filter(cn => cn.match('ikona-'))
  .map(cn => cn.replace('ikona-', ''));

export default {
  component: IkonaIcon,
  title: 'Component/IkonaIcon (deprecated)',
  decorators: [withKnobs],
};

export const allIcons = () => (
  <div className={s.grid}>
    {iconNames.map(iconName => (
      <span className={s.iconWrapper} key={iconName}>
        <IkonaIcon key={iconName} name={iconName} size={2} />
        <span>{iconName}</span>
      </span>
    ))}
  </div>
);

allIcons.story = {
  name: 'All Icons',
};

export const editableIcon = () => (
  <IkonaIcon
    name={select('name', iconNames, iconNames[0])}
    size={number('size', 4)}
    style={{
      color: select('color', selectableColors, 'black'),
      backgroundColor: select('backgroundColor', selectableColors, 'white'),
    }}
  />
);

editableIcon.story = {
  name: 'Editable Icon',
};
