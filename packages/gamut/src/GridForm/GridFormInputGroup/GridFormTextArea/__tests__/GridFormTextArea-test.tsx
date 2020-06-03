import GridFormTextArea from '../index';
import { mount } from 'enzyme';
import React from 'react';
import { stubTextareaField } from '../../../__tests__/stubs';

describe('GridFormTextArea', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an textarea with the same id', () => {
      const textarea = mount(
        <GridFormTextArea
          field={stubTextareaField}
          register={jest.fn()}
          id={'mycoolid'}
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
});
