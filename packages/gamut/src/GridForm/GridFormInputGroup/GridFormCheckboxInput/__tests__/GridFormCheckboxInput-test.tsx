import GridFormCheckboxInput from '../index';
import { mount } from 'enzyme';
import React from 'react';
import { stubCheckboxField } from '../../../__tests__/stubs';
import { itHandlesRequiredProps } from '../../TestHelper';

describe('GridFormCheckboxInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const textInput = mount(
        <GridFormCheckboxInput
          field={{ ...stubCheckboxField, id: 'mycoolid' }}
          register={jest.fn()}
        />
      );

      expect(textInput.find('input#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field name', () => {
      const textInput = mount(
        <GridFormCheckboxInput
          field={{ ...stubCheckboxField, name: 'name' }}
          register={jest.fn()}
        />
      );

      expect(textInput.find('input#name').length).toBe(1);
    });
  });

  itHandlesRequiredProps('GridFormCheckboxInput', 'input');
});
