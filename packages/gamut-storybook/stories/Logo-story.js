import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, number } from '@storybook/addon-knobs';
import Logo from '@codecademy/gamut/Logo';
import { addonInfoOptions as options } from './options';
import { selectableGamutColors } from './helpers';

storiesOf('Component/Logo', module).add(
  'Editable',
  withInfo({
    ...options,
  })(
    () => (
      <Logo
        width={number('width', Logo.defaultProps.width)}
        height={number('height', Logo.defaultProps.height)}
        style={{ color: select('color', selectableGamutColors, '#000') }}
      />
    ),
    {
      inline: true,
      propTables: false,
    }
  )
);
