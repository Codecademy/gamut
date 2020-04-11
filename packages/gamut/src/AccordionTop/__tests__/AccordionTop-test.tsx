import { mount } from 'enzyme';
import React from 'react';

import AccordionTop from '..';

describe('AccordionTop', () => {
  it('fires onClick when clicked', () => {
    const onClick = jest.fn();
    const wrapped = mount(
      <AccordionTop onClick={onClick} theme="yellow"></AccordionTop>
    );

    wrapped.find('button').simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a blue button when the theme is blue', () => {
    const wrapped = mount(
      <AccordionTop onClick={jest.fn()} theme="blue"></AccordionTop>
    );

    const rootClassName = wrapped.childAt(0).prop('className');

    expect(rootClassName).toMatch(new RegExp(`(.+) blue`));
  });

  it('renders a plain button when the theme is plain', () => {
    const wrapped = mount(
      <AccordionTop onClick={jest.fn()} theme="plain"></AccordionTop>
    );

    const rootClassName = wrapped.childAt(0).prop('className');

    expect(rootClassName).toMatch(new RegExp(`(.+) plain`));
  });

  it('renders a yellow button when the theme is yellow', () => {
    const wrapped = mount(
      <AccordionTop onClick={jest.fn()} theme="yellow"></AccordionTop>
    );

    const rootClassName = wrapped.childAt(0).prop('className');

    expect(rootClassName).toMatch(new RegExp(`(.+) yellow`));
  });
});
