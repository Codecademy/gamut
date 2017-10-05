import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Spinner from '@codecademy/gamut/Spinner';
import { text } from '@kadira/storybook-addon-knobs';

export default {
  title: 'Spinner',
  story: () => (
    <Spinner fill={text('Fill', 'black')} size={text('Size', '1rem')} />
  ),
  options: {
    inline: true,
    propTables: false
  }
};
