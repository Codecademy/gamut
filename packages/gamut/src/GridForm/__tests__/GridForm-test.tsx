import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { createPromise } from '../../utils/createPromise';
import { GridForm } from '..';
import {
  stubCheckboxField,
  stubFileField,
  stubRadioGroupField,
  stubSelectField,
  stubSelectOptions,
  stubTextareaField,
  stubTextField,
} from './stubs';

describe('GridForm', () => {
  it('submits the form when all inputs are filled out', async () => {
    const fields = [stubCheckboxField, stubSelectField, stubTextField];
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);
    const selectValue = stubSelectOptions[1];
    const textValue = 'Hooray!';

    const wrapped = mount(
      <ThemeProvider theme={theme}>
        <GridForm
          fields={fields}
          onSubmit={onSubmit}
          submit={{ type: 'fill', contents: <>Submit</>, size: 6 }}
        />
      </ThemeProvider>
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
    render(
      <ThemeProvider theme={theme}>
        <GridForm
          fields={fields}
          onSubmit={onSubmit}
          submit={{ type: 'fill', contents: <>Submit</>, size: 6 }}
        />
      </ThemeProvider>
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    // there should only be a single "assertive" error from the form submission
    expect(await screen.queryAllByRole('alert').length).toBe(1);
    expect(await screen.queryAllByRole('status').length).toBe(1);
  });

  describe('when "onSubmit" validation is selected', () => {
    it('never disables the submit button', () => {
      const fields = [
        { ...stubTextField, validation: { required: 'Please enter text' } },
      ];
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);

      const wrapped = mount(
        <ThemeProvider theme={theme}>
          <GridForm
            fields={fields}
            onSubmit={onSubmit}
            submit={{
              type: 'fill',
              contents: <>Submit</>,
              size: 6,
            }}
            validation="onSubmit"
          />
        </ThemeProvider>
      );

      wrapped.setProps(wrapped.props());

      expect(wrapped.find('button').prop('disabled')).not.toBeTruthy();
      expect(wrapped.find('input').prop('aria-required')).toBeFalsy();
    });

    it('sets aria-required to true ', () => {
      const fields = [
        { ...stubTextField, validation: { required: 'Please enter text' } },
      ];
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);

      const wrapped = mount(
        <ThemeProvider theme={theme}>
          <GridForm
            fields={fields}
            onSubmit={onSubmit}
            submit={{
              type: 'fill',
              contents: <>Submit</>,
              size: 6,
            }}
            validation="onSubmit"
            showRequired
          />
        </ThemeProvider>
      );

      wrapped.setProps(wrapped.props());

      expect(wrapped.find('button').prop('disabled')).not.toBeTruthy();
      expect(wrapped.find('input').prop('aria-required')).toBeTruthy();
    });
  });

  describe('when "onChange" validation is selected', () => {
    it('sets aria-required to true ', () => {
      const fields = [
        { ...stubTextField, validation: { required: 'Please enter text' } },
      ];
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);

      const wrapped = mount(
        <ThemeProvider theme={theme}>
          <GridForm
            fields={fields}
            onSubmit={onSubmit}
            submit={{
              type: 'fill',
              contents: <>Submit</>,
              size: 6,
            }}
            validation="onSubmit"
            showRequired
          />
        </ThemeProvider>
      );

      wrapped.setProps(wrapped.props());

      expect(wrapped.find('button').prop('disabled')).not.toBeTruthy();
      expect(wrapped.find('input').prop('aria-required')).toBeTruthy();
    });

    it('disables the submit button when required fields are incomplete', async () => {
      const fields = [
        { ...stubTextField, validation: { required: 'Please enter text' } },
      ];
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);

      const wrapped = mount(
        <ThemeProvider theme={theme}>
          <GridForm
            fields={fields}
            onSubmit={onSubmit}
            submit={{
              type: 'fill',
              contents: <>Submit</>,
              size: 6,
            }}
            validation="onChange"
            showRequired
          />
        </ThemeProvider>
      );

      await act(async () => {
        await wrapped.setProps(wrapped.props());
      });
      wrapped.update();

      expect(wrapped.find('button').prop('disabled')).toBeTruthy();
      expect(wrapped.find('input').prop('aria-required')).toBeTruthy();
    });

    it('enables the submit button after the required fields are completed', async () => {
      const fields = [
        { ...stubTextField, validation: { required: 'Please enter text' } },
      ];
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);

      const wrapped = mount(
        <ThemeProvider theme={theme}>
          <GridForm
            fields={fields}
            onSubmit={onSubmit}
            submit={{
              type: 'fill',
              contents: <>Submit</>,
              size: 6,
            }}
            validation="onChange"
            showRequired
          />
        </ThemeProvider>
      );

      await act(async () => {
        // https://github.com/react-hook-form/react-hook-form/issues/1382
        const node = wrapped.find('input[type="text"]').getDOMNode();
        (node as HTMLInputElement).value = 'Hooray!';
        node.dispatchEvent(new Event('input'));
      });

      wrapped.setProps(wrapped.props());

      expect(wrapped.find('button').prop('disabled')).not.toBeTruthy();
      expect(wrapped.find('input').prop('aria-required')).toBeTruthy();
    });

    it('keeps the submit button disabled when overridden and there are no incomplete fields', async () => {
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);

      const wrapped = mount(
        <ThemeProvider theme={theme}>
          <GridForm
            fields={[]}
            onSubmit={onSubmit}
            submit={{
              type: 'fill',
              contents: <>Submit</>,
              disabled: true,
              size: 6,
            }}
          />
        </ThemeProvider>
      );

      wrapped.setProps(wrapped.props());

      expect(wrapped.find('button').prop('disabled')).toBeTruthy();
    });
  });

  it('passes custom ids to the fields', () => {
    const form = mount(
      <ThemeProvider theme={theme}>
        <GridForm
          fields={[
            {
              ...stubTextField,
              id: 'mycoolid',
            },
            {
              ...stubSelectField,
              id: 'swaggy-id',
            },
            {
              ...stubCheckboxField,
              id: 'another-dank-id',
            },
            {
              ...stubRadioGroupField,
              id: 'and-another-one',
              name: 'name',
            },
            {
              ...stubTextareaField,
              id: 'id-2-the-ego',
            },
            {
              ...stubFileField,
              id: 'fire-file',
            },
          ]}
          onSubmit={jest.fn()}
          submit={{ type: 'fill', contents: <>Submit</>, size: 6 }}
        />
      </ThemeProvider>
    );

    expect(form.find('input#mycoolid').length).toBe(1);
    expect(form.find('select#swaggy-id').length).toBe(1);
    expect(form.find('input#another-dank-id').length).toBe(1);
    expect(form.find('input#name-0-and-another-one').length).toBe(1);
    expect(form.find('input#name-1-and-another-one').length).toBe(1);
    expect(form.find('input#another-dank-id').length).toBe(1);
    expect(form.find('textarea#id-2-the-ego').length).toBe(1);
    expect(form.find('input#fire-file').length).toBe(1);
  });
});
