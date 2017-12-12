import React from 'react';
import { shallow } from 'enzyme';
import Button from '../index';

describe('<Button>', () => {
  it('allows passing an id through props', () => {
    const wrapper = shallow(<Button id="awesome" />);
    expect(wrapper.find('#awesome').length).toEqual(1);
  });

  it('uses an <a> tag when you pass in an href', () => {
    const wrapper = shallow(<Button href="/awesome" />);
    expect(wrapper.find('a').length).toEqual(1);
  });

  it('uses a <button> tag when you omit an href', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find('button').length).toEqual(1);
  });
});
