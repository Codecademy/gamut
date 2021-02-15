import { parseSize } from '../transforms';

export const layout = {
  display: { property: 'display' },
  overflow: { property: 'overflow' },
  overflowX: { property: 'overflowX' },
  overflowY: { property: 'overflowY' },
  width: {
    property: 'width',
    transform: parseSize,
  },
  minWidth: {
    property: 'minWidth',
    transform: parseSize,
  },
  maxWidth: {
    property: 'maxWidth',
    transform: parseSize,
  },
  height: {
    property: 'height',
    transform: parseSize,
  },
  minHeight: {
    property: 'minHeight',
    transform: parseSize,
  },
  maxHeight: {
    property: 'maxHeight',
    transform: parseSize,
  },
  verticalAlign: { property: 'verticalAlign' },
} as const;
