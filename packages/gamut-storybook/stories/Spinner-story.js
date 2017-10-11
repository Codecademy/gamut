import React from 'react';
import { storiesOf } from '@storybook/react';
import Spinner from '@codecademy/gamut/Spinner';
import { text } from '@storybook/addon-knobs';

storiesOf('Component/Spinner', module)
  .add(
    'Spinner',
    () => (
      <Spinner fill={text('Fill', 'black')} size={text('Size', '1rem')} />
    ), {
      inline: true,
      propTables: false
    }
  );
