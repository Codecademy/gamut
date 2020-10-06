export const spacing = {
  margin: {
    propName: 'margin',
    boundProps: [
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
    boundProps: [
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
