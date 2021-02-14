export const margin = {
  margin: { property: 'margin' },
  marginX: {
    property: 'margin',
    properties: ['marginLeft', 'marginRight'],
  },
  marginY: {
    property: 'margin',
    properties: ['marginTop', 'marginBottom'],
  },
  marginLeft: { property: 'marginLeft' },
  marginRight: { property: 'marginRight' },
  marginTop: { property: 'marginTop' },
  marginBottom: { property: 'marginBottom' },
} as const;

const marginShorthand = {
  m: margin.margin,
  mX: margin.marginX,
  mY: margin.marginY,
  mL: margin.marginLeft,
  mR: margin.marginRight,
  mT: margin.marginTop,
  mB: margin.marginBottom,
};

export const padding = {
  p: { property: 'padding' },
  pX: {
    property: 'padding',
    properties: ['paddingLeft', 'paddingRight'],
  },
  pY: {
    property: 'padding',
    properties: ['paddingTop', 'paddingBottom'],
  },
  pL: { property: 'paddingLeft' },
  pR: { property: 'paddingRight' },
  pT: { property: 'paddingTop' },
  pB: { property: 'paddingBottom' },
  padding: { property: 'padding' },
  paddingX: {
    property: 'padding',
    properties: ['paddingLeft', 'paddingRight'],
  },
  paddingY: {
    property: 'padding',
    properties: ['paddingTop', 'paddingBottom'],
  },
  paddingLeft: { property: 'paddingLeft' },
  paddingRight: { property: 'paddingRight' },
  paddingTop: { property: 'paddingTop' },
  paddingBottom: { property: 'paddingBottom' },
} as const;

const paddingShorthand = {
  p: padding.padding,
  pX: padding.paddingX,
  pY: padding.paddingY,
  pL: padding.paddingLeft,
  pR: padding.paddingRight,
  pT: padding.paddingTop,
  pB: padding.paddingBottom,
};

export const spacing = {
  ...padding,
  ...paddingShorthand,
  ...margin,
  ...marginShorthand,
} as const;
