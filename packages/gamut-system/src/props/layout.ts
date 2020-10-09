import { parseSize } from '../transforms';

export const layout = {
  display: {
    propName: 'display',
  },
  overflow: {
    propName: 'overflow',
  },
  overflowX: {
    propName: 'overflowX',
  },
  overflowY: {
    propName: 'overflowY',
  },
  width: {
    propName: 'width',
    transformValue: parseSize,
  },
  minWidth: {
    propName: 'minWidth',
    transformValue: parseSize,
  },
  maxWidth: {
    propName: 'maxWidth',
    transformValue: parseSize,
  },
  height: {
    propName: 'height',
    transformValue: parseSize,
  },
  minHeight: {
    propName: 'minHeight',
    transformValue: parseSize,
  },
  maxHeight: {
    propName: 'maxHeight',
    transformValue: parseSize,
  },
  verticalAlign: {
    propName: 'verticalAlign',
  },
} as const;
