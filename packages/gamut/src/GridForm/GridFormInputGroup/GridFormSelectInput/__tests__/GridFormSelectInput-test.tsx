import GridFormSelectInput from '../index';
import { mount } from 'enzyme';
import React from 'react';

describe('GridFormSelectInput', () => {
  const name = 'name';

  describe('when an id is passed as a prop', () => {
    it('renders a select with the same id', () => {
      const id = 'mycoolid';

      const textInput = mount(
        <GridFormSelectInput
          field={{
            type: 'select',
            name: name,
            options: [],
          }}
          register={jest.fn()}
          id={id}
        />
      );

      expect(textInput.find('select#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders a select with the id equal to the field name', () => {
      const textInput = mount(
        <GridFormSelectInput
          field={{
            type: 'select',
            name: name,
            options: [],
          }}
          register={jest.fn()}
        />
      );

      expect(textInput.find('select#name').length).toBe(1);
    });
  });
});
