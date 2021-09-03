import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, queries } from '@testing-library/dom';
import { act, RenderResult } from '@testing-library/react';
import React from 'react';

import { createPromise } from '../../utils';
import { GridForm, GridFormField } from '..';
import {
  stubCheckboxField,
  stubFieldCases,
  stubHiddenField,
  stubSelectField,
  stubSelectOptions,
  stubSweetContainerField,
  stubTextField,
} from './stubs';

const fields = [stubCheckboxField, stubSelectField, stubTextField];
const validationFields = [
  { ...stubCheckboxField, validation: { required: 'Please check' } },
  {
    ...stubSelectField,
    validation: { required: 'Please select a value' },
  },
  {
    ...stubTextField,
    validation: { required: 'Please enter text' },
  },
];

const renderView = setupRtl(GridForm, {
  fields,
  showRequired: false,
  submit: { type: 'fill', contents: <>Submit</>, size: 6 },
});

type RenderViewReturn = ReturnType<typeof renderView>;

type CaseFindProps = {
  field: GridFormField;
  getBy: string;
  roleOrLabel: string;
  nameId: { name: string } | undefined;
  id: string;
};

const createAndFind = ({
  field,
  getBy,
  roleOrLabel,
  nameId,
  id,
}: CaseFindProps) => {
  const fields = [{ id, ...field }];

  const { view } = renderView({
    fields,
  });
  switch (getBy) {
    case 'byLabelText':
      return view.getByLabelText(roleOrLabel);
    case 'allByRole':
      return view.getAllByRole(roleOrLabel);
    case 'byRole':
      return view.getByRole(roleOrLabel, nameId);
  }
};

const asyncRenderView = async (
  ...props: Parameters<typeof renderView>
): Promise<RenderViewReturn> => {
  let renderResults: RenderViewReturn;

  await act(async () => {
    renderResults = await renderView(...props);
  });

  return renderResults!;
};

const getBaseCases = (view: RenderResult<typeof queries, HTMLElement>) => {
  const checkboxField = view.getByRole('checkbox', {
    name: 'Stub Checkbox Check me!',
  }) as HTMLInputElement;
  const selectField = view.getByRole('combobox', {
    name: 'Stub Select',
  }) as HTMLInputElement;
  const textField = view.getByRole('textbox', {
    name: 'Stub Text',
  }) as HTMLInputElement;
  return { checkboxField, selectField, textField };
};

const selectValue = stubSelectOptions[1];
const textValue = 'Hooray!';

const doBaseFormActions = (
  selectField: HTMLInputElement,
  textField: HTMLInputElement,
  checkboxField: HTMLInputElement
) => {
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
};

const baseResults = {
  [stubCheckboxField.name]: true,
  [stubSelectField.name]: selectValue,
  [stubTextField.name]: textValue,
};

describe('GridForm', () => {
  it('submits the form when all inputs are filled out', async () => {
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);

    const { view } = renderView({ onSubmit });
    const { checkboxField, selectField, textField } = getBaseCases(view);

    doBaseFormActions(selectField, textField, checkboxField);

    await act(async () => {
      fireEvent.submit(view.getByRole('button'));

      await api.innerPromise;
    });

    const result = await api.innerPromise;

    expect(result).toEqual(baseResults);
  });

  it('only sets aria-live prop on the first validation error in a form', async () => {
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);
    const { view } = renderView({ fields: validationFields, onSubmit });

    await act(async () => {
      fireEvent.click(view.getByRole('button'));
    });

    // there should only be a single "assertive" error from the form submission
    expect(view.getAllByRole('alert').length).toBe(1);
    expect(view.getAllByRole('status').length).toBe(1);
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
    it('sets aria-required to true ', async () => {
      const fields = [
        { ...stubTextField, validation: { required: 'Please enter text' } },
      ];

      const { view } = await asyncRenderView({
        fields,
        validation: 'onChange',
      });

      const textField = view.getByRole('textbox');
      expect(textField).toHaveAttribute('aria-required');
    });

    it('disables the submit button when required fields are incomplete', async () => {
      const fields = [
        { ...stubTextField, validation: { required: 'Please enter text' } },
      ];

      const { view } = renderView({
        fields,
        validation: 'onChange',
        submit: {
          contents: <>Submit</>,
          size: 6,
          disabled: ({ isValid }) => !isValid,
        },
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
      const fields: Array<GridFormField> = [];

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

  describe('when supplied an id', () => {
    it.each(stubFieldCases)(
      `passes custom id to the %s`,
      async (
        type: any,
        field: GridFormField,
        getBy: string,
        roleOrLabel: string,
        nameId: { name: string } | undefined,
        id: string
      ) => {
        const renderedField = createAndFind({
          field,
          getBy,
          roleOrLabel,
          nameId,
          id,
        });
        if (Array.isArray(renderedField)) {
          renderedField.forEach((element, index) => {
            expect(element).toHaveAttribute(
              'id',
              `${field.name}-${index}-${id}`
            );
          });
        } else {
          expect(renderedField).toHaveAttribute('id', id);
        }
      }
    );
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

  describe('Section Break', () => {
    const sectionFields = [
      {
        fields: [stubCheckboxField],
        title: 'Test Title',
      },
      {
        fields: [stubTextField],
        title: 'Other Test Title',
      },
    ];

    it('renders a section break by default', () => {
      const { view } = renderView({
        fields: sectionFields,
      });
      const sectionBreaks = view.getAllByTestId('form-section-break');
      expect(sectionBreaks.length).toEqual(2);
    });

    it('does NOT render a section break if breakType is none', () => {
      const { view } = renderView({
        breakType: 'none',
        fields: sectionFields,
      });
      const sectionBreaks = view.queryByTestId('form-section-break');
      expect(sectionBreaks).not.toBeInTheDocument();
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

  describe('disableFieldsOnSubmit', () => {
    it('disables fields when form is successfully submitted', async () => {
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);

      const { view } = renderView({ onSubmit, disableFieldsOnSubmit: true });
      const { checkboxField, selectField, textField } = getBaseCases(view);

      doBaseFormActions(selectField, textField, checkboxField);

      await act(async () => {
        fireEvent.submit(view.getByRole('button'));
      });

      expect(checkboxField).toBeDisabled();
      expect(selectField).toBeDisabled();
      expect(textField).toBeDisabled();
    });

    it('does not disable fields when form has a validation error', async () => {
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);

      const { view } = renderView({
        fields: validationFields,
        onSubmit,
        disableFieldsOnSubmit: true,
      });

      const { checkboxField, selectField, textField } = getBaseCases(view);

      await act(async () => {
        fireEvent.submit(view.getByRole('button'));
      });

      expect(checkboxField).not.toBeDisabled();
      expect(selectField).not.toBeDisabled();
      expect(textField).not.toBeDisabled();
    });
  });

  describe('resetOnSubmit', () => {
    it('resets fields when form is successfully submitted', async () => {
      let submitCount = 0;
      const api = createPromise<{}>();
      const api2 = createPromise<{}>();
      const onSubmit = async (values: {}) => {
        return submitCount < 1 ? api.resolve(values) : api2.resolve(values);
      };

      const { view } = renderView({ onSubmit, resetOnSubmit: true });
      const { checkboxField, selectField, textField } = getBaseCases(view);

      doBaseFormActions(selectField, textField, checkboxField);

      await act(async () => {
        fireEvent.submit(view.getByRole('button'));
      });

      const firstResult = await api.innerPromise;

      expect(firstResult).toEqual(baseResults);

      expect(checkboxField.checked).toEqual(false);
      expect(selectField.value).toEqual('aaa');
      expect(textField.value).toEqual('');

      await act(async () => {
        submitCount++;
        fireEvent.submit(view.getByRole('button'));
      });

      const secondResult = await api2.innerPromise;

      expect(secondResult).toEqual({
        [stubCheckboxField.name]: false,
        [stubSelectField.name]: 'aaa',
        [stubTextField.name]: '',
      });
    });
  });
});
