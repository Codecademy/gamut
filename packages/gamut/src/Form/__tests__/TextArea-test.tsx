import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { TextArea } from '..';

const renderDropdownButton = setupRtl(TextArea);

describe('TextArea', () => {
  it('displays current / maximum characters when passed in a characterMax value', () => {
    const { view } = renderDropdownButton({
      characterMax: 50,
    });
    view.getByText(/0 \/ 50/);
  });

  it('displays correct character count after typing', async () => {
    const { view } = renderDropdownButton({
      characterMax: 10,
    });
    const textAreaInput = view.getByRole('textbox');

    await act(async () => {
      fireEvent.change(textAreaInput, { target: { value: 'abc' } });
    });

    view.getByText(/3 \/ 10/);
  });
});
