import styles from './styles.module.scss';

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
      className: styles.lintDecoration,
      glyphMarginClassName: styles.lintGlyph,
      glyphMarginHoverMessage: message,
      hoverMessage: message,
      inlineClassName: styles.lintedText,
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
