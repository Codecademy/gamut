import {
  itHandlesRequiredProps,
  renderGridFormTextArea,
} from '../../TestHelper';

describe('GridFormTextArea', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an textarea with the same id', () => {
      const textarea = renderGridFormTextArea({ id: 'mycoolid' });

      expect(textarea.find('textarea#mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders a textarea with the id equal to the field name', () => {
      const textarea = renderGridFormTextArea({ name: 'name' });

      expect(textarea.find('textarea#name').length).toBe(1);
    });
  });

  itHandlesRequiredProps('GridFormTextArea', 'textarea');
});
