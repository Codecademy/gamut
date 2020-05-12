import { text } from '@storybook/addon-knobs';

export const customText = text(
  'markdown',
  `
## Hello World

This is a custom markdown component

<CodeBlock>Span inside a custom code block element</CodeBlock>
<CustomElement title="A Custom Component" />`
);
