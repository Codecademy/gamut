import { DisplayTypes } from '../variables/display';
import { css } from '@emotion/core';
import { createSystemHandler } from './responsive';
import { SystemProp } from './types';

export type DisplayProps = SystemProp<'display', DisplayTypes>;

export const getDisplay = createSystemHandler<DisplayProps>(
  ({ display }) =>
    css`
      display: ${display};
    `
);
