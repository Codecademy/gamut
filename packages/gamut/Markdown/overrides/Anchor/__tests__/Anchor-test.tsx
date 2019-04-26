/* eslint-disable jsx-a11y/no-distracting-elements */

import React from 'react';
import { mount, shallow } from 'enzyme';
import Anchor from '../index';

describe('<Anchor />', () => {
  it('Adds target _blank to external links', () => {
    const anchor = mount(<Anchor href="http://google.com" />);
    expect(anchor.find('a[target="_blank"]').length).toEqual(1);
  });

  it('Adds target _blank to same-origin links', () => {
    const anchor = mount(<Anchor href={`${window.location.origin}/search`} />);
    expect(anchor.find('a[target="_blank"]').length).toEqual(1);
  });

  it('Adds rel="noopener noreferrer" to external links', () => {
    const anchor = mount(<Anchor href="http://google.com" />);
    expect(anchor.find('a[rel="noopener noreferrer"]').length).toEqual(1);
  });

  it('Doesn\'t add rel="noopener noreferrer" to relative links', () => {
    const anchor = mount(<Anchor href="/search" />);
    expect(anchor.find('a[rel]').length).toEqual(0);
  });

  it('Doesn\'t add rel="noopener noreferrer" to same-origin links', () => {
    const anchor = mount(<Anchor href={`${window.location.origin}/search`} />);
    expect(anchor.find('a[rel]').length).toEqual(0);
  });

  it("Doesn't throw an error on an invalid URL", () => {
    const anchor = shallow(<Anchor href="www.codecademy.com" />);
    expect(anchor.html()).toEqual('');
    expect(anchor.find(`a[href='www.codecademy.com"']`).length).toEqual(1);
  });
});
