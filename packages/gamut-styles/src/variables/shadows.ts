import { createShadow } from '../styles';

export const boxShadows = {
  1: createShadow(1),
  2: createShadow(2),
  3: createShadow(3),
  4: createShadow(4),
  5: createShadow(5),
} as const;
