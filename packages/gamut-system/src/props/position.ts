import { parseSize } from '../transforms';

export const positioning = {
  position: {
    propName: 'position',
  },
  top: {
    propName: 'top',
    transformValue: parseSize,
  },
  right: {
    propName: 'right',
    transformValue: parseSize,
  },
  bottom: {
    propName: 'bottom',
    transformValue: parseSize,
  },
  left: {
    propName: 'left',
    transformValue: parseSize,
  },
  zIndex: {
    propName: 'zIndex',
  },
} as const;
