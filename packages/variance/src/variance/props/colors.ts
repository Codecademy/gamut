export const color = {
  textColor: { property: 'color' },
  backgroundColor: { property: 'backgroundColor' },
  borderColor: { property: 'borderColor' },
  borderColorX: {
    property: 'borderColor',
    properties: ['borderLeftColor', 'borderRightColor'],
  },
  borderColorY: {
    property: 'borderColorY',
    properties: ['borderTopColor', 'borderBottomColor'],
  },
  borderColorLeft: { property: 'borderLeftColor' },
  borderColorRight: { property: 'borderRightColor' },
  borderColorTop: { property: 'borderTopColor' },
  borderColorBottom: { property: 'borderBottomColor' },
} as const;
