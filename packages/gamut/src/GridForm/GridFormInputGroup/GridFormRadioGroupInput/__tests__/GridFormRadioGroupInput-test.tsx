import GridFormRadioGroupInput from '../index';
import { mount } from 'enzyme';
import React from 'react';
import { stubRadioGroupField } from '../../../__tests__/stubs';

describe('GridFormRadioGroupInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const textInput = mount(
        <GridFormRadioGroupInput
          field={{
            ...stubRadioGroupField,
            id: 'mycoolid',
            name: 'name',
          }}
          setValue={jest.fn()}
          register={jest.fn()}
        />
      );

      expect(textInput.find('input#name-0-mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field option value', () => {
      const textInput = mount(
        <GridFormRadioGroupInput
          field={{ ...stubRadioGroupField, name: 'name' }}
          setValue={jest.fn()}
          register={jest.fn()}
        />
      );

      expect(textInput.find('input#name-0').length).toBe(1);
    });
  });
});
