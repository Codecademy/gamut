import { css } from '@emotion/core';
export const screenReaderOnly = css `
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
  border: 0;
`;
export const screenReaderOnlyFocusable = css `
  &:active,
  &:focus {
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
    clip: auto;
    white-space: normal;
    clip-path: none;
  }
`;
//# sourceMappingURL=screenReaderOnly.js.map