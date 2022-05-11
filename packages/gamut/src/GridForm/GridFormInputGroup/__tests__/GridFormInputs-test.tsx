import { itHandlesStandardFieldTests } from '../__fixtures__/assertions';

describe('GridFormInputs', () => {
  describe.each([
    { name: 'GridFormCheckboxInput', selector: 'checkbox' },
    { name: 'GridFormSelectInput', selector: 'combobox' },
  ])('$name', ({ name, selector }) => {
    itHandlesStandardFieldTests(name, selector);
  });
});
