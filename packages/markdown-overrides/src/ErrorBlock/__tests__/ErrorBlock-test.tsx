import React from 'react';
import { render } from '@testing-library/react';

import { ErrorBlock } from '../';

describe('PsuedoBlock', () => {
  it('renders', () => {
    render(<ErrorBlock />);
  });
});
