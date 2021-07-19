import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { createPromise } from '../../utils/createPromise';
import { GridForm } from '..';
import {
  stubCheckboxField,
  stubFileField,
  stubHiddenField,
  stubRadioGroupField,
  stubSelectField,
  stubSelectOptions,
  stubSweetContainerField,
  stubTextareaField,
  stubTextField,
} from './stubs';

const fields = [stubCheckboxField, stubSelectField, stubTextField];

const renderView = setupRtl(GridForm, {
  fields,
  showRequired: false,
  submit: { type: 'fill', contents: <>Submit</>, size: 6 },
});

describe('GridForm', () => {
  it('submits the form when all inputs are filled out', async () => {
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);
    const selectValue = stubSelectOptions[1];
    const textValue = 'Hooray!';

    const { view } = renderView({ onSubmit });

    const checkboxField = view.getByRole('checkbox', {
      name: 'Stub Checkbox Check me!',
    });
    const selectField = view.getByRole('combobox', { name: 'Stub Select' });
    const textField = view.getByRole('textbox', { name: 'Stub Text' });

    const newValues = [
      [selectField, selectValue],
      [textField, textValue],
    ];

    fireEvent.click(checkboxField);

    fireEvent.input(textField, {
      target: {
        value: textValue,
      },
    });

    fireEvent.input(selectField, {
      target: {
        value: selectValue,
      },
    });

    await act(async () => {
      fireEvent.submit(view.getByRole('button'));

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
