import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button, { presetThemes } from '@codecademy/gamut/dist/Button';
import ButtonBase from '@codecademy/gamut/dist/ButtonBase';
import Spinner from '@codecademy/gamut/dist/Spinner';
import RadialProgress from '@codecademy/gamut/dist/RadialProgress';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import { deprecatedColors } from '@codecademy/gamut-styles/utils/variables';

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
  'royalblue',
  'purple',
  'brand-red',
  'brand-yellow',
  'brand-purple',
  'brand-pink',
  'brand-mint',
  'brand-beige',
  'brand-dark-blue',
];

const themes = {};
themeKeys.forEach(k => {
  themes[k] = k;
});

const btnStyle = {
  marginRight: '1rem',
  marginBottom: '1rem',
};

const stories = storiesOf('Component/Button', module);
stories.addDecorator(withKnobs);

stories
  .add('All Button Themes', () => (
    <div>
      <div style={{ padding: '0.5rem' }}>
        <h3>Standard Buttons</h3>
        {themeKeys.map(theme => (
          <Button key={`${theme}-onlight`} style={btnStyle} theme={theme}>
            {theme}
          </Button>
        ))}
        <h3>Outline Buttons</h3>
        {themeKeys.map(theme => (
          <Button
            key={`${theme}-onlight-outline`}
            style={btnStyle}
            theme={theme}
            outline
          >
            {theme}
          </Button>
        ))}
        <h3>Flat Buttons</h3>
        {themeKeys.map(theme => (
          <Button
            key={`${theme}-onlight-flat`}
            style={btnStyle}
            theme={theme}
            flat
          >
            {theme}
          </Button>
        ))}
      </div>
      <div
        style={{
          padding: '0.5rem',
          background: deprecatedColors.swatches.grey[900],
          color: 'white',
        }}
      >
        <h3>Standard Buttons</h3>
        {themeKeys.map(theme => (
          <Button key={`${theme}-ondark`} style={btnStyle} theme={theme}>
            {theme}
          </Button>
        ))}
        <h3>Outline Buttons</h3>
        {themeKeys.map(theme => (
          <Button
            key={`${theme}-ondark-outline`}
            style={btnStyle}
            theme={theme}
            outline
          >
            {theme}
          </Button>
        ))}
        <h3>Flat Buttons</h3>
        {themeKeys.map(theme => (
          <Button
            key={`${theme}-ondark-flat`}
            style={btnStyle}
            theme={theme}
            flat
          >
            {theme}
          </Button>
        ))}
      </div>
    </div>
  ))
  .add('ButtonBase Variants', () => (
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
  .add('Standard Button options', () => (
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
        <Spinner />
        &nbsp;&nbsp;Loading...
      </Button>
      <Button style={btnStyle} theme="secondary">
        <RadialProgress value={[0, 100]} duration={5000} />
        &nbsp;&nbsp;Processing...
      </Button>
      <Button style={btnStyle} theme="primary" caps href="#">
        Caps
      </Button>
    </div>
  ))
  .add('Platform Buttons', () => (
    <div
      style={{
        background: deprecatedColors.portal.midnightblue,
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
  .add('Link Button', () => (
    <p>
      This is an example of a{' '}
      <Button theme="primary" link href="#">
        Link
      </Button>{' '}
      style button.
    </p>
  ))
  .add('Editable', () => (
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
  .add('New', () => (
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
  .add('round', () => (
    <div>
      <Button style={btnStyle} theme="primary" outline href="#" round>
        Outline
      </Button>
      <Button style={btnStyle} theme="primary" size="large" round>
        Large
      </Button>
      <Button style={btnStyle} theme="secondary" size="small" href="#" round>
        Small
      </Button>
      <Button style={btnStyle} theme="primary" disabled round>
        Disabled
      </Button>
      <Button style={btnStyle} theme="primary" round>
        <Spinner />
        &nbsp;&nbsp;Loading...
      </Button>
      <Button style={btnStyle} theme="secondary" round>
        <RadialProgress value={[0, 100]} duration={5000} />
        &nbsp;&nbsp;Processing...
      </Button>
      <Button style={btnStyle} theme="primary" caps href="#" round>
        Caps
      </Button>
    </div>
  ))
  .add('square', () => (
    <div>
      <Button style={btnStyle} theme="primary" outline href="#" square>
        Outline
      </Button>
      <Button style={btnStyle} theme="primary" size="large" square>
        Large
      </Button>
      <Button style={btnStyle} theme="secondary" size="small" href="#" square>
        Small
      </Button>
      <Button style={btnStyle} theme="primary" disabled square>
        Disabled
      </Button>
      <Button style={btnStyle} theme="primary" square>
        <Spinner />
        &nbsp;&nbsp;Loading...
      </Button>
      <Button style={btnStyle} theme="secondary" square>
        <RadialProgress value={[0, 100]} duration={5000} />
        &nbsp;&nbsp;Processing...
      </Button>
      <Button style={btnStyle} theme="primary" caps href="#" square>
        Caps
      </Button>
    </div>
  ));
