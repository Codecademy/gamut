import {
  itHandlesRequiredProps,
  renderGridFormRadioGroupInput,
} from '../../TestHelper';

describe('GridFormRadioGroupInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const radioButtons = renderGridFormRadioGroupInput({
        id: 'mycoolid',
        name: 'name',
      });

      expect(radioButtons.find('input#name-0-mycoolid').length).toBe(1);
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field option value', () => {
      const radioButtons = renderGridFormRadioGroupInput({ name: 'name' });

      expect(radioButtons.find('input#name-0').length).toBe(1);
    });
  });

  itHandlesRequiredProps('GridFormRadioGroupInput', 'input#stub-radio-group-0');
  itHandlesRequiredProps('GridFormRadioGroupInput', 'input#stub-radio-group-1');
});
