import React from 'react';
import Markdown from '../index';
import { render } from 'enzyme';

const basicMarkdown = `
# Heading 1

### Heading 3

\`\`\`
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
    </tr>
    <td>Cool</td>
  </tbody>
<table>

`;

const youtubeMarkdown = `
<iframe src="https://www.youtube.com/embed/KvgrQIK1yPY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
  const markdown = render(<Markdown text={youtubeMarkdown} />);
  expect(markdown.find('[data-testid="yt-iframe"]').length).toEqual(1);
});
