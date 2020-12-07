import { css } from '@emotion/react';

export type ShadowDepth = 1 | 2 | 3 | 4 | 5;

const shadowsForDepth = {
  1: {
    offsets: [1, 3, 1, 3],
    shades: [0.12, 0.24],
  },
  2: {
    offsets: [3, 6, 3, 6],
    shades: [0.19, 0.23],
  },
  3: {
    offsets: [10, 20, 6, 6],
    shades: [0.25, 0.22],
  },
  4: {
    offsets: [14, 28, 10, 10],
    shades: [0.25, 0.22],
  },
  5: {
    offsets: [19, 38, 15, 12],
    shades: [0.3, 0.22],
  },
};

export const createBoxShadow = (depth: ShadowDepth = 1) => {
  const {
    offsets: [o1, o2, o3, o4],
    shades: [s1, s2],
  } = shadowsForDepth[depth];

  return `0 ${o1}px ${o2}px rgba(0, 0, 0, ${s1}),
  0 ${o3}px ${o4}px rgba(0, 0, 0, ${s2})`;
};

export const boxShadow = (depth: ShadowDepth = 1) => css`
  box-shadow: ${createBoxShadow(depth)};
`;
