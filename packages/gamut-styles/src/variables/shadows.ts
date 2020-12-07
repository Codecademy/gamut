import { createBoxShadow } from '../utilities';
export const boxShadows = {
  1: createBoxShadow(1),
  2: createBoxShadow(2),
  3: createBoxShadow(3),
  4: createBoxShadow(4),
  5: createBoxShadow(5),
} as const;
