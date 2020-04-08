import React from 'react';
import { action } from '@storybook/addon-actions';
import { buttonPresetThemes } from '../../gamut/src/Button';
import { Button, ButtonBase } from '../../gamut/src';
import Spinner from '../../gamut/src/Spinner';
import RadialProgress from '../../gamut/src/RadialProgress';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import { deprecatedColors } from '../../gamut-styles/utils/variables';

const themeKeys = [...Object.keys(buttonPresetThemes)];

const brandThemeKeys = [
  'brand-red',
  'brand-orange',
  'brand-yellow',
  'brand-purple',
  'brand-pink',
  'brand-mint',
  'brand-beige',
  'brand-dark-blue',
  'brand-blue',
];

const deprecatedThemeKeys = [
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
];

const themes = {};

themeKeys.forEach(k => {
  themes[k] = k;
});
brandThemeKeys.forEach(k => {
  themes[k] = k;
});
deprecatedThemeKeys.forEach(k => {
  themes[k] = k;
});

const btnStyle = {
  marginRight: '1rem',
  marginBottom: '1rem',
};

const headingStyle = {
  color: 'white',
};

const storyStyle = {
  darkMode: {
    containerStyle: {
      padding: '0 2rem',
      background: deprecatedColors.swatches.grey[900],
      color: 'white',
    },
    groupStyle: {
      margin: '1rem 0',
    },
    headingStyle: {
      color: 'white',
      margin: '1rem 0',
    },
  },
  lightMode: {
    containerStyle: {
      padding: '0 2rem',
    },
    groupStyle: {
      margin: '1rem 0',
    },
    headingStyle: {
      margin: '1rem 0',
    },
  },
};

export default {
  component: Button,
  title: 'Component/Button',
  decorators: [withKnobs],
  subcomponents: { ButtonBase },
};

export const allButtonThemes = () => {
  const variant = select('Variant', ['default', 'outline', 'flat'], 'default');
  const contrastMode = select(
    'Contrast',
    { Light: 'lightMode', Dark: 'darkMode' },
    'lightMode'
  );

  const { containerStyle, groupStyle, headingStyle } = storyStyle[contrastMode];
  return (
    <div style={containerStyle}>
      <h3 style={headingStyle}>Preset</h3>
      <div style={groupStyle}>
        {themeKeys.map(theme => (
          <Button
            key={`${theme}`}
            style={btnStyle}
            theme={theme}
            outline={variant === 'outline'}
            flat={variant === 'flat'}
          >
            {theme}
          </Button>
        ))}
      </div>
      <h3 style={headingStyle}>Brand</h3>
      <div style={groupStyle}>
        {brandThemeKeys.map(theme => (
          <Button
            key={`${theme}`}
            style={btnStyle}
            theme={theme}
            outline={variant === 'outline'}
            flat={variant === 'flat'}
          >
            {theme}
          </Button>
        ))}
      </div>
      <h3 style={headingStyle}>Deprecated</h3>
      <div style={groupStyle}>
        {deprecatedThemeKeys.map(theme => (
          <Button
            key={`${theme}`}
            style={btnStyle}
            theme={theme}
            outline={variant === 'outline'}
            flat={variant === 'flat'}
          >
            {theme}
          </Button>
        ))}
      </div>
    </div>
  );
};

allButtonThemes.story = {
  name: 'Button Themes',
};

export const buttonBaseVariants = () => (
  <div style={storyStyle.lightMode.containerStyle}>
    <div>
      <ButtonBase style={btnStyle}>{text('Label 1', 'I am basic')}</ButtonBase>
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
);

buttonBaseVariants.story = {
  name: 'ButtonBase Variants',
};

export const editable = () => (
  <div style={storyStyle.lightMode.containerStyle}>
    <Button
      theme={select('theme', themes, 'blue')}
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
  </div>
);

editable.story = {
  name: 'Editable',
};

export const linkButton = () => (
  <div style={storyStyle.lightMode.containerStyle}>
    <p>
      This is an example of a{' '}
      <Button theme={select('theme', themes, 'blue')} link href="#">
        Link
      </Button>{' '}
      style button.
    </p>
  </div>
);

linkButton.story = {
  name: 'Link Button',
};

export const standardButtonOptions = () => (
  <div style={storyStyle.lightMode.containerStyle}>
    <Button style={btnStyle} theme="blue" flat href="#">
      Flat
    </Button>
    <Button style={btnStyle} theme="blue" outline href="#">
      Outline
    </Button>
    <Button style={btnStyle} theme="blue" size="large">
      Large
    </Button>
    <Button style={btnStyle} theme="blue" size="small" href="#">
      Small
    </Button>
    <Button style={btnStyle} theme="blue" disabled>
      Disabled
    </Button>
    <Button style={btnStyle} theme="blue">
      <Spinner />
      &nbsp;&nbsp;Loading...
    </Button>
    <Button style={btnStyle} theme="blue">
      <RadialProgress value={[0, 100]} duration={5000} />
      &nbsp;&nbsp;Processing...
    </Button>
    <Button style={btnStyle} theme="blue" caps href="#">
      Caps
    </Button>
  </div>
);

standardButtonOptions.story = {
  name: 'Standard Button options',
};

export const round = () => (
  <div style={storyStyle.lightMode.containerStyle}>
    <Button style={btnStyle} theme="blue" flat round href="#">
      Flat
    </Button>
    <Button style={btnStyle} theme="blue" outline href="#" round>
      Outline
    </Button>
    <Button style={btnStyle} theme="blue" size="large" round>
      Large
    </Button>
    <Button style={btnStyle} theme="blue" size="small" href="#" round>
      Small
    </Button>
    <Button style={btnStyle} theme="blue" disabled round>
      Disabled
    </Button>
    <Button style={btnStyle} theme="blue" round>
      <Spinner />
      &nbsp;&nbsp;Loading...
    </Button>
    <Button style={btnStyle} theme="blue" round>
      <RadialProgress value={[0, 100]} duration={5000} />
      &nbsp;&nbsp;Processing...
    </Button>
    <Button style={btnStyle} theme="blue" caps href="#" round>
      Caps
    </Button>
  </div>
);
