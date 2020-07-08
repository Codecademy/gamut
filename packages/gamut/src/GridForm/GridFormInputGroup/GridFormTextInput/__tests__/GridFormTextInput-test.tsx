import {
  itHandlesRequiredProps,
  renderGridFormTextInput,
} from '../../TestHelper';

describe('GridFormTextInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const textInput = renderGridFormTextInput({ id: 'mycoolid' });

      expect(textInput.find('input#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field name', () => {
      const textInput = renderGridFormTextInput({ name: 'name' });

      expect(textInput.find('input#name').length).toBe(1);
    });
  });

  itHandlesRequiredProps('GridFormTextInput', 'input');
});
