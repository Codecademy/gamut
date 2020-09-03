import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { AccordionArea, AccordionAreaProps } from '..';

const renderComponent = (overrides: Partial<AccordionAreaProps> = {}) => {
  const props = {
    children: <div data-testid="contents" />,
    expanded: false,
    top: 'Click me!',
    ...overrides,
  } as const;

  return mount(<AccordionArea {...props} />);
};

jest.useFakeTimers();

describe('AccordionArea', () => {
  it('starts collapsed when expanded is not true', () => {
    const wrapper = renderComponent({ expanded: false });

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(0);
  });

  it('starts expanded when expanded is true', () => {
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
