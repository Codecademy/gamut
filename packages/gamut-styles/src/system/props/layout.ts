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
    computeValue: parseSize,
  },
  minWidth: {
    propName: 'minWidth',
    computeValue: parseSize,
  },
  maxWidth: {
    propName: 'maxWidth',
    computeValue: parseSize,
  },
  height: {
    propName: 'height',
    computeValue: parseSize,
  },
  minHeight: {
    propName: 'minHeight',
    computeValue: parseSize,
  },
  maxHeight: {
    propName: 'maxHeight',
    computeValue: parseSize,
  },
  verticalAlign: {
    propName: 'verticalAlign',
  },
} as const;
