import { parseSize } from '../transforms';

export const positioning = {
  position: {
    property: 'position',
  },
  top: {
    property: 'top',
    transform: parseSize,
  },
  right: {
    property: 'right',
    transform: parseSize,
  },
  bottom: {
    property: 'bottom',
    transform: parseSize,
  },
  left: {
    property: 'left',
    transform: parseSize,
  },
  zIndex: {
    property: 'zIndex',
  },
} as const;
