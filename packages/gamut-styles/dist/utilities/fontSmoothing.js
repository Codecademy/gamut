import { css } from '@emotion/core';
export const fontSmoothing = (on = true) => on
    ? css `
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      `
    : css `
        -webkit-font-smoothing: subpixel-antialiased;
        -moz-osx-font-smoothing: auto;
      `;
//# sourceMappingURL=fontSmoothing.js.map