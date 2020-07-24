import { mount } from 'enzyme';
import React from 'react';

import AccordionButton from '..';

describe('AccordionButton', () => {
  it('fires onClick when clicked', () => {
    const onClick = jest.fn();
    const wrapped = mount(
      <AccordionButton onClick={onClick} size="normal" theme="yellow">
        Hi there!
      </AccordionButton>
    );

    wrapped.find('button').simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a blue button when the theme is blue', () => {
    const wrapped = mount(
      <AccordionButton onClick={jest.fn()} size="normal" theme="blue">
        Hi there!
      </AccordionButton>
    );

    const rootClassName = wrapped.childAt(0).prop('className');

    expect(rootClassName).toMatch(new RegExp(`(.+) blue`));
  });

  it('renders a plain button when the theme is plain', () => {
    const wrapped = mount(
      <AccordionButton onClick={jest.fn()} size="normal" theme="plain">
        Hi there!
      </AccordionButton>
    );

    const rootClassName = wrapped.childAt(0).prop('className');

    expect(rootClassName).toMatch(new RegExp(`(.+) plain`));
  });

  it('renders a yellow button when the theme is yellow', () => {
    const wrapped = mount(
      <AccordionButton onClick={jest.fn()} size="normal" theme="yellow">
        Hi there!
      </AccordionButton>
    );

    const rootClassName = wrapped.childAt(0).prop('className');

    expect(rootClassName).toMatch(new RegExp(`(.+) yellow`));
  });
});
