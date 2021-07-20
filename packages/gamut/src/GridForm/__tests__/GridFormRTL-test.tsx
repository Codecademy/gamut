import { theme } from '@codecademy/gamut-styles';
import { setupRtl } from '@codecademy/gamut-tests';
import { ThemeProvider } from '@emotion/react';
import { fireEvent } from '@testing-library/dom';
import { act, render, screen } from '@testing-library/react';
import React from 'react';

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
    ] as const;

    fireEvent.click(checkboxField);

    for (const [selector, value] of newValues) {
      fireEvent.input(selector, {
        target: {
          value,
        },
      });
    }

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

  it('only sets aria-live prop on the first validation error in a form', async () => {
    const fields = [
      { ...stubTextField, validation: { required: 'Please enter text' } },
      {
        ...stubTextField,
        validation: { required: 'Please enter second text' },
        name: 'second-stub',
      },
    ];
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);
    const { view } = renderView({ fields, onSubmit });

    await act(async () => {
      fireEvent.click(view.getByRole('button'));
    });

    // there should only be a single "assertive" error from the form submission
    expect(await view.queryAllByRole('alert').length).toBe(1);
    expect(await view.queryAllByRole('status').length).toBe(1);
  });

  describe('when "onSubmit" validation is selected', () => {
    it('sets aria-required to true', () => {
      const fields = [
        { ...stubTextField, validation: { required: 'Please enter text' } },
      ];
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);

      const { view } = renderView({ fields, onSubmit });
      const textField = view.getByRole('textbox');

      expect(textField).toHaveAttribute('aria-required');
    });

    it('never disables the submit button', () => {
      const fields = [
        { ...stubTextField, validation: { required: 'Please enter text' } },
      ];
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);

      const { view } = renderView({ fields, onSubmit });
      const submitButton = view.getByRole('button');

      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('when "onChange" validation is selected', () => {
    it('sets aria-required to true ', () => {
      const fields = [
        { ...stubTextField, validation: { required: 'Please enter text' } },
      ];
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);

      const { view } = renderView({ fields, onSubmit, validation: 'onChange' });
      const textField = view.getByRole('textbox');

      expect(textField).toHaveAttribute('aria-required');
    });

    it('disables the submit button when required fields are incomplete', async () => {
      const fields = [
        { ...stubTextField, validation: { required: 'Please enter text' } },
      ];
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);

      const { view } = renderView({
        fields,
        onSubmit,
        validation: 'onChange',
      });

      const textField = view.getByRole('textbox', { name: 'Stub Text' });

      await act(async () => {
        fireEvent.input(textField, {
          target: {
            value: '',
          },
        });
      });

      const submitButton = view.getByRole('button');
      expect(submitButton).toBeDisabled();
    });

    it('enables the submit button after the required fields are completed', async () => {
      const fields = [
        { ...stubTextField, validation: { required: 'Please enter text' } },
      ];
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);

      const { view } = renderView({
        fields,
        onSubmit,
        validation: 'onChange',
      });

      const textField = view.getByRole('textbox', { name: 'Stub Text' });

      await act(async () => {
        fireEvent.input(textField, {
          target: {
            value: 'an arbitrary value',
          },
        });
      });

      const submitButton = view.getByRole('button');
      expect(submitButton).not.toBeDisabled();
      expect(textField).toHaveAttribute('aria-required');
    });

    it('keeps the submit button disabled when overridden and there are no incomplete fields', async () => {
      const fields: Array<any> = [];

      const { view } = renderView({
        fields,
        validation: 'onChange',
        submit: {
          type: 'fill',
          contents: <>Submit</>,
          disabled: true,
          size: 6,
        },
      });

      const submitButton = view.getByRole('button');
      expect(submitButton).toBeDisabled();
    });
  });

  it('passes custom ids to the fields', async () => {
    const fields = [
      {
        id: 'mycoolid',
        ...stubTextField,
      },
      {
        id: 'swaggy-id',
        ...stubSelectField,
      },
      {
        id: 'another-dank-id',
        ...stubCheckboxField,
      },
      {
        id: 'and-another-one',
        ...stubRadioGroupField,
        name: 'name',
      },
      {
        id: 'id-2-the-ego',
        ...stubTextareaField,
      },
      {
        id: 'fire-file',
        ...stubFileField,
      },
    ];
    const { view } = renderView({ fields });

    const textField = view.getByRole('textbox', { name: 'Stub Text' });
    expect(textField).toHaveAttribute('id', 'mycoolid');

    const selectField = view.getByRole('combobox', { name: 'Stub Select' });
    expect(selectField).toHaveAttribute('id', 'swaggy-id');

    const checkboxField = view.getByRole('checkbox', {
      name: 'Stub Checkbox Check me!',
    });
    expect(checkboxField).toHaveAttribute('id', 'another-dank-id');

    const textAreaField = view.getByRole('textbox', { name: 'Stub Textarea' });
    expect(textAreaField).toHaveAttribute('id', 'id-2-the-ego');

    const radioOptions = view.getAllByRole('radio');
    expect(radioOptions[0]).toHaveAttribute('id', 'name-0-and-another-one');
    expect(radioOptions[1]).toHaveAttribute('id', 'name-1-and-another-one');

    const fileStub = view.getByLabelText('Stub File');
    expect(fileStub).toHaveAttribute('id', 'fire-file');
  });

  it('submits hidden input value', async () => {
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);

    const { view } = renderView({
      fields: [stubHiddenField],
      onSubmit,
    });

    await act(async () => {
      fireEvent.submit(view.getByRole('button'));

      await api.innerPromise;
    });

    const result = await api.innerPromise;

    expect(result).toEqual({
      [stubHiddenField.name]: stubHiddenField.defaultValue,
    });
  });

  it('submits sweet container input value', async () => {
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);

    const { view } = renderView({
      fields: [stubSweetContainerField],
      onSubmit,
    });

    await act(async () => {
      fireEvent.submit(view.getByRole('button'));

      await api.innerPromise;
    });

    const result = await api.innerPromise;

    expect(result).toEqual({
      [stubSweetContainerField.name]: stubSweetContainerField.defaultValue,
    });
  });

  describe('Cancel button', () => {
    it('renders a cancel and submit button when "cancel" props are provided', async () => {
      const cancelOnClick = jest.fn();

      const { view } = renderView({
        cancel: { children: 'Cancel', onClick: cancelOnClick },
      });

      const buttons = view.getAllByRole('button');
      const cancelButton = view.getByText('Cancel');

      await act(async () => {
        fireEvent.click(cancelButton);
      });

      expect(cancelButton);
      expect(buttons.length).toEqual(2);
      expect(cancelOnClick).toBeCalled();
    });

    it('renders only a submit when "cancel" props are not provided', () => {
      const { view } = renderView();

      const buttons = view.getAllByRole('button');

      expect(buttons.length).toEqual(1);
      expect(buttons[0]).toHaveTextContent('Submit');
    });
  });
});
