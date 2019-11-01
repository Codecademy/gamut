import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import Markdown from 'gamut/Markdown';
import exampleMarkdown from './markdown-example.md';

storiesOf('Component/Markdown', module)
  .addDecorator(withKnobs)
  .add(
    'Basics',
    () => (
      <Markdown
        text={text(
          'markdown',
          `
## Hello World

This is markdown

        `
        )}
        theme={select('theme', ['tight', 'loose', 'none'])}
      />
    ),
    {
      knobs: {
        escapeHTML: false,
      },
    }
  )
  .add(
    'Full Example',
    () => (
      <Markdown
        text={text('markdown', exampleMarkdown)}
        theme={select('theme', ['tight', 'loose', 'none'])}
      />
    ),
    {
      knobs: {
        escapeHTML: false,
      },
    }
  )
  .add(
    'Custom Element Overrides',
    () => (
      <Markdown
        text={text(
          'markdown',
          `
## Hello World

This is a custom markdown component

<CustomElement title="A Custom Component" />
        `
        )}
        theme={select('theme', ['tight', 'loose', 'none'])}
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
    ),
    {
      knobs: {
        escapeHTML: false,
      },
    }
  )
  .add(
    'Inline Markdown',
    () => (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
        <Markdown
          text={text('markdown', '`this is an inline markdown component`')}
          theme={select('theme', ['tight', 'loose', 'none'])}
          inline
        />
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.
      </div>
    ),
    {
      knobs: {
        escapeHTML: false,
      },
    }
  );
