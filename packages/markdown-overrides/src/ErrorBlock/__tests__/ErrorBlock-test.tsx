import React from 'react';
import { render } from '@testing-library/react';

import { ErrorBlock } from '../';

describe('ErrorBlock', () => {
  it('renders itself and children', () => {
    const errorText = 'error!';
    const { getByText } = render(<ErrorBlock>{errorText}</ErrorBlock>);

    getByText(errorText);
  });
});
