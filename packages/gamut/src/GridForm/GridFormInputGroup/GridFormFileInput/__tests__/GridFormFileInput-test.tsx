import { setupRtl } from '@codecademy/gamut-tests';

import { stubFileField } from '../../../__tests__/stubs';
import { GridFormFileInput } from '..';

const renderView = setupRtl(GridFormFileInput, {
  register: jest.fn(),
});

describe('GridFormFileInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const { view } = renderView({
        field: { ...stubFileField, id: 'mycoolid' },
      });

      expect(view.container.querySelector('input[type=file]')).toHaveAttribute(
        'id',
        'mycoolid'
      );
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field name', () => {
      const { view } = renderView({
        field: { ...stubFileField, name: 'name' },
      });

      expect(view.container.querySelector('input[type=file]')).toHaveAttribute(
        'name',
        'name'
      );
    });
  });
});
