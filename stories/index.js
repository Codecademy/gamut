import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button, { presetThemes } from 'components/Button';
import Welcome from './Welcome';
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

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')} />
  ));

storiesOf('Button', module)
  .addWithInfo(
    'with text',
    () => (
      <Button
        theme={select('THEME', themes, 'primary')}
        onClick={action('clicked')}>{text('Label', 'Submit')}
      </Button>
    ), { inline: true })
    .add('with some emoji', () => (
      <Button onClick={action('clicked')}>{text('Label', '😀 😎 👍 💯')}</Button>
    ));
