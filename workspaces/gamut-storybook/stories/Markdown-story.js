import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Markdown from '@codecademy/gamut/Markdown';

const editableMarkdown = `
### Editable Markdown

Use the knobs view below to edit

\`\`\`js
const test = async function test({value}) {
  const res = await fetch('url');
}
\`\`\`

<iframe width="1920" height="778" src="https://www.youtube.com/embed/KvgrQIK1yPY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<h1>html h1</h1>

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

`;

storiesOf('Component/Markdown', module).add(
  'Editable',
  () => <Markdown text={text('markdown', editableMarkdown)} />,
  {
    info: {
      inline: false,
      propTables: false,
    },
    knobs: {
      escapeHTML: false,
    },
  }
);
