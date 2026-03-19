import { Theme } from '@emotion/react';
import { CSSObject } from '@codecademy/variance';

// Base markdown styles mixin equivalent
const markdownStyle = (
  theme: Theme,
  fontSize = '1.1rem',
  lineHeight: number | string = 1.6,
  baseMargin = '1rem'
): CSSObject => ({
  fontSize,
  '.g-md-h1, .g-md-h2, .g-md-h3, .g-md-h4': {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  '.g-md-p': {
    lineHeight,
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    '&:empty': { display: 'none' },
    '&:last-child': { marginBottom: 0 },
  },
  '.g-md-ul, .g-md-ol': {
    listStyle: 'none',
    paddingLeft: 0,
    margin: `${baseMargin} 0`,
    '.g-md-ul, .g-md-ol': {
      marginTop: `calc(${theme.spacing[16]} / 2)`,
      'li:last-child': { marginBottom: 0 },
    },
    '.g-md-li': {
      position: 'relative',
      marginLeft: theme.spacing[32],
      marginBottom: `calc(${theme.spacing[16]} / 2)`,
      lineHeight,
      '&:last-child': { marginBottom: theme.spacing[16] },
    },
  },
  '.g-md-ul .g-md-li::before': {
    background: 'currentColor',
    borderRadius: '100%',
    content: '" "',
    display: 'inline-block',
    height: '0.5rem',
    left: '-1.25rem',
    lineHeight: 1.6,
    position: 'absolute',
    textAlign: 'center',
    top: `calc(1.6rem - ${theme.spacing[16]})`,
    width: '0.5rem',
  },
  '.g-md-ol': {
    counterReset: "'ordered-list'",
    '> .g-md-li': {
      counterIncrement: 'ordered-list',
      '&::before': {
        background: 'transparent',
        content: "counter(ordered-list) '.'",
        position: 'absolute',
        top: 0,
        left: `calc(-${theme.spacing[32]})`,
        width: theme.spacing[32],
        textAlign: 'center',
        lineHeight: 'inherit',
      },
    },
  },
  '.g-md-code': {
    padding: '0 0.25rem',
    margin: '0 0.0625rem',
    borderRadius: '0.125rem',
    color: theme.colors['navy-900'],
    backgroundColor: theme.colors['gray-200'],
    whiteSpace: 'normal',
    verticalAlign: 'baseline',
    fontFamily: theme.fontFamily.monospace,
    fontSize: '0.8em',
  },
  '.g-md-pre': {
    whiteSpace: 'pre-wrap',
    '> .g-md-code': {
      display: 'block',
      whiteSpace: 'pre-wrap',
      padding: 0,
      margin: 0,
      color: 'inherit',
      backgroundColor: 'transparent',
      fontFamily: theme.fontFamily.monospace,
    },
  },
  '.g-md-img': {
    display: 'flex',
    maxWidth: '100%',
    margin: `${baseMargin} auto 0`,
  },
  '.g-md-p .g-md-img': {
    margin: '0 auto',
  },
  '.g-md-iframe': {
    width: '100%',
  },
  '.g-md-blockquote': {
    display: 'block',
    fontFamily: theme.fontFamily.base,
    paddingLeft: baseMargin,
    borderLeft: `calc(${baseMargin} / 2) solid ${theme.colors['gray-200']}`,
    margin: 0,
    marginBottom: baseMargin,
    fontStyle: 'italic',
    '> *': { whiteSpace: 'pre-wrap' },
  },
  '.g-md-details': {
    marginBottom: baseMargin,
    '.g-md-summary': { fontWeight: 'bold', cursor: 'pointer' },
  },
  '.g-md-details[open] .g-md-summary': {
    marginBottom: baseMargin,
  },
});

export type MarkdownSpacingStyleFn = (props: { theme: Theme }) => CSSObject;

// Spacing styles
export const spacingLoose: MarkdownSpacingStyleFn = ({ theme }) =>
  markdownStyle(theme, '1.2rem', 1.7);

export const spacingTight: MarkdownSpacingStyleFn = ({ theme }) =>
  markdownStyle(theme);

export const spacingNone: MarkdownSpacingStyleFn = () => ({});

// Main styles object for easy access
export const markdownStyles: Record<string, MarkdownSpacingStyleFn> = {
  loose: spacingLoose,
  tight: spacingTight,
  none: spacingNone,
};
