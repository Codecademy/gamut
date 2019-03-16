import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, number } from '@storybook/addon-knobs';
import Logo from '@codecademy/gamut/Logo';
import { selectableColors } from './helpers';
import { addonInfoOptions as options } from './options';

storiesOf('Component/Logo', module).add(
  'Editable',
  () => (
    <Logo
      width={number('width', undefined)}
      height={number('height', Logo.defaultProps.height)}
      type={select(
        'type',
        ['pro', 'proAlt', 'program', 'default'],
        Logo.defaultProps.type
      )}
      style={{ color: select('color', selectableColors, 'black') }}
    />
  ),
  {
    info: {
      inline: true,
      propTables: false,
    },
  }
);
