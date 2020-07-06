import GridFormTextInput from '../index';
import { mount } from 'enzyme';
import React from 'react';
import { stubTextField } from '../../../__tests__/stubs';
import { itHandlesRequiredProps } from '../../TestHelper';

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

  itHandlesRequiredProps('GridFormTextInput', 'input');
});
