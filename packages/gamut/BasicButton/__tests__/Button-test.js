import React from 'react';
import { shallow } from 'enzyme';
import BasicButton from '../index';

describe('<BasicButton>', () => {
  it('allows passing an id through props', () => {
    const wrapper = shallow(<BasicButton id="awesome" />);
    expect(wrapper.find('#awesome').length).toEqual(1);
  });

  it('uses an <a> tag when you pass in an href', () => {
    const wrapper = shallow(<BasicButton href="/awesome" />);
    expect(wrapper.find('a').length).toEqual(1);
  });

  it('uses a <BasicButton> tag when you omit an href', () => {
    const wrapper = shallow(<BasicButton />);
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('combines a passed down className with the default button styles', () => {
    const wrapper = shallow(<BasicButton className="myCoolStyle" />);
    expect(wrapper.prop('className')).toBe('basicBtn myCoolStyle');
  });

  it('combines a passed down className with the default button styles for a link element', () => {
    const wrapper = shallow(<BasicButton href="#" className="myCoolStyle" />);
    expect(wrapper.prop('className')).toBe('basicBtn myCoolStyle');
  });

  it('uses basic styles for a link if you pass in a link prop', () => {
    const wrapper = shallow(<BasicButton link className="myCoolStyle" />);
    expect(wrapper.prop('className')).toBe('basicLink myCoolStyle');
  });
});
