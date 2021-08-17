import { validateHtmlSyntax } from '../validateHtmlSyntax';

describe('validateHtmlSyntax', () => {
  it('returns an empty array when HTMLHint returns no error messages', () => {
    const text = `<html></html>`;

    const result = validateHtmlSyntax(text);

    expect(result).toEqual([]);
  });

  it('returns an error message when HTMLHint returns an error message', () => {
    const text = `<html`;
    const message = { value: 'Special characters must be escaped : [ < ].' };

    const result = validateHtmlSyntax(text);

    expect(result).toEqual([
      {
        options: {
          className: 'lintDecoration',
          glyphMarginClassName: 'lintGlyph',
          glyphMarginHoverMessage: message,
          hoverMessage: message,
          inlineClassName: 'lintedText',
          overflowRuler: true,
        },
        range: {
          endColumn: 2,
          endLineNumber: 1,
          startColumn: 1,
          startLineNumber: 1,
        },
      },
    ]);
  });
});
