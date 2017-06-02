import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Spinner from '@codecademy/gamut/Spinner';
import { text } from '@kadira/storybook-addon-knobs';

storiesOf('Spinner', module)
  .addWithInfo(
    'Spinner',
    () => (
      <Spinner fill={text('Fill', 'black')} size={text('Size', '1rem')} />
    ), {
      inline: true,
      propTables: false
    }
  );
