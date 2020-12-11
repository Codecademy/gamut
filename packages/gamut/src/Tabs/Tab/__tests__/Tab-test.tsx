import { mount } from 'enzyme';
import React from 'react';

import { Tab, TabProps } from '..';

const mountTab = (customProps: Partial<TabProps>) => {
  const props = {
    id: '0',
    tabIndex: 0,
    ...customProps,
  };
  const onChange = jest.fn();
  const component = mount(
    <Tab onChange={onChange} {...props}>
      <span />
    </Tab>
  );

  return { onChange, component };
};

describe('Tab', () => {
  it('does nothing when clicked while disabled', () => {
    const { onChange, component } = mountTab({
      disabled: true,
    });

    component.find('button').simulate('click', {
      preventDefault: jest.fn(),
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('does nothing when the enter key is pressed while disabled', () => {
    const { onChange, component } = mountTab({
      disabled: true,
    });

    component.find('button').simulate('keydown', {
      key: 'Enter',
      preventDefault: jest.fn(),
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('has a tabIndex of -1 when disabled', () => {
    const { component } = mountTab({
      disabled: true,
    });

    const tabIndex = component.find('button').prop('tabIndex');

    expect(tabIndex).toBe(-1);
  });

  it('calls onChange when clicked while enabled', () => {
    const { onChange, component } = mountTab({
      disabled: false,
    });

    component.find('button').simulate('click', {
      preventDefault: jest.fn(),
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when the enter key is pressed while enabled', () => {
    const { onChange, component } = mountTab({
      disabled: false,
    });

    component.find('button').simulate('keydown', {
      key: 'Enter',
      preventDefault: jest.fn(),
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('has a tabIndex of 0 when enabled', () => {
    const { component } = mountTab({
      disabled: false,
    });

    const tabIndex = component.find('button').prop('tabIndex');

    expect(tabIndex).toBe(0);
  });
});
