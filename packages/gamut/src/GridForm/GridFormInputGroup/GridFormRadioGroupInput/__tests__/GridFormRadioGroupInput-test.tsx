import GridFormRadioGroupInput from '../index';
import { mount } from 'enzyme';
import React from 'react';

describe('GridFormRadioGroupInput', () => {
  const type = 'radio-group';
  const name = 'name';

  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const id = 'mycoolid';

      const textInput = mount(
        <GridFormRadioGroupInput
          field={{
            type: type,
            name: name,
            options: [
              {
                label: 'label',
                value: 'value',
              },
            ],
          }}
          setValue={jest.fn()}
          register={jest.fn()}
          id={id}
        />
      );

      expect(textInput.find('input#name-0-mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field option value', () => {
      const textInput = mount(
        <GridFormRadioGroupInput
          field={{
            type: type,
            name: name,
            options: [
              {
                label: 'label',
                value: 'value',
              },
            ],
          }}
          setValue={jest.fn()}
          register={jest.fn()}
        />
      );

      expect(textInput.find('input#name-0').length).toBe(1);
    });
  });
});
