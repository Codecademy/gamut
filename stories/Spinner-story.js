import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { text } from '@kadira/storybook-addon-knobs';
import Spinner from 'src/Spinner';

storiesOf('Spinner', module)
  .add(
    'Spinner',
    () => (
      <Spinner fill="grey" />
    )
  )
  .addWithInfo(
    'Spinner',
    () => (
      <Spinner fill="grey" />
    ), {
      inline: true,
      propTables: false
    }
  )
  .addWithInfo(
    'Editable',
    () => (
      <Spinner fill={text('Fill color', 'grey')} size={text('Size', '1em')} />
    ), {
      inline: true,
      propTables: false
    }
  );
