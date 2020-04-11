import { AccordionButton, VisualTheme } from '@codecademy/gamut/src';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import React from 'react';

import {
  decoratedStory,
  StoryDescription,
  StoryStatus,
  StoryTemplate,
} from '../Templating';

export default decoratedStory('Molecules', AccordionButton);

export const accordionButton = () => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      A very simple, stateless molecule consisting of a single button and icon.
      It serves as the top of any collapsible/expandable content, such as a
      "hint" section in the LE or a list of department jobs on a careers page.
      <br />
      It's likely we'll eventually create an <code>Accordion</code>, which might
      replace usage of this <code>AccordionButton</code>. Until then the body of
      the accordion is managed separately in consuming locations.
    </StoryDescription>
    <AccordionButton
      expanded={boolean('Expanded', false)}
      onClick={action('Clicked')}
      theme={select('Theme', ['blue', 'plain', 'yellow'], 'yellow')}
    >
      Click 'Expanded' To Toggle Me
    </AccordionButton>
  </StoryTemplate>
);

export const blue = () => (
  <StoryTemplate status={StoryStatus.Ready} theme={VisualTheme.DarkMode}>
    <StoryDescription>
      Blue accordion tops are only usable in dark contexts, such as the LE's
      Help Menu.
    </StoryDescription>
    <AccordionButton
      expanded={boolean('Expanded', false)}
      onClick={action('Clicked')}
      theme="blue"
    >
      Click 'Expanded' To Toggle Me
    </AccordionButton>
  </StoryTemplate>
);

export const plain = () => (
  <StoryTemplate status={StoryStatus.InProgress} theme={VisualTheme.LightMode}>
    <StoryDescription>
      Plain accordion tops are best applied in plain pages such as marketing
      pages where we haven't been able to invest yet in a more solid theme.
    </StoryDescription>
    <AccordionButton
      expanded={boolean('Expanded', false)}
      onClick={action('Clicked')}
      theme="plain"
    >
      Click 'Expanded' To Toggle Me
    </AccordionButton>
  </StoryTemplate>
);

export const yellow = () => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      Yellow accordion tops are our favorite: they look the most professional on
      their own. They're only used in the "Get a Hint" sections of the LE's
      narrative pane.
    </StoryDescription>
    <AccordionButton
      expanded={boolean('Expanded', false)}
      onClick={action('Clicked')}
      theme="yellow"
    >
      Click 'Expanded' To Toggle Me
    </AccordionButton>
  </StoryTemplate>
);
