import React from 'react';
import { render } from '@testing-library/react';

import { MathBlock } from '../';

jest.mock('katex', ()=> ({
  renderToString: () => '<div>1234</div>',
}));

describe('MathBlock', () => {
  it('renders itself and children', () => {
    const latexText = '1234';
    const view = render(<MathBlock>1234</MathBlock>);

    view.getByText(latexText);
  });
});


