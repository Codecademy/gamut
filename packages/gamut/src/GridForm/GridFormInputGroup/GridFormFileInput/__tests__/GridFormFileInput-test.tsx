import GridFormFileInput from '../index';
import { mount } from 'enzyme';
import React from 'react';

describe('GridFormFileInput', () => {
  const type = 'file';
  const name = 'name';

  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const id = 'mycoolid';

      const textInput = mount(
        <GridFormFileInput
          field={{
            type: type,
            name: name,
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
        <GridFormFileInput
          field={{
            type: type,
            name: name,
          }}
          register={jest.fn()}
        />
      );

      expect(textInput.find('input#name').length).toBe(1);
    });
  });
});
