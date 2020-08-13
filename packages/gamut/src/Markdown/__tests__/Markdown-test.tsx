/* eslint-disable jsx-a11y/no-distracting-elements */

import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Markdown } from '../index';

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
<h1>
  Heading 1
</h1>

<h3>
  Heading 3
</h3>

<iframe src="https://www.youtube.com/embed/KvgrQIK1yPY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
`;

const youtubeMarkdown = `
<iframe src="https://www.youtube.com/embed/KvgrQIK1yPY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

  it('Renders custom tables in markdown', () => {
    const table = `
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |
    `;
    const markdown = mount(<Markdown text={table} />);
    expect(markdown.find('div.tableWrapper table').length).toEqual(1);
    expect(markdown.find('div.tableWrapper').prop('style')).toEqual({
      maxHeight: 180,
    });
  });

  it('Skips rendering custom tables in markdown when skipProcessing.table is true', () => {
    const table = `
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |
    `;
    const markdown = mount(
      <Markdown skipDefaultOverrides={{ table: true }} text={table} />
    );
    expect(markdown.find('table').length).toEqual(1);
    expect(markdown.find('div.tableWrapper table').length).toEqual(0);
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

  describe('Allows passing in a custom CodeBlock override', () => {
    it('Accepts a CodeBlock component directly', () => {
      const text = `
# Heading

\`\`\`js
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
      expect((markdown.find(CodeBlock).props() as any).language).toEqual('js');
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
      <Markdown text={basicMarkdown} data-testid="cool" />
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
    it('Adds rel="noopener" to external links', () => {
      const markdown = mount(
        <Markdown text={`<a href="http://google.com">google</a>`} />
      );
      expect(markdown.find('a[rel="noopener"]').length).toEqual(1);
    });
  });

  describe('Allows passing in a custom tag overrides', () => {
    it('Allows passing in custom tag overrides', () => {
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

    describe('Properties on overrides are handled', () => {
      let markdown: ReactWrapper;

      beforeAll(() => {
        const text = `
# Heading

<TestComponent name="my name" isCodeBlock="true" isWebBrowser />
        `;
        const TestComponent = () => <strong>coooool</strong>;

        const overrides = {
          TestComponent: {
            component: TestComponent,
            allowedAttributes: ['name', 'isCodeBlock', 'isWebBrowser'],
          },
        };
        markdown = mount(<Markdown text={text} overrides={overrides} />);
      });

      it('Allows passing in allowed attributes to overrides', () => {
        expect(markdown.find('TestComponent').props()).toMatchObject({
          name: 'my name',
        });
      });

      it('coerces the string "true" into a boolean', () => {
        expect(markdown).toBeDefined();
        expect(markdown.find('TestComponent').props()).toMatchObject({
          isCodeBlock: true,
        });
      });

      it('defaults attributes without a value to true', () => {
        expect(markdown).toBeDefined();
        expect(markdown.find('TestComponent').props()).toMatchObject({
          isWebBrowser: true,
        });
      });

      it("doesn't wrap self closing elements in p tags", () => {
        expect(markdown).toBeDefined();
        expect(markdown.find('p > strong').length).toEqual(0);
      });
    });
  });

  describe('Replaces certain characters in the raw markdown before parsing', () => {
    it('replaces `&mdash;` with `---`', () => {
      const text = `This is some text with a &mdash; in the middle`;
      const expectedText = `This is some text with a \u2014 in the middle`;
      expect(text).not.toEqual(expectedText);
      const markdown = mount(<Markdown inline text={text} />);
      expect(markdown.text().trim()).toEqual(expectedText);
    });

    it('does not replace `&mdash;` with `---`', () => {
      const text =
        'This is `some code with a &mdash; in` the middle and this is a &mdash;';
      const expectedText = `This is some code with a &mdash; in the middle and this is a \u2014`;
      expect(text).not.toEqual(expectedText);
      const markdown = mount(<Markdown inline text={text} />);
      expect(markdown.text().trim()).toEqual(expectedText);
    });
  });
});
