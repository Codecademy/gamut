import { css, Global } from '@emotion/react';
import React from 'react';

import { webFonts } from '../remoteAssets/fonts';
import { theme } from '../theme';

const { fontSize, spacing, fontWeight, lineHeight } = theme;

const typographyGlobals = css`
  ${webFonts.map(
    ({
      name,
      style = 'normal',
      weight = 'normal',
      extensions,
      filePath,
    }) => css`
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
    margin-bottom: ${spacing[16]};
    font-weight: ${fontWeight.title};
    line-height: ${lineHeight.title};
  }

  h1 {
    font-size: ${fontSize[64]};
  }
  h2 {
    font-size: ${fontSize[44]};
  }
  h3 {
    font-size: ${fontSize[34]};
  }
  h4 {
    font-size: ${fontSize[26]};
  }
  h5 {
    font-size: ${fontSize[22]};
  }
  h6 {
    font-size: ${fontSize[20]};
  }

  small {
    font-size: ${fontSize[14]};
    font-weight: ${fontWeight.base};
  }
`;

export const Typography = () => <Global styles={typographyGlobals} />;
