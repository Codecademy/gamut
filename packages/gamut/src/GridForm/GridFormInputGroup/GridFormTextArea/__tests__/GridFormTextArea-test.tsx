import { setupRtl } from '@codecademy/gamut-tests';

import { stubTextareaField } from '../../../__tests__/stubs';
import { GridFormTextArea } from '..';

const renderView = setupRtl(GridFormTextArea, {
  register: jest.fn(),
});

describe('GridFormTextArea', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an textarea with the same id', () => {
      const { view } = renderView({
        field: { ...stubTextareaField, id: 'mycoolid' },
      });

      expect(view.getByRole('textbox')).toHaveAttribute('id', 'mycoolid');
    });
  });

  describe('when no id is passed', () => {
    it('renders a textarea with the id equal to the field name', () => {
      const { view } = renderView({
        field: { ...stubTextareaField, name: 'name' },
      });

      expect(view.getByRole('textbox')).toHaveAttribute('name', 'name');
    });
  });
});
