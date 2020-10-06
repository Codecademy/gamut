export const border = {
  borderWidth: {
    propName: 'borderWidth',
    boundProps: [
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
  },
} as const;
