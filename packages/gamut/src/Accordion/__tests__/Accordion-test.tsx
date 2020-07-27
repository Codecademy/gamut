import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

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
    const wrapper = renderComponent({ expanded: false });

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(0);
  });

  it('starts expanded when initiallyExpanded is true', () => {
    const wrapper = renderComponent({ expanded: true });

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(1);
  });

  it('expands when props change to expand', () => {
    const wrapper = renderComponent({ expanded: false });

    wrapper.setProps({ expanded: true });

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(1);
  });

  it('contracts after a delay when set to not expanded after being expanded', async () => {
    const wrapper = renderComponent({ expanded: true });

    wrapper.setProps({ expanded: false });
    await act(async () => {
      jest.runAllTimers();
    });
    wrapper.setProps(wrapper.props());

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(0);
  });
});
