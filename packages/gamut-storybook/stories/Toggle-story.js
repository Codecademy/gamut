import React from 'react';
import { storiesOf } from '@storybook/react';
import Toggle from '@codecademy/gamut/Toggle';
import { boolean } from '@storybook/addon-knobs';

storiesOf('Component/Toggle', module).add(
  'Toggle',
  () => <Toggle checked={boolean('Toggled', false)} onClick={() => {}} />,
  {
    inline: true,
    propTables: false,
  }
);
