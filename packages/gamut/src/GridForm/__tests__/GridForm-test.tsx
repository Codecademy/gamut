import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { createPromise } from '../../utils/createPromise';
import GridForm from '..';
import { stubCheckboxField, stubSelectField, stubTextField } from './stubs';

describe('GridForm', () => {
  it('submits the form when all inputs are filled out', async () => {
    const fields = [stubCheckboxField, stubSelectField, stubTextField];
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);
    const selectValue = stubSelectField.options[1];
    const textValue = 'Hooray!';

    const wrapped = mount(
      <GridForm
        fields={fields}
        onSubmit={onSubmit}
        submit={{ contents: <>Submit</> }}
      />
    );

    const newValues = [
      ['input[type="checkbox"]', 'checked', true],
      ['select', 'value', selectValue],
      ['input[type="text"]', 'value', textValue],
    ] as const;

    await act(async () => {
      for (const [selector, key, value] of newValues) {
        // https://github.com/react-hook-form/react-hook-form/issues/1382
        const node = wrapped.find(selector).getDOMNode();
        (node as any)[key] = value;
        node.dispatchEvent(new Event('input'));
      }
    });

    wrapped.setProps(wrapped.props());

    await act(async () => {
      wrapped.find('form').simulate('submit');
      await api.innerPromise;
    });

    const result = await api.innerPromise;

    expect(result).toEqual({
      [stubCheckboxField.name]: true,
      [stubSelectField.name]: selectValue,
      [stubTextField.name]: textValue,
    });
  });
});
