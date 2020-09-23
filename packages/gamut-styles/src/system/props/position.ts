import { parseSize } from '../transforms';

export const positioning = {
  position: {
    propName: 'position',
  },
  top: {
    propName: 'top',
    computeValue: parseSize,
  },
  right: {
    propName: 'right',
    computeValue: parseSize,
  },
  bottom: {
    propName: 'bottom',
    computeValue: parseSize,
  },
  left: {
    propName: 'left',
    computeValue: parseSize,
  },
  zIndex: {
    propName: 'zIndex',
  },
} as const;
