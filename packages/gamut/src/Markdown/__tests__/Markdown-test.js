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
    const markdown = mount(
      React.createElement(Markdown, { text: basicMarkdown })
    );
    expect(markdown.find('h1').length).toEqual(1);
    expect(markdown.find('h3').length).toEqual(1);
    expect(markdown.find('code').length).toEqual(1);
  });
  it('Renders html content in markdown', () => {
    const markdown = mount(
      React.createElement(Markdown, { text: htmlMarkdown })
    );
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
    const markdown = mount(React.createElement(Markdown, { text: table }));
    expect(markdown.find('div.tableWrapper table').length).toEqual(1);
    expect(markdown.find('div.tableWrapper').prop('style')).toEqual({
      maxHeight: 180,
    });
  });
  it('Wraps youtube iframes in a flexible container', () => {
    const markdown = mount(
      React.createElement(Markdown, { text: youtubeMarkdown })
    );
    expect(markdown.find('[data-testid="yt-iframe"]').length).toEqual(1);
  });
  it('Wraps the markdown in a div by default (block)', () => {
    const markdown = mount(
      React.createElement(Markdown, { text: basicMarkdown })
    );
    expect(markdown.find('div.spacing-tight').length).toEqual(1);
  });
  it('Wraps the markdown in a span when inline', () => {
    const markdown = mount(
      React.createElement(Markdown, { text: basicMarkdown, inline: true })
    );
    expect(markdown.find('span.spacing-tight').length).toEqual(1);
  });
  describe('Allows passing in a custom CodeBlock override', () => {
    it('Accepts a CodeBlock component directly', () => {
      const text = `
# Heading

\`\`\`
var test = true;
\`\`\`
      `;
      const CodeBlock = props =>
        React.createElement('strong', Object.assign({}, props));
      const overrides = {
        CodeBlock: {
          component: CodeBlock,
        },
      };
      const markdown = mount(
        React.createElement(Markdown, { text: text, overrides: overrides })
      );
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
      const CodeBlock = props =>
        React.createElement('div', Object.assign({}, props));
      const overrides = {
        CodeBlock: {
          component: CodeBlock,
        },
        code: {
          component: props =>
            React.createElement('strong', Object.assign({}, props)),
        },
      };
      const markdown = mount(
        React.createElement(Markdown, { text: text, overrides: overrides })
      );
      expect(markdown.find(overrides.CodeBlock.component).length).toEqual(1);
      // There should only be one <code /> override because the codeblock override overwrote it
      expect(markdown.find(overrides.code.component).length).toEqual(1);
    });
  });
  it('Renders data attributes on the markdown wrapper', () => {
    const markdown = mount(
      React.createElement(Markdown, {
        text: basicMarkdown,
        'data-testid': 'cool',
      })
    );
    expect(markdown.find('div[data-testid="cool"]').length).toEqual(1);
  });
  it('Prevents errors on malformed image tags', () => {
    const markdown = mount(
      React.createElement(Markdown, {
        text: `<img src="http://google.com/"></img>`,
      })
    );
    expect(markdown.find('img').length).toEqual(1);
  });
  it('Allows passing in class names', () => {
    const markdown = mount(
      React.createElement(Markdown, {
        text: `<div class="narrative-table-container"> # Cool </div>`,
      })
    );
    expect(markdown.find('div.narrative-table-container').length).toEqual(1);
  });
  describe('Markdown anchor links', () => {
    it('Adds rel="noopener" to external links', () => {
      const markdown = mount(
        React.createElement(Markdown, {
          text: `<a href="http://google.com">google</a>`,
        })
      );
      expect(markdown.find('a[rel="noopener"]').length).toEqual(1);
    });
  });
  describe('Allows passing in a custom tag overrides', () => {
    it('Allows passing in custom tag overrides', () => {
      const TestComponent = () =>
        React.createElement('strong', null, 'coooool');
      const text = `
# Heading

<TestComponent/>
      `;
      const overrides = {
        TestComponent: {
          component: TestComponent,
        },
      };
      const markdown = mount(
        React.createElement(Markdown, { text: text, overrides: overrides })
      );
      expect(markdown.find('strong').length).toEqual(1);
    });
    describe('Properties on overrides are handled', () => {
      let markdown;
      beforeAll(() => {
        const text = `
# Heading

<TestComponent name="my name" isCodeBlock="true" isWebBrowser />
        `;
        const TestComponent = () =>
          React.createElement('strong', null, 'coooool');
        const overrides = {
          TestComponent: {
            component: TestComponent,
            allowedAttributes: ['name', 'isCodeBlock', 'isWebBrowser'],
          },
        };
        markdown = mount(
          React.createElement(Markdown, { text: text, overrides: overrides })
        );
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
      const markdown = mount(
        React.createElement(Markdown, { inline: true, text: text })
      );
      expect(markdown.text().trim()).toEqual(expectedText);
    });
    it('does not replace `&mdash;` with `---`', () => {
      const text =
        'This is `some code with a &mdash; in` the middle and this is a &mdash;';
      const expectedText = `This is some code with a &mdash; in the middle and this is a \u2014`;
      expect(text).not.toEqual(expectedText);
      const markdown = mount(
        React.createElement(Markdown, { inline: true, text: text })
      );
      expect(markdown.text().trim()).toEqual(expectedText);
    });
  });
});
//# sourceMappingURL=Markdown-test.js.map
