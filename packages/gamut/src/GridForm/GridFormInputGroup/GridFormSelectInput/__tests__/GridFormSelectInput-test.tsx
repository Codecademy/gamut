import { setupRtl } from '@codecademy/gamut-tests';

import { stubSelectField } from '../../../__tests__/stubs';
import { GridFormSelectInput } from '..';

const renderView = setupRtl(GridFormSelectInput, {
  register: jest.fn(),
});

describe('GridFormSelectInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders a select with the same id', () => {
      const { view } = renderView({
        field: {
          ...stubSelectField,
          id: 'mycoolid',
        },
      });

      expect(view.getByRole('combobox')).toHaveAttribute('id', 'mycoolid');
    });
  });

  describe('when no id is passed', () => {
    it('renders a select with the id equal to the field name', () => {
      const { view } = renderView({
        field: {
          ...stubSelectField,
          name: 'name',
        },
      });

      expect(view.getByRole('combobox')).toHaveAttribute('id', 'name');
    });
  });
});
