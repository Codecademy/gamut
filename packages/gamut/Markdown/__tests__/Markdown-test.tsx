/* eslint-disable jsx-a11y/no-distracting-elements */

import React from 'react';
import { mount } from 'enzyme';
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

<iframe src="https://www.youtube.com/embed/KvgrQIK1yPY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;

const youtubeMarkdown = `
<iframe src="https://www.youtube.com/embed/KvgrQIK1yPY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;

// test for working MIXED_INLINE_HTML_TAGS regex
const htmlWrappedMarkdown = `
Starting some html in the middle of a <div class="test">

# Heading one
</div>

`;

describe('<Markdown />', () => {
  it('renders standard Markdown', () => {
    const markdown = mount(<Markdown text={basicMarkdown} />);
    expect(markdown.find('h1').length).toEqual(1);
    expect(markdown.find('h3').length).toEqual(1);
    expect(markdown.find('code').length).toEqual(1);
  });

  it('Renders html content in markdown', () => {
    const markdown = mount(<Markdown text={htmlMarkdown} />);
    expect(markdown.find('h1').length).toEqual(1);
    expect(markdown.find('h3').length).toEqual(1);
    expect(markdown.find('iframe').length).toEqual(1);
  });

  it('Wraps youtube iframes in a flexible container', () => {
    const markdown = mount(<Markdown text={youtubeMarkdown} />);
    expect(markdown.find('[data-testid="yt-iframe"]').length).toEqual(1);
  });

  it('Wraps the markdown in a div by default (block)', () => {
    const markdown = mount(<Markdown text={basicMarkdown} />);
    expect(markdown.find('div.spacing-tight').length).toEqual(1);
  });

  it('Wraps the markdown in a span when inline', () => {
    const markdown = mount(<Markdown text={basicMarkdown} inline />);
    expect(markdown.find('span.spacing-tight').length).toEqual(1);
  });

  it('Allows passing in arbitrary react component overrides', () => {
    const TestComponent = () => <strong>coooool</strong>;

    const text = `
# Heading

<TestComponent/>
    `;

    const overrides = {
      TestComponent: {
        component: TestComponent,
      },
    };
    const markdown = mount(<Markdown text={text} overrides={overrides} />);
    expect(markdown.find('strong').length).toEqual(1);
  });

  describe('Allows passing in a custom CodeBlock override', () => {
    it('Accepts a CodeBlock component directly', () => {
      const text = `
# Heading

\`\`\`
var test = true;
\`\`\`
      `;

      const CodeBlock = (props: React.HTMLProps<HTMLElement>) => (
        <strong {...props} />
      );

      const overrides = {
        CodeBlock: {
          component: CodeBlock,
        },
      };

      const markdown = mount(<Markdown text={text} overrides={overrides} />);
      expect(markdown.find(CodeBlock).length).toEqual(1);
    });
    it('When specifying a <code /> element override with a custom CodeBlock override, the CodeBlock wins', () => {
      const text = `
# Heading

\`\`\`js
var test = true;
\`\`\`

\`var test = false;\`
      `;

      const CodeBlock = (props: React.HTMLProps<HTMLDivElement>) => (
        <div {...props} />
      );

      const overrides = {
        CodeBlock: {
          component: CodeBlock,
        },
        code: {
          component: (props: React.HTMLProps<HTMLElement>) => (
            <strong {...props} />
          ),
        },
      };

      const markdown = mount(<Markdown text={text} overrides={overrides} />);

      expect(markdown.find(overrides.CodeBlock.component).length).toEqual(1);
      // There should only be one <code /> override because the codeblock override overwrote it
      expect(markdown.find(overrides.code.component).length).toEqual(1);
    });
  });

  it('Renders data attributes on the markdown wrapper', () => {
    const markdown = mount(
      <Markdown text={htmlWrappedMarkdown} data-testid="cool" />
    );
    expect(markdown.find('div[data-testid="cool"]').length).toEqual(1);
  });

  it('Prevents errors on malformed image tags', () => {
    const markdown = mount(
      <Markdown text={`<img src="http://google.com/"></img>`} />
    );
    expect(markdown.find('img').length).toEqual(1);
  });

  it('Allows passing in class names', () => {
    const markdown = mount(
      <Markdown
        text={`<div class="narrative-table-container"> # Cool </div>`}
      />
    );

    expect(markdown.find('div.narrative-table-container').length).toEqual(1);
  });

  describe('Markdown anchor links', () => {
    it('Adds target _blank to external links', () => {
      const markdown = mount(
        <Markdown text={`<a href="http://google.com">google</a>`} />
      );
      expect(markdown.find('a[target="_blank"]').length).toEqual(1);
    });

    it('Adds rel="noopener noreferrer" to external links', () => {
      const markdown = mount(
        <Markdown text={`<a href="http://google.com">google</a>`} />
      );
      expect(markdown.find('a[rel="noopener noreferrer"]').length).toEqual(1);
    });

    it('Doesn\'t add rel="noopener noreferrer" to relative links', () => {
      const markdown = mount(
        <Markdown text={`<a href="/search">google</a>`} />
      );
      expect(markdown.find('a[rel="noopener noreferrer"]').length).toEqual(0);
    });

    it('Doesn\'t add rel="noopener noreferrer" to same-origin links', () => {
      const markdown = mount(
        <Markdown
          text={`<a href="${window.location.origin}/search">google</a>`}
        />
      );
      expect(markdown.find('a[rel="noopener noreferrer"]').length).toEqual(0);
    });
  });
});
