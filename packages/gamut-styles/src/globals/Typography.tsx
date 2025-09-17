import { css, Global, Theme } from '@emotion/react';
import * as React from 'react';

import { FontConfig, getFonts } from '../utils/fontUtils';

export const Typography: React.FC<{ theme: Theme }> = ({ theme }) => {
  const fonts = getFonts(theme?.name);

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
};
