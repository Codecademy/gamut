import { css } from '@emotion/core';
import { mediaQueries } from '../variables/responsive';
export const atViewport = (size, content) => css `
  ${mediaQueries[size]} {
    ${content}
  }
`;
export const screenSizeLTE = (max, content) => {
    return css `
    @media only screen and (max-width: ${max}) {
      ${content}
    }
  `;
};
export const screenSizeGTE = (max, content) => {
    return css `
    @media only screen and (max-width: ${max}) {
      ${content}
    }
  `;
};
export const screenSizeBetween = (min, max, content) => {
    return css `
    @media only screen and (min-width: ${min}) and (max-width: ${max}) {
      ${content}
    }
  `;
};
//# sourceMappingURL=responsive.js.map