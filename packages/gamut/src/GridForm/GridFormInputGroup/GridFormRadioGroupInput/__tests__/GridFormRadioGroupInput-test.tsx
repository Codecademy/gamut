import React from 'react';

import { RadioGroup } from '../../../..';
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

  describe('aria-label', () => {
    it('aria-label is set to the label by default', () => {
      const radioButtons = renderGridFormRadioGroupInput({
        label: 'Test Label',
      });

      expect(radioButtons.find(RadioGroup).props()['aria-label']).toBe(
        'Test Label'
      );
    });

    it('aria-label is overridden by the ariaLabel prop', () => {
      const radioButtons = renderGridFormRadioGroupInput({
        label: 'Test Label',
        ariaLabel: 'Overridden Test Label',
      });

      expect(radioButtons.find(RadioGroup).props()['aria-label']).toBe(
        'Overridden Test Label'
      );
    });

    it('aria-label is used when JSX is passed to the label', () => {
      const radioButtons = renderGridFormRadioGroupInput({
        label: <img alt="" src="" />,
        ariaLabel: 'Overridden Test Label',
      });

      expect(radioButtons.find(RadioGroup).props()['aria-label']).toBe(
        'Overridden Test Label'
      );
    });
  });
});
