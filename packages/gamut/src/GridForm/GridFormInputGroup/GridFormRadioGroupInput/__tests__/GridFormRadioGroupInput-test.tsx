import { setupRtl } from '@codecademy/gamut-tests';
import React from 'react';

import { stubRadioGroupField } from '../../../__tests__/stubs';
import { GridFormRadioGroupInput } from '..';

const renderView = setupRtl(GridFormRadioGroupInput, {
  register: jest.fn(),
  setValue: jest.fn(),
});

describe('GridFormRadioGroupInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const { view } = renderView({
        field: { ...stubRadioGroupField, id: 'mycoolid', name: 'name' },
      });

      expect(view.getAllByRole('radio')[0]).toHaveAttribute(
        'id',
        'name-0-mycoolid'
      );
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field option value', () => {
      const { view } = renderView({
        field: { ...stubRadioGroupField, name: 'name' },
      });

      expect(view.getAllByRole('radio')[0]).toHaveAttribute('id', 'name-0');
    });
  });

  describe('Radio', () => {
    it('accepts JSX for the label', () => {
      const { view } = renderView({
        field: {
          ...stubRadioGroupField,
          id: 'id',
          options: [{ label: <img alt="" src="" />, value: '' }],
          name: 'name',
        },
      });

      view.getByRole('img');
    });
  });

  describe('aria-label', () => {
    it('aria-label is set to the label by default', () => {
      const { view } = renderView({
        field: { ...stubRadioGroupField, label: 'Test Label' },
      });

      expect(view.getAllByRole('radiogroup')[0]).toHaveAttribute(
        'aria-label',
        'Test Label'
      );
    });

    it('aria-label is overridden by the ariaLabel prop', () => {
      const { view } = renderView({
        field: {
          ...stubRadioGroupField,
          label: 'Test Label',
          ariaLabel: 'Overridden Test Label',
        },
      });

      expect(view.getAllByRole('radiogroup')[0]).toHaveAttribute(
        'aria-label',
        'Overridden Test Label'
      );
    });

    it('aria-label is used when JSX is passed to the label', () => {
      const { view } = renderView({
        field: {
          ...stubRadioGroupField,
          label: <img alt="" src="" />,
          ariaLabel: 'Overridden Test Label',
        },
      });

      expect(view.getAllByRole('radiogroup')[0]).toHaveAttribute(
        'aria-label',
        'Overridden Test Label'
      );
    });
  });
});
