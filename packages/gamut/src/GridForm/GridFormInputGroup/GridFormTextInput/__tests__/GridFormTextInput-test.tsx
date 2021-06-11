import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';

import { stubTextField } from '../../../__tests__/stubs';
import { itHandlesAriaInvalid } from '../../__fixtures__/assertions';
import { GridFormTextInput } from '..';

const renderGridFormTextInput = setupRtl(GridFormTextInput, {
  clearErrors: jest.fn(),
  field: stubTextField,
  register: jest.fn(),
});

describe('GridFormTextInput', () => {
  describe('when an id is passed as a prop', () => {
    it('renders an input with the same id', () => {
      const { view } = renderGridFormTextInput({
        field: {
          ...stubTextField,
          id: 'mycoolid',
        },
      });

      expect(view.getByRole('textbox')).toHaveProperty('id', 'mycoolid');
    });
  });

  describe('when no id is passed', () => {
    it('renders an input with the id equal to the field name', () => {
      const { view } = renderGridFormTextInput({
        field: {
          ...stubTextField,
          name: 'name',
        },
      });

      expect(view.getByRole('textbox')).toHaveProperty('id', 'name');
    });
  });

  it('clears errors when typed into', () => {
    const { view } = renderGridFormTextInput();

    userEvent.type(view.getByRole('textbox'), 'hi');
  });

  itHandlesAriaInvalid('GridFormTextInput', 'input');
});
