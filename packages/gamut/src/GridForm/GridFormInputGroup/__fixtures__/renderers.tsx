import { setupRtl } from '@codecademy/gamut-tests';
import React, { ReactNode } from 'react';

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

const createGridFormFieldSetup = (component: any, defaultFieldProps: any) => {
  return {
    renderField: setupRtl(component, {
      field: { ...defaultFieldProps },
      register: jest.fn(),
    }).options({ wrapper: FormContext }),
    defaultFieldProps,
  };
};

export const getComponent = (componentName: string) => {
  switch (componentName) {
    case 'GridFormTextInput':
      return createGridFormFieldSetup(GridFormTextInput, stubTextField);
    case 'GridFormSelectInput':
      return createGridFormFieldSetup(GridFormSelectInput, stubSelectField);
    case 'GridFormTextArea':
      return createGridFormFieldSetup(GridFormTextArea, stubTextareaField);
    case 'GridFormRadioGroupInput':
      return createGridFormFieldSetup(
        GridFormRadioGroupInput,
        stubRadioGroupField
      );
    case 'GridFormFileInput':
      return createGridFormFieldSetup(GridFormFileInput, stubFileField);
    case 'GridFormCheckboxInput':
      return createGridFormFieldSetup(GridFormCheckboxInput, stubCheckboxField);
    default:
      throw new Error(`Unknown component name: ${componentName}`);
  }
};

type GridFormInputGroupTestComponentProps = GridFormInputGroupProps & {
  mode?: 'onSubmit' | 'onChange';
};

export const GridFormInputGroupTestComponent: React.FC<GridFormInputGroupTestComponentProps> = ({
  field,
  mode = 'onSubmit',
  ...rest
}) => {
  return (
    <FormContext mode={mode}>
      <GridFormInputGroup field={field} {...rest} />
    </FormContext>
  );
};
