import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button, { presetThemes } from 'components/Button';
import { select, text, boolean, number } from '@kadira/storybook-addon-knobs';

const themeKeys = [
  ...Object.keys(presetThemes),
  'mint',
  'darkmint',
  'blue',
  'darkblue',
  'midnightblue',
  'grey',
  'red',
  'yellow',
  'greyblue',
  'white',
  'ccblue'
];

let themes = {};
themeKeys.forEach((k) => {
  themes[k] = k;
});


storiesOf('Button', module)
  .addWithInfo(
    'with text',
    () => (
      <Button
        theme={select('THEME', themes, 'primary')}
        onClick={action('clicked')}
      >
        {text('Label', 'Submit')}
      </Button>
    ), {
      inline: true,
      propTables: false
    }
  );
