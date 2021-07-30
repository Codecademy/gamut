export const testConfig = {
  textColor: { property: 'color' },
  bg: { property: 'backgroundColor' },
  borderColor: { property: 'borderColor' },
  borderColorX: {
    property: 'borderColor',
    properties: ['borderLeftColor', 'borderRightColor'],
    scale: 'colors',
  },
  borderColorY: {
    property: 'borderColor',
    properties: ['borderTopColor', 'borderBottomColor'],
    scale: 'colors',
  },
  borderColorLeft: { property: 'borderLeftColor' },
  borderColorRight: { property: 'borderRightColor' },
  borderColorTop: { property: 'borderTopColor' },
  borderColorBottom: { property: 'borderBottomColor' },

  border: { property: 'border' },
  borderX: { property: 'border', properties: ['borderLeft', 'borderRight'] },
  borderY: { property: 'border', properties: ['borderTop', 'borderBottom'] },
  borderTop: { property: 'borderTop' },
  borderRight: { property: 'borderRight' },
  borderBottom: { property: 'borderBottom' },
  borderLeft: { property: 'borderLeft' },
  borderWidth: { property: 'borderWidth' },
  borderWidthX: {
    property: 'borderWidth',
    properties: ['borderLeftWidth', 'borderRightWidth'],
  },
  borderWidthY: {
    property: 'borderWidth',
    properties: ['borderTopWidth', 'borderBottomWidth'],
  },

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

  borderStyle: { property: 'borderStyle' },
  borderStyleX: {
    property: 'borderStyle',
    properties: ['borderLeftStyle', 'borderRightStyle'],
  },
  borderStyleY: {
    property: 'borderStyle',
    properties: ['borderTopStyle', 'borderBottomStyle'],
  },

  flex: { property: 'flex' },
  flexBasis: { property: 'flexBasis' },

  p: { property: 'padding' },
  px: {
    property: 'padding',
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'spacing',
  },
  py: {
    property: 'padding',
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'spacing',
  },
  pt: { property: 'paddingTop' },
  pb: { property: 'paddingBottom' },
  pr: { property: 'paddingRight' },
  pl: { property: 'paddingLeft' },
  m: { property: 'margin' },
  mx: {
    property: 'margin',
    properties: ['marginLeft', 'marginRight'],
    scale: 'spacing',
  },
  my: {
    property: 'margin',
    properties: ['marginTop', 'marginBottom'],
    scale: 'spacing',
  },
  mt: { property: 'marginTop' },
  mb: { property: 'marginBottom' },
  mr: { property: 'marginRight' },
  ml: { property: 'marginLeft' },
} as const;
