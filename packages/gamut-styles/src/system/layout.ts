import { css } from '@emotion/core';
import { createSystemHandler } from './responsive';
import { SystemProp } from './types';

export type OverflowValues = 'visisble' | 'hidden' | 'scroll' | 'auto';

export type LayoutProps = SystemProp<
  'overflow' | 'overflowX' | 'overflowY',
  OverflowValues
>;

export const getLayout = createSystemHandler<LayoutProps>((props) => {
  const { overflow, overflowY, overflowX } = props;

  return css`
    overflow: ${overflow};
    overflow-y: ${overflowY};
    overflow-x: ${overflowX};
  `;
});
