import {
  Button,
  ButtonBase,
  buttonPresetThemes,
  RadialProgress,
  Spinner,
} from '@codecademy/gamut/src';
import { action } from '@storybook/addon-actions';
import { select, text, boolean } from '@storybook/addon-knobs';
import React from 'react';

import {
  StoryTemplate,
  StoryStatus,
  StoryDescription,
  decoratedStories,
  decoratedStory,
} from '../Templating';

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
  ...Object.keys(buttonPresetThemes),
  'mint',
  'darkmint',
  'darkblue',
  'midnightblue',
  'grey',
  'greyblue',
  'white',
  'ccblue',
  'royalblue',
  'purple',
];

const statusThemeKeys = ['success', 'notice', 'error', 'announcement', 'info'];

const themes = brandThemeKeys.reduce<Record<string, string>>(
  (previous, key) => ({ ...previous, [key]: key }),
  {}
);

const btnStyle = {
  marginRight: '1rem',
  marginBottom: '1rem',
};

const renderInlineButton = (theme: string, variant: string) => (
  <Button
    flat={variant === 'flat'}
    key={`${theme}`}
    onClick={action('Clicked Button')}
    outline={variant === 'outline'}
    style={btnStyle}
    theme={theme}
  >
    {theme}
  </Button>
);

export default decoratedStories('Atoms', Button);

export const allButtonThemes = decoratedStory(() => {
  const variant = select('Variant', ['default', 'outline', 'flat'], 'default');

  return (
    <StoryTemplate status={StoryStatus.Ready}>
      <StoryDescription>
        Primary versions of buttons and links. Approximately all focusable,
        interactive elements should use some form of a <code>Button</code> (if
        they look like this) or <code>ButtonBase</code> (if they have custom
        styles).
        <br />
        Prefer <code>brand-purple</code> for significant actions such as Pro
        signups. Prefer <code>brand-blue</code> for generic actions.
      </StoryDescription>
      <div>
        {brandThemeKeys.map(theme => renderInlineButton(theme, variant))}
      </div>
      <br />
      Alert status themes
      <div>
        {statusThemeKeys.map(theme => renderInlineButton(theme, variant))}
      </div>
      <br />
      We also have legacy button colors floating around. Do not use these.
      <div>
        {deprecatedThemeKeys.map(theme => renderInlineButton(theme, variant))}
      </div>
    </StoryTemplate>
  );
});

export const buttonBaseVariants = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Use <code>ButtonBase</code> when you need something that acts as a link or
      button, but don&apos;t need the default button styles.
      <br />
      <strong>Note:</strong> keep in mind that buttons generally need focus and
      hover indicators for accessibility. If you use <code>ButtonBase</code>, be
      sure you&apos;re adding in your own.
    </StoryDescription>
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
  </StoryTemplate>
));

export const linkButton = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <p>
      This is an example of a{' '}
      <Button theme={select('theme', themes, 'brand-blue')} link href="#">
        Link
      </Button>{' '}
      style button. When the <code>link</code> attribute is specified for a
      button, it will functionally behave as a link.
    </p>
  </StoryTemplate>
));

export const standardButtonOptions = decoratedStory(() => {
  const round = boolean('Round', false);

  return (
    <StoryTemplate status={StoryStatus.InProgress}>
      <StoryDescription>
        Common variants of buttons you might come across.
        <br />
        Buttons might also be <code>round</code> to indicate rounded corners.
        These tend to be larger, advertise-y placements.
      </StoryDescription>
      <div>
        <Button style={btnStyle} theme="brand-blue" flat href="#" round={round}>
          Flat
        </Button>
        <Button
          href="#"
          onClick={action('Clicked Button')}
          outline
          round={round}
          style={btnStyle}
          theme="brand-blue"
        >
          Outline
        </Button>
        <Button style={btnStyle} theme="brand-blue" size="large" round={round}>
          Large
        </Button>
        <Button
          href="#"
          onClick={action('Clicked Button')}
          round={round}
          size="small"
          style={btnStyle}
          theme="brand-blue"
        >
          Small
        </Button>
        <Button style={btnStyle} theme="brand-blue" disabled round={round}>
          Disabled
        </Button>
        <Button style={btnStyle} theme="brand-blue" round={round}>
          <Spinner />
          &nbsp;&nbsp;Loading...
        </Button>
        <Button style={btnStyle} theme="brand-blue" round={round}>
          <RadialProgress value={[0, 100]} duration={5000} />
          &nbsp;&nbsp;Processing...
        </Button>
        <Button style={btnStyle} theme="brand-blue" caps href="#" round={round}>
          Caps
        </Button>
      </div>
    </StoryTemplate>
  );
});

export const editablePlayground = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Play with this button, if you&apos;d like!
    </StoryDescription>
    <Button
      block={boolean('block', false)}
      caps={boolean('caps', false)}
      go={boolean('go', false)}
      link={boolean('link', false)}
      onClick={action('Clicked Button')}
      outline={boolean('outline', false)}
      size={select('size', ['small', 'large', undefined], undefined)}
      theme={select('theme', themes, 'brand-blue')}
      underline={boolean('underline', false)}
    >
      {text('Label', 'Submit')}
    </Button>
  </StoryTemplate>
));
