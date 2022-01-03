import { setupRtl } from '@codecademy/gamut-tests';

import { stubTextField } from '../../../__tests__/stubs';
import { GridFormTextInput } from '..';

const renderView = setupRtl(GridFormTextInput, {
  register: jest.fn(),
});

describe('GridFormTextInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const { view } = renderView({
        field: { ...stubTextField, id: 'mycoolid' },
      });

      expect(view.getByRole('textbox')).toHaveAttribute('id', 'mycoolid');
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field name', () => {
      const { view } = renderView({
        field: { ...stubTextField, name: 'name' },
      });

      expect(view.getByRole('textbox')).toHaveAttribute('name', 'name');
    });
  });
});
