export const border = {
  // Border
  border: { property: 'border' },
  borderX: { property: 'border', properties: ['borderLeft', 'borderRight'] },
  borderY: { property: 'border', properties: ['borderTop', 'borderBottom'] },
  borderTop: { property: 'borderTop' },
  borderRight: { property: 'borderRight' },
  borderBottom: { property: 'borderBottom' },
  borderLeft: { property: 'borderLeft' },
  // Width
  borderWidth: { property: 'borderWidth' },
  borderWidthX: {
    property: 'borderWidth',
    properties: ['borderLeftWidth', 'borderRightWidth'],
  },
  borderWidthY: {
    property: 'borderWidth',
    properties: ['borderTopWidth', 'borderBottomWidth'],
  },
  borderWidthLeft: { property: 'borderLeftWidth' },
  borderWidthRight: { property: 'borderRightWidth' },
  borderWidthTop: { property: 'borderTopWidth' },
  borderWidthBottom: { property: 'borderBottomWidth' },
  // Radius
  borderRadius: { property: 'borderRadius' },
  borderRadiusLeft: {
    property: 'borderRadius',
    properties: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
  },
  borderRadiusTop: {
    property: 'borderRadius',
    properties: ['borderTopLeftRadius', 'borderTopRightRadius'],
  },
  borderRadiusBottom: {
    property: 'borderRadius',
    properties: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
  },
  borderRadiusRight: {
    property: 'borderRadius',
    properties: ['borderTopRightRadius', 'borderBottomRightRadius'],
  },
  borderRadiusTopLeft: { property: 'borderTopLeftRadius' },
  borderRadiusTopRight: { property: 'borderTopRightRadius' },
  borderRadiusBottomRight: { property: 'borderBottomRightRadius' },
  borderRadiusBottomLeft: { property: 'borderBottomLeftRadius' },
  // Style
  borderStyle: { property: 'borderStyle' },
  borderStyleX: {
    property: 'borderStyle',
    properties: ['borderLeftStyle', 'borderRightStyle'],
  },
  borderStyleY: {
    property: 'borderStyle',
    properties: ['borderTopStyle', 'borderBottomStyle'],
  },
  borderStyleLeft: { property: 'borderLeftStyle' },
  borderStyleRight: { property: 'borderRightStyle' },
  borderStyleTop: { property: 'borderTopStyle' },
  borderStyleBottom: { property: 'borderBottomStyle' },
} as const;
