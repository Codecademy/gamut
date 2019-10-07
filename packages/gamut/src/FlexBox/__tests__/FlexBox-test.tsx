import React from 'react';
import { mount } from 'enzyme';
import { Item as FlexBox } from '../index';

describe('<FlexBox>', () => {
  it('renders a standard div by default', () => {
    const wrapper = mount(<FlexBox />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('takes a string tag name for the `as` prop', () => {
    const wrapper = mount(<FlexBox as="button" />);
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('takes a component for the `as` prop', () => {
    const Heading = () => <span></span>;
    const wrapper = mount(<FlexBox as={Heading} />);
    expect(wrapper.find(Heading).length).toEqual(1);
  });

  it('applies all padding classes', () => {
    const wrapper = mount(
      <FlexBox p={1} pt={1} pb={1} pr={1} pl={1} px={1} py={1} />
    );
    expect(
      wrapper.find('div.p_1.pt_1.pb_1.pr_1.pl_1.px_1.py_1').length
    ).toEqual(1);
  });

  it('applies all margin classes', () => {
    const wrapper = mount(
      <FlexBox m={1} mt={1} mb={1} mr={1} ml={1} mx={1} my={1} />
    );
    expect(
      wrapper.find('div.m_1.mt_1.mb_1.mr_1.ml_1.mx_1.my_1').length
    ).toEqual(1);
  });
});
