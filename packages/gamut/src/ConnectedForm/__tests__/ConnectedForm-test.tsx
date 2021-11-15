import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, queries } from '@testing-library/dom';
import { act, RenderResult } from '@testing-library/react';
import React from 'react';

import { createPromise } from '../../utils';
import {
  ConnectedCheckbox,
  ConnectedForm,
  ConnectedFormGroup,
  ConnectedInput,
  ConnectedRadioGroupInput,
  ConnectedSelect,
  SubmitButton,
} from '..';

const renderView = setupRtl(ConnectedForm, {
  defaultValues: {
    checkbox: false,
    select: 'zero',
    input: 'state your name.',
    radiogroup: 'three',
  },
  children: (
    <>
      <ConnectedFormGroup
        name="checkbox"
        label="cool-checkbox"
        field={{
          component: ConnectedCheckbox,
          label: 'cool-checkbox',
        }}
      />
      <SubmitButton variant="secondary" m={32}>
        submit this form.
      </SubmitButton>
      <ConnectedFormGroup
        name="select"
        label="cool-select"
        field={{
          component: ConnectedSelect,
          options: ['one', 'two', 'zero'],
        }}
      />
      <ConnectedFormGroup
        name="input"
        label="cool-input"
        field={{
          component: ConnectedInput,
        }}
      />
      <ConnectedFormGroup
        name="radiogroup"
        label="cool-radiogroup"
        field={{
          component: ConnectedRadioGroupInput,
          options: [
            { label: 'one', value: 'one' },
            { label: 'two', value: 'two' },
            { label: 'three', value: 'three' },
          ],
        }}
      />
    </>
  ),
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
});
