import { itHandlesStandardFieldTests } from '../../__fixtures__/assertions';
import { setupGridFormTextInput } from '../../__fixtures__/renderers';

describe('GridFormTextInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const textInput = setupGridFormTextInput({ id: 'mycoolid' });

      expect(textInput.find('input#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field name', () => {
      const textInput = setupGridFormTextInput({ name: 'name' });

      expect(textInput.find('input#name').length).toBe(1);
    });
  });

  itHandlesStandardFieldTests('GridFormTextInput', 'input');
});
