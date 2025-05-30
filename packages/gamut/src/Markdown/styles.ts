import { css, Theme } from '@emotion/react';

// Base markdown styles mixin equivalent
const markdownStyle = (
  theme: Theme,
  fontSize = '1.1rem',
  lineHeight = 1.6,
  baseMargin = '1rem'
) => css`
  font-size: ${fontSize};

  .g-md-h1,
  .g-md-h2,
  .g-md-h3,
  .g-md-h4 {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .g-md-p {
    line-height: ${lineHeight};
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;

    &:empty {
      display: none;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .g-md-ul,
  .g-md-ol {
    list-style: none;
    padding-left: 0;
    margin: ${baseMargin} 0;

    .g-md-ul,
    .g-md-ol {
      /* Even out nested lists */
      margin-top: calc(${theme.spacing[16]} / 2);

      li:last-child {
        margin-bottom: 0;
      }
    }

    .g-md-li {
      position: relative;
      margin-left: ${theme.spacing[32]};
      margin-bottom: calc(${theme.spacing[16]} / 2);
      line-height: ${lineHeight};

      &:last-child {
        margin-bottom: ${theme.spacing[16]};
      }
    }
  }

  .g-md-ul .g-md-li::before {
    background: currentColor;
    border-radius: 100%;
    content: ' ';
    display: inline-block;
    height: 0.5rem;
    left: -1.25rem;
    line-height: 1.6;
    position: absolute;
    text-align: center;
    top: calc(1.6rem - ${theme.spacing[16]});
    width: 0.5rem;
  }

  .g-md-ol {
    counter-reset: 'ordered-list';

    > .g-md-li {
      counter-increment: ordered-list;

      &::before {
        background: transparent;
        content: counter(ordered-list) '.';
        position: absolute;
        top: 0;
        left: calc(-${theme.spacing[32]});
        width: ${theme.spacing[32]};
        text-align: center;
        line-height: inherit;
      }
    }
  }

  /* Inline code style */
  .g-md-code {
    padding: 0 0.25rem;
    margin: 0 0.0625rem;
    border-radius: 0.125rem;
    color: ${theme.colors['navy-900']};
    background-color: ${theme.colors['gray-200']};
    white-space: normal;
    vertical-align: baseline;
    font-family: ${theme.fontFamily.monospace};
    font-size: 0.8em;
  }

  .g-md-pre {
    white-space: pre-wrap;

    > .g-md-code {
      display: block;
      white-space: pre-wrap;
      padding: 0;
      margin: 0;
      color: inherit;
      background-color: transparent;
      font-family: ${theme.fontFamily.monospace};
    }
  }

  .g-md-img {
    display: flex;
    max-width: 100%;
    margin: ${baseMargin} auto 0;
  }

  .g-md-p .g-md-img {
    margin: 0 auto;
  }

  .g-md-iframe {
    width: 100%;
  }

  .g-md-blockquote {
    display: block;
    font-family: ${theme.fontFamily.base};
    padding-left: ${baseMargin};
    border-left: calc(${baseMargin} / 2) solid ${theme.colors['gray-200']};
    margin: 0;
    margin-bottom: ${baseMargin};
    font-style: italic;

    /* The Markdown processor combines multiple lines
     * into a single tag if the same tag repeats line to line
     * this is mainly for <p> tags since that's the default */
    > * {
      white-space: pre-wrap;
    }
  }

  .g-md-details {
    margin-bottom: ${baseMargin};

    .g-md-summary {
      font-weight: bold;
      cursor: pointer;
    }
  }

  .g-md-details[open] .g-md-summary {
    margin-bottom: ${baseMargin};
  }
`;

// Spacing styles
export const spacingLoose = (theme: Theme) => css`
  ${markdownStyle(theme, '1.2rem', 1.7)}
`;

export const spacingTight = (theme: Theme) => css`
  ${markdownStyle(theme)}
`;

export const spacingNone = () => css`
  /* No spacing styles applied */
`;

// Main styles object for easy access
export const markdownStyles = {
  loose: spacingLoose,
  tight: spacingTight,
  none: spacingNone,
};
