export const color = {
  textColor: {
    propName: 'textColor',
    property: 'color',
  },
  borderColor: {
    propName: 'borderColor',
    dependentProps: [
      'borderColorLeft',
      'borderColorRight',
      'borderColorTop',
      'borderColorBottom',
      'borderColorX',
      'borderColorY',
    ],
    type: 'directional',
  },
  backgroundColor: {
    propName: 'backgroundColor',
  },
} as const;
