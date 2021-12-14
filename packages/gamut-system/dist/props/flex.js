import { parseSize } from '../transforms';
export var flex = {
  flexBasis: {
    propName: 'flexBasis',
    transformValue: parseSize
  },
  flexDirection: {
    propName: 'flexDirection'
  },
  flexWrap: {
    propName: 'flexWrap'
  },
  flexShrink: {
    propName: 'flexShrink'
  },
  flexGrow: {
    propName: 'flexGrow'
  },
  order: {
    propName: 'order'
  },
  justifyContent: {
    propName: 'justifyContent'
  },
  justifyItems: {
    propName: 'justifyItems'
  },
  alignItems: {
    propName: 'alignItems'
  },
  alignContent: {
    propName: 'alignContent'
  }
};