import { css, SerializedStyles } from '@emotion/core';
import { breakpoints } from '../variables/responsive';
import { MediaSizes } from '../types';

const createMediaQuery = (size: MediaSizes, direction: 'min' | 'max') => (
  content: string | SerializedStyles
) => css`
  @media only screen and (${direction}-width: ${breakpoints[size]}) {
    ${content}
  }
`;

export const viewports = {
  xs: createMediaQuery('xs', 'min'),
  sm: createMediaQuery('sm', 'min'),
  md: createMediaQuery('md', 'min'),
  lg: createMediaQuery('lg', 'min'),
  xl: createMediaQuery('xl', 'min'),
};

export const atViewport = (
  size: MediaSizes,
  content: string | SerializedStyles
) => (size !== 'xs' ? viewports[size](content) : content);

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
