import { css, Global } from '@emotion/react';
import * as React from 'react';

import { coreTheme } from '../themes';
import { FontConfig, getFonts } from '../utils/fontUtils';

/**
 * Typography component that applies global typography styles to the application.
 *
 * This component generates CSS-in-JS styles for:
 * - Font face declarations for all configured fonts
 * - Global heading styles (h1-h6) with theme-based sizing and spacing
 * - Small text styling
 *
 * @param props - Component props
 * @param props.theme - Emotion theme object containing typography configuration and an optional name
 * @returns JSX element with global typography styles applied
 *
 * @example
 * ```tsx
 * <Typography theme={myTheme} />
 * ```
 */

export const Typography: React.FC<{ theme: typeof coreTheme }> = ({
  theme,
}) => {
  try {
    const fonts = getFonts(theme?.name);

    if (!Array.isArray(fonts)) {
      // Error if the fonts are not an array
      // eslint-disable-next-line no-console
      console.warn('Typography: Invalid fonts data received');
      return null;
    }

    const typographyGlobals = css`
      ${fonts.map(
        ({
          name,
          style = 'normal',
          weight = 'normal',
          extensions,
          filePath,
        }: FontConfig) => css`
          @font-face {
            font-display: swap;
            font-family: '${name}';
            font-style: ${style};
            font-weight: ${weight};
            src: ${extensions
              .map((ext) => `url("${filePath}.${ext}") format("${ext}")`)
              .join(', ')};
          }
        `
      )}

      h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-bottom: ${theme.spacing[16]};
        font-weight: ${theme.fontWeight.title};
        line-height: ${theme.lineHeight.title};
      }

      h1 {
        font-size: ${theme.fontSize[64]};
      }
      h2 {
        font-size: ${theme.fontSize[44]};
      }
      h3 {
        font-size: ${theme.fontSize[34]};
      }
      h4 {
        font-size: ${theme.fontSize[26]};
      }
      h5 {
        font-size: ${theme.fontSize[22]};
      }
      h6 {
        font-size: ${theme.fontSize[20]};
      }

      small {
        font-size: ${theme.fontSize[14]};
        font-weight: ${theme.fontWeight.base};
      }
    `;

    return <Global styles={typographyGlobals} />;
  } catch (error) {
    // Handle font loading errors gracefully
    // eslint-disable-next-line no-console
    console.warn('Typography: Font loading failed:', error);
    return null;
  }
};
