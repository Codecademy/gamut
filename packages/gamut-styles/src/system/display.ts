import { DisplayTypes } from '../variables/display';
import { css } from '@emotion/core';

export type DisplayProps = {
  display?: DisplayTypes;
};

export const getDisplay = ({ display }: DisplayProps) =>
  css`
    display: ${display};
  `;
