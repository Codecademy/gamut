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

    expect(markdown.find('marquee').length).toEqual(1);
  });

  describe('Allows passing in a custom CodeBlock override', () => {
    it('Accepts a CodeBlock component directly', () => {
      const text = `
# Heading

\`\`\`
var test = true;
\`\`\`
      `;

      const CodeBlock = props => <marquee {...props} />;

      const overrides = {
        CodeBlock: CodeBlock,
      };

      const markdown = mount(<Markdown text={text} overrides={overrides} />);
      expect(markdown.find(CodeBlock).length).toEqual(1);
    });

    it('Accepts a CodeBlock override object including custom props', () => {
      const text = `
# Heading

\`\`\`
var test = true;
\`\`\`
      `;

      const CodeBlock = props => <marquee {...props} />;

      const overrides = {
        CodeBlock: {
          component: CodeBlock,
          props: {
            'data-test': true,
          },
        },
      };

      const markdown = mount(<Markdown text={text} overrides={overrides} />);
      expect(markdown.find(CodeBlock).length).toEqual(1);
      expect(markdown.find(CodeBlock).props()['data-test']).toEqual(true);
    });

    it('When specifying a <code /> element override with a custom CodeBlock override, the CodeBlock wins', () => {
      const text = `
# Heading

\`\`\`js
var test = true;
\`\`\`

\`var test = false;\`
      `;

      const CodeBlock = props => <marquee {...props} />;

      const overrides = {
        CodeBlock,
        code: props => <strong {...props} />,
      };

      const markdown = mount(<Markdown text={text} overrides={overrides} />);

      expect(markdown.find(overrides.CodeBlock).length).toEqual(1);
      // There should only be one <code /> override because the codeblock override overwrote it
      expect(markdown.find(overrides.code).length).toEqual(1);
    });
  });

  it('Renders markdown inside of an html element', () => {
    const markdown = mount(<Markdown text={htmlWrappedMarkdown} />);
    expect(markdown.find('div.test').find('h1').length).toEqual(1);
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
});
