export const flex = {
  flexBasis: {
    propName: 'flexBasis',
    scale: [] as (string | number)[],
  },
  flexDirection: {
    propName: 'flexDirection',
    scale: [] as ('row' | 'row-reverse' | 'column' | 'column-reverse')[],
  },
  flexWrap: {
    propName: 'flexWrap',
    scale: [] as ('wrap' | 'nowrap' | 'wrap-reverse')[],
  },
  flex: {
    propName: ['flex', 'flexGrow', 'flexShrink'],
    scale: [] as (number | 'unset' | 'initial' | 'inherit')[],
  },
  order: {
    propName: 'order',
    scale: [] as number[],
  },
  justify: {
    propName: ['justifyContent', 'justifyItems', 'justifySelf'],
    scale: [] as (
      | 'normal'
      | 'flex-start'
      | 'flex-end'
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
      | 'normal'
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly'
      | 'baseline'
    )[],
  },
} as const;
