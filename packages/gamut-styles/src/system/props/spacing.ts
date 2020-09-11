import { spacing as spaceScale, SpaceSizes } from '../../variables/spacing';

export const spacing = {
  margin: {
    propName: 'margin',
    altProps: [
      'marginLeft',
      'marginRight',
      'marginTop',
      'marginBottom',
      'marginX',
      'marginY',
    ],
    type: 'directional',
    scale: [] as SpaceSizes[],
    computeValue: (value: unknown) => spaceScale[value as SpaceSizes],
  },
  padding: {
    propName: 'padding',
    altProps: [
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
      'paddingX',
      'paddingY',
    ],
    type: 'directional',
    scale: [] as SpaceSizes[],
    computeValue: (value: unknown) => spaceScale[value as SpaceSizes],
  },
} as const;
