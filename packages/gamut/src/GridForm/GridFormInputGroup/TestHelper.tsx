import { mount } from 'enzyme';
import React from 'react';
import GridFormTextInput from './GridFormTextInput';
import {
  stubSelectField,
  stubTextareaField,
  stubTextField,
} from '../__tests__/stubs';
import GridFormSelectInput from './GridFormSelectInput';
import GridFormTextArea from './GridFormTextArea';

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
  let component;
  const requiredTrue = { validation: { required: true } };

  switch (componentName) {
    case 'GridFormTextInput':
      component = renderGridFormTextInput(requiredTrue);
    case 'GridFormSelectInput':
      component = renderGridFormSelectInput(requiredTrue);
    case 'GridFormTextArea':
      component = renderGridFormTextArea(requiredTrue);
  }

  expect(component.find(inputType).props().required).toBeTruthy();
};

export const isMarkedRequiredWithMessage = (
  componentName: string,
  inputType: string
): void => {
  let component;
  const requiredMessage = { validation: { required: 'Required' } };

  switch (componentName) {
    case 'GridFormTextInput':
      component = renderGridFormTextInput(requiredMessage);
    case 'GridFormSelectInput':
      component = renderGridFormSelectInput(requiredMessage);
    case 'GridFormTextArea':
      component = renderGridFormTextArea(requiredMessage);
  }

  expect(component.find(inputType).props().required).toBeTruthy();
};

export const isMarkedNotRequiredWithBoolean = (
  componentName: string,
  inputType: string
): void => {
  let component;
  const requiredFalse = { validation: { required: false } };

  switch (componentName) {
    case 'GridFormTextInput':
      component = renderGridFormTextInput(requiredFalse);
    case 'GridFormSelectInput':
      component = renderGridFormSelectInput(requiredFalse);
    case 'GridFormTextArea':
      component = renderGridFormTextArea(requiredFalse);
  }

  expect(component.find(inputType).props().required).toBeFalsy();
};

export const isMarkedNotRequiredWhenNotPassedRequiredProp = (
  componentName: string,
  inputType: string
): void => {
  let component;

  switch (componentName) {
    case 'GridFormTextInput':
      component = renderGridFormTextInput({});
    case 'GridFormSelectInput':
      component = renderGridFormSelectInput({});
    case 'GridFormTextArea':
      component = renderGridFormTextArea({});
  }

  expect(component.find(inputType).props().required).toBeFalsy();
};

const renderGridFormTextInput = (extraProps: any = {}) => {
  return mount(
    <GridFormTextInput
      field={{ ...stubTextField, ...extraProps }}
      register={jest.fn()}
    />
  );
};

const renderGridFormSelectInput = (extraProps: any = {}) => {
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
