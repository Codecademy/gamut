import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number } from '@storybook/addon-knobs';
import Logo from '@codecademy/gamut/Logo';
import { selectableColors } from './helpers';

storiesOf('Component/Logo', module)
  .addDecorator(withKnobs)
  .add(
    'Editable',
    () => (
      <Logo
        width={number('width', undefined)}
        height={number('height', Logo.defaultProps.height)}
        type={select(
          'type',
          ['pro', 'proAlt', 'proLockup', 'program', 'default'],
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
