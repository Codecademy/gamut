import { render } from '@testing-library/react';

import { PseudoBlock } from '..';

describe('PsuedoBlock', () => {
  it('renders itself and children', () => {
    const psuedoText = 'pseudocode!';
    const view = render(<PseudoBlock>{psuedoText}</PseudoBlock>);

    view.getByText(psuedoText);
  });
});
