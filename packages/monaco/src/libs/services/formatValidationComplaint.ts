import { theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';

const lintDecoration = css`
  background-color: ${theme.colors.red[500]};
  transform: scaleY(0.85);
`;
const lintGlyph = css`
  ::after {
    content: ' ';
    background-color: ${theme.colors.red[500]};
    border-radius: 100%;
    display: block;
    height: 10px;
    width: 10px;
  }
`;
const lintedText = css`
  color: ${theme.colors.white};
`;
export type RawValidationComplaint = {
  col: number;
  line: number;
  message: string;
};

export const formatValidationComplaint = (
  rawComplaint: RawValidationComplaint
) => {
  const message = { value: rawComplaint.message };

  return {
    options: {
      className: lintDecoration,
      glyphMarginClassName: lintGlyph,
      glyphMarginHoverMessage: message,
      hoverMessage: message,
      inlineClassName: lintedText,
      overflowRuler: true,
    },
    range: {
      endColumn: rawComplaint.col + 1,
      endLineNumber: rawComplaint.line,
      startColumn: rawComplaint.col,
      startLineNumber: rawComplaint.line,
    },
  };
};
