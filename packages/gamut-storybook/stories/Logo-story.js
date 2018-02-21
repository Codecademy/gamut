import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, number } from '@storybook/addon-knobs';
import Logo from '@codecademy/gamut/Logo';
import { selectableGamutColors } from './helpers';
import { addonInfoOptions as options } from './options';

storiesOf('Component/Logo', module).add(
  'Editable',
  withInfo({
    ...options,
  })(
    () => (
      <Logo
        width={number('width', undefined)}
        height={number('height', Logo.defaultProps.height)}
        type={select(
          'type',
          ['pro', 'program', 'default'],
          Logo.defaultProps.type
        )}
        style={{ color: select('color', selectableGamutColors, '#000') }}
      />
    ),
    {
      inline: true,
      propTables: false,
    }
  )
);
