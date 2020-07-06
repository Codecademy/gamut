import GridFormTextArea from '../index';
import { mount } from 'enzyme';
import React from 'react';
import { stubTextareaField } from '../../../__tests__/stubs';

describe('GridFormTextArea', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an textarea with the same id', () => {
      const textarea = mount(
        <GridFormTextArea
          field={{ ...stubTextareaField, id: 'mycoolid' }}
          register={jest.fn()}
        />
      );

      expect(textarea.find('textarea#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders a textarea with the id equal to the field name', () => {
      const textarea = mount(
        <GridFormTextArea
          field={{ ...stubTextareaField, name: 'name' }}
          register={jest.fn()}
        />
      );

      expect(textarea.find('textarea#name').length).toBe(1);
    });
  });

  describe('required fields', () => {
    it('marks a field as required when a required validation boolean is passed', () => {
      const textarea = mount(
        <GridFormTextArea
          field={{ ...stubTextareaField, validation: { required: true } }}
          register={jest.fn()}
        />
      );

      expect(textarea.find('textarea').props().required).toBeTruthy();
    });

    it('marks a field as required when a required message is passed', () => {
      const textarea = mount(
        <GridFormTextArea
          field={{
            ...stubTextareaField,
            validation: { required: 'you _MUST_ fill me out' },
          }}
          register={jest.fn()}
        />
      );

      expect(textarea.find('textarea').props().required).toBeTruthy();
    });

    it('does __not__ mark a field as required when `required: false` is passed', () => {
      const textarea = mount(
        <GridFormTextArea
          field={{ ...stubTextareaField, validation: { required: false } }}
          register={jest.fn()}
        />
      );

      expect(textarea.find('textarea').props().required).toBeFalsy();
    });

    it('does __not__ mark a field as required when required is not passed', () => {
      const textarea = mount(
        <GridFormTextArea
          field={{ ...stubTextareaField }}
          register={jest.fn()}
        />
      );

      expect(textarea.find('textarea').props().required).toBeFalsy();
    });
  });
});
