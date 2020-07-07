import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import GridFormTextInput from './GridFormTextInput';
import {
  stubCheckboxField,
  stubRadioGroupField,
  stubSelectField,
  stubTextareaField,
  stubTextField,
} from '../__tests__/stubs';
import GridFormSelectInput from './GridFormSelectInput';
import GridFormTextArea from './GridFormTextArea';
import GridFormRadioGroupInput from './GridFormRadioGroupInput';
import GridFormFileInput from './GridFormFileInput';
import GridFormCheckboxInput from './GridFormCheckboxInput';

export const itHandlesRequiredProps = (
  componentName: string,
  selector: string
): void => {
  describe('required fields', () => {
    it('marks a field as required when a required validation boolean is passed', () => {
      isMarkedRequiredWithBoolean(componentName, selector);
    });
    it('marks a field as required when a required message is passed', () => {
      isMarkedRequiredWithMessage(componentName, selector);
    });
    it('does __not__ mark a field as required when `required: false` is passed', () => {
      isMarkedNotRequiredWithBoolean(componentName, selector);
    });
    it('does __not__ mark a field as required when required is not passed', () => {
      isMarkedNotRequiredWhenNotPassedRequiredProp(componentName, selector);
    });
  });
};

export const isMarkedRequiredWithBoolean = (
  componentName: string,
  selector: string
): void => {
  const requiredTrue = { validation: { required: true } };
  const component = getComponent(componentName, requiredTrue);

  expect(component.find(selector).props().required).toBeTruthy();
};

export const isMarkedRequiredWithMessage = (
  componentName: string,
  selector: string
): void => {
  const requiredMessage = { validation: { required: 'Required' } };
  const component = getComponent(componentName, requiredMessage);

  expect(component.find(selector).props().required).toBeTruthy();
};

export const isMarkedNotRequiredWithBoolean = (
  componentName: string,
  selector: string
): void => {
  const requiredFalse = { validation: { required: false } };
  const component = getComponent(componentName, requiredFalse);

  expect(component.find(selector).props().required).toBeFalsy();
};

export const isMarkedNotRequiredWhenNotPassedRequiredProp = (
  componentName: string,
  selector: string
): void => {
  const component = getComponent(componentName, {});

  expect(component.find(selector).props().required).toBeFalsy();
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

const renderGridFormFileInput = (extraProps: any = {}): ReactWrapper => {
  return mount(
    <GridFormFileInput
      field={{ ...stubSelectField, ...extraProps }}
      register={jest.fn()}
    />
  );
};

const renderGridFormCheckboxInput = (extraProps: any = {}): ReactWrapper => {
  return mount(
    <GridFormCheckboxInput
      field={{ ...stubCheckboxField, ...extraProps }}
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
    case 'GridFormFileInput':
      return renderGridFormFileInput(validationProps);
    case 'GridFormCheckboxInput':
      return renderGridFormCheckboxInput(validationProps);
    default:
      return null;
  }
};
