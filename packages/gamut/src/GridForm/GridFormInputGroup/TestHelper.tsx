import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import GridFormTextInput from './GridFormTextInput';
import {
  stubRadioGroupField,
  stubSelectField,
  stubTextareaField,
  stubTextField,
} from '../__tests__/stubs';
import GridFormSelectInput from './GridFormSelectInput';
import GridFormTextArea from './GridFormTextArea';
import GridFormRadioGroupInput from './GridFormRadioGroupInput';

export const itHandlesRequiredProps = (
  componentName: string,
  inputType: string
): void => {
  describe('required fields', () => {
    it('marks a field as required when a required validation boolean is passed', () => {
      isMarkedRequiredWithBoolean(componentName, inputType);
    });
    it('marks a field as required when a required message is passed', () => {
      isMarkedRequiredWithMessage(componentName, inputType);
    });
    it('does __not__ mark a field as required when `required: false` is passed', () => {
      isMarkedNotRequiredWithBoolean(componentName, inputType);
    });
    it('does __not__ mark a field as required when required is not passed', () => {
      isMarkedNotRequiredWhenNotPassedRequiredProp(componentName, inputType);
    });
  });
};

export const isMarkedRequiredWithBoolean = (
  componentName: string,
  inputType: string
): void => {
  const requiredTrue = { validation: { required: true } };
  const component = getComponent(componentName, requiredTrue);

  expect(component.find(inputType).props().required).toBeTruthy();
};

export const isMarkedRequiredWithMessage = (
  componentName: string,
  inputType: string
): void => {
  const requiredMessage = { validation: { required: 'Required' } };
  const component = getComponent(componentName, requiredMessage);

  expect(component.find(inputType).props().required).toBeTruthy();
};

export const isMarkedNotRequiredWithBoolean = (
  componentName: string,
  inputType: string
): void => {
  const requiredFalse = { validation: { required: false } };
  const component = getComponent(componentName, requiredFalse);

  expect(component.find(inputType).props().required).toBeFalsy();
};

export const isMarkedNotRequiredWhenNotPassedRequiredProp = (
  componentName: string,
  inputType: string
): void => {
  const component = getComponent(componentName, {});

  expect(component.find(inputType).props().required).toBeFalsy();
};

/* === renderers === */

const renderGridFormTextInput = (extraProps: any = {}) => {
  return mount(
    <GridFormTextInput
      field={{ ...stubTextField, ...extraProps }}
      register={jest.fn()}
    />
  );
};

const renderGridFormSelectInput = (extraProps: any = {}): ReactWrapper => {
  return mount(
    <GridFormSelectInput
      field={{ ...stubSelectField, ...extraProps }}
      register={jest.fn()}
    />
  );
};

const renderGridFormTextArea = (extraProps: any = {}) => {
  return mount(
    <GridFormTextArea
      field={{ ...stubTextareaField, ...extraProps }}
      register={jest.fn()}
    />
  );
};

const renderGridFormRadioGroupInput = (extraProps: any = {}) => {
  return mount(
    <GridFormRadioGroupInput
      field={{ ...stubRadioGroupField, ...extraProps }}
      setValue={jest.fn()}
      register={jest.fn()}
    />
  );
};

const getComponent = (
  componentName: string,
  validationProps: any
): ReactWrapper => {
  switch (componentName) {
    case 'GridFormTextInput':
      return renderGridFormTextInput(validationProps);
    case 'GridFormSelectInput':
      return renderGridFormSelectInput(validationProps);
    case 'GridFormTextArea':
      return renderGridFormTextArea(validationProps);
    case 'GridFormRadioGroupInput':
      return renderGridFormRadioGroupInput(validationProps);
    default:
  }
};
