import GridFormCheckboxInput from '../index';
import { mount } from 'enzyme';
import React from 'react';

describe('GridFormCheckboxInput', () => {
  const type = 'checkbox';
  const name = 'name';
  const description = 'description';

  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const id = 'mycoolid';

      const textInput = mount(
        <GridFormCheckboxInput
          field={{
            type: type,
            name: name,
            description: description,
          }}
          register={jest.fn()}
          id={id}
        />
      );

      expect(textInput.find('input#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field name', () => {
      const textInput = mount(
        <GridFormCheckboxInput
          field={{
            type: type,
            name: name,
            description: description,
          }}
          register={jest.fn()}
        />
      );

      expect(textInput.find('input#name').length).toBe(1);
    });
  });
});
