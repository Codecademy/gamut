import { parseSize } from '../transforms';
export var positioning = {
  position: {
    propName: 'position'
  },
  top: {
    propName: 'top',
    transformValue: parseSize
  },
  right: {
    propName: 'right',
    transformValue: parseSize
  },
  bottom: {
    propName: 'bottom',
    transformValue: parseSize
  },
  left: {
    propName: 'left',
    transformValue: parseSize
  },
  zIndex: {
    propName: 'zIndex'
  },
  opacity: {
    propName: 'opacity'
  }
};