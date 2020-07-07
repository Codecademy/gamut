import GridFormFileInput from '../index';
import { mount } from 'enzyme';
import React from 'react';
import { stubFileField } from '../../../__tests__/stubs';
import { itHandlesRequiredProps } from '../../TestHelper';

describe('GridFormFileInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const fileInput = mount(
        <GridFormFileInput
          field={{ ...stubFileField, id: 'mycoolid' }}
          register={jest.fn()}
        />
      );

      expect(fileInput.find('input#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field name', () => {
      const fileInput = mount(
        <GridFormFileInput
          field={{ ...stubFileField, name: 'name' }}
          register={jest.fn()}
        />
      );

      expect(fileInput.find('input#name').length).toBe(1);
    });
  });

  itHandlesRequiredProps('GridFormFileInput', 'input');
});
