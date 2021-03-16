import { css, Global } from '@emotion/react';
import React from 'react';

import { theme } from '../theme';

const { fontSize, spacing, fontWeight, lineHeight } = theme;

export const Typography = () => (
  <Global
    styles={css`
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
    `}
  />
);
