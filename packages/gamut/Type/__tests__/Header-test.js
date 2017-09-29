import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

describe('<Header>', () => {

  const wrapper = shallow(
    <Header />
  );

  const wrapperWithSize = shallow(
    <Header size={2} />
  );

  it('renders h1 when no size provided', () => {
    expect(wrapper.find('h1').length).toBe(1);
  });

  it('renders h2 when size 2 is provided', () => {
    expect(wrapperWithSize.find('h2').length).toBe(1);
  });
});
