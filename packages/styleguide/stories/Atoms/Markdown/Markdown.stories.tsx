import { Markdown } from '@codecademy/gamut/src';
import { text, select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import exampleMarkdown from './markdown-example.md';

import { decoratedStory } from '../../Templating';

export default {
  title: 'Gamut|Atoms/Markdown',
  component: Markdown,
  decorators: [withKnobs],
};

export const basics = decoratedStory(() => (
  <Markdown
    text={text(
      'markdown',
      `
## Hello World

This is markdown

    `
    )}
    spacing={select('spacing', ['tight', 'loose', 'none'], 'none')}
  />
));

export const fullExample = decoratedStory(() => (
  <Markdown
    text={text('markdown', exampleMarkdown)}
    spacing={select('spacing', ['tight', 'loose', 'none'], 'none')}
  />
));

export const customElementOverrides = decoratedStory(() => (
  <Markdown
    text={text(
      'markdown',
      `
## Hello World

This is a custom markdown component

<CodeBlock>Span inside a custom code block element</CodeBlock>

<CustomElement title="A Custom Component" />
    `
    )}
    spacing={select('spacing', ['tight', 'loose', 'none'], 'none')}
    overrides={{
      CodeBlock: {
        component: props => <code style={{ color: 'darkblue' }} {...props} />,
      },
      CustomElement: {
        component: ({ title }) => {
          return (
            <h3
              style={{
                padding: 10,
                background: 'rebeccapurple',
                color: 'white',
                borderRadius: 5,
              }}
            >
              {title}
            </h3>
          );
        },
        allowedAttributes: ['title'],
      },
    }}
  />
));

export const inlineMarkdown = decoratedStory(() => (
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
    <Markdown
      text={text('markdown', '`this is an inline markdown component`')}
      spacing={select('spacing', ['tight', 'loose', 'none'], 'none')}
      inline
    />
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
    anim id est laborum.
  </div>
));
