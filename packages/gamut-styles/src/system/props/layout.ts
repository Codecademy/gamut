import { DisplayTypes } from '../../variables/display';

export const layout = {
  display: {
    propName: 'display',
    scale: [] as DisplayTypes[],
  },
  overflow: {
    scale: [] as ('visible' | 'hidden' | 'scroll')[],
    propName: ['overflow', 'overflowX', 'overflowY'],
  },
} as const;
