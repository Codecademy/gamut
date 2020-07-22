/* eslint-disable jsx-a11y/no-distracting-elements */

import React from 'react';
import { mount } from 'enzyme';
import MarkdownAnchor from '../index';

describe('MarkdownAnchor', () => {
  it('Adds target _blank to external links', () => {
    const anchor = mount(<MarkdownAnchor href="http://google.com" />);
    expect(anchor.find('a[target="_blank"]').length).toEqual(1);
  });

  it('Adds target _blank to same-origin links', () => {
    const anchor = mount(
      <MarkdownAnchor href={`${window.location.origin}/search`} />
    );
    expect(anchor.find('a[target="_blank"]').length).toEqual(1);
  });

  it('Adds rel="noopener" to external links', () => {
    const anchor = mount(<MarkdownAnchor href="http://google.com" />);
    expect(anchor.find('a[rel="noopener"]').length).toEqual(1);
  });

  it('Doesn\'t add rel="noopener" to relative links', () => {
    const anchor = mount(<MarkdownAnchor href="/search" />);
    expect(anchor.find('a[rel]').length).toEqual(0);
  });

  it('Doesn\'t add rel="noopener" to same-origin links', () => {
    const anchor = mount(
      <MarkdownAnchor href={`${window.location.origin}/search`} />
    );
    expect(anchor.find('a[rel]').length).toEqual(0);
  });

  it("Doesn't throw an error on an invalid URL", () => {
    const anchor = mount(<MarkdownAnchor href="www.codecademy.com" />);
    expect(anchor.find(`a[href='www.codecademy.com']`).length).toEqual(1);
  });
});
