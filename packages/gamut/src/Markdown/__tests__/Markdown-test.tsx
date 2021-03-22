/* eslint-disable jsx-a11y/no-distracting-elements */

import { setupEnzyme } from '@codecademy/gamut-tests';
import React from 'react';
import { act } from 'react-dom/test-utils';

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

const renderWrapper = setupEnzyme(Markdown);

describe('<Markdown />', () => {
  it('renders standard Markdown', () => {
    const { wrapper } = renderWrapper({ text: basicMarkdown });
    expect(wrapper.find('h1').length).toEqual(1);
    expect(wrapper.find('h3').length).toEqual(1);
    expect(wrapper.find('code').length).toEqual(1);
  });

  it('Renders html content in markdown', () => {
    const { wrapper } = renderWrapper({ text: htmlMarkdown });
    expect(wrapper.find('h1').length).toEqual(1);
    expect(wrapper.find('h3').length).toEqual(1);
    expect(wrapper.find('iframe').length).toEqual(1);
  });

  it('Renders custom tables in markdown', () => {
    const table = `
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |
    `;
    const { wrapper } = renderWrapper({ text: table });
    expect(wrapper.find('div.tableWrapper table').length).toEqual(1);
    expect(wrapper.find('div.tableWrapper').prop('style')).toEqual({
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
    const { wrapper } = renderWrapper({
      skipDefaultOverrides: { table: true },
      text: table,
    });
    expect(wrapper.find('table').length).toEqual(1);
    expect(wrapper.find('div.tableWrapper table').length).toEqual(0);
  });

  it('Wraps youtube iframes in a flexible container', () => {
    const { wrapper } = renderWrapper({ text: youtubeMarkdown });
    expect(wrapper.find('[data-testid="yt-iframe"]').length).toEqual(1);
  });

  it('Wraps the markdown in a div by default (block)', () => {
    const { wrapper } = renderWrapper({ text: basicMarkdown });
    expect(wrapper.find('div.spacing-tight').length).toEqual(1);
  });

  it('Wraps the markdown in a span when inline', () => {
    const { wrapper } = renderWrapper({ text: basicMarkdown, inline: true });
    expect(wrapper.find('span.spacing-tight').length).toEqual(1);
  });

  it('does not crash on a value-less attribute', () => {
    const { wrapper } = renderWrapper({ text: `<h1 class />` });
    expect(wrapper.find('h1').length).toEqual(1);
  });

  it('Does not render id attributes on headers by default', () => {
    const { wrapper } = renderWrapper({ text: basicMarkdown });
    expect(wrapper.find('h1').get(0).props.id).toBeUndefined();
    expect(wrapper.find('h3').get(0).props.id).toBeUndefined();
  });

  it('Renders id attributes on headers with the headerIds prop enabled', () => {
    const { wrapper } = renderWrapper({ text: basicMarkdown, headerIds: true });
    expect(wrapper.find('h1').get(0).props.id).toEqual('cc-heading-1');
    expect(wrapper.find('h3').get(0).props.id).toEqual('cc-heading-3');
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

      const { wrapper } = renderWrapper({ text, overrides });
      expect(wrapper.find(CodeBlock).length).toEqual(1);
      expect((wrapper.find(CodeBlock).props() as any).language).toEqual('js');
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

      const { wrapper } = renderWrapper({ text, overrides });

      expect(wrapper.find(overrides.CodeBlock.component).length).toEqual(1);
      // There should only be one <code /> override because the codeblock override overwrote it
      expect(wrapper.find(overrides.code.component).length).toEqual(1);
    });
  });

  it('Renders data attributes on the markdown wrapper', () => {
    const { wrapper } = renderWrapper({
      text: basicMarkdown,
      'data-testid': 'cool',
    } as any);

    expect(wrapper.find('div[data-testid="cool"]').length).toEqual(1);
  });

  it('Prevents errors on malformed image tags', () => {
    const { wrapper } = renderWrapper({
      text: `<img src="http://google.com/"></img>`,
    });

    expect(wrapper.find('img').length).toEqual(1);
  });

  it('Allows passing in class names', () => {
    const { wrapper } = renderWrapper({
      text: `<div class="narrative-table-container"> # Cool </div>`,
    });

    expect(wrapper.find('div.narrative-table-container').length).toEqual(1);
  });

  describe('Markdown anchor links', () => {
    it('Renders a link with text', () => {
      const text = '[link](/url)';
      const expectedText = `link`;
      expect(text).not.toEqual(expectedText);
      const { wrapper } = renderWrapper({ text });
      expect(wrapper.text().trim()).toEqual(expectedText);
    });

    it('Adds rel="noopener" to external links', () => {
      const { wrapper } = renderWrapper({
        text: `<a href="http://google.com">google</a>`,
      });

      expect(wrapper.find('a[rel="noopener"]').length).toEqual(1);
    });

    it('Allows onClicks callbacks', () => {
      const onClick = jest.fn();

      const { wrapper } = renderWrapper({
        onAnchorClick: onClick,
        text: `<a data-testid="testLink" href="http://google.com">google</a>`,
      });

      act(() => {
        wrapper.find(`a[href="http://google.com"]`).simulate('click');
      });

      expect(onClick).toHaveBeenCalledTimes(1);
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
      const { wrapper } = renderWrapper({ text, overrides });
      expect(wrapper.find('strong').length).toEqual(1);
    });

    describe('Properties on overrides are handled', () => {
      let markdown: ReturnType<typeof renderWrapper>['wrapper'];

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
        const { wrapper } = renderWrapper({ text, overrides });
        markdown = wrapper;
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
      const { wrapper } = renderWrapper({ inline: true, text });
      expect(wrapper.text().trim()).toEqual(expectedText);
    });

    it('does not replace `&mdash;` with `---`', () => {
      const text =
        'This is `some code with a &mdash; in` the middle and this is a &mdash;';
      const expectedText = `This is some code with a &mdash; in the middle and this is a \u2014`;
      expect(text).not.toEqual(expectedText);
      const { wrapper } = renderWrapper({ inline: true, text });
      expect(wrapper.text().trim()).toEqual(expectedText);
    });
  });
});
