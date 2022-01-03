import { setupRtl } from '@codecademy/gamut-tests';
import React from 'react';

import { FormContext } from '../../../__fixtures__/helpers';
import { stubCheckboxField } from '../../../__tests__/stubs';
import { GridFormCheckboxInput } from '..';

const renderView = setupRtl(GridFormCheckboxInput).options({
  wrapper: ({ children }) => (
    <FormContext mode="onSubmit">{children}</FormContext>
  ),
});

describe('GridFormCheckboxInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const { view } = renderView({
        field: { ...stubCheckboxField, id: 'mycoolid' },
      });

      expect(view.getByRole('checkbox')).toHaveAttribute('id', 'mycoolid');
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field name', () => {
      const { view } = renderView({
        field: { ...stubCheckboxField, name: 'name' },
      });

      expect(view.getByRole('checkbox')).toHaveAttribute('name', 'name');
    });
  });
});
