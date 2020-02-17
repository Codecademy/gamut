import { mount } from 'enzyme';
import React from 'react';

import GridForm from '..';
import { stubSelectField, stubTextField } from './stubs';

describe('GridForm', () => {
  it('submits the form when all inputs are filled out', async () => {
    const fields = [stubSelectField, stubTextField];
    const onSubmit = jest.fn();
    const selectValue = stubSelectField.options[1];
    const textValue = 'Hooray!';

    const wrapped = mount(
      <GridForm
        fields={fields}
        onSubmit={onSubmit}
        submit={{ children: <>Submit</> }}
      />
    );

    wrapped
      .find('select')
      .simulate('change', { target: { value: selectValue } });

    wrapped
      .find('input[type="text"]')
      .simulate('change', { target: { value: textValue } });

    wrapped.find('button[type="submit"]').simulate('click');

    // Todo: why is this not working...?
    wrapped.update();
    wrapped.setProps(wrapped.props());
    wrapped.update();
    wrapped.setProps(wrapped.props());

    expect(onSubmit).toHaveBeenLastCalledWith({
      [stubSelectField.name]: selectValue,
      [stubTextField.name]: textValue,
    });
  });
});
