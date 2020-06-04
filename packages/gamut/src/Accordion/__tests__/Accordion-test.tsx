import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import Accordion, { AccordionProps } from '..';

const renderComponent = (overrides: Partial<AccordionProps> = {}) => {
  const props = {
    children: <div data-testid="contents" />,
    header: 'Click me!',
    onChange: jest.fn(),
    theme: 'blue',
    ...overrides,
  } as const;

  const wrapper = mount(<Accordion {...props} />);

  return { props, wrapper };
};

jest.useFakeTimers();

describe('Accordion', () => {
  it('starts collapsed when initiallyExpanded is not true', () => {
    const { wrapper } = renderComponent({ initiallyExpanded: false });

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(0);
  });

  it('starts expanded when initiallyExpanded is true', () => {
    const { wrapper } = renderComponent({ initiallyExpanded: true });

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(1);
  });

  it('expands when clicked to expand', () => {
    const { wrapper } = renderComponent();

    wrapper.find('button').simulate('click');

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(1);
  });

  it('contracts after a delay when clicked to contract', async () => {
    const { wrapper } = renderComponent();
    wrapper.find('button').simulate('click');

    wrapper.find('button').simulate('click');
    await act(async () => {
      jest.runAllTimers();
    });
    wrapper.setProps(wrapper.props());

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(0);
  });

  it('renders children with the expanded prop when children is a functino', () => {
    const {
      props: { header },
      wrapper,
    } = renderComponent({
      children: (value) => `${value}`,
      initiallyExpanded: true,
    });

    expect(wrapper.text()).toEqual(`${header}Chevron Down Icon${true}`);
  });
});
