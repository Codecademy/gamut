import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Button, { presetThemes } from '@codecademy/gamut/Button';
import { select, text } from '@storybook/addon-knobs';
import gamut from '@codecademy/gamut-styles/variables';

import { addonInfoOptions as options } from './options';

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
  'ccblue',
];

const themes = {};
themeKeys.forEach(k => {
  themes[k] = k;
});

const btnStyle = {
  margin: '0.5rem',
};

storiesOf('Component/Button', module)
  .add('About Buttons', () => <div>Button philosophy goes here.</div>)
  .add(
    'Standard Button themes',
    withInfo({
      ...options,
    })(() => (
      <div>
        <Button style={btnStyle}>{text('Label', 'Submit')}</Button>
        <Button style={btnStyle} theme="primary" href="#">
          Primary (red)
        </Button>
        <Button style={btnStyle} theme="secondary">
          Secondary (mint)
        </Button>
        <Button style={btnStyle} theme="blue" href="#">
          Blue
        </Button>
        <Button style={btnStyle} theme="yellow">
          Yellow
        </Button>
        <Button style={btnStyle} theme="white" href="#">
          White
        </Button>
      </div>
    ))
  )
  .add(
    'Standard Button options',
    withInfo({
      ...options,
    })(() => (
      <div>
        <Button style={btnStyle} theme="primary" outline href="#">
          Outline
        </Button>
        <Button style={btnStyle} theme="primary" size="large">
          Large
        </Button>
        <Button style={btnStyle} theme="secondary" size="small" href="#">
          Small
        </Button>
        <Button style={btnStyle} theme="primary" disabled>
          Disabled
        </Button>
        <Button style={btnStyle} theme="primary" caps href="#">
          Caps
        </Button>
        <Button style={btnStyle} theme="primary" span>
          Span tag
        </Button>
      </div>
    ))
  )
  .add(
    'Platform Buttons',
    withInfo({
      ...options,
    })(() => (
      <div
        style={{
          background: gamut.colors.portal.midnightblue,
          padding: '0.5rem',
        }}
      >
        <Button style={btnStyle} theme="platform">
          Platform
        </Button>
        <Button style={btnStyle} theme="lantern">
          Lantern
        </Button>
        <Button style={btnStyle} theme="lantern" go>
          Lantern: go
        </Button>
        <Button style={btnStyle} theme="platform" disabled>
          Disabled
        </Button>
      </div>
    ))
  )
  .add(
    'Link Button',
    withInfo({
      text: '',
      ...options,
    })(() => (
      <p>
        This is an example of a{' '}
        <Button theme="primary" link href="#">
          Link
        </Button>{' '}
        style button.
      </p>
    ))
  )
  .add(
    'Editable',
    withInfo({
      text: 'Editable',
      ...options,
    })(() => (
      <Button
        theme={select('THEME', themes, 'primary')}
        onClick={action('clicked')}
      >
        {text('Label', 'Submit')}
      </Button>
    ))
  );
