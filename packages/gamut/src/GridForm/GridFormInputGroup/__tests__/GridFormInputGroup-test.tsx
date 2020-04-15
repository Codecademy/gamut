import { mount } from 'enzyme';
import React from 'react';

import {
  stubFileField,
  stubSelectField,
  stubTextField,
  stubTextareaField,
  stubCheckboxField,
} from '../../__tests__/stubs';
import GridFormInputGroup, { GridFormInputGroupProps } from '..';

const renderComponent = (overrides: Partial<GridFormInputGroupProps>) => {
  const props = {
    field: stubSelectField,
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
});
