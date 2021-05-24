import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { mount } from 'enzyme';
import React from 'react';

import {
  stubCheckboxField,
  stubFileField,
  stubRadioGroupField,
  stubSelectField,
  stubTextareaField,
  stubTextField,
} from '../../__tests__/stubs';
import {
  GridFormCheckboxField,
  GridFormFileField,
  GridFormRadioGroupField,
  GridFormSelectField,
  GridFormTextAreaField,
  GridFormTextField,
} from '../../types';
import { GridFormCheckboxInput } from '../GridFormCheckboxInput';
import { GridFormFileInput } from '../GridFormFileInput';
import { GridFormRadioGroupInput } from '../GridFormRadioGroupInput';
import { GridFormSelectInput } from '../GridFormSelectInput';
import { GridFormTextArea } from '../GridFormTextArea';
import { GridFormTextInput } from '../GridFormTextInput';

const mountWithTheme = (component: React.ReactNode) => {
  return mount(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

export const renderGridFormSelectInput = (
  extraProps: Partial<GridFormSelectField> = {}
) => {
  return mountWithTheme(
    <GridFormSelectInput
      field={{ ...stubSelectField, ...extraProps }}
      register={jest.fn()}
      {...extraProps}
    />
  );
};

export const renderGridFormTextInput = (
  extraProps: Partial<GridFormTextField> = {}
) => {
  return mountWithTheme(
    <GridFormTextInput
      field={{ ...stubTextField, ...extraProps }}
      register={jest.fn()}
      {...extraProps}
    />
  );
};

export const renderGridFormTextArea = (
  extraProps: Partial<GridFormTextAreaField> = {}
) => {
  return mountWithTheme(
    <GridFormTextArea
      field={{ ...stubTextareaField, ...extraProps }}
      register={jest.fn()}
      {...extraProps}
    />
  );
};

export const renderGridFormRadioGroupInput = (
  extraProps: Partial<GridFormRadioGroupField> = {}
) => {
  return mountWithTheme(
    <GridFormRadioGroupInput
      field={{ ...stubRadioGroupField, ...extraProps }}
      setValue={jest.fn()}
      register={jest.fn()}
      {...extraProps}
    />
  );
};

export const renderGridFormFileInput = (
  extraProps: Partial<GridFormFileField> = {}
) => {
  return mountWithTheme(
    <GridFormFileInput
      field={{ ...stubFileField, ...extraProps }}
      register={jest.fn()}
      {...extraProps}
    />
  );
};

export const renderGridFormCheckboxInput = (
  extraProps: Partial<GridFormCheckboxField> = {}
) => {
  return mountWithTheme(
    <GridFormCheckboxInput
      field={{ ...stubCheckboxField, ...extraProps }}
      register={jest.fn()}
      {...extraProps}
    />
  );
};

export const getComponent = (componentName: string, extraProps: any) => {
  switch (componentName) {
    case 'GridFormTextInput':
      return renderGridFormTextInput(extraProps);
    case 'GridFormSelectInput':
      return renderGridFormSelectInput(extraProps);
    case 'GridFormTextArea':
      return renderGridFormTextArea(extraProps);
    case 'GridFormRadioGroupInput':
      return renderGridFormRadioGroupInput(extraProps);
    case 'GridFormFileInput':
      return renderGridFormFileInput(extraProps);
    case 'GridFormCheckboxInput':
      return renderGridFormCheckboxInput(extraProps);
    default:
      throw new Error(`Unknown component name: ${componentName}`);
  }
};
