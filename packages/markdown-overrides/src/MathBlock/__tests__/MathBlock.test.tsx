import { render } from '@testing-library/react';

import { MathBlock } from '..';

describe('MathBlock', () => {
  describe('with valid LaTex', () => {
    it('renders itself and children', () => {
      const latexText = '1234';

      const view = render(<MathBlock>{latexText}</MathBlock>);

      view.getByText(latexText);
    });
  });

  describe('with invalid LaTex', () => {
    it('catches and renders parsing errors', () => {
      const invalidLaTeX = 'invalid & latex';

      const view = render(<MathBlock>{invalidLaTeX}</MathBlock>);

      view.getByText('parse error', { exact: false });
    });
  });
});
