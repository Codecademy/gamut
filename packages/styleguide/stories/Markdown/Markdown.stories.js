import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { Markdown } from '../../../gamut/src';
import exampleMarkdown from './markdown-example.md';

export default {
  title: 'Component/Markdown',
  component: Markdown,
  decorators: [withKnobs],
};

export const basics = () => (
  <Markdown
    text={text(
      'markdown',
      `
## Hello World

This is markdown

    `
    )}
    spacing={select('spacing', ['tight', 'loose'])}
  />
);

basics.story = {
  name: 'Basics',

  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const fullExample = () => (
  <Markdown
    text={text('markdown', exampleMarkdown)}
    spacing={select('spacing', ['tight', 'loose'])}
  />
);

fullExample.story = {
  name: 'Full Example',

  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const customElementOverrides = () => (
  <Markdown
    text={text(
      'markdown',
      `
## Hello World

This is a custom markdown component

<CustomElement title="A Custom Component" />
    `
    )}
    spacing={select('spacing', ['tight', 'loose'])}
    overrides={{
      CodeBlock: {
        component: props => <span style={{ color: 'blue' }} {...props} />,
        props: {
          style: {
            color: 'red',
          },
        },
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
);

customElementOverrides.story = {
  name: 'Custom Element Overrides',

  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};

export const inlineMarkdown = () => (
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
    <Markdown
      text={text('markdown', '`this is an inline markdown component`')}
      spacing={select('spacing', ['tight', 'loose'])}
      inline
    />
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
    anim id est laborum.
  </div>
);

inlineMarkdown.story = {
  name: 'Inline Markdown',

  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
};
