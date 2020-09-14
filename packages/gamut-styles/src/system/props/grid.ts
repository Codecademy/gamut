import { SpaceSizes, spacing } from '../../variables/spacing';

export const grid = {
  gridItems: {
    propName: [
      'gridAutoColumns',
      'gridAutoRows',
      'gridTemplateColumns',
      'gridTemplateRows',
    ],
    scale: [] as (string | number)[],
  },
  gridAutoFlow: {
    propName: 'gridAutoFlow',
    scale: [] as ('row' | 'row dense' | 'column' | 'column dense')[],
  },
  gridGap: {
    propName: ['gridGap', 'gridColumnGap', 'gridRowGap'],
    scale: [] as SpaceSizes[],
    computeValue: (value: unknown) => spacing[value as SpaceSizes],
  },
  gridPosition: {
    propName: [
      'gridColumnStart',
      'gridColumnEnd',
      'gridRowStart',
      'gridRowEnd',
    ],
    scale: [] as (string | number)[],
  },
  justify: {
    propName: ['justifyContent', 'justifyItems', 'justifySelf'],
    scale: [] as (
      | 'stretch'
      | 'normal'
      | 'start'
      | 'end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly'
      | 'baseline'
    )[],
  },
  align: {
    propName: ['alignContent', 'alignItems', 'alignSelf'],
    scale: [] as (
      | 'stretch'
      | 'normal'
      | 'start'
      | 'end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly'
      | 'baseline'
    )[],
  },
} as const;
