import React from 'react';
import { shallow } from 'enzyme';
import Tab from '..';
const shallowTab = customProps => {
  const props = {
    id: '0',
    tabIndex: 0,
    ...customProps,
  };
  const onChange = jest.fn();
  const component = shallow(
    React.createElement(
      Tab,
      Object.assign({ onChange: onChange }, props),
      React.createElement('span', null)
    )
  );
  return { onChange, component };
};
describe('Tab', () => {
  it('does nothing when clicked while disabled', () => {
    const { onChange, component } = shallowTab({
      disabled: true,
    });
    component.find('a').simulate('click', {
      preventDefault: jest.fn(),
    });
    expect(onChange).not.toHaveBeenCalled();
  });
  it('does nothing when the enter key is pressed while disabled', () => {
    const { onChange, component } = shallowTab({
      disabled: true,
    });
    component.find('a').simulate('keydown', {
      key: 'Enter',
      preventDefault: jest.fn(),
    });
    expect(onChange).not.toHaveBeenCalled();
  });
  it('has a tabIndex of -1 when disabled', () => {
    const { component } = shallowTab({
      disabled: true,
    });
    const tabIndex = component.find('a').prop('tabIndex');
    expect(tabIndex).toBe(-1);
  });
  it('calls onChange when clicked while enabled', () => {
    const { onChange, component } = shallowTab({
      disabled: false,
    });
    component.find('a').simulate('click', {
      preventDefault: jest.fn(),
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it('calls onChange when the enter key is pressed while enabled', () => {
    const { onChange, component } = shallowTab({
      disabled: false,
    });
    component.find('a').simulate('keydown', {
      key: 'Enter',
      preventDefault: jest.fn(),
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
  it('has a tabIndex of 0 when enabled', () => {
    const { component } = shallowTab({
      disabled: false,
    });
    const tabIndex = component.find('a').prop('tabIndex');
    expect(tabIndex).toBe(0);
  });
});
//# sourceMappingURL=Tab-test.js.map
