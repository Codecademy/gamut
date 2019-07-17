import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, select, number } from '@storybook/addon-knobs';
import * as icons from '@codecademy/gamut-icons';
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
        {Object.entries(icons).map(([iconName, Icon], i) => (
          <span className={s.iconWrapper}>
            <Icon key={i} size={32} />
            <span>{iconName}</span>
          </span>
        ))}
      </div>
    ))
  );
