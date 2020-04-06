import React from 'react';
import { select, boolean } from '@storybook/addon-knobs';
import { CardShell, CardBody, CardFooter } from '@codecademy/gamut/src';
import {
  decoratedStory,
  StoryStatus,
  StoryTemplate,
  StoryDescription,
} from '../Templating';

const alignStyles = ['left', 'center', 'right'] as const;
const borderStyles = ['dashed', 'solid', 'none'] as const;

export default decoratedStory('Molecules', 'Card');

export const card = () => (
  <StoryTemplate status={StoryStatus.Ready}>
    <StoryDescription>
      Default shell with white background that can include some subtly
      emphasized content.
    </StoryDescription>
    <CardShell hoverShadow={boolean('shell.hoverShadow', false)}>
      <CardBody standardPadding={boolean('body.standardPadding', true)}>
        <h3>Card Body</h3>
        <p>This is some body text</p>
        <p>Blah blah blurgha blurgha</p>
      </CardBody>
      <CardFooter
        border={select('footer.border', borderStyles, 'none')}
        align={select('footer.align', alignStyles, 'left')}
        flex={boolean('footer.flex', true)}
        standardPadding={boolean('footer.standardPadding', true)}
        standardHeight={boolean('footer.standardHeight', true)}
      >
        <span>&raquo;&nbsp;&nbsp;</span>
        <span>Footer Text</span>
        <span>&nbsp;&nbsp;&laquo;</span>
      </CardFooter>
    </CardShell>
  </StoryTemplate>
);
