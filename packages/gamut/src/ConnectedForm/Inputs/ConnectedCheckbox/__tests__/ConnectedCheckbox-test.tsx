import { setupRtl } from '@codecademy/gamut-tests';
import React from 'react';

import { ConnectedFormInput } from '../../__fixtures__/renderers';
import { ConnectedCheckbox } from '..';

const renderView = setupRtl(ConnectedFormInput, {
  field: (
    <ConnectedCheckbox
      label="check me out"
      name="check-field"
      htmlFor="check-field"
    />
  ),
});

describe('GridFormCheckboxInput', () => {
  it('renders a checkbox input with the same id', () => {
    const view = renderView({});
    const checkbox = view.getByRole('checkbox', {
      name: 'Stub Checkbox Check me!',
    });
    expect(view.getByRole('checkbox'));
  });
});
