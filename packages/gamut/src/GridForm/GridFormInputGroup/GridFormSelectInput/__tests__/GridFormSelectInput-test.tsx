import GridFormSelectInput from '../index';
import { mount } from 'enzyme';
import React from 'react';
import { stubSelectField } from '../../../__tests__/stubs';

describe('GridFormSelectInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders a select with the same id', () => {
      const textInput = mount(
        <GridFormSelectInput
          field={{ ...stubSelectField, id: 'mycoolid' }}
          register={jest.fn()}
        />
      );

      expect(textInput.find('select#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders a select with the id equal to the field name', () => {
      const textInput = mount(
        <GridFormSelectInput
          field={{ ...stubSelectField, name: 'name' }}
          register={jest.fn()}
        />
      );

      expect(textInput.find('select#name').length).toBe(1);
    });
  });
});
