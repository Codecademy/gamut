import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import InputStepper, { InputStepperProps } from '..';

const renderStepper = (optOverrides?: Partial<InputStepperProps>) => {
  const opts = {
    label: '',
    value: 0,
    ariaLabel: '',
    ...optOverrides,
  };
  const wrapper = mount(
    <InputStepper {...opts} onChange={v => onChange(v, wrapper)} />
  );

  return wrapper;
};

const onChange = (value: number, wrapper: ReactWrapper) => {
  wrapper.setProps({ value: value });
};

/**
 * wrapper around the enzyme weirdness that is required for handling
 * change events; the initial reference to the field does not get
 * updated by the change event, so we have to find it again in order
 * to actually check that the value changed
 */
const changeValue = (value: number, wrapper: ReactWrapper) => {
  const fieldBefore = wrapper.find('input');
  fieldBefore.simulate('change', { target: { value: value } });

  const fieldAfter = wrapper.find('input');
  return fieldAfter;
};

describe('InputStepper', () => {
  it('handles initially out of bounds data', () => {
    const wrapper = renderStepper({ min: 2, max: 4, value: 6 });
    const field = wrapper.find('input');
    expect(field.props().value).toEqual(4);
  });

  it('handles out of bounds data after a change', () => {
    const wrapper = renderStepper({ min: 2, max: 4, value: 3 });
    const field = changeValue(1, wrapper);
    expect(field.props().value).toEqual(2);
  });

  it('handles a non-specified min', () => {
    const wrapper = renderStepper({ max: 10, value: -1 });
    const field = wrapper.find('input');
    expect(field.props().value).toEqual(0);
  });

  it('handles a non-specified max', () => {
    const wrapper = renderStepper({ min: 2, value: 8 });
    const field = wrapper.find('input');
    expect(field.props().value).toEqual(8);
  });

  it('handles a negative min', () => {
    const wrapper = renderStepper({ min: -2, max: 10, value: -1 });
    const field = wrapper.find('input');
    expect(field.props().value).toEqual(-1);
  });

  it('handles a negative max', () => {
    const wrapper = renderStepper({ min: -8, max: -2, value: -1 });
    const field = wrapper.find('input');
    expect(field.props().value).toEqual(-2);
  });
});
