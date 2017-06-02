import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { Container } from '@codecademy/gamut/FlexBox';
import Button, { presetThemes } from '@codecademy/gamut/Button';
import { select, text } from '@kadira/storybook-addon-knobs';
import id from '@codecademy/identity';

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

let btnStyle = {
  marginBottom: '0.5rem',
  marginRight: '0.5rem'
};

storiesOf('Button', module)
  .add(
    'Variants',
    () => (
      <Container column>
        <div>
          <h3>Standard Button themes</h3>
          <Button style={btnStyle}>{text('Label', 'Submit')}</Button>
          <Button style={btnStyle} theme="primary" href="#">Primary (red)</Button>
          <Button style={btnStyle} theme="secondary">Secondary (mint)</Button>
          <Button style={btnStyle} theme="blue" href="#">Blue</Button>
          <Button style={btnStyle} theme="yellow">Yellow</Button>
          <Button style={btnStyle} theme="white" href="#">White</Button>
          <h3>Button options:</h3>
          <Button style={btnStyle} theme="primary" outline href="#">Outline</Button>
          <Button style={btnStyle} theme="primary" size="large">Large</Button>
          <Button style={btnStyle} theme="secondary" size="small" href="#">Small</Button>
          <Button style={btnStyle} theme="primary" disabled>Disabled</Button>
          <Button style={btnStyle} theme="primary" caps href="#">Caps</Button>
          <h3>Link Buttons</h3>
          <p>
            This is an example of a <Button theme="primary" link href="#">Link</Button> style button.
          </p>
        </div>
        <div
          style={{
            background: id.color.midnightblue,
            padding: '0.5rem'
          }}>
          <h3 style={{color: '#fff'}}>Platform Button themes:</h3>
          <Button style={btnStyle} theme="platform">Platform</Button>
          <Button style={btnStyle} theme="lantern">Lantern</Button>
          <Button style={btnStyle} theme="lantern" go>Lantern: go</Button>
          <Button style={btnStyle} theme="platform" disabled>Disabled</Button>
        </div>
      </Container>
    )
  )
  .addWithInfo(
    'Editable',
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
