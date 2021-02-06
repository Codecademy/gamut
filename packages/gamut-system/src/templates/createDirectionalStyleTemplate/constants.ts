export const DIRECTIONS = ['top', 'right', 'bottom', 'left'] as const;
export type AllDirections = typeof DIRECTIONS[number];

export const DIRECTIONAL_PROPS = {
  margin: {
    left: 'marginLeft',
    right: 'marginRight',
    top: 'marginTop',
    bottom: 'marginBottom',
  },
  padding: {
    left: 'paddingLeft',
    right: 'paddingRight',
    top: 'paddingTop',
    bottom: 'paddingBottom',
  },
  borderColor: {
    left: 'borderLeftColor',
    right: 'borderRightColor',
    top: 'borderTopColor',
    bottom: 'borderBottomColor',
  },
  borderStyle: {
    left: 'borderLeftStyle',
    right: 'borderRightStyle',
    top: 'borderTopStyle',
    bottom: 'borderBottomStyle',
  },
  borderWidth: {
    left: 'borderLeftWidth',
    right: 'borderRightWidth',
    top: 'borderTopWidth',
    bottom: 'borderBottomWidth',
  },
} as const;
