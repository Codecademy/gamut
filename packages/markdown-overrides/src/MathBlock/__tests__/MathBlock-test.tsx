import React from 'react';
import { render } from '@testing-library/react';
import katex from 'katex';

import { MathBlock } from '../';

jest.mock('katex');

describe('MathBlock', () => {
  describe('with valid LaTex', () => {
    it('renders itself and children', () => {
      const latexText = '1234';

      (katex as any).renderToString.mockReturnValue(`<div>${latexText}</div>`);

      const view = render(<MathBlock>{latexText}</MathBlock>);

      view.getByText(latexText);
    });
  });

  describe('with invalid LaTex', () => {
    it('catches and renders parsing errors', () => {
      const parsingErrorText = 'parsing error';

      (katex as any).renderToString.mockImplementation(() => {
        throw new Error(parsingErrorText);
      });

      const view = render(<MathBlock>children</MathBlock>);

      view.getByText(parsingErrorText);
    });
  });
});
