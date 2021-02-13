import { itHandlesAriaInvalid } from '../../__fixtures__/assertions';
import { renderGridFormSelectInput } from '../../__fixtures__/renderers';

describe('GridFormSelectInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders a select with the same id', () => {
      const selectInput = renderGridFormSelectInput({ id: 'mycoolid' });

      expect(selectInput.find('select#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders a select with the id equal to the field name', () => {
      const selectInput = renderGridFormSelectInput({ name: 'name' });

      expect(selectInput.find('select#name').length).toBe(1);
    });
  });

  itHandlesAriaInvalid('GridFormSelectInput', 'select');
});
