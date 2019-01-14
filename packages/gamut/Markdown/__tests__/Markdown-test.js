import React from 'react';
import { mount, render } from 'enzyme';
import Markdown from '../index';

const basicMarkdown = `
# Heading 1

### Heading 3

\`\`\`js
const jsCode = () => {
  console.log('hello world);
}
\`\`\`

`;

const htmlMarkdown = `
<h1>Heading 1</h1>

<h3>Heading 3</h3>

<table>
  <tbody>
    <tr>
      <td>Cool</td>
    </tr>
  </tbody>
</table>

<iframe src="https://www.youtube.com/embed/KvgrQIK1yPY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;

const youtubeMarkdown = `
<iframe src="https://www.youtube.com/embed/KvgrQIK1yPY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;

const codeBlockBugMarkdown = `
having this text above the codeblock breaks the codeblock in markdown-in-jsx
\`\`\`js
const jsCode = () => {
  console.log('hello world);
}
\`\`\`

\`\`\`js
const jsCode = () => {
  console.log('hello world);
}
\`\`\`

`;

it('renders standard Markdown', () => {
  const markdown = render(<Markdown text={basicMarkdown} />);
  expect(markdown).toMatchSnapshot();
});

it('Renders html content in markdown', () => {
  const markdown = render(<Markdown text={htmlMarkdown} />);
  expect(markdown).toMatchSnapshot();
});

it('Wraps youtube iframes in a flexible container', () => {
  const markdown = mount(<Markdown text={youtubeMarkdown} />);
  expect(markdown.find('[data-testid="yt-iframe"]').length).toEqual(1);
});

it('Fixes the newline bug with codeBlocks', () => {
  const markdown = mount(<Markdown text={codeBlockBugMarkdown} />);
  expect(markdown.find('code.lang-js').length).toEqual(2);
});

it('Allows passing in arbitrary react component overrides', () => {
  const TestComponent = () => <marquee>coooool</marquee>;

  const text = `
# Heading

<TestComponent />
  `;

  const overrides = {
    TestComponent: {
      component: TestComponent,
    },
  };
  const markdown = render(<Markdown text={text} overrides={overrides} />);
  expect(markdown).toMatchSnapshot();
  expect(markdown.find('marquee').length).toEqual(1);
});
