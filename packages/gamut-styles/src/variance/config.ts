export const color = {
  color: { property: 'color', scale: 'colors' },
  bg: { property: 'backgroundColor', scale: 'colors' },
  borderColor: { property: 'borderColor', scale: 'colors' },
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
  borderColorLeft: { property: 'borderLeftColor', scale: 'colors' },
  borderColorRight: { property: 'borderRightColor', scale: 'colors' },
  borderColorTop: { property: 'borderTopColor', scale: 'colors' },
  borderColorBottom: { property: 'borderBottomColor', scale: 'colors' },
} as const;

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

export const flex = {
  flex: { property: 'flex' },
  flexBasis: { property: 'flexBasis' },
  flexDirection: { property: 'flexDirection' },
  flexWrap: { property: 'flexWrap' },
  flexShrink: { property: 'flexShrink' },
  flexGrow: { property: 'flexGrow' },
  order: { property: 'order' },
  justifyContent: { property: 'justifyContent' },
  justifyItems: { property: 'justifyItems' },
  alignItems: { property: 'alignItems' },
  alignContent: { property: 'alignContent' },
} as const;

export const grid = {
  gridAutoColumns: { property: 'gridAutoColumns' },
  gridAutoRows: { property: 'gridAutoRows' },
  gridTemplateColumns: { property: 'gridTemplateColumns' },
  gridTemplateRows: { property: 'gridTemplateRows' },
  gridTemplateAreas: { property: 'gridTemplateAreas' },
  gridAutoFlow: { property: 'gridAutoFlow' },
  gap: { property: 'gap', scale: 'spacing' },
  rowGap: { property: 'rowGap', scale: 'spacing' },
  columnGap: { property: 'columnGap', scale: 'spacing' },
  gridColumn: { property: 'gridColumn' },
  gridRow: { property: 'gridRow' },
  gridColumnStart: { property: 'gridColumnStart' },
  gridRowStart: { property: 'gridRowStart' },
  gridColumnEnd: { property: 'gridColumnEnd' },
  gridRowEnd: { property: 'gridRowEnd' },
} as const;

export const background = {
  background: { property: 'background' },
  backgroundImage: { property: 'backgroundImage' },
  backgroundSize: { property: 'backgroundSize' },
  backgroundRepeat: { property: 'backgroundRepeat' },
  backgroundPosition: { property: 'backgroundPosition' },
} as const;

export const positioning = {
  position: { property: 'position' },
  top: { property: 'top' },
  right: { property: 'right' },
  bottom: { property: 'bottom' },
  left: { property: 'left' },
  zIndex: { property: 'zIndex' },
  opacity: { property: 'opacity' },
} as const;

export const shadows = {
  boxShadow: { property: 'boxShadow' },
  textShadow: { property: 'textShadow' },
} as const;

export const layout = {
  display: { property: 'display' },
  overflow: { property: 'overflow' },
  overflowX: { property: 'overflowX' },
  overflowY: { property: 'overflowY' },
  width: { property: 'width' },
  minWidth: { property: 'minWidth' },
  maxWidth: { property: 'maxWidth' },
  height: { property: 'height' },
  minHeight: { property: 'minHeight' },
  maxHeight: { property: 'maxHeight' },
  verticalAlign: { property: 'verticalAlign' },
  justifySelf: { property: 'justifySelf' },
  alignSelf: { property: 'alignSelf' },
  gridArea: { property: 'gridArea' },
} as const;

export const typography = {
  fontFamily: { property: 'fontFamily', scale: 'fontFamily' },
  fontWeight: { property: 'fontWeight', scale: 'fontWeight' },
  lineHeight: { property: 'lineHeight', scale: 'lineHeight' },
  fontSize: { property: 'fontSize', scale: 'fontSize' },
  letterSpacing: { property: 'letterSpacing' },
  textAlign: { property: 'textAlign' },
  fontStyle: { property: 'fontStyle' },
  textDecoration: { property: 'textDecoration' },
  textTransform: { property: 'textTransform' },
  whiteSpace: { property: 'whiteSpace' },
} as const;

export const space = {
  /** Testing Docgen */
  p: { property: 'padding', scale: 'spacing' },
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
  pt: { property: 'paddingTop', scale: 'spacing' },
  pb: { property: 'paddingBottom', scale: 'spacing' },
  pr: { property: 'paddingRight', scale: 'spacing' },
  pl: { property: 'paddingLeft', scale: 'spacing' },
  m: { property: 'margin', scale: 'spacing' },
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
  mt: { property: 'marginTop', scale: 'spacing' },
  mb: { property: 'marginBottom', scale: 'spacing' },
  mr: { property: 'marginRight', scale: 'spacing' },
  ml: { property: 'marginLeft', scale: 'spacing' },
} as const;

export const all = {
  ...typography,
  ...space,
  ...shadows,
  ...grid,
  ...flex,
  ...layout,
  ...positioning,
  ...border,
  ...background,
  ...color,
};
