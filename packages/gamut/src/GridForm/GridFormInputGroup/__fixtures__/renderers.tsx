import { setupRtl } from '@codecademy/gamut-tests';
import * as React from 'react';

import { FormContext } from '../../__fixtures__/helpers';
import {
  stubCheckboxField,
  stubFileField,
  stubRadioGroupField,
  stubSelectField,
  stubTextareaField,
  stubTextField,
} from '../../__tests__/stubs';
import { GridFormInputGroup, GridFormInputGroupProps } from '..';
import { GridFormCheckboxInput } from '../GridFormCheckboxInput';
import { GridFormFileInput } from '../GridFormFileInput';
import { GridFormRadioGroupInput } from '../GridFormRadioGroupInput';
import { GridFormSelectInput } from '../GridFormSelectInput';
import { GridFormTextArea } from '../GridFormTextArea';
import { GridFormTextInput } from '../GridFormTextInput';

type GridFormFieldComponent =
  | typeof GridFormCheckboxInput
  | typeof GridFormFileInput
  | typeof GridFormRadioGroupInput
  | typeof GridFormSelectInput
  | typeof GridFormTextArea
  | typeof GridFormTextInput;

interface CreateGridFormFieldSetupProps<T extends GridFormFieldComponent> {
  component: T;
  defaultFieldProps: React.ComponentProps<T>['field'];
}

const createGridFormFieldSetup = <T extends GridFormFieldComponent>({
  component,
  defaultFieldProps,
}: CreateGridFormFieldSetupProps<T>) => {
  return {
    renderField: setupRtl<typeof component>(component, {
      field: defaultFieldProps,
      register: jest.fn(),
    }).options({ wrapper: FormContext }),
    defaultFieldProps,
  };
};

export const getComponent = (componentName: string) => {
  switch (componentName) {
    case 'GridFormTextInput':
      return createGridFormFieldSetup({
        component: GridFormTextInput,
        defaultFieldProps: stubTextField,
      });
    case 'GridFormSelectInput':
      return createGridFormFieldSetup({
        component: GridFormSelectInput,
        defaultFieldProps: stubSelectField,
      });
    case 'GridFormTextArea':
      return createGridFormFieldSetup({
        component: GridFormTextArea,
        defaultFieldProps: stubTextareaField,
      });
    case 'GridFormRadioGroupInput':
      return createGridFormFieldSetup({
        component: GridFormRadioGroupInput,
        defaultFieldProps: stubRadioGroupField,
      });
    case 'GridFormFileInput':
      return createGridFormFieldSetup({
        component: GridFormFileInput,
        defaultFieldProps: stubFileField,
      });
    case 'GridFormCheckboxInput':
      return createGridFormFieldSetup({
        component: GridFormCheckboxInput,
        defaultFieldProps: stubCheckboxField,
      });
    default:
      throw new Error(`Unknown component name: ${componentName}`);
  }
};

type GridFormInputGroupTestComponentProps = GridFormInputGroupProps & {
  mode?: 'onSubmit' | 'onChange';
  externalLabel?: { id: string; text: string };
};

export const GridFormInputGroupTestComponent: React.FC<
  GridFormInputGroupTestComponentProps
> = ({ field, mode = 'onSubmit', externalLabel, ...rest }) => {
  return (
    <FormContext mode={mode}>
      {externalLabel && <span id={externalLabel.id}>{externalLabel.text}</span>}
      <GridFormInputGroup field={field} {...rest} />
    </FormContext>
  );
};
