import { getPropertyMode, transformSize } from '@codecademy/variance';

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
    properties: {
      physical: ['borderLeft', 'borderRight'],
      logical: ['borderInlineStart', 'borderInlineEnd'],
    },
    resolveProperty: getPropertyMode,
    scale: 'borders',
  },
  borderY: {
    property: 'border',
    properties: {
      physical: ['borderTop', 'borderBottom'],
      logical: ['borderBlockStart', 'borderBlockEnd'],
    },
    resolveProperty: getPropertyMode,
    scale: 'borders',
  },
  borderTop: { property: { physical: 'borderTop', logical: 'borderBlockStart' }, resolveProperty: getPropertyMode, scale: 'borders' },
  borderRight: { property: { physical: 'borderRight', logical: 'borderInlineEnd' }, resolveProperty: getPropertyMode, scale: 'borders' },
  borderBottom: { property: { physical: 'borderBottom', logical: 'borderBlockEnd' }, resolveProperty: getPropertyMode, scale: 'borders' },
  borderLeft: { property: { physical: 'borderLeft', logical: 'borderInlineStart' }, resolveProperty: getPropertyMode, scale: 'borders' },
  // Width
  borderWidth: { property: 'borderWidth' },
  borderWidthX: {
    property: 'borderWidth',
    properties: {
      physical: ['borderLeftWidth', 'borderRightWidth'],
      logical: ['borderInlineStartWidth', 'borderInlineEndWidth'],
    },
    resolveProperty: getPropertyMode,
  },
  borderWidthY: {
    property: 'borderWidth',
    properties: {
      physical: ['borderTopWidth', 'borderBottomWidth'],
      logical: ['borderBlockStartWidth', 'borderBlockEndWidth'],
    },
    resolveProperty: getPropertyMode,
  },
  borderWidthLeft: { property: { physical: 'borderLeftWidth', logical: 'borderInlineStartWidth' }, resolveProperty: getPropertyMode },
  borderWidthRight: { property: { physical: 'borderRightWidth', logical: 'borderInlineEndWidth' }, resolveProperty: getPropertyMode },
  borderWidthTop: { property: { physical: 'borderTopWidth', logical: 'borderBlockStartWidth' }, resolveProperty: getPropertyMode },
  borderWidthBottom: { property: { physical: 'borderBottomWidth', logical: 'borderBlockEndWidth' }, resolveProperty: getPropertyMode },
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
    properties: {
      physical: ['marginLeft', 'marginRight'],
      logical: ['marginInlineStart', 'marginInlineEnd'],
    },
    resolveProperty: getPropertyMode,
    scale: 'spacing',
  },
  my: {
    property: 'margin',
    properties: {
      physical: ['marginTop', 'marginBottom'],
      logical: ['marginBlockStart', 'marginBlockEnd'],
    },
    resolveProperty: getPropertyMode,
    scale: 'spacing',
  },
  mt: {
    property: {
      physical: 'marginTop',
      logical: 'marginBlockStart',
    },
    scale: 'spacing',
    resolveProperty: getPropertyMode,
  },
  mb: {
    property: {
      physical: 'marginBottom',
      logical: 'marginBlockEnd',
    },
    scale: 'spacing',
    resolveProperty: getPropertyMode,
  },
  mr: {
    property: {
      physical: 'marginRight',
      logical: 'marginInlineEnd',
    },
    scale: 'spacing',
    resolveProperty: getPropertyMode,
  },
  ml: {
    property: {
      physical: 'marginLeft',
      logical: 'marginInlineStart',
    },
    scale: 'spacing',
    resolveProperty: getPropertyMode,
  },
} as const;

export const padding = {
  p: { property: 'padding', scale: 'spacing' },
  px: {
    property: 'padding',
    properties: {
      physical: ['paddingLeft', 'paddingRight'],
      logical: ['paddingInlineStart', 'paddingInlineEnd'],
    },
    scale: 'spacing',
    resolveProperty: getPropertyMode,
  },
  py: {
    property: 'padding',
    properties: {
      physical: ['paddingTop', 'paddingBottom'],
      logical: ['paddingBlockStart', 'paddingBlockEnd'],
    },
    scale: 'spacing',
    resolveProperty: getPropertyMode,
  },
  pt: {
    property: {
      physical: 'paddingTop',
      logical: 'paddingBlockStart',
    },
    scale: 'spacing',
    resolveProperty: getPropertyMode,
  },
  pb: {
    property: {
      physical: 'paddingBottom',
      logical: 'paddingBlockEnd',
    },
    scale: 'spacing',
    resolveProperty: getPropertyMode,
  },
  pr: {
    property: {
      physical: 'paddingRight',
      logical: 'paddingInlineEnd',
    },
    scale: 'spacing',
    resolveProperty: getPropertyMode,
  },
  pl: {
    property: {
      physical: 'paddingLeft',
      logical: 'paddingInlineStart',
    },
    scale: 'spacing',
    resolveProperty: getPropertyMode,
  },
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
