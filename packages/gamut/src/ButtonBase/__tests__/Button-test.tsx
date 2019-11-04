import React from 'react';
import { shallow } from 'enzyme';
import ButtonBase from '../index';

describe('<ButtonBase>', () => {
  it('allows passing an id through props', () => {
    const wrapper = shallow(<ButtonBase id="awesome" />);
    expect(wrapper.find('#awesome').length).toEqual(1);
  });

  it('uses an <a> tag when you pass in an href', () => {
    const wrapper = shallow(<ButtonBase href="/awesome" />);
    expect(wrapper.find('a').length).toEqual(1);
  });

  it('uses a button tag when you omit an href', () => {
    const wrapper = shallow(<ButtonBase />);
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('allows a component override when passed through the As prop', () => {
    const wrapper = shallow(<ButtonBase as="div" />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('combines a passed down className with the default button styles', () => {
    const wrapper = shallow(<ButtonBase className="myCoolStyle" />);
    expect(wrapper.prop('className')).toBe('basicBtn myCoolStyle');
  });

  it('combines a passed down className with the default button styles for a link element', () => {
    const wrapper = shallow(<ButtonBase href="#" className="myCoolStyle" />);
    expect(wrapper.prop('className')).toBe('basicBtn myCoolStyle');
  });

  it('uses basic reset styles for a button + reset styles for a link if you pass in a link prop', () => {
    const wrapper = shallow(<ButtonBase link className="myCoolStyle" />);
    expect(wrapper.prop('className')).toBe('basicBtn myCoolStyle basicLink');
  });
});
