/* eslint-disable jsx-a11y/no-distracting-elements */

import { setupRtl } from '@codecademy/gamut-tests';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

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

const checkboxMarkdown = `
- [ ] checkbox
- [x] default checked checkbox
- [ ] third checkbox
`;

const renderView = setupRtl(Markdown);

describe('<Markdown />', () => {
  it('renders standard Markdown', () => {
    renderView({ text: basicMarkdown });
    screen.getByRole('heading', { level: 1 });
    expect(document.querySelectorAll('h3').length).toEqual(1);
    expect(document.querySelectorAll('code').length).toEqual(1);
  });

  it('Renders html content in markdown', () => {
    renderView({ text: htmlMarkdown });
    expect(document.querySelectorAll('h1').length).toEqual(1);
    expect(document.querySelectorAll('h3').length).toEqual(1);
    expect(document.querySelectorAll('iframe').length).toEqual(1);
  });

  it('Renders custom tables in markdown', () => {
    const table = `
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |
    `;
    renderView({ text: table });
    expect(document.querySelectorAll('div.tableWrapper table').length).toEqual(
      1
    );
  });

  it('Skips rendering custom tables in markdown when skipProcessing.table is true', () => {
    const table = `
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |
    `;
    renderView({
      skipDefaultOverrides: { table: true },
      text: table,
    });
    expect(document.querySelectorAll('table').length).toEqual(1);
    expect(document.querySelectorAll('div.tableWrapper table').length).toEqual(
      0
    );
  });

  it('Wraps youtube iframes in a flexible container', () => {
    renderView({ text: youtubeMarkdown });
    screen.getByTestId('yt-iframe');
  });

  it('Wraps the markdown in a div by default (block)', () => {
    renderView({ text: basicMarkdown });
    expect(document.querySelectorAll('div.spacing-tight').length).toEqual(1);
  });

  it('Wraps the markdown in a span when inline', () => {
    renderView({ text: basicMarkdown, inline: true });
    expect(document.querySelectorAll('span.spacing-tight').length).toEqual(1);
  });

  it('does not crash on a value-less attribute', () => {
    renderView({ text: `<h1 class />` });
    expect(document.querySelectorAll('h1').length).toEqual(1);
  });

  it('does not render id attributes on headers with the headerIds prop disabled', () => {
    renderView({
      text: basicMarkdown,
      headerIds: false,
    });
    expect(document.querySelector('h1')?.getAttribute('id')).toBeNull();
    expect(document.querySelector('h3')?.getAttribute('id')).toBeNull();
  });

  it('renders id attributes on headers by default', () => {
    renderView({ text: basicMarkdown });
    expect(document.querySelector('h1')?.getAttribute('id')).toEqual(
      'heading-heading-1'
    );
    expect(document.querySelector('h3')?.getAttribute('id')).toEqual(
      'heading-heading-3'
    );
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
        <strong {...props}>custom codeblock 1</strong>
      );

      const overrides = {
        CodeBlock: {
          component: CodeBlock,
        },
      };

      renderView({ text, overrides });
      const codeblockEl = screen.getByText('custom codeblock 1');

      expect(codeblockEl.getAttribute('language')!).toEqual('js');
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
        <div {...props}>custom codeblock 2</div>
      );

      const overrides = {
        CodeBlock: {
          component: CodeBlock,
        },
        code: {
          component: (props: React.HTMLProps<HTMLElement>) => (
            <strong {...props}>custom code snippet 1</strong>
          ),
        },
      };

      renderView({ text, overrides });
      screen.getByText('custom codeblock 2');
      screen.getByText('custom code snippet 1');
    });
  });

  it('Renders data attributes on the markdown wrapper', () => {
    renderView({
      text: basicMarkdown,
      'data-testid': 'cool',
    } as any);

    screen.getByTestId('cool');
  });

  it('Prevents errors on malformed image tags', () => {
    renderView({
      text: `<img src="http://google.com/"></img>`,
    });

    screen.getByRole('img');
  });

  it('renders a pausable image when the URL ends with .gif', async () => {
    renderView({
      text: `<img src="/image.gif"/>`,
    });

    // wait to find static image while loading pause ui
    screen.getByRole('img');
    // wait to find pause button
    await waitFor(() => screen.findByText('Pause animated image'));
  });

  it(`doesn't render a pausable image when the URL doesn't end with .gif`, async () => {
    renderView({
      text: `<img src="http://google.com/"/>`,
    });

    // wait to find static image while loading pause ui
    screen.getByRole('img');
    // wait to find pause button
    await waitFor(() =>
      expect(screen.queryByText('Pause animated image')).toBeNull()
    );
  });

  it('Allows passing in class names', () => {
    renderView({
      text: `<div class="narrative-table-container"> # Cool </div>`,
    });

    expect(
      document.querySelectorAll('div.narrative-table-container').length
    ).toEqual(1);
  });

  describe('Markdown anchor links', () => {
    it('Renders a link with text', () => {
      const text = '[link](/url)';
      const expectedText = `link`;
      expect(text).not.toEqual(expectedText);
      renderView({ text });
      screen.getByText(expectedText);
    });

    it('doesnt error on empty links', () => {
      const text = '[link]()';
      const expectedText = `link`;
      renderView({ text });
      screen.getByText(expectedText);
    });

    it('Adds rel="noopener" to external links', () => {
      renderView({
        text: `<a href="http://google.com">google</a>`,
      });

      expect(document.querySelectorAll('a[rel="noopener"]').length).toEqual(1);
    });

    it('Excludes target="_blank" from in-page links', () => {
      renderView({
        text: `<a href="#heading-one">heading</a>`,
      });
      expect(document.querySelectorAll('a').length).toEqual(1);
      expect(document.querySelectorAll('a[target="_blank"]').length).toEqual(0);
    });

    it('Allows onClicks callbacks', () => {
      const onClick = jest.fn();

      renderView({
        onAnchorClick: onClick,
        text: `<a data-testid="testLink" href="http://google.com">google</a>`,
      });

      act(() => {
        userEvent.click(screen.getByText('google'));
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
      renderView({ text, overrides });
      expect(document.querySelectorAll('strong').length).toEqual(1);
    });

    describe('Properties on overrides are handled', () => {
      type RenderedProps = {
        name?: string;
        isCodeBlock?: boolean;
        isWebBrowser?: boolean;
      };
      const renderedProps: jest.Mock<RenderedProps> = jest.fn();

      beforeEach(() => {
        const text = `
# Heading

<TestComponent name="my name" isCodeBlock="true" isWebBrowser />
        `;
        const TestComponent = (props: any) => {
          renderedProps(props);
          return <strong {...props}>attr-testing-component</strong>;
        };

        const overrides = {
          TestComponent: {
            component: TestComponent,
            allowedAttributes: ['name', 'isCodeBlock', 'isWebBrowser'],
          },
        };
        renderView({ text, overrides });
      });

      it('Allows passing in allowed attributes to overrides', () => {
        screen.getByText('attr-testing-component');
        expect(renderedProps.mock.calls[0][0].name).toEqual('my name');
      });

      it('coerces the string "true" into a boolean', () => {
        expect(renderedProps.mock.calls[0][0].isCodeBlock).toEqual(true);
      });

      it('defaults attributes without a value to true', () => {
        expect(renderedProps.mock.calls[0][0].isWebBrowser).toEqual(true);
      });

      it("doesn't wrap self closing elements in p tags", () => {
        expect(document.querySelectorAll('p > strong').length).toEqual(0);
      });
    });
  });

  describe('Replaces certain characters in the raw markdown before parsing', () => {
    it('replaces `&mdash;` with `---`', () => {
      const text = `This is some text with a &mdash; in the middle`;
      const expectedText = `This is some text with a \u2014 in the middle`;
      expect(text).not.toEqual(expectedText);
      renderView({ inline: true, text });
      screen.getByText(expectedText);
    });

    it('does not replace `&mdash;` with `---`', () => {
      const text = '`some code with a &mdash; in`';
      const expectedText = 'some code with a &mdash; in';
      renderView({ inline: true, text });
      screen.getByText(expectedText);
    });
  });

  describe('MarkdownCheckbox', () => {
    it('replaces checkbox inputs with the MarkdownCheckbox element', () => {
      renderView({
        text: checkboxMarkdown,
      });
      screen.getAllByTestId('gamut-md-checkbox');
    });

    it(`doesn't render bulletpoints for checkbox elements`, () => {
      renderView({
        text: ` - [ ] default checkbox
`,
      });

      expect(document.querySelector('li')?.getAttribute('class')).toBe(
        'checkbox-parent li'
      );
    });

    it('sets the default checked state correctly', () => {
      renderView({
        text: ` - [x] default checked checkbox
`,
      });

      expect(
        screen.getByTestId('gamut-md-checkbox')?.getAttribute('checked')
      ).toBe('');
    });

    it('allows elements to intersperse checkboxes', () => {
      renderView({
        text: `
- [ ] checkbox
an element
- [x] default checked checkbox
`,
      });
      expect(screen.getAllByTestId('gamut-md-checkbox').length).toEqual(2);
    });
  });
});
