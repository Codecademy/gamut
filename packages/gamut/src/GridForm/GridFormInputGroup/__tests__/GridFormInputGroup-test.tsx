import { mount } from 'enzyme';
import React from 'react';

import {
  stubFileField,
  stubRadioGroupField,
  stubSelectField,
  stubTextField,
  stubTextareaField,
  stubCheckboxField,
} from '../../__tests__/stubs';
import GridFormInputGroup, { GridFormInputGroupProps } from '..';

const renderComponent = (overrides: Partial<GridFormInputGroupProps>) => {
  const props = {
    field: stubSelectField,
    setValue: jest.fn(),
    register: jest.fn(),
    ...overrides,
  };

  const wrapped = mount(<GridFormInputGroup {...props} />);

  return { props, wrapped };
};

describe('GridFormInputGroup', () => {
  it('renders error text when an error exists', () => {
    const error = 'Oh no!';

    const { wrapped } = renderComponent({ error });

    expect(wrapped.text()).toContain(error);
  });

  it('renders a checkbox input when the field type is checkbox', () => {
    const { wrapped } = renderComponent({
      field: stubCheckboxField,
    });

    expect(wrapped.find('input[type="checkbox"]')).toHaveLength(1);
  });

  it('renders a custom input when the field type is custom', () => {
    const text = 'Hello, world!';
    const { wrapped } = renderComponent({
      field: {
        render: () => text,
        name: 'stub-custom',
        type: 'custom',
      },
    });

    expect(wrapped.text()).toEqual(text);
  });

  it('renders a radio group when the field type is radio-group', () => {
    const { wrapped } = renderComponent({
      field: stubRadioGroupField,
    });

    expect(wrapped.find('input[type="radio"]')).toHaveLength(2);
  });

  it('renders a select when the field type is select', () => {
    const { wrapped } = renderComponent({
      field: stubSelectField,
    });

    expect(wrapped.find('select')).toHaveLength(1);
  });

  it('renders a text input when the field type is text', () => {
    const { wrapped } = renderComponent({
      field: stubTextField,
    });

    expect(wrapped.find('input[type="text"]')).toHaveLength(1);
  });

  it('renders a file input when the field type is file', () => {
    const { wrapped } = renderComponent({
      field: stubFileField,
    });

    expect(wrapped.find('input[type="file"]')).toHaveLength(1);
  });

  it('renders a textarea when the field type is textarea', () => {
    const { wrapped } = renderComponent({
      field: stubTextareaField,
    });

    expect(wrapped.find('textarea')).toHaveLength(1);
  });

  it('invokes onUpdate when the field type is text and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = 'foo';

    const { wrapped } = renderComponent({
      field: { ...stubTextField, onUpdate: onUpdateSpy },
    });

    wrapped
      .find('input[type="text"]')
      .simulate('change', { target: { value: newVal } });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('invokes onUpdate when the field type is textera and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = 'foo';

    const { wrapped } = renderComponent({
      field: { ...stubTextareaField, onUpdate: onUpdateSpy },
    });

    wrapped.find('textarea').simulate('change', { target: { value: newVal } });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('invokes onUpdate when the field type is select and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = 'foo';

    const { wrapped } = renderComponent({
      field: { ...stubSelectField, onUpdate: onUpdateSpy },
    });

    wrapped.find('select').simulate('change', { target: { value: newVal } });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('invokes onUpdate when the field type is checkbox and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = true;

    const { wrapped } = renderComponent({
      field: { ...stubCheckboxField, onUpdate: onUpdateSpy },
    });

    wrapped
      .find('input[type="checkbox"]')
      .simulate('change', { target: { checked: newVal } });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('invokes onUpdate when the field type is file and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = ['I swear this is a file'];

    const { wrapped } = renderComponent({
      field: { ...stubFileField, onUpdate: onUpdateSpy },
    });

    wrapped
      .find('input[type="file"]')
      .simulate('change', { target: { files: newVal } });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });
});
