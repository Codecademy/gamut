import { transformSize } from '@codecademy/variance';

export const color = {
  color: { property: 'color', scale: 'colors' },
  textColor: { property: 'color', scale: 'colors' },
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
  border: { property: 'border', scale: 'borders' },
  borderX: {
    property: 'border',
    properties: ['borderLeft', 'borderRight'],
    scale: 'borders',
  },
  borderY: {
    property: 'border',
    properties: ['borderTop', 'borderBottom'],
    scale: 'borders',
  },
  borderTop: { property: 'borderTop', scale: 'borders' },
  borderRight: { property: 'borderRight', scale: 'borders' },
  borderBottom: { property: 'borderBottom', scale: 'borders' },
  borderLeft: { property: 'borderLeft', scale: 'borders' },
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
  borderRadius: { property: 'borderRadius', scale: 'borderRadii' },
  borderRadiusLeft: {
    property: 'borderRadius',
    properties: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
    scale: 'borderRadii',
  },
  borderRadiusTop: {
    property: 'borderRadius',
    properties: ['borderTopLeftRadius', 'borderTopRightRadius'],
    scale: 'borderRadii',
  },
  borderRadiusBottom: {
    property: 'borderRadius',
    properties: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
    scale: 'borderRadii',
  },
  borderRadiusRight: {
    property: 'borderRadius',
    properties: ['borderTopRightRadius', 'borderBottomRightRadius'],
    scale: 'borderRadii',
  },
  borderRadiusTopLeft: {
    property: 'borderTopLeftRadius',
    scale: 'borderRadii',
  },
  borderRadiusTopRight: {
    property: 'borderTopRightRadius',
    scale: 'borderRadii',
  },
  borderRadiusBottomRight: {
    property: 'borderBottomRightRadius',
    scale: 'borderRadii',
  },
  borderRadiusBottomLeft: {
    property: 'borderBottomLeftRadius',
    scale: 'borderRadii',
  },
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

const selfAlignments = {
  justifySelf: { property: 'justifySelf' },
  alignSelf: { property: 'alignSelf' },
  gridArea: { property: 'gridArea' },
} as const;

const alignments = {
  justifyContent: { property: 'justifyContent' },
  justifyItems: { property: 'justifyItems' },
  alignItems: { property: 'alignItems' },
  alignContent: { property: 'alignContent' },
  ...selfAlignments,
} as const;

const flexItems = {
  flexBasis: { property: 'flexBasis' },
  flexShrink: { property: 'flexShrink' },
  flexGrow: { property: 'flexGrow' },
  order: { property: 'order' },
} as const;

export const flex = {
  flexDirection: { property: 'flexDirection' },
  flexWrap: { property: 'flexWrap' },
  flex: { property: 'flex' },
  ...alignments,
  ...flexItems,
} as const;

const gridItems = {
  gridColumn: { property: 'gridColumn' },
  gridRow: { property: 'gridRow' },
  gridColumnStart: { property: 'gridColumnStart' },
  gridRowStart: { property: 'gridRowStart' },
  gridColumnEnd: { property: 'gridColumnEnd' },
  gridRowEnd: { property: 'gridRowEnd' },
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
  ...alignments,
  ...gridItems,
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
  inset: {
    property: 'inset',
    properties: ['top', 'right', 'bottom', 'left'],
    transform: transformSize,
  },
  top: { property: 'top', transform: transformSize },
  right: { property: 'right', transform: transformSize },
  bottom: { property: 'bottom', transform: transformSize },
  left: { property: 'left', transform: transformSize },
  zIndex: { property: 'zIndex' },
  opacity: { property: 'opacity' },
} as const;

export const shadows = {
  boxShadow: { property: 'boxShadow' },
  textShadow: { property: 'textShadow' },
} as const;

export const layout = {
  containerType: { property: 'containerType' },
  display: { property: 'display' },
  overflow: { property: 'overflow' },
  overflowX: { property: 'overflowX' },
  overflowY: { property: 'overflowY' },
  dimensions: {
    property: 'width',
    properties: ['width', 'height'],
    transform: transformSize,
  },
  width: { property: 'width', transform: transformSize },
  minWidth: { property: 'minWidth', transform: transformSize },
  maxWidth: { property: 'maxWidth', transform: transformSize },
  height: { property: 'height', transform: transformSize },
  minHeight: { property: 'minHeight', transform: transformSize },
  maxHeight: { property: 'maxHeight', transform: transformSize },
  verticalAlign: { property: 'verticalAlign' },
  ...selfAlignments,
  ...gridItems,
  ...flexItems,
} as const;

export const list = {
  listStyle: { property: 'listStyle' },
  listStyleType: { property: 'listStyleType' },
  listStylePosition: { property: 'listStylePosition' },
  listStyleImage: { property: 'listStyleImage' },
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

export const margin = {
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
  // Logical properties
  mbl: {
    property: 'margin',
    properties: ['marginBlockStart', 'marginBlockEnd'],
    scale: 'spacing',
  },
  mbls: { property: 'marginBlockStart', scale: 'spacing' },
  mble: { property: 'marginBlockEnd', scale: 'spacing' },
  mi: {
    property: 'margin',
    properties: ['marginInlineStart', 'marginInlineEnd'],
    scale: 'spacing',
  },
  mis: { property: 'marginInlineStart', scale: 'spacing' },
  mie: { property: 'marginInlineEnd', scale: 'spacing' },
} as const;

export const padding = {
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
  // Logical properties
  pbl: {
    property: 'padding',
    properties: ['paddingBlockStart', 'paddingBlockEnd'],
    scale: 'spacing',
  },
  pbls: { property: 'paddingBlockStart', scale: 'spacing' },
  pble: { property: 'paddingBlockEnd', scale: 'spacing' },
  pi: {
    property: 'padding',
    properties: ['paddingInlineStart', 'paddingInlineEnd'],
    scale: 'spacing',
  },
  pis: { property: 'paddingInlineStart', scale: 'spacing' },
  pie: { property: 'paddingInlineEnd', scale: 'spacing' },
} as const;

export const space = {
  ...margin,
  ...padding,
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
  ...list,
};
