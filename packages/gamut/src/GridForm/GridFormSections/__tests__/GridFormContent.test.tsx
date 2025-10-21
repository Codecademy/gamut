import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import { act } from '@testing-library/react';

import { stubTextField } from '../../__tests__/stubs';
import { GridFormContentTestComponent } from '../__fixtures__/renderers';

const renderView = setupRtl(GridFormContentTestComponent, {
  field: stubTextField,
  showRequired: false,
});

const validStubTextField = {
  ...stubTextField,
  validation: {
    pattern: {
      message: 'not enough updog',
      value: /updog(.*)updog/,
    },
    required: true,
  },
};

describe('GridFormContent', () => {
  it('renders the label and field', () => {
    const { view } = renderView();

    view.getByLabelText('Stub Text (optional)');
    view.getByRole('textbox', { name: /Stub Text/ });
  });

  it('gives the field access to form context and validation', async () => {
    const { view } = renderView({
      field: validStubTextField,
      mode: 'onChange',
    });

    act(() => {
      fireEvent.input(view.getByRole('textbox', { name: /Stub Text/ }), {
        target: {
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      });
    });
    expect(await view.findAllByRole('alert')).toHaveLength(1);
  });
});
