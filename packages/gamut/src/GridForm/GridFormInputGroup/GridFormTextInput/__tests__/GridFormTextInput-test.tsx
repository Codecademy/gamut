import GridFormTextInput from '../index';
import { mount } from 'enzyme';
import React from 'react';
import { stubTextField } from '../../../__tests__/stubs';

describe('GridFormTextInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const textInput = mount(
        <GridFormTextInput
          field={{ ...stubTextField, id: 'mycoolid' }}
          register={jest.fn()}
        />
      );

      expect(textInput.find('input#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field name', () => {
      const textInput = mount(
        <GridFormTextInput
          field={{ ...stubTextField, name: 'name' }}
          register={jest.fn()}
        />
      );

      expect(textInput.find('input#name').length).toBe(1);
    });
  });

  describe('required fields', () => {
    it('marks a field as required when a required validation boolean is passed', () => {
      const textInput = mount(
        <GridFormTextInput
          field={{ ...stubTextField, validation: { required: true } }}
          register={jest.fn()}
        />
      );

      expect(textInput.find('input').props().required).toBeTruthy();
    });

    it('marks a field as required when a required message is passed', () => {
      const textInput = mount(
        <GridFormTextInput
          field={{ ...stubTextField, validation: { required: 'Required' } }}
          register={jest.fn()}
        />
      );

      expect(textInput.find('input').props().required).toBeTruthy();
    });

    it('does __not__ mark a field as required when `required: false` is passed', () => {
      const textInput = mount(
        <GridFormTextInput
          field={{ ...stubTextField, validation: { required: false } }}
          register={jest.fn()}
        />
      );

      expect(textInput.find('input').props().required).toBeFalsy();
    });

    it('does __not__ mark a field as required when required is not passed', () => {
      const textInput = mount(
        <GridFormTextInput
          field={{
            ...stubTextField,
            validation: {
              pattern: {
                value: /[^@]+@[^@]+\.[^@]+/,
                message: 'Email Invalid',
              },
            },
          }}
          register={jest.fn()}
        />
      );

      expect(textInput.find('input').props().required).toBeFalsy();
    });
  });
});
