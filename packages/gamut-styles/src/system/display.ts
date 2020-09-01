import { DisplayTypes } from '../variables/display';
import { css } from '@emotion/core';
import { createSystemHandler } from './responsive';

export type DisplayProps = {
  display?: DisplayTypes;
};

export const getDisplay = createSystemHandler<DisplayProps>(
  ({ display }) =>
    css`
      display: ${display};
    `
);
