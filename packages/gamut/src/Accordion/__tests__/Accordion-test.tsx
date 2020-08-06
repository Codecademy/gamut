import { mount } from 'enzyme';
import React from 'react';

import Accordion, { AccordionProps } from '..';

const renderComponent = (overrides: Partial<AccordionProps> = {}) => {
  const props = {
    children: <div data-testid="contents" />,
    expanded: false,
    top: 'Click me!',
    ...overrides,
  } as const;

  return mount(<Accordion {...props} />);
};

jest.useFakeTimers();

describe('Accordion', () => {
  it('starts collapsed when initiallyExpanded is not true', () => {
    const wrapper = renderComponent({ initiallyExpanded: false });

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(0);
  });

  it('starts expanded when initiallyExpanded is true', () => {
    const wrapper = renderComponent({ initiallyExpanded: true });

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(1);
  });

  it('expands when its button is clicked', () => {
    const wrapper = renderComponent({ initiallyExpanded: true });

    wrapper.find('button').simulate('click');

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(1);
  });
});
