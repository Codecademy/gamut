import { renderGridFormCheckboxInput } from '../../__fixtures__/renderers';

describe('GridFormCheckboxInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const checkboxInput = renderGridFormCheckboxInput({ id: 'mycoolid' });

      expect(checkboxInput.find('input#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field name', () => {
      const checkboxInput = renderGridFormCheckboxInput({ name: 'name' });

      expect(checkboxInput.find('input#name').length).toBe(1);
    });
  });
});
