import {
  renderGridFormTextInput,
  renderGridFormToolTipWrapper,
} from '../../__fixtures__/renderers';

describe('GridFormToolTip', () => {
  describe('when an id is passed as a prop', () => {
    it('renders a select with the same id', () => {
      const wrapper = renderGridFormToolTipWrapper(
        { id: 'my-cool-rapper-id' },
        renderGridFormTextInput({ id: 'input-id' })
      );

      expect(wrapper.find('div#my-cool-rapper-id').length).toBe(1);
      expect(wrapper.find('input#input-id').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field name', () => {
      const wrapper = renderGridFormToolTipWrapper(
        { id: 'id' },
        renderGridFormTextInput({ name: 'name' })
      );

      expect(wrapper.find('input#name').length).toBe(1);
    });
  });
});
