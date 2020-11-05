import { css, SerializedStyles } from '@emotion/react';
import { mediaQueries, MediaSize } from '../variables/responsive';

export const atViewport = (
  size: MediaSize,
  content: string | SerializedStyles
) => css`
  ${mediaQueries[size]} {
    ${content}
  }
`;

export const screenSizeLTE = (
  max: string,
  content: string | SerializedStyles
) => {
  return css`
    @media only screen and (max-width: ${max}) {
      ${content}
    }
  `;
};

export const screenSizeGTE = (
  max: string,
  content: string | SerializedStyles
) => {
  return css`
    @media only screen and (max-width: ${max}) {
      ${content}
    }
  `;
};

export const screenSizeBetween = (
  min: string,
  max: string,
  content: string | SerializedStyles
) => {
  return css`
    @media only screen and (min-width: ${min}) and (max-width: ${max}) {
      ${content}
    }
  `;
};
