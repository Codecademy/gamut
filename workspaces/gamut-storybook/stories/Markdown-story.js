import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select } from '@storybook/addon-knobs';
import Markdown from '@codecademy/gamut/Markdown';

const editableMarkdown = `
### Editable Markdown

Use the knobs view below to edit

# h1
## h2
### h3

cool
\`\`\`js
// Code block 1
const test = async function test({value}) {
  const res = await fetch('url');
}
\`\`\`

cool

\`\`\`js
// Code block 2
const test = async function test({value}) {
  const res = await fetch('url');
}
\`\`\`

This is some \`inline code\`

<iframe src="https://www.youtube.com/embed/KvgrQIK1yPY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<h1>html h1</h1>

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

Our first gate is the _NAND gate_. This gate receives two inputs and only returns current if the inputs are both off.









Here's the truth table:<div class="narrative-table-container">

|*a*|*b*|output|
|-|-|-|
|0|0|1|
|0|1|1|
|1|0|1|
|1|1|0|
</div>

<div class="narrative-table-container">
|*a*|*b*|output|
|-|-|-|
|0|0|1|
|0|1|1|
|1|0|1|
|1|1|0|
</div>

We divide the number of people completing each step by the number of people completing the _previous_ step:

<div class="narrative-table-container">

| <font color="#52b1db">Question Number</font> | <font color="#52b1db">Percent Completing this Question</font>
| --- | --- |
| 1 | 100% |
| 2 | ? % |
| 3 |  ? % |
| 4 | ? % |
| 5 | ? % |

</div>

<br>

Make sure to elaborate on your reasonings.

`;

storiesOf('Component/Markdown', module)
  .add(
    'Editable',
    () => (
      <Markdown
        text={text('markdown', editableMarkdown)}
        theme={select('theme', ['tight', 'loose', 'none'])}
      />
    ),
    {
      info: {
        inline: false,
        propTables: false,
      },
      knobs: {
        escapeHTML: false,
      },
    }
  )
  .add(
    'Custom Codeblock',
    () => (
      <Markdown
        text={text('markdown', editableMarkdown)}
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
        }}
      />
    ),
    {
      info: {
        inline: false,
        propTables: false,
      },
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
