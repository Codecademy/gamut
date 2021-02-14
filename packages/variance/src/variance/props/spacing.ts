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

export const padding = {
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

export const spacing = { ...padding, ...margin } as const;
