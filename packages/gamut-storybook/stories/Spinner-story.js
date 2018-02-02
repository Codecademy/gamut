import React from 'react';
import { storiesOf } from '@storybook/react';
import Spinner from '@codecademy/gamut/Spinner';
import { text, select } from '@storybook/addon-knobs';

storiesOf('Component/Spinner', module).add(
  'Spinner',
  () => (
    <Spinner
      size={text('size', '1rem')}
      type={select('type', ['infinite', 'finite'], 'infinite')}
      duration={text('duration', '1s')}
    />
  ),
  {
    inline: true,
    propTables: false,
  }
);
