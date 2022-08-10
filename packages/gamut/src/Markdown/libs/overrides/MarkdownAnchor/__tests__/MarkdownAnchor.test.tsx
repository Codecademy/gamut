/* eslint-disable jsx-a11y/no-distracting-elements */

import { setupEnzyme } from '@codecademy/gamut-tests';

import { MarkdownAnchor } from '../index';

const renderWrapper = setupEnzyme(MarkdownAnchor);

describe('MarkdownAnchor', () => {
  it('Adds target _blank to external links', () => {
    const { wrapper } = renderWrapper({ href: 'http://google.com' });
    expect(wrapper.find('a[target="_blank"]').length).toEqual(1);
  });

  it('Adds target _blank to same-origin links', () => {
    const { wrapper } = renderWrapper({
      href: `${window.location.origin}/search`,
    });
    expect(wrapper.find('a[target="_blank"]').length).toEqual(1);
  });

  it('Adds rel="noopener" to external links', () => {
    const { wrapper } = renderWrapper({ href: 'http://google.com' });
    expect(wrapper.find('a[rel="noopener"]').length).toEqual(1);
  });

  it('Doesn\'t add rel="noopener" to relative links', () => {
    const { wrapper } = renderWrapper({ href: '/search' });
    expect(wrapper.find('a[rel]').length).toEqual(0);
  });

  it('Doesn\'t add rel="noopener" to same-origin links', () => {
    const { wrapper } = renderWrapper({
      href: `${window.location.origin}/search`,
    });
    expect(wrapper.find('a[rel]').length).toEqual(0);
  });

  it("Doesn't throw an error on an invalid URL", () => {
    const { wrapper } = renderWrapper({ href: 'www.codecademy.com' });
    expect(wrapper.find(`a[href='www.codecademy.com']`).length).toEqual(1);
  });

  it('renders its children', () => {
    const text = 'natalie rulez';

    const { wrapper } = renderWrapper({ href: '/', children: text });

    expect(wrapper.text()).toEqual(text);
  });
});
