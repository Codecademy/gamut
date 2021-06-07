import React from 'react';

import { renderGridFormRadioGroupInput } from '../../__fixtures__/renderers';

describe('GridFormRadioGroupInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const radioButtons = renderGridFormRadioGroupInput({
        id: 'mycoolid',
        name: 'name',
      });

      expect(radioButtons.find('input#name-0-mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field option value', () => {
      const radioButtons = renderGridFormRadioGroupInput({ name: 'name' });

      expect(radioButtons.find('input#name-0').length).toBe(1);
    });
  });

  it('accepts JSX for the group label', () => {
    const radioButtons = renderGridFormRadioGroupInput({
      label: (
        <div>
          <span>Test Label</span>
        </div>
      ),
    });

    console.log(radioButtons.debug());

    expect(radioButtons.text()).toContain('Test Label');
  });

  describe('when label is passed as a ReactNode', () => {
    it('renders an input with the same id', () => {
      const radioButtons = renderGridFormRadioGroupInput({
        id: 'mycoolid',
        name: 'name',
      });

      expect(radioButtons.find('input#name-0-mycoolid').length).toBe(1);
    });
  });

  describe('Radio', () => {
    it('accepts JSX for the label', () => {
      const radioButtons = renderGridFormRadioGroupInput({
        id: 'id',
        options: [{ label: <img alt="" src="" />, value: '' }],
        name: 'name',
      });

      expect(radioButtons.find('img').length).toBe(1);
    });
  });
});
