/* eslint-disable jsx-a11y/no-distracting-elements */

import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Markdown } from '../index';

/**
 * NOTE: These tests are split to speed up performance in CI
 */

describe('<Markdown /> Overrides', () => {
  describe('Markdown anchor links', () => {
    it('Renders a link with text', () => {
      const text = '[link](/url)';
      const expectedText = `link`;
      expect(text).not.toEqual(expectedText);
      const markdown = mount(<Markdown text={text} />);
      expect(markdown.text().trim()).toEqual(expectedText);
    });

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
