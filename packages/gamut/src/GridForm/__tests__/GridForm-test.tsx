import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { createPromise } from '../../utils/createPromise';
import GridForm from '..';
import { stubSelectField, stubSelectOptions, stubTextField } from './stubs';

describe('GridForm', () => {
  it('submits the form when all inputs are filled out', async () => {
    const fields = [stubSelectField, stubTextField];
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);
    const selectValue = stubSelectOptions[1];
    const textValue = 'Hooray!';

    const wrapped = mount(
      <GridForm
        fields={fields}
        onSubmit={onSubmit}
        submit={{ contents: <>Submit</> }}
      />
    );

    wrapped
      .find('select')
      .simulate('change', { target: { value: selectValue } });

    wrapped
      .find('input[type="text"]')
      .simulate('change', { target: { value: textValue } });

    wrapped.setProps(wrapped.props());

    await act(async () => {
      wrapped.find('form').simulate('submit');
      await api.innerPromise;
    });

    const result = await api.innerPromise;

    expect(result).toEqual({
      [stubSelectField.name]: selectValue,
      [stubTextField.name]: textValue,
    });
  });
});
