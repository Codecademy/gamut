import {
  itHandlesRequiredProps,
  renderGridFormFileInput,
} from '../../TestHelper';

describe('GridFormFileInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const fileInput = renderGridFormFileInput({ id: 'mycoolid' });

      expect(fileInput.find('input#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field name', () => {
      const fileInput = renderGridFormFileInput({ name: 'name' });

      expect(fileInput.find('input#name').length).toBe(1);
    });
  });

  itHandlesRequiredProps('GridFormFileInput', 'input');
});
