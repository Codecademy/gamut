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
    dependentProps: [
      'borderRadiusLeft',
      'borderRadiusTop',
      'borderRadiusBottom',
      'borderRadiusRight',
      'borderRadiusTopLeftRadius',
      'borderRadiusTopRight',
      'borderRadiusBottomRight',
      'borderRadiusBottomLeft',
    ],
    type: 'directional',
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
