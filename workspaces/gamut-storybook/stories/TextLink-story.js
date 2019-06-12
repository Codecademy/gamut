import React from 'react';
import { storiesOf } from '@storybook/react';
import { TextLink, TextLinkType } from '@codecademy/gamut';

const stories = storiesOf('Component/TextLink', module);

stories.add('Standard text link', () => (
  <TextLink href="/">Text contents</TextLink>
));

stories.add('Color transition text link', () => (
  <TextLink href="/" type={TextLinkType.ColorTransition}>
    Text contents
  </TextLink>
));

stories.add('Underline transition text link', () => (
  <TextLink href="/" type={TextLinkType.UnderlineTransition}>
    Text contents
  </TextLink>
));
