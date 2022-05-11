import { setupRtl } from '@codecademy/gamut-tests';
import React from 'react';

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
  return () => {
    return {
      renderField: setupRtl(component, {
        field: { ...defaultFieldProps },
        register: jest.fn(),
      }).options({ wrapper: FormContext }),
      defaultFieldProps,
    };
  };
};

export const setupGridFormSelectInput = createGridFormFieldSetup(
  GridFormSelectInput,
  stubSelectField
);

export const setupGridFormTextInput = createGridFormFieldSetup(
  GridFormTextInput,
  stubTextField
);

export const setupGridFormTextArea = createGridFormFieldSetup(
  GridFormTextArea,
  stubTextareaField
);

export const setupGridFormRadioGroupInput = createGridFormFieldSetup(
  GridFormRadioGroupInput,
  stubRadioGroupField
);

export const setupGridFormFileInput = createGridFormFieldSetup(
  GridFormFileInput,
  stubFileField
);

export const setupGridFormCheckboxInput = createGridFormFieldSetup(
  GridFormCheckboxInput,
  stubCheckboxField
);

export const testerList = [
  { name: 'GridFormCheckboxInput', selector: 'checkbox' },
];

export const getComponent = (componentName: string) => {
  switch (componentName) {
    case 'GridFormTextInput':
      return setupGridFormTextInput();
    case 'GridFormSelectInput':
      return setupGridFormSelectInput();
    case 'GridFormTextArea':
      return setupGridFormTextArea();
    case 'GridFormRadioGroupInput':
      return setupGridFormRadioGroupInput();
    case 'GridFormFileInput':
      return setupGridFormFileInput();
    case 'GridFormCheckboxInput':
      return setupGridFormCheckboxInput();
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
