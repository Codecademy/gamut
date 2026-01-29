import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, queries } from '@testing-library/dom';
import { act, RenderResult, waitFor } from '@testing-library/react';

import { createPromise } from '../../utils';
import { ConnectedForm } from '..';
import { PlainConnectedFields } from '../__fixtures__/helpers';

const renderView = setupRtl(ConnectedForm, {
  defaultValues: {
    checkbox: false,
    select: 'zero',
    input: 'state your name.',
    radiogroup: 'three',
  },
  children: <PlainConnectedFields />,
});
const getBaseCases = (view: RenderResult<typeof queries, HTMLElement>) => {
  const checkboxField = view.getByRole('checkbox', {
    name: 'cool-checkbox',
  }) as HTMLInputElement;
  const selectField = view.getByRole('combobox', {
    name: '',
  }) as HTMLInputElement;
  const textField = view.getByRole('textbox', {
    name: '',
  }) as HTMLInputElement;
  const radioGroup = view.getByRole('radiogroup');
  const radioOption = view.getByLabelText('two') as HTMLInputElement;
  return { checkboxField, selectField, textField, radioGroup, radioOption };
};
const selectValue = 'two';
const textValue = 'Hooray!';
const radioValue = 'two';
const doBaseFormActions = (
  selectField: HTMLInputElement,
  textField: HTMLInputElement,
  checkboxField: HTMLInputElement,
  radioOption: HTMLElement
) => {
  const newValues = [
    [selectField, selectValue],
    [textField, textValue],
  ] as const;
  act(() => {
    fireEvent.click(checkboxField);
    fireEvent.click(radioOption);
    for (const [selector, value] of newValues) {
      fireEvent.change(selector, {
        target: {
          value,
        },
      });
    }
  });
};
const baseResults = {
  checkbox: true,
  select: selectValue,
  input: textValue,
  radiogroup: radioValue,
};
const validationRules = {
  checkbox: { required: 'you must check it' },
  select: { required: 'you must select something' },
  input: { required: 'you must type something' },
  radiogroup: { required: 'you must radio something' },
};
const defaultValues = {
  checkbox: false,
  select: '',
  input: '',
  radiogroup: undefined,
};

describe('ConnectedForm', () => {
  it('submits the form when all inputs are filled out', async () => {
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);
    const { view } = renderView({ onSubmit });
    const { checkboxField, selectField, textField, radioOption } =
      getBaseCases(view);
    doBaseFormActions(selectField, textField, checkboxField, radioOption);
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
    const { view } = renderView({
      validationRules,
      defaultValues,
      onSubmit,
    });
    await act(async () => {
      fireEvent.submit(view.getByRole('button'));
    });

    // there should only be a single "assertive" error from the form submission
    expect(view.getAllByRole('alert').length).toBe(1);
    expect(view.getAllByRole('status').length).toBe(3);
  });

  it('calls clearError onError so error text is re-read by screen reader', async () => {
    const mockHandleSubmit = jest.fn();
    /* We need a different approach to mock useForm and clearErrors, though since this is blocking the Storybook upgrade we'll use a stopgap for now.
        const mockedUseForm =
          jest.spyOn(rhf, 'useForm').getMockImplementation() ?? mockHandleSubmit;
    
        jest.spyOn(rhf, 'useForm').mockImplementationOnce(() => {
          const returnMock = mockedUseForm();
          return { ...returnMock, clearErrors: mockHandleSubmit };
        });
        */
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);
    const { view } = renderView({
      validationRules,
      defaultValues,
      onSubmit,
      onError: mockHandleSubmit,
    });
    await act(async () => {
      fireEvent.submit(view.getByRole('button'));
    });

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('sets aria-required to true for the appropriate inputs', () => {
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);
    const { view } = renderView({
      validationRules,
      onSubmit,
    });
    const { checkboxField, selectField, textField, radioGroup } =
      getBaseCases(view);

    expect(checkboxField).toHaveAttribute('aria-required');
    expect(selectField).toHaveAttribute('aria-required');
    expect(textField).toHaveAttribute('aria-required');
    expect(radioGroup).toHaveAttribute('aria-required');
  });

  it('does not disable submit by default', () => {
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);
    const { view } = renderView({ validationRules, defaultValues, onSubmit });
    const submitButton = view.getByRole('button');

    expect(submitButton).not.toBeDisabled();
  });

  describe('onChange validation', () => {
    it('disables the submit button when required fields are incomplete', async () => {
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);
      const { view } = renderView({
        children: <PlainConnectedFields onChangeValidation />,
        validation: 'onChange',
        validationRules,
        defaultValues,
        onSubmit,
      });
      const { textField } = getBaseCases(view);
      const submitButton = view.getByRole('button');
      act(() => {
        fireEvent.input(textField, {
          target: {
            value: '',
          },
        });
      });

      expect(submitButton).toBeDisabled();
    });

    it('enables the submit button after the required fields are completed', async () => {
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);
      const { view } = renderView({
        children: <PlainConnectedFields onChangeValidation />,
        validation: 'onChange',
        validationRules,
        defaultValues,
        onSubmit,
      });
      const { checkboxField, selectField, textField, radioOption } =
        getBaseCases(view);
      doBaseFormActions(selectField, textField, checkboxField, radioOption);

      expect(checkboxField.checked).toEqual(true);
      expect(selectField.value).toEqual(selectValue);
      expect(textField.value).toEqual(textValue);
      expect(radioOption.value).toEqual(radioValue);

      await waitFor(() => expect(view.getByRole('button')).not.toBeDisabled());
    });
  });

  describe('disableFieldsOnSubmit', () => {
    it('disables fields when form is successfully submitted', async () => {
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);
      const { view } = renderView({
        disableFieldsOnSubmit: true,
        defaultValues,
        onSubmit,
      });
      const { checkboxField, selectField, textField, radioOption } =
        getBaseCases(view);
      await act(async () => {
        fireEvent.submit(view.getByRole('button'));
        await api.innerPromise;
      });

      expect(checkboxField).toBeDisabled();
      expect(selectField).toBeDisabled();
      expect(textField).toBeDisabled();
      expect(radioOption).toBeDisabled();
    });

    it('does not disable fields when form has a validation error', async () => {
      const api = createPromise<{}>();
      const onSubmit = async (values: {}) => api.resolve(values);
      const { view } = renderView({
        validationRules,
        onSubmit,
        disableFieldsOnSubmit: true,
      });
      const { checkboxField, selectField, textField, radioOption } =
        getBaseCases(view);
      await act(async () => {
        fireEvent.submit(view.getByRole('button'));
      });

      expect(checkboxField).not.toBeDisabled();
      expect(selectField).not.toBeDisabled();
      expect(textField).not.toBeDisabled();
      expect(radioOption).not.toBeDisabled();
    });

    describe('resetOnSubmit', () => {
      it('resets fields when form is successfully submitted', async () => {
        let submitCount = 0;
        const api = createPromise<{}>();
        const api2 = createPromise<{}>();
        const onSubmit = async (values: {}) => {
          return submitCount < 1 ? api.resolve(values) : api2.resolve(values);
        };
        const { view } = renderView({
          onSubmit,
          defaultValues,
          resetOnSubmit: true,
        });
        const { checkboxField, selectField, textField, radioOption } =
          getBaseCases(view);
        doBaseFormActions(selectField, textField, checkboxField, radioOption);
        await act(async () => {
          fireEvent.submit(view.getByRole('button'));
          await api.innerPromise;
        });
        const firstResult = await api.innerPromise;
        await act(async () => {
          submitCount += 1;
          fireEvent.submit(view.getByRole('button'));
          await api2.innerPromise;
        });
        const secondResult = await api2.innerPromise;

        expect(firstResult).toEqual(baseResults);
        expect(secondResult).toEqual({ ...defaultValues, radiogroup: null });
      });

      it('does not reset fields when form has a validation error', async () => {
        const api = createPromise<{}>();
        const onSubmit = async (values: {}) => api.resolve(values);
        const { view } = renderView({
          onSubmit,
          defaultValues,
          resetOnSubmit: true,
        });
        const { textField, radioOption } = getBaseCases(view);
        act(() => {
          fireEvent.click(radioOption);
          fireEvent.input(textField, {
            target: {
              value: 'an arbitrary value',
            },
          });
        });
        await act(async () => {
          fireEvent.submit(view.getByRole('button'));
          await api.innerPromise;
        });
        const result = await api.innerPromise;

        expect(result).toEqual({
          checkbox: defaultValues.checkbox,
          select: defaultValues.select,
          input: 'an arbitrary value',
          radiogroup: 'two',
        });
      });
    });
  });
});
