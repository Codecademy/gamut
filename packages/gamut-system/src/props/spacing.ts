export const spacing = {
  margin: {
    propName: 'margin',
    dependentProps: [
      'marginLeft',
      'marginRight',
      'marginTop',
      'marginBottom',
      'marginX',
      'marginY',
    ],
    type: 'directional',
  },
  padding: {
    propName: 'padding',
    dependentProps: [
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
      'paddingX',
      'paddingY',
    ],
    type: 'directional',
  },
} as const;
