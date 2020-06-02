import GridFormTextArea from '../index';
import { mount } from 'enzyme';
import React from 'react';

describe('GridFormTextArea', () => {
  const name = 'name';

  describe('when an id is passed as a prop', () => {
    it('renders an textarea with the same id', () => {
      const id = 'mycoolid';

      const textarea = mount(
        <GridFormTextArea
          field={{
            name: name,
            type: 'textarea',
          }}
          register={jest.fn()}
          id={id}
        />
      );

      expect(textarea.find('textarea#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders a textarea with the id equal to the field name', () => {
      const textarea = mount(
        <GridFormTextArea
          field={{
            type: 'textarea',
            name: name,
          }}
          register={jest.fn()}
        />
      );

      expect(textarea.find('textarea#name').length).toBe(1);
    });
  });
});
