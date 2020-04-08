import { mount } from 'enzyme';
import React from 'react';

import { stubSelectField, stubTextField } from '../../__tests__/stubs';
import GridFormInputGroup, { GridFormInputGroupProps } from '..';

const renderComponent = (overrides: Partial<GridFormInputGroupProps>) => {
  const props = {
    field: stubSelectField,
    register: jest.fn(),
    setValue: jest.fn(),
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
});
