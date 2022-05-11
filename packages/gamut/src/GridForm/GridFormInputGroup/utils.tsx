import React from 'react';

import { GridFormField } from '../types';
import { GridFormCheckboxInput } from './GridFormCheckboxInput';
import { GridFormCustomInput } from './GridFormCustomInput';
import { GridFormFileInput } from './GridFormFileInput';
import { GridFormHiddenInput } from './GridFormHiddenInput';
import { GridFormRadioGroupInput } from './GridFormRadioGroupInput';
import { GridFormSelectInput } from './GridFormSelectInput';
import { GridFormSweetContainerInput } from './GridFormSweetContainerInput';
import { GridFormTextArea } from './GridFormTextArea';
import { GridFormTextInput } from './GridFormTextInput';

export const getInput = (
  field: GridFormField,
  errorMessage: string,
  defaultProps: any
) => {
  switch (field.type) {
    case 'checkbox':
      return <GridFormCheckboxInput field={field} {...defaultProps} />;

    case 'custom':
    case 'custom-group':
      return (
        <GridFormCustomInput
          error={errorMessage}
          field={field}
          {...defaultProps}
        />
      );

    case 'radio-group':
      return (
        <GridFormRadioGroupInput
          error={!!errorMessage}
          field={field}
          {...defaultProps}
        />
      );

    case 'select':
      return (
        <GridFormSelectInput
          error={!!errorMessage}
          field={field}
          {...defaultProps}
        />
      );

    case 'file':
      return (
        <GridFormFileInput
          error={!!errorMessage}
          field={field}
          {...defaultProps}
        />
      );

    case 'textarea':
      return (
        <GridFormTextArea
          error={!!errorMessage}
          field={field}
          {...defaultProps}
        />
      );
    case 'hidden':
      return <GridFormHiddenInput field={field} {...defaultProps} />;

    case 'sweet-container':
      return (
        <GridFormSweetContainerInput
          field={field}
          label={field.label}
          {...defaultProps}
        />
      );

    default:
      return (
        <GridFormTextInput
          error={!!errorMessage}
          field={field}
          {...defaultProps}
        />
      );
  }
};
