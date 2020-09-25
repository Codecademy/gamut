import React from 'react';
import { render } from '@testing-library/react';

import { PseudoBlock } from '../';

describe('PsuedoBlock', () => {
  it('renders itself and children', () => {
    const psuedoText = 'pseudocode!';
    const { getByText } = render(<PseudoBlock>{psuedoText}</PseudoBlock>);

    getByText(psuedoText);
  });
});
