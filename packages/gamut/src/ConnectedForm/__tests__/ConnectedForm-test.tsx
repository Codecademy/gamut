import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, queries } from '@testing-library/dom';
import { act, RenderResult } from '@testing-library/react';
import React from 'react';

import { createPromise } from '../../utils';
import { ConnectedForm } from '..';
import {
  PlainConnectedFields,
  ValidatedConnectedFields,
} from '../__fixtures__/helpers';

const renderView = setupRtl(ConnectedForm, {
  defaultValues: {
    checkbox: false,
    select: 'zero',
    input: 'state your name.',
    radiogroup: 'three',
  },
  children: <PlainConnectedFields />,
  submit: { type: 'fill', contents: <>Submit</>, size: 6 },
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
  const radioOption = view.getByLabelText('two');
  return { checkboxField, selectField, textField, radioOption };
};

const selectValue = 'two';
const textValue = 'Hooray!';

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

  fireEvent.click(checkboxField);
  fireEvent.click(radioOption);

  for (const [selector, value] of newValues) {
    fireEvent.input(selector, {
      target: {
        value,
      },
    });
  }
};

const baseResults = {
  checkbox: true,
  select: selectValue,
  input: textValue,
  radiogroup: 'two',
};

describe('ConnectedForm', () => {
  it('submits the form when all inputs are filled out', async () => {
    const api = createPromise<{}>();
    const onSubmit = async (values: {}) => api.resolve(values);

    const { view } = renderView({ onSubmit });
    const { checkboxField, selectField, textField, radioOption } = getBaseCases(
      view
    );

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
      children: <ValidatedConnectedFields />,
      defaultValues: { checkbox: false, select: undefined },
      onSubmit,
    });

    await act(async () => {
      fireEvent.submit(view.getByRole('button'));

      await api.innerPromise;
    });

    // there should only be a single "assertive" error from the form submission
    expect(view.getAllByRole('alert').length).toBe(1);
    expect(view.getAllByRole('status').length).toBe(1);
  });
});
