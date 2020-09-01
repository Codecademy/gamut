import { css } from '@emotion/core';
import { createSystemHandler } from './responsive';

export type OverflowValues = 'visisble' | 'hidden' | 'scroll' | 'auto';

export type LayoutProps = {
  overflow?: OverflowValues;
  overflowY?: OverflowValues;
  overflowX?: OverflowValues;
};

export const getLayout = createSystemHandler<LayoutProps>((props) => {
  const { overflow, overflowY, overflowX } = props;

  return css`
    overflow: ${overflow};
    overflow-y: ${overflowY};
    overflow-x: ${overflowX};
  `;
});
