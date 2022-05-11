import React from 'react';

import { itHandlesStandardFieldTests } from '../../__fixtures__/assertions';
import { getComponent } from '../../__fixtures__/renderers';

const { renderField, defaultFieldProps } = getComponent(
  'GridFormRadioGroupInput'
);

describe('GridFormRadioGroupInput', () => {
  itHandlesStandardFieldTests('GridFormRadioGroupInput', 'radiogroup');

  describe('Radio', () => {
    it('accepts JSX for the label', () => {
      const { view } = renderField({
        field: {
          ...defaultFieldProps,
          id: 'id',
          options: [{ label: <img alt="" src="" />, value: '' }],
          name: 'name',
        },
      });

      expect(view.getByRole('img'));
    });
  });

  describe('aria-label', () => {
    it('aria-label is set to the label by default', () => {
      const { view } = renderField({
        field: { ...defaultFieldProps, label: 'Test Label' },
      });

      expect(view.getByLabelText('Test Label'));
    });

    it('aria-label is overridden by the ariaLabel prop', () => {
      const { view } = renderField({
        field: {
          ...defaultFieldProps,
          label: 'Test Label',
          ariaLabel: 'Overridden Test Label',
        },
      });

      expect(view.getByLabelText('Overridden Test Label'));
    });

    it('aria-label is used when JSX is passed to the label', () => {
      const { view } = renderField({
        field: {
          ...defaultFieldProps,
          label: <img alt="" src="" />,
          ariaLabel: 'Overridden Test Label',
        },
      });
      expect(view.getByLabelText('Overridden Test Label'));
    });
  });
});
