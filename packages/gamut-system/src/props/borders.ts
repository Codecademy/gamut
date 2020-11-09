export const border = {
  borderWidth: {
    propName: 'borderWidth',
    dependentProps: [
      'borderWidthLeft',
      'borderWidthRight',
      'borderWidthTop',
      'borderWidthBottom',
      'borderWidthX',
      'borderWidthY',
    ],
    type: 'directional',
  },
  borderRadius: {
    propName: 'borderRadius',
  },
  borderStyle: {
    propName: 'borderStyle',
    dependentProps: [
      'borderStyleLeft',
      'borderStyleRight',
      'borderStyleTop',
      'borderStyleBottom',
      'borderStyleX',
      'borderStyleY',
    ],
    type: 'directional',
  },
} as const;
