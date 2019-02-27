import React from 'react';
import { shallow } from 'enzyme';

import Tab from '../';

const shallowTab = ({ isDisabled }) => {
  const onChange = jest.fn();
  const tab = shallow(
    <Tab isDisabled={isDisabled} onChange={onChange}>
      <span />
    </Tab>
  );

  return { onChange, tab };
};

describe('Tab', () => {
  it('does nothing when clicked while disabled', () => {
    const { onChange, tab } = shallowTab({
      isDisabled: true,
    });

    tab.find('a').simulate('click');

    expect(onChange).not.toHaveBeenCalled();
  });

  it('does nothing when the enter key is pressed while disabled', () => {
    const { onChange, tab } = shallowTab({
      isDisabled: true,
    });

    tab.find('a').simulate('keydown', {
      key: 'Enter',
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('has a tabIndex of -1 when disabled', () => {
    const { tab } = shallowTab({
      isDisabled: true,
    });

    const tabIndex = tab.find('a').prop('tabIndex');

    expect(tabIndex).toBe(-1);
  });

  it('calls onChange when clicked while enabled', () => {
    const { onChange, tab } = shallowTab({
      isDisabled: false,
    });

    tab.find('a').simulate('click');

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when the enter key is pressed while enabled', () => {
    const { onChange, tab } = shallowTab({
      isDisabled: false,
    });

    tab.find('a').simulate('keydown', {
      key: 'Enter',
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('has a tabIndex of 0 when enabled', () => {
    const { tab } = shallowTab({
      isDisabled: false,
    });

    const tabIndex = tab.find('a').prop('tabIndex');

    expect(tabIndex).toBe(0);
  });
});
