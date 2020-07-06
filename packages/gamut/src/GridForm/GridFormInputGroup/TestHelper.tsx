import { mount } from 'enzyme';
import React from 'react';
import GridFormTextInput from './GridFormTextInput';
import { stubSelectField, stubTextField } from '../__tests__/stubs';
import GridFormSelectInput from './GridFormSelectInput';

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

  switch (componentName) {
    case 'GridFormTextInput':
      component = renderGridFormTextInput({ validation: { required: true } });
    case 'GridFormSelectInput':
      component = renderGridFormSelectInput({ validation: { required: true } });
  }

  expect(component.find(inputType).props().required).toBeTruthy();
};

export const isMarkedRequiredWithMessage = (
  componentName: string,
  inputType: string
): void => {
  let component;

  switch (componentName) {
    case 'GridFormTextInput':
      component = renderGridFormTextInput({
        validation: { required: 'Required' },
      });
    case 'GridFormSelectInput':
      component = renderGridFormSelectInput({
        validation: { required: 'Required' },
      });
  }

  expect(component.find(inputType).props().required).toBeTruthy();
};

export const isMarkedNotRequiredWithBoolean = (
  componentName: string,
  inputType: string
): void => {
  let component;

  switch (componentName) {
    case 'GridFormTextInput':
      component = renderGridFormTextInput({ validation: { required: false } });
    case 'GridFormSelectInput':
      component = renderGridFormSelectInput({
        validation: { required: false },
      });
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
