import { css } from '@emotion/core';

export type OverflowValues = 'visisble' | 'hidden' | 'scroll' | 'auto';

export type LayoutProps = {
  overflow?: OverflowValues;
  overflowY?: OverflowValues;
  overflowX?: OverflowValues;
};

export const getLayout = (props: LayoutProps) => {
  const { overflow, overflowY, overflowX } = props;

  return css`
    overflow: ${overflow};
    overflow-y: ${overflowY};
    overflow-x: ${overflowX};
  `;
};
