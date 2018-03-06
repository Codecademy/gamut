import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Button, { presetThemes } from '@codecademy/gamut/Button';
import ButtonBase from '@codecademy/gamut/ButtonBase';
import Spinner from '@codecademy/gamut/Spinner';
import RadialProgress from '@codecademy/gamut/RadialProgress';
import { select, text, boolean } from '@storybook/addon-knobs';
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
    'ButtonBase Variants',
    withInfo({
      ...options,
    })(() => (
      <div>
        <div>
          <ButtonBase style={btnStyle}>
            {text('Label 1', 'I am basic')}
          </ButtonBase>
        </div>
        <div>
          <ButtonBase style={btnStyle} href="#">
            {text('Label 2', 'a basic link')}
          </ButtonBase>
        </div>
        <div>
          <ButtonBase style={btnStyle} link>
            {text('Label 3', 'a basic button styled as a link')}
          </ButtonBase>
        </div>
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
        <Button style={btnStyle} theme="primary">
          <Spinner />&nbsp;&nbsp;Loading...
        </Button>
        <Button style={btnStyle} theme="secondary">
          <RadialProgress value={[0, 100]} duration={5000} />&nbsp;&nbsp;Processing...
        </Button>
        <Button style={btnStyle} theme="primary" caps href="#">
          Caps
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
        theme={select('theme', themes, 'primary')}
        onClick={action('clicked')}
        size={select('size', ['small', 'large', 'undefined'], 'undefined')}
        outline={boolean('outline', false)}
        underline={boolean('underline', false)}
        link={boolean('link', false)}
        caps={boolean('caps', false)}
        go={boolean('go', false)}
        block={boolean('block', false)}
      >
        {text('Label', 'Submit')}
      </Button>
    ))
  )
  .add(
    'New',
    withInfo({
      text: 'New Styles',
      ...options,
    })(() => (
      <div>
        <Button style={btnStyle} theme="yellow">
          Super
        </Button>
        <Button style={btnStyle} theme="blue">
          Primary (new)
        </Button>
        <Button style={btnStyle} theme="blue" outline>
          Seconary (new)
        </Button>
        <Button style={btnStyle} theme="blue" flat>
          Flat
        </Button>

        <p>
          This is an example of a new{' '}
          <Button theme="grey" link href="#">
            Link
          </Button>{' '}
          style button.
        </p>
      </div>
    ))
  );
